import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config/env.js";
import { SYSTEM_PROMPT } from "../model/chatModel.js";

// --------- service: chat ----------
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getChatReply(userMessage) {
  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    // optional: tune these as needed
    max_tokens: 800,
    temperature: 0.2,
  });

  return completion?.choices?.[0]?.message?.content ?? "No reply from OpenAI.";
}