"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    // Add the user's new message immediately
    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: trimmedMessage,
      },
    ];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: data.error || "Something went wrong.",
          },
        ]);
      } else {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: data.response,
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Unable to connect to the AI service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            🤖 Chat with AI
          </h1>

          <p className="mt-3 text-gray-600">
            Ask questions and get help with your learning.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          {/* Chat messages */}
          <div className="mb-6 min-h-[400px] max-h-[600px] overflow-y-auto rounded-xl bg-gray-100 p-6">
            {messages.length === 0 && !loading && (
              <div className="flex min-h-[350px] items-center justify-center text-center text-gray-500">
                <div>
                  <div className="mb-3 text-5xl">🤖</div>

                  <p>
                    Hello! I&apos;m your LearnHub AI assistant.
                  </p>

                  <p className="mt-1">
                    Ask me anything about your studies.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
  className={
    msg.role === "user"
      ? "max-w-[80%] rounded-2xl bg-blue-600 px-5 py-4 text-white"
      : "max-w-[80%] rounded-2xl bg-white px-5 py-4 text-gray-900 shadow"
  }
>
                    <div
  className={
    msg.role === "user"
      ? "mb-2 font-semibold text-white"
      : "mb-2 font-semibold text-gray-900"
  }
>
                      {msg.role === "user"
                        ? "👤 You"
                        : "🤖 LearnHub AI"}
                    </div>

                    <p
  className={
    msg.role === "user"
      ? "whitespace-pre-wrap text-white"
      : "whitespace-pre-wrap text-gray-900"
  }
>
  {msg.content}
</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white px-5 py-4 shadow">
                    <p className="text-blue-600">
                      🤖 AI is thinking...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message form */}
          <form onSubmit={sendMessage} className="flex gap-3">
           <input
  type="text"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Ask LearnHub AI a question..."
  disabled={loading}
  className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 disabled:bg-gray-100"
/>
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          <div className="mt-6">
            <a
              href="/"
              className="font-semibold text-blue-600 hover:underline"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}