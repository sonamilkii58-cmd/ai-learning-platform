import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  // User must be logged in
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  // Check ADMIN role
  const role = (
    session.user as {
      role?: "STUDENT" | "ADMIN";
    }
  ).role;

  if (role !== "ADMIN") {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 }
    );
  }

  try {
    const { id } = await params;

    // Prevent an administrator from deleting their own account
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // For safety, don't allow deleting another ADMIN from this page.
    if (user.role === "ADMIN") {
      return NextResponse.json(
        { error: "Admin accounts cannot be deleted from this page." },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete user." },
      { status: 500 }
    );
  }
}