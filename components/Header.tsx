import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed z-20 top-0 px-6 py-2 w-full bg-background backdrop-filter backdrop-blur-sm bg-opacity-30">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-medium font-mono text-sm text-white">
          claudecoder.directory
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/commands"
            className="flex items-center gap-2 text-sm font-medium text-[#878787] hover:text-white transition-colors"
          >
            Commands
          </Link>
          <Link
            href="/mcp-servers"
            className="flex items-center gap-2 text-sm font-medium text-[#878787] hover:text-white transition-colors"
          >
            MCPs
          </Link>
          <Link
            href="/workflows"
            className="flex items-center gap-2 text-sm font-medium text-[#878787] hover:text-white transition-colors"
          >
            Workflows
          </Link>
        </div>
      </div>
    </header>
  );
}
