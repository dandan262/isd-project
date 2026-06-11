import { NextResponse } from "next/server";
import { getGeminiModel, getGeminiModelName } from "@/lib/gemini";

type GeminiRequestBody = {
  prompt?: string;
};

export async function POST(request: Request) {
  let body: GeminiRequestBody;

  try {
    body = (await request.json()) as GeminiRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Request body harus JSON yang valid." },
      { status: 400 },
    );
  }

  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json(
      { error: "Field prompt wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);

    return NextResponse.json({
      model: getGeminiModelName(),
      text: result.response.text(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal memproses request Gemini.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Gemini route siap.",
    model: getGeminiModelName(),
  });
}
