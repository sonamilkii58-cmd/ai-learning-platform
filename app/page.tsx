import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  const isLoggedIn = !!session?.user;

  const role = (
    session?.user as {
      role?: "STUDENT" | "ADMIN";
    } | undefined
  )?.role;

  // Logout action
  async function handleLogout() {
    "use server";

    await signOut({
      redirectTo: "/",
    });
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navigation Bar */}
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600"
          >
            🎓 LearnHub SonaMilkii
          </a>

          {/* Navigation */}
          <div className="flex items-center gap-6">

            <a
              href="/"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Home
            </a>

            <a
              href="/videos"
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              Videos
            </a>

            <a
              href="/notes"
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              Notes
            </a>

            <a
              href="/chat"
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              🤖 AI Chat
            </a>

            {/* Logged-in user */}
            {isLoggedIn ? (
              <>
                {/* Admin */}
                {role === "ADMIN" && (
                  <a
                    href="/admin/users"
                    className="rounded-lg border border-purple-600 px-4 py-2 font-semibold text-purple-600 hover:bg-purple-50"
                  >
                    🛡️ Admin
                  </a>
                )}

                {/* Dashboard */}
                <a
                  href="/dashboard"
                  className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  👤 Dashboard
                </a>

                {/* Logout */}
                <form action={handleLogout}>
                  <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
                  >
                    🚪 Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Login */}
                <a
                  href="/login"
                  className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  Login
                </a>

                {/* Register */}
                <a
                  href="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Register
                </a>
              </>
            )}

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-6 text-center">

        <div className="max-w-4xl">

          <p className="mb-4 text-lg font-semibold text-blue-600">
            Welcome to LearnHub
          </p>

          <h1 className="text-5xl font-bold text-gray-900 md:text-6xl">
            LearnHub SonaMilkii
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Learn through educational videos, study notes, and an
            AI-powered learning assistant.
          </p>

          {/* Main Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <a
              href="/videos"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              🎥 Watch Videos
            </a>

            <a
              href="/notes"
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-green-700"
            >
              📚 View Notes
            </a>

            <a
              href="/chat"
              className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-purple-700"
            >
              🤖 Chat with AI
            </a>

          </div>

          {/* Feature Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {/* Videos */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-4xl">
                🎥
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                Educational Videos
              </h2>

              <p className="mt-2 text-gray-600">
                Learn from carefully selected educational videos.
              </p>
            </div>

            {/* Notes */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-4xl">
                📚
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                Study Notes
              </h2>

              <p className="mt-2 text-gray-600">
                Access useful PDF notes and learning materials.
              </p>
            </div>

            {/* AI */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-4xl">
                🤖
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                AI Learning Assistant
              </h2>

              <p className="mt-2 text-gray-600">
                Ask questions and get help with your studies.
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}