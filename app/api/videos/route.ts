import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all videos
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      include: {
        category: true,
        uploadedBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("GET VIDEOS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}