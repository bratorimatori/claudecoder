# ClaudeCoder Directory

A directory site for Claude Code commands, MCP servers, and workflows with a visual workflow builder and AI-powered features.

## Features

- **Browse & Search**: Discover Claude Code slash commands and MCP servers
- **Workflow Builder**: Visual drag-and-drop workflow creation with React Flow
- **AI Generation**: AI-powered command generation (rate-limited)
- **One-click Install**: Easy installation scripts for commands and servers
- **Analytics**: Track usage and performance metrics

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with pgvector (Supabase)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Typography**: Outfit (headings) + JetBrains Mono (code)
- **Workflow**: React Flow (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for local PostgreSQL with pgvector)
- OpenAI API key (for semantic search embeddings - optional)
- Anthropic API key (for AI features - optional)

### Local Development Setup

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/claudecoder.git
cd claudecoder
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start PostgreSQL with pgvector (Docker):**
```bash
docker run -d \
  --name claudecoder-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=claudecoder \
  -p 5432:5432 \
  ankane/pgvector:latest
```

**4. Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```bash
# Database (Local Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/claudecoder?schema=public"

# Optional: OpenAI API key for semantic search
OPENAI_API_KEY="sk-..."

# Optional: Anthropic API key for AI generation
ANTHROPIC_API_KEY="sk-ant-..."

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**5. Run database migrations:**
```bash
npx prisma migrate dev --name init
```

**6. Seed the database with sample data:**
```bash
npm run seed
```

**7. Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or check the terminal for the actual port).

### Production Setup (Neon/Supabase)

For production, use a managed PostgreSQL service:

**Option 1: Neon (Recommended)**
1. Sign up at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Update `.env`: `DATABASE_URL="postgresql://..."`
5. Run migrations: `npx prisma migrate deploy`

**Option 2: Supabase**
1. Sign up at https://supabase.com
2. Create a new project
3. Enable pgvector extension in SQL editor:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
4. Copy the connection string from Project Settings → Database
5. Update `.env`: `DATABASE_URL="postgresql://..."`
6. Run migrations: `npx prisma migrate deploy`

## Database Schema

The application uses the following main tables:

- `users` - User accounts
- `commands` - Claude Code slash commands
- `mcp_servers` - Model Context Protocol servers
- `workflows` - Visual workflow definitions
- `usage_analytics` - Usage tracking
- `rate_limits` - API rate limiting

All resource tables include pgvector embeddings for AI-powered semantic search.

## Project Structure

```
claudecoder/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── commands/          # Commands listing & detail pages
│   ├── mcp-servers/       # MCP servers listing & detail pages
│   ├── workflows/         # Workflows & builder pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Shared React components
├── lib/                   # Utility functions
│   ├── db.ts             # Database helper functions
│   └── prisma.ts         # Prisma client setup
├── prisma/               # Database schema & migrations
│   └── schema.prisma     # Prisma schema definition
└── public/               # Static assets
```

## API Endpoints

### Semantic Search
```bash
# Search all resources
GET /api/search?q=git&type=all

# Search commands only
GET /api/search?q=debugging&type=commands

# Search with filters
GET /api/search?q=typescript&type=commands&category=debugging&limit=5
```

### Parameters
- `q` (required): Search query
- `type`: `all`, `commands`, `mcp-servers`, or `workflows`
- `category`: Filter by category
- `tags`: Comma-separated tags
- `limit`: Number of results (default: 10)

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run seed             # Seed database with sample data
npx prisma studio        # Open Prisma Studio (database GUI)
npx prisma generate      # Regenerate Prisma client
npx prisma migrate dev   # Create and apply migration

# Docker
docker ps                              # Check running containers
docker restart claudecoder-postgres    # Restart database
docker stop claudecoder-postgres       # Stop database
docker start claudecoder-postgres      # Start database
docker logs claudecoder-postgres       # View database logs
```

## Semantic Search Implementation

This project implements AI-powered semantic search using:

- **pgvector**: PostgreSQL extension for vector similarity search
- **OpenAI embeddings**: text-embedding-3-small model (~$0.00002 per 1K tokens)
- **Fallback**: Basic text search when OpenAI API key not configured

### How it works:
1. When content is created, it's converted to a vector embedding
2. Search queries are also converted to embeddings
3. Vector similarity (cosine distance) finds semantically similar content
4. Results ranked by relevance, not just keyword matching

### Example:
```
Query: "save my work"
Finds: "git commit", "backup files", "checkpoint progress"
```

## Rate Limiting (Free Tier)

- AI command generation: 3/month
- AI chat: 10/month
- Workflow creation: 2/month

Budget cap: $20/month maximum

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
