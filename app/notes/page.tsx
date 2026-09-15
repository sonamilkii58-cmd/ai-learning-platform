"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize?: number | null;
  category: {
    name: string;
  };
  uploadedBy: {
    name: string | null;
  };
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("/api/notes");

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            📚 Study Notes
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Access educational PDF and PowerPoint notes.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-600">
              Loading notes...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && notes.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-xl text-gray-600">
              No notes available yet.
            </p>
          </div>
        )}

        {/* Notes */}
        {!loading && notes.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {notes.map((note) => (
              <div
                key={note.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >

                {/* File Icon */}
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                  <span className="text-7xl">
                    {note.fileType === "PDF" ? "📕" : "📊"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Category */}
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    {note.category.name}
                  </span>

                  {/* Title */}
                  <h2 className="mt-4 text-xl font-bold text-gray-900">
                    {note.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 line-clamp-3 text-gray-600">
                    {note.description ||
                      "Educational study material for students."}
                  </p>

                  {/* File name */}
                  <p className="mt-4 text-sm text-gray-500">
                    📄 {note.fileName}
                  </p>

                  {/* Uploaded by */}
                  <p className="mt-2 text-sm text-gray-500">
                    Uploaded by{" "}
                    {note.uploadedBy.name || "LearnHub Admin"}
                  </p>

                  {/* Button */}
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    📖 Open Note
                  </a>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* Back */}
        <div className="mt-10">
          <a
            href="/dashboard"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            ← Back to Dashboard
          </a>
        </div>

      </div>
    </main>
  );
}