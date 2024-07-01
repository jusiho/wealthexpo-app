import { openai } from "@ai-sdk/openai";
import { StreamingTextResponse, streamText, StreamData } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { question, context } = await req.json();

  // http://195.200.5.98:8000/api/chat
  const response = await fetch(`${process.env.API_CHAT_BOT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      context,
      collection_name: "wealthexpo",
    }),
  });

  const data = await response.json();

  return NextResponse.json(data, { status: 200 });
}
