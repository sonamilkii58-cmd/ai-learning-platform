import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ========================================
// GET MY FAVORITES
// ========================================

export async function GET() {
  try {
    const session = await auth();

    // Check if user is logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    // Get all favorites belonging to the logged-in user
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        video: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("GET favorites error:", error);

    return NextResponse.json(
      { error: "Failed to get favorites." },
      { status: 500 }
    );
  }
}

// ========================================
// ADD FAVORITE
// ========================================

export async function POST(request: Request) {
  try {
    const session = await auth();

    // Check if user is logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const videoId = body?.videoId;

    // Check videoId
    if (!videoId || typeof videoId !== "string") {
      return NextResponse.json(
        { error: "videoId is required." },
        { status: 400 }
      );
    }

    // Check that the video exists
    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      return NextResponse.json(
        { error: "Video not found." },
        { status: 404 }
      );
    }

    // Create the favorite
    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        videoId: videoId,
      },
      include: {
        video: true,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error: unknown) {
    console.error("POST favorite error:", error);

    return NextResponse.json(
      { error: "Failed to add favorite." },
      { status: 500 }
    );
  }
}

// ========================================
// REMOVE FAVORITE
// ========================================

export async function DELETE(request: Request) {
  try {
    const session = await auth();

    // Check if user is logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const videoId = body?.videoId;

    // Check videoId
    if (!videoId || typeof videoId !== "string") {
      return NextResponse.json(
        { error: "videoId is required." },
        { status: 400 }
      );
    }

    // Find the user's favorite
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_videoId: {
          userId: session.user.id,
          videoId: videoId,
        },
      },
    });

    if (!favorite) {
      return NextResponse.json(
        { error: "Favorite not found." },
        { status: 404 }
      );
    }

    // Delete the favorite
    await prisma.favorite.delete({
      where: {
        userId_videoId: {
          userId: session.user.id,
          videoId: videoId,
        },
      },
    });

    return NextResponse.json({
      message: "Favorite removed successfully.",
    });
  } catch (error) {
    console.error("DELETE favorite error:", error);

    return NextResponse.json(
      { error: "Failed to remove favorite." },
      { status: 500 }
    );
  }
}