import { NextRequest, NextResponse } from 'next/server';
import {
  searchCommandsByEmbedding,
  searchMCPServersByEmbedding,
  searchWorkflowsByEmbedding,
} from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const type = searchParams.get('type') || 'all'; // all, commands, mcp-servers, workflows
  const category = searchParams.get('category') || undefined;
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || undefined;
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  try {
    const results: any = {
      query,
      timestamp: new Date().toISOString(),
    };

    if (type === 'all' || type === 'commands') {
      results.commands = await searchCommandsByEmbedding(query, {
        limit,
        category,
        tags,
      });
    }

    if (type === 'all' || type === 'mcp-servers') {
      results.mcpServers = await searchMCPServersByEmbedding(query, {
        limit,
        category,
        tags,
      });
    }

    if (type === 'all' || type === 'workflows') {
      results.workflows = await searchWorkflowsByEmbedding(query, {
        limit,
        category,
        tags,
        publicOnly: true,
      });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
