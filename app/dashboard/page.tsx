import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome to LearnHub 👋
            </h1>

            <p className="mt-2 text-gray-600">
              Welcome, {session.user.name || "Student"}!
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
            >
              Log out
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <Link
  href="/videos"
  className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
>
  <h2 className="text-xl font-bold">
    🎥 Videos
  </h2>

  <p className="mt-2 text-gray-600">
    Watch educational videos.
  </p>
</Link>

          <Link
  href="/notes"
  className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
>
  <h2 className="text-xl font-bold">
    📚 Notes
  </h2>

  <p className="mt-2 text-gray-600">
    Read PDFs and lecture notes.
  </p>
</Link>
          <Link
  href="/chat"
  className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
>
  <h2 className="text-xl font-bold">
    🤖 Chat with AI
  </h2>

  <p className="mt-2 text-gray-600">
    Ask questions and learn with AI.
  </p>
</Link>

        </div>
      </div>
    </main>
  );
}