import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModelName = "gemini-1.5-flash";

export function getGeminiModel() {
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const genAI = new GoogleGenerativeAI(geminiApiKey);

  return genAI.getGenerativeModel({
    model: geminiModelName,
  });
}

export function getGeminiModelName() {
  return geminiModelName;
}