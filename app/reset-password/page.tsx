"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing password reset token.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to reset password.");
        return;
      }

      setMessage(
        "Password reset successfully. You can now log in."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("RESET PASSWORD ERROR:", error);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Heading */}
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Reset Password
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Create a new password for your LearnHub account.
        </p>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="mb-5 rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {/* No Token */}
        {!token ? (
          <div className="text-center">
            <p className="mb-6 text-gray-600">
              This password reset link is invalid or missing a token.
            </p>

            <a
              href="/forgot-password"
              className="font-semibold text-blue-600 hover:underline"
            >
              Request a new reset link
            </a>
          </div>
        ) : (
          /* Reset Form */
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-900"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}
            </button>
          </form>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm font-semibold text-gray-600 hover:text-blue-600"
          >
            ← Back to Login
          </a>
        </div>

      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="font-semibold text-gray-700">
              Loading...
            </p>
          </div>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}