"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setResetUrl("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setMessage(
        data.message ||
          "If an account with that email exists, a password reset link has been created."
      );

      // Development/testing:
      // Show the reset URL returned by the API.
      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }
    } catch (error) {
      console.error("FORGOT PASSWORD ERROR:", error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Forgot Password?
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Enter your email address to reset your LearnHub password.
        </p>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mt-6 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Development Reset Link */}
        {resetUrl && (
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">

            <p className="text-sm font-semibold text-blue-900">
              Password reset link:
            </p>

            <a
              href={resetUrl}
              className="mt-2 block break-all text-sm font-medium text-blue-600 underline hover:text-blue-800"
            >
              {resetUrl}
            </a>

            <p className="mt-3 text-xs text-gray-600">
              Development/testing link. Before public release, this link
              should be sent to the user&apos;s email instead of displaying
              the reset token on this page.
            </p>

          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-gray-600 hover:text-blue-600"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}