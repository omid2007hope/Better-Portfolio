import { parseContactRequest } from "../model/contactModel.js";
import {
  isMailConfigured,
  sendContactEmail,
} from "../service/contactService.js";

// --------- controller: contact ----------
export async function contactHandler(req, res) {
  const { name, email, subject, message, error } = parseContactRequest(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  if (!isMailConfigured()) {
    return res
      .status(500)
      .json({ message: "Contact service not configured on server." });
  }

  try {
    await sendContactEmail({ name, email, subject, message });
    return res.json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact send error:", err?.message || err);
    return res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
}