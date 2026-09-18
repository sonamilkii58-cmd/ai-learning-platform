"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type NavbarProps = {
  isLoggedIn: boolean;
  role?: "STUDENT" | "ADMIN";
};

export default function Navbar({
  isLoggedIn,
  role,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 text-xl font-bold text-gray-900 hover:text-blue-600 sm:text-2xl"
          >
            🎓 LearnHub SonaMilkii
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-5 md:flex">
            <Link
              href="/"
              className="font-semibold text-blue-600 hover:text-blue-800"
            >
              Home
            </Link>

            <Link
              href="/videos"
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              Videos
            </Link>

            <Link
              href="/notes"
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              Notes
            </Link>

            <Link
              href="/chat"
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              🤖 AI Chat
            </Link>

            {isLoggedIn ? (
              <>
                {role === "ADMIN" && (
                  <Link
                    href="/admin/users"
                    className="rounded-lg border border-purple-600 px-4 py-2 font-semibold text-purple-600 hover:bg-purple-50"
                  >
                    🛡️ Admin
                  </Link>
                )}

                <Link
                  href="/dashboard"
                  className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  👤 Dashboard
                </Link>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-2xl text-gray-800 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-semibold text-blue-600 hover:bg-gray-100"
              >
                Home
              </Link>

              <Link
                href="/videos"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
              >
                🎥 Videos
              </Link>

              <Link
                href="/notes"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
              >
                📚 Notes
              </Link>

              <Link
                href="/chat"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
              >
                🤖 AI Chat
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg border border-blue-600 px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    👤 Dashboard
                  </Link>

                  {role === "ADMIN" && (
                    <Link
                      href="/admin/users"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg border border-purple-600 px-4 py-3 font-semibold text-purple-600 hover:bg-purple-50"
                    >
                      🛡️ Admin
                    </Link>
                  )}

                  <div className="pt-2">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg border border-blue-600 px-4 py-3 text-center font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}