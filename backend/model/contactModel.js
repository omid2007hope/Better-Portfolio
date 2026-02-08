// --------- model: contact ----------
export function parseContactRequest(body) {
  const { name, email, subject, message } = body || {};

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  return { name, email, subject, message };
}