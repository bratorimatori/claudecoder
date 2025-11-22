import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { Terminal, Plug, Workflow } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section with Logo */}
        <div className="mb-12 text-center">
          {/* Claude AI Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/claude-logo.png"
              alt="Claude AI"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>

          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            Claude Code Directory
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
            Discover and share commands, MCP servers, and workflows for Claude Code.
            Community-driven automation for developers.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <Link
            href="/commands"
            className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-bold text-white group-hover:text-neutral-200">
                Commands
              </h2>
              <Terminal className="w-6 h-6 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Browse slash commands and automation scripts
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">3 commands</span>
            </div>
          </Link>

          <Link
            href="/mcp-servers"
            className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-bold text-white group-hover:text-neutral-200">
                MCP Servers
              </h2>
              <Plug className="w-6 h-6 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Model Context Protocol integrations
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">2 servers</span>
            </div>
          </Link>

          <Link
            href="/workflows"
            className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-bold text-white group-hover:text-neutral-200">
                Workflows
              </h2>
              <Workflow className="w-6 h-6 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            </div>
            <p className="text-sm text-neutral-500 mb-4">
              Visual automation pipelines
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">1 workflow</span>
            </div>
          </Link>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Commands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">/git-commit</h3>
                <span className="text-xs text-neutral-500">git</span>
              </div>
              <p className="text-sm text-neutral-400 mb-3">
                Automatically create git commits with AI-generated messages
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">git</span>
                <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">automation</span>
                <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">ai</span>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">/debug-typescript</h3>
                <span className="text-xs text-neutral-500">debugging</span>
              </div>
              <p className="text-sm text-neutral-400 mb-3">
                Debug TypeScript errors with AI assistance
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">typescript</span>
                <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">debugging</span>
                <span className="px-2 py-1 text-xs bg-neutral-800 text-neutral-400 rounded">ai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex gap-8 text-sm text-neutral-500">
            <div>
              <span className="font-semibold text-white">3</span> Commands
            </div>
            <div>
              <span className="font-semibold text-white">2</span> MCP Servers
            </div>
            <div>
              <span className="font-semibold text-white">1</span> Workflow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
