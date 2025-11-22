# ClaudeCoder Directory - Project Plan

## Project Overview
Building a directory site for Claude Code commands, MCP servers, and workflows.
- Domain: claudecoder.directory
- Differentiator: Workflow builder + AI features
- GitHub: claudecoder-directory

## Tech Stack (Zero-Cost MVP)
- Next.js 14 (Vercel free tier)
- PostgreSQL with pgvector (Supabase free tier)
- React Flow (workflow builder)
- Anthropic Claude API ($5-15/month with rate limiting)
- OpenAI embeddings (negligible cost)

## Key Features
1. Browse/search commands and MCP servers
2. Visual workflow builder (drag-drop with React Flow)
3. AI command generation (rate limited: 3/month free)
4. One-click install scripts
5. Performance analytics

## Database Schema
[Include the key tables: commands, workflows, mcp_servers, users, usage_analytics]

## Workflow Builder
- Use React Flow library
- Custom node types: CommandNode, StartNode, EndNode, ConditionalNode
- Save as JSON (nodes + edges)
- Export as bash script

## Rate Limiting Strategy
Free tier: 3 commands, 10 chats, 2 workflows per month
Budget cap: $20/month maximum

## Next Steps
1. Create GitHub repo: claudecoder
2. Initialize Next.js with TypeScript
3. Set up basic structure
4. Build command listing page
5. Add workflow builder
6. Implement AI features with rate limiting