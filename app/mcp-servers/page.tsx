import { getMCPServers } from "@/lib/db";
import Link from "next/link";

export default async function MCPServersPage() {
  const servers = await getMCPServers({ limit: 50 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12">
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">MCP Servers</h1>
          <p className="text-slate-300 text-lg">
            Extend Claude's capabilities with Model Context Protocol servers
          </p>
        </header>

        {servers.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
            <p className="text-slate-400 text-lg mb-4">No MCP servers found yet.</p>
            <p className="text-slate-500">Be the first to contribute an MCP server!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.map((server) => (
              <Link
                key={server.id}
                href={`/mcp-servers/${server.slug}`}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {server.name}
                </h3>
                <p className="text-slate-400 mb-4 line-clamp-2">{server.description}</p>

                {server.npmPackage && (
                  <code className="block text-xs bg-slate-950 text-indigo-300 px-3 py-2 rounded mb-4 font-mono">
                    {server.npmPackage}
                  </code>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {server.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>↓ {server.installs}</span>
                  <span>♥ {server.likes}</span>
                  <span>👁 {server.views}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
