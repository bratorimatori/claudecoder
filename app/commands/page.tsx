import { getCommands } from "@/lib/db";
import Link from "next/link";

export default async function CommandsPage() {
  const commands = await getCommands({ limit: 50 });

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Slash Commands</h1>
          <p className="text-slate-300 text-lg">
            Discover powerful slash commands to enhance your Claude Code workflow
          </p>
        </header>

        {commands.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
            <p className="text-slate-400 text-lg mb-4">No commands found yet.</p>
            <p className="text-slate-500">Be the first to contribute a command!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commands.map((command) => (
              <Link
                key={command.id}
                href={`/commands/${command.slug}`}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  /{command.name}
                </h3>
                <p className="text-slate-400 mb-4 line-clamp-2">{command.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {command.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>↓ {command.installs}</span>
                  <span>♥ {command.likes}</span>
                  <span>👁 {command.views}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
