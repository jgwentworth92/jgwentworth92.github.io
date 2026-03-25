export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-sans">
      <div className="text-center space-y-6 px-8">
        <h1 className="text-5xl font-bold tracking-tight">
          jgwentworth92
        </h1>
        <p className="text-xl text-zinc-400 max-w-md mx-auto">
          Portfolio coming soon. Currently under construction.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <a
            href="https://github.com/jgwentworth92"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
