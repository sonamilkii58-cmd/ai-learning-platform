"use client";

import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

type Video = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  duration: string | null;
  category: Category;
  uploadedBy: {
    id: string;
    name: string;
  };
  createdAt: string;
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/videos");

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();

        setVideos(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load videos.");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">🎥 Videos</h1>

          <p className="mt-4 text-gray-600">
            Loading videos...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">🎥 Videos</h1>

          <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            🎥 Educational Videos
          </h1>

          <p className="mt-2 text-gray-600">
            Learn from our collection of educational videos.
          </p>
        </div>

        {/* No videos */}
        {videos.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <div className="text-5xl">🎬</div>

            <h2 className="mt-4 text-2xl font-bold">
              No videos available
            </h2>

            <p className="mt-2 text-gray-500">
              Videos will appear here when an administrator
              uploads them.
            </p>
          </div>
        ) : (
          /* Videos Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200">
                  {video.thumbnailUrl ? (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      🎥
                    </div>
                  )}

                  {video.duration && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Information */}
                <div className="p-5">

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {video.category.name}
                  </span>

                  <h2 className="mt-3 text-xl font-bold text-gray-900">
                    {video.title}
                  </h2>

                  {video.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {video.description}
                    </p>
                  )}

                  <p className="mt-3 text-xs text-gray-500">
                    Uploaded by {video.uploadedBy.name}
                  </p>

                  {/* Watch button */}
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    ▶ Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back */}
        <div className="mt-8">
          <a
            href="/dashboard"
            className="font-semibold text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}