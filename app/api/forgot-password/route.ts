import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    // Validate email
    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    /*
     * Do not reveal whether an email exists.
     */
    if (!user) {
      return NextResponse.json({
        message:
          "If an account with that email exists, a password reset link has been created.",
      });
    }

    /*
     * Delete previous reset tokens for this user.
     */
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    /*
     * Generate secure random token.
     */
    const token = randomBytes(32).toString("hex");

    /*
     * Token expires after 1 hour.
     */
    const expiresAt = new Date(
      Date.now() + 60 * 60 * 1000
    );

    /*
     * Save token in database.
     */
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    /*
     * Get application URL.
     */
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    /*
     * Create reset URL.
     */
    const resetUrl =
      `${baseUrl}/reset-password?token=${token}`;

    /*
     * Development/testing only.
     *
     * Later, before public release, this URL
     * should be sent to the user's email.
     */
    console.log("PASSWORD RESET URL:", resetUrl);

    return NextResponse.json({
      message:
        "If an account with that email exists, a password reset link has been created.",

      // Only return the URL during development.
      resetUrl:
        process.env.NODE_ENV === "development"
          ? resetUrl
          : undefined,
    });
  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}