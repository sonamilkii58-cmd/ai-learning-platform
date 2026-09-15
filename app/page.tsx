export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          LearnHub SonaMilkii
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Learn through videos, notes, and an AI-powered learning assistant.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/videos"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Watch Videos
          </a>

          <a
            href="/notes"
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            View Notes
          </a>

          <a
  href="/chat"
  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
>
  🤖 Chat with AI
</a>
        </div>
      </section>
    </main>
  );
}