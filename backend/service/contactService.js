import nodemailer from "nodemailer";
import {
  CONTACT_TO,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
  canSendMail,
} from "../config/env.js";

// --------- service: contact ----------
const mailer = canSendMail
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

export function isMailConfigured() {
  return Boolean(mailer);
}

export async function sendContactEmail({ name, email, subject, message }) {
  if (!mailer) {
    throw new Error("Contact service not configured on server.");
  }

  await mailer.sendMail({
    from: `"${name}" <${SMTP_USER}>`,
    replyTo: email,
    to: CONTACT_TO,
    subject: subject.slice(0, 140),
    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

${message}
    `.trim(),
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });
}