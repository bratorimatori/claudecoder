export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#0A0A0A] mt-20">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h3 className="text-white font-bold mb-2">ClaudeCoder Directory</h3>
            <p className="text-neutral-500 text-sm max-w-md">
              Community-driven directory for Claude Code commands, MCP servers, and workflows.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Resources</h4>
              <div className="flex flex-col gap-2 text-sm text-neutral-400">
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Community</h4>
              <div className="flex flex-col gap-2 text-sm text-neutral-400">
                <a href="#" className="hover:text-white transition-colors">
                  Discord
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Contribute
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-xs">
            © 2024 ClaudeCoder Directory. Open source project.
          </p>
        </div>
      </div>
    </footer>
  );
}
