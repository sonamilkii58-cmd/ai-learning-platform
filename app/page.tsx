import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  const isLoggedIn = !!session?.user;

  const role = (
    session?.user as {
      role?: "STUDENT" | "ADMIN";
    } | undefined
  )?.role;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* =========================
          NAVIGATION BAR
      ========================== */}
      <nav className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="flex min-h-[72px] items-center justify-between">

            {/* LOGO */}
            <a
              href="/"
              className="flex items-center gap-2 whitespace-nowrap text-xl font-bold text-gray-900 hover:text-blue-600 sm:text-2xl"
            >
              🎓 LearnHub SonaMilkii
            </a>

            {/* =========================
                DESKTOP NAVIGATION
                Shows on tablets/desktops
            ========================== */}
            <div className="hidden items-center gap-5 md:flex">

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

              {isLoggedIn ? (
                <>
                  {/* ADMIN */}
                  {role === "ADMIN" && (
                    <a
                      href="/admin/users"
                      className="rounded-lg border border-purple-600 px-4 py-2 font-semibold text-purple-600 hover:bg-purple-50"
                    >
                      🛡️ Admin
                    </a>
                  )}

                  {/* DASHBOARD */}
                  <a
                    href="/dashboard"
                    className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    👤 Dashboard
                  </a>

                  {/* LOGOUT */}
                  <a
                    href="/api/auth/signout"
                    className="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </a>
                </>
              ) : (
                <>
                  {/* LOGIN */}
                  <a
                    href="/login"
                    className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </a>

                  {/* REGISTER */}
                  <a
                    href="/register"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Register
                  </a>
                </>
              )}
            </div>

            {/* =========================
                MOBILE MENU
                Shows only on phones
            ========================== */}
            <details className="relative md:hidden">

              <summary className="flex cursor-pointer list-none items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-2xl font-bold text-gray-800 shadow-sm hover:bg-gray-50">
                ☰
              </summary>

              <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">

                {/* MOBILE LINKS */}
                <div className="flex flex-col gap-2">

                  <a
                    href="/"
                    className="rounded-lg px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    🏠 Home
                  </a>

                  <a
                    href="/videos"
                    className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    🎥 Videos
                  </a>

                  <a
                    href="/notes"
                    className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    📚 Notes
                  </a>

                  <a
                    href="/chat"
                    className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    🤖 AI Chat
                  </a>

                  <div className="my-2 border-t border-gray-200" />

                  {isLoggedIn ? (
                    <>
                      {/* ADMIN */}
                      {role === "ADMIN" && (
                        <a
                          href="/admin/users"
                          className="rounded-lg bg-purple-50 px-4 py-3 font-semibold text-purple-700 hover:bg-purple-100"
                        >
                          🛡️ Admin Dashboard
                        </a>
                      )}

                      {/* DASHBOARD */}
                      <a
                        href="/dashboard"
                        className="rounded-lg border border-blue-600 px-4 py-3 text-center font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        👤 Dashboard
                      </a>

                      {/* LOGOUT */}
                      <a
                        href="/api/auth/signout"
                        className="rounded-lg bg-gray-100 px-4 py-3 text-center font-semibold text-gray-700 hover:bg-gray-200"
                      >
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
                      {/* LOGIN */}
                      <a
                        href="/login"
                        className="rounded-lg border border-blue-600 px-4 py-3 text-center font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        Login
                      </a>

                      {/* REGISTER */}
                      <a
                        href="/register"
                        className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
                      >
                        Register
                      </a>
                    </>
                  )}

                </div>
              </div>
            </details>

          </div>
        </div>
      </nav>

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center px-4 py-12 text-center sm:px-6">

        <div className="w-full max-w-4xl">

          <p className="mb-4 text-base font-semibold text-blue-600 sm:text-lg">
            Welcome to LearnHub
          </p>

          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            LearnHub SonaMilkii
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Learn through educational videos, study notes, and an
            AI-powered learning assistant.
          </p>

          {/* MAIN BUTTONS */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">

            <a
              href="/videos"
              className="w-full max-w-xs rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 sm:w-auto"
            >
              🎥 Watch Videos
            </a>

            <a
              href="/notes"
              className="w-full max-w-xs rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-green-700 sm:w-auto"
            >
              📚 View Notes
            </a>

            <a
              href="/chat"
              className="w-full max-w-xs rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-purple-700 sm:w-auto"
            >
              🤖 Chat with AI
            </a>

          </div>

          {/* FEATURE CARDS */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {/* VIDEOS */}
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

            {/* NOTES */}
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