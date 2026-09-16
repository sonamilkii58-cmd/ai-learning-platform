import { auth } from "@/auth";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 }
      );
    }

    const validMessages: ChatMessage[] = messages.filter(
      (msg: unknown): msg is ChatMessage =>
        typeof msg === "object" &&
        msg !== null &&
        "role" in msg &&
        "content" in msg &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string"
    );

    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages were provided." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      input: [
        {
          role: "system",
          content:
            "You are LearnHub AI, an educational assistant. Help students understand programming, information science, mathematics, technology, and other academic topics. Explain concepts clearly and simply. Pay attention to the previous conversation so you can answer follow-up questions with context.",
        },

        ...validMessages,
      ],
    });

    return NextResponse.json({
      response: response.output_text,
    });
  } catch (error) {
    console.error("AI error:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to the AI service.",
      },
      { status: 500 }
    );
  }
}