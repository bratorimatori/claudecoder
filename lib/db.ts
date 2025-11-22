import { prisma } from './prisma';
import { Prisma } from '@prisma/client';
import { generateEmbedding } from './embeddings';

// Helper functions for common database operations

export async function getCommands(options?: {
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}) {
  const { category, tags, limit = 20, offset = 0 } = options || {};

  return prisma.command.findMany({
    where: {
      ...(category && { category }),
      ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset,
  });
}

export async function getMCPServers(options?: {
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
}) {
  const { category, tags, limit = 20, offset = 0 } = options || {};

  return prisma.mCPServer.findMany({
    where: {
      ...(category && { category }),
      ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset,
  });
}

export async function getWorkflows(options?: {
  category?: string;
  tags?: string[];
  userId?: string;
  publicOnly?: boolean;
  limit?: number;
  offset?: number;
}) {
  const { category, tags, userId, publicOnly = true, limit = 20, offset = 0 } = options || {};

  return prisma.workflow.findMany({
    where: {
      ...(category && { category }),
      ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
      ...(userId && { authorId: userId }),
      ...(publicOnly && { isPublic: true }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset,
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function incrementViews(
  resourceType: 'command' | 'mcpServer' | 'workflow',
  id: string
) {
  switch (resourceType) {
    case 'command':
      return prisma.command.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    case 'mcpServer':
      return prisma.mCPServer.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
    case 'workflow':
      return prisma.workflow.update({
        where: { id },
        data: { views: { increment: 1 } },
      });
  }
}

export async function incrementInstalls(
  resourceType: 'command' | 'mcpServer' | 'workflow',
  id: string
) {
  switch (resourceType) {
    case 'command':
      return prisma.command.update({
        where: { id },
        data: { installs: { increment: 1 } },
      });
    case 'mcpServer':
      return prisma.mCPServer.update({
        where: { id },
        data: { installs: { increment: 1 } },
      });
    case 'workflow':
      return prisma.workflow.update({
        where: { id },
        data: { installs: { increment: 1 } },
      });
  }
}

export async function checkRateLimit(
  userId: string,
  resourceType: 'ai_command' | 'ai_chat' | 'workflow'
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const limits = {
    ai_command: 3,
    ai_chat: 10,
    workflow: 2,
  };

  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  let rateLimit = await prisma.rateLimit.findUnique({
    where: {
      userId_resourceType: {
        userId,
        resourceType,
      },
    },
  });

  // Reset if past reset date
  if (!rateLimit || rateLimit.resetAt < now) {
    rateLimit = await prisma.rateLimit.upsert({
      where: {
        userId_resourceType: {
          userId,
          resourceType,
        },
      },
      update: {
        count: 0,
        resetAt: endOfMonth,
      },
      create: {
        userId,
        resourceType,
        count: 0,
        resetAt: endOfMonth,
      },
    });
  }

  const maxLimit = limits[resourceType];
  const allowed = rateLimit.count < maxLimit;
  const remaining = Math.max(0, maxLimit - rateLimit.count);

  return {
    allowed,
    remaining,
    resetAt: rateLimit.resetAt,
  };
}

export async function incrementRateLimit(
  userId: string,
  resourceType: 'ai_command' | 'ai_chat' | 'workflow'
) {
  return prisma.rateLimit.update({
    where: {
      userId_resourceType: {
        userId,
        resourceType,
      },
    },
    data: {
      count: { increment: 1 },
    },
  });
}

// Semantic Search Functions

/**
 * Perform semantic search on commands using vector similarity
 */
export async function searchCommandsByEmbedding(
  query: string,
  options?: {
    limit?: number;
    category?: string;
    tags?: string[];
  }
) {
  const { limit = 10, category, tags } = options || {};

  // Generate embedding for the search query
  const queryEmbedding = await generateEmbedding(query);

  if (queryEmbedding.length === 0) {
    // Fallback to text search if embeddings not available
    return prisma.command.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        ...(category && { category }),
        ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
      },
      take: limit,
      orderBy: { views: 'desc' },
    });
  }

  // Use raw SQL for vector similarity search
  const embeddingString = `[${queryEmbedding.join(',')}]`;

  return prisma.$queryRaw<any[]>`
    SELECT
      id, name, slug, description, category, tags,
      installs, likes, views, "createdAt", "updatedAt",
      1 - (embedding <=> ${embeddingString}::vector) as similarity
    FROM commands
    WHERE embedding IS NOT NULL
      ${category ? Prisma.sql`AND category = ${category}` : Prisma.empty}
      ${tags && tags.length > 0 ? Prisma.sql`AND tags && ${tags}` : Prisma.empty}
    ORDER BY embedding <=> ${embeddingString}::vector
    LIMIT ${limit}
  `;
}

/**
 * Perform semantic search on MCP servers
 */
export async function searchMCPServersByEmbedding(
  query: string,
  options?: {
    limit?: number;
    category?: string;
    tags?: string[];
  }
) {
  const { limit = 10, category, tags } = options || {};

  const queryEmbedding = await generateEmbedding(query);

  if (queryEmbedding.length === 0) {
    return prisma.mCPServer.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        ...(category && { category }),
        ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
      },
      take: limit,
      orderBy: { views: 'desc' },
    });
  }

  const embeddingString = `[${queryEmbedding.join(',')}]`;

  return prisma.$queryRaw<any[]>`
    SELECT
      id, name, slug, description, category, tags, "npmPackage", "githubUrl",
      installs, likes, views, "createdAt", "updatedAt",
      1 - (embedding <=> ${embeddingString}::vector) as similarity
    FROM mcp_servers
    WHERE embedding IS NOT NULL
      ${category ? Prisma.sql`AND category = ${category}` : Prisma.empty}
      ${tags && tags.length > 0 ? Prisma.sql`AND tags && ${tags}` : Prisma.empty}
    ORDER BY embedding <=> ${embeddingString}::vector
    LIMIT ${limit}
  `;
}

/**
 * Perform semantic search on workflows
 */
export async function searchWorkflowsByEmbedding(
  query: string,
  options?: {
    limit?: number;
    category?: string;
    tags?: string[];
    publicOnly?: boolean;
  }
) {
  const { limit = 10, category, tags, publicOnly = true } = options || {};

  const queryEmbedding = await generateEmbedding(query);

  if (queryEmbedding.length === 0) {
    return prisma.workflow.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        ...(category && { category }),
        ...(tags && tags.length > 0 && { tags: { hasSome: tags } }),
        ...(publicOnly && { isPublic: true }),
      },
      take: limit,
      orderBy: { views: 'desc' },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });
  }

  const embeddingString = `[${queryEmbedding.join(',')}]`;

  return prisma.$queryRaw<any[]>`
    SELECT
      w.id, w.name, w.slug, w.description, w.category, w.tags,
      w.installs, w.likes, w.views, w."createdAt", w."updatedAt", w."isPublic",
      1 - (w.embedding <=> ${embeddingString}::vector) as similarity
    FROM workflows w
    WHERE w.embedding IS NOT NULL
      ${publicOnly ? Prisma.sql`AND w."isPublic" = true` : Prisma.empty}
      ${category ? Prisma.sql`AND w.category = ${category}` : Prisma.empty}
      ${tags && tags.length > 0 ? Prisma.sql`AND w.tags && ${tags}` : Prisma.empty}
    ORDER BY w.embedding <=> ${embeddingString}::vector
    LIMIT ${limit}
  `;
}
