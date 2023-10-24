import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import prisma from "@/app/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      const data = await prisma.message.create({
        data: {
          answer: completion,
          question: messages.slice(-1)[0].content,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
