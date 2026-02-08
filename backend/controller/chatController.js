import { parseChatRequest } from "../model/chatModel.js";
import { getChatReply } from "../service/chatService.js";

// --------- controller: chat ----------
export async function chatHandler(req, res) {
  const { userMessage, error } = parseChatRequest(req.body);

  if (error) {
    return res.status(400).json({ reply: error });
  }

  try {
    const reply = await getChatReply(userMessage);
    return res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err?.message ?? err);
    return res.status(500).json({ reply: "Server error." });
  }
}