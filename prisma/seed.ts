import { PrismaClient } from '@prisma/client';
import { generateEmbedding, createSearchableText } from '../lib/embeddings';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@claudecoder.com' },
    update: {},
    create: {
      email: 'demo@claudecoder.com',
      name: 'Demo User',
    },
  });

  console.log('✅ Created demo user');

  // Sample commands
  const commandsData = [
    {
      name: 'git-commit',
      slug: 'git-commit',
      description: 'Automatically create git commits with AI-generated commit messages',
      code: '#!/bin/bash\ngit add .\ngit commit -m "$(claude generate commit message)"',
      category: 'git',
      tags: ['git', 'automation', 'ai'],
      author: 'Demo User',
    },
    {
      name: 'debug-typescript',
      slug: 'debug-typescript',
      description: 'Debug TypeScript errors with AI assistance',
      code: '#!/bin/bash\ntsc --noEmit | claude analyze typescript-errors',
      category: 'debugging',
      tags: ['typescript', 'debugging', 'ai'],
      author: 'Demo User',
    },
    {
      name: 'refactor-code',
      slug: 'refactor-code',
      description: 'Refactor code to improve readability and maintainability',
      code: '#!/bin/bash\nclaude refactor --file=$1 --focus=readability',
      category: 'refactoring',
      tags: ['refactoring', 'code-quality', 'ai'],
      author: 'Demo User',
    },
  ];

  for (const cmdData of commandsData) {
    // First, create or update the command without embedding
    const command = await prisma.command.upsert({
      where: { slug: cmdData.slug },
      update: {},
      create: {
        name: cmdData.name,
        slug: cmdData.slug,
        description: cmdData.description,
        code: cmdData.code,
        category: cmdData.category,
        tags: cmdData.tags,
        author: cmdData.author,
        user: {
          connect: { id: user.id },
        },
      },
    });

    // Generate and update embedding using raw SQL
    const searchText = createSearchableText(cmdData);
    const embedding = await generateEmbedding(searchText);

    if (embedding.length > 0) {
      await prisma.$executeRaw`
        UPDATE commands
        SET embedding = ${`[${embedding.join(',')}]`}::vector
        WHERE id = ${command.id}
      `;
      console.log(`  ✓ Added embedding to ${cmdData.name}`);
    }
  }

  console.log('✅ Created sample commands');

  // Sample MCP servers
  const mcpServersData = [
    {
      name: 'GitHub MCP',
      slug: 'github-mcp',
      description: 'Access GitHub repositories, issues, and pull requests from Claude',
      npmPackage: '@modelcontextprotocol/server-github',
      githubUrl: 'https://github.com/modelcontextprotocol/servers',
      category: 'development',
      tags: ['github', 'git', 'development'],
    },
    {
      name: 'File System MCP',
      slug: 'filesystem-mcp',
      description: 'Read and write files on your local filesystem',
      npmPackage: '@modelcontextprotocol/server-filesystem',
      category: 'utilities',
      tags: ['filesystem', 'files', 'local'],
    },
  ];

  for (const mcpData of mcpServersData) {
    const server = await prisma.mCPServer.upsert({
      where: { slug: mcpData.slug },
      update: {},
      create: mcpData,
    });

    // Generate and update embedding using raw SQL
    const searchText = createSearchableText(mcpData);
    const embedding = await generateEmbedding(searchText);

    if (embedding.length > 0) {
      await prisma.$executeRaw`
        UPDATE mcp_servers
        SET embedding = ${`[${embedding.join(',')}]`}::vector
        WHERE id = ${server.id}
      `;
      console.log(`  ✓ Added embedding to ${mcpData.name}`);
    }
  }

  console.log('✅ Created sample MCP servers');

  // Sample workflows
  const workflowsData = [
    {
      name: 'Full Stack Feature',
      slug: 'full-stack-feature',
      description: 'Build a complete full-stack feature from database to UI',
      definition: {
        nodes: [
          { id: '1', type: 'start', data: { label: 'Start' } },
          { id: '2', type: 'command', data: { label: 'Create DB Schema' } },
          { id: '3', type: 'command', data: { label: 'Generate API' } },
          { id: '4', type: 'command', data: { label: 'Build UI' } },
          { id: '5', type: 'end', data: { label: 'End' } },
        ],
        edges: [
          { source: '1', target: '2' },
          { source: '2', target: '3' },
          { source: '3', target: '4' },
          { source: '4', target: '5' },
        ],
      },
      category: 'development',
      tags: ['full-stack', 'automation', 'workflow'],
      isPublic: true,
    },
  ];

  for (const workflowData of workflowsData) {
    const workflow = await prisma.workflow.upsert({
      where: { slug: workflowData.slug },
      update: {},
      create: {
        name: workflowData.name,
        slug: workflowData.slug,
        description: workflowData.description,
        definition: workflowData.definition,
        category: workflowData.category,
        tags: workflowData.tags,
        isPublic: workflowData.isPublic,
        user: {
          connect: { id: user.id },
        },
      },
    });

    // Generate and update embedding using raw SQL
    const searchText = createSearchableText(workflowData);
    const embedding = await generateEmbedding(searchText);

    if (embedding.length > 0) {
      await prisma.$executeRaw`
        UPDATE workflows
        SET embedding = ${`[${embedding.join(',')}]`}::vector
        WHERE id = ${workflow.id}
      `;
      console.log(`  ✓ Added embedding to ${workflowData.name}`);
    }
  }

  console.log('✅ Created sample workflows');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
