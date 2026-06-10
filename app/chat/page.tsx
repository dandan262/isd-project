interface Message {
  role: "user" | "model"; // <--- Ganti "assistant" menjadi "model"
  content: string;
}