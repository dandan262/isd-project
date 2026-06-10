import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { Content } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let currentId = conversationId;
    let history: Content[] = [];

    if (currentId) {
      const previousMessages = await prisma.message.findMany({
        where: { conversationId: currentId },
        orderBy: { createdAt: "asc" },
        take: 20,
      });

      history = previousMessages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));
    } else {
      const newConversation = await prisma.conversation.create({
        data: { title: message.substring(0, 50) },
      });
      currentId = newConversation.id;
    }

    await prisma.message.create({
      data: {
        content: message,
        role: "user",
        conversationId: currentId,
      },
    });

    const chatSession = geminiModel.startChat({
      history: history,
    });

    const result = await chatSession.sendMessage(message);
    const aiResponse = result.response.text();

    await prisma.message.create({
      data: {
        content: aiResponse,
        role: "model",
        conversationId: currentId,
      },
    });

    return NextResponse.json({
      role: "model",
      content: aiResponse,
      conversationId: currentId,
    });

  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}