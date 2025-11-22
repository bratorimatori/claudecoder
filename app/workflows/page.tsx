import { getWorkflows } from "@/lib/db";
import Link from "next/link";

export default async function WorkflowsPage() {
  const workflows = await getWorkflows({ limit: 50 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-emerald-400 hover:text-emerald-300">
              ← Back to Home
            </Link>
            <Link
              href="/workflows/create"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
            >
              Create Workflow
            </Link>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Workflows</h1>
          <p className="text-slate-300 text-lg">
            Build and share visual workflows with our drag-and-drop builder
          </p>
        </header>

        {workflows.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
            <p className="text-slate-400 text-lg mb-4">No workflows found yet.</p>
            <p className="text-slate-500 mb-6">Be the first to create a workflow!</p>
            <Link
              href="/workflows/create"
              className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
            >
              Create Your First Workflow
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <Link
                key={workflow.id}
                href={`/workflows/${workflow.slug}`}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {workflow.name}
                </h3>
                <p className="text-slate-400 mb-3 line-clamp-2">{workflow.description}</p>

                {workflow.user && (
                  <p className="text-sm text-slate-500 mb-4">
                    by {workflow.user.name || workflow.user.email}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {workflow.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>↓ {workflow.installs}</span>
                  <span>♥ {workflow.likes}</span>
                  <span>👁 {workflow.views}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
