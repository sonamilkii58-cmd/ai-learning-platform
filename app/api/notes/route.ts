import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  try {
    const notes = await prisma.note.findMany({
      include: {
        category: true,
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);

    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}