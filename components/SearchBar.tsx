"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  type: "command" | "mcpServer" | "workflow";
  similarity?: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&type=all&limit=6`
        );
        const data = await response.json();

        // Combine all results
        const allResults: SearchResult[] = [
          ...(data.commands || []).map((cmd: any) => ({
            ...cmd,
            type: "command" as const,
          })),
          ...(data.mcpServers || []).map((server: any) => ({
            ...server,
            type: "mcpServer" as const,
          })),
          ...(data.workflows || []).map((wf: any) => ({
            ...wf,
            type: "workflow" as const,
          })),
        ];

        // Sort by similarity if available
        allResults.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));

        setResults(allResults.slice(0, 6));
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "command":
        return "Command";
      case "mcpServer":
        return "MCP Server";
      case "workflow":
        return "Workflow";
      default:
        return type;
    }
  };

  const getTypeLink = (type: string, slug: string) => {
    switch (type) {
      case "command":
        return `/commands/${slug}`;
      case "mcpServer":
        return `/mcp-servers/${slug}`;
      case "workflow":
        return `/workflows/${slug}`;
      default:
        return "#";
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          placeholder="Search commands, MCP servers, workflows..."
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
        />
        <div className="absolute right-3 top-3.5 text-neutral-500">
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-neutral-600 border-t-white rounded-full"></div>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden z-50">
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={getTypeLink(result.type, result.slug)}
              onClick={() => setShowResults(false)}
              className="block px-4 py-3 hover:bg-neutral-800 transition-colors border-b border-neutral-800 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-white text-sm">
                  {result.name}
                </h4>
                <span className="text-xs text-neutral-500 ml-2">
                  {getTypeLabel(result.type)}
                </span>
              </div>
              <p className="text-xs text-neutral-400 line-clamp-1">
                {result.description}
              </p>
              <div className="mt-1 text-xs text-neutral-600">
                {result.category}
              </div>
            </Link>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && query.length >= 2 && !isLoading && (
        <div className="absolute top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl p-4 z-50">
          <p className="text-neutral-400 text-sm">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
