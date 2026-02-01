import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

// --------- file / env setup ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load base .env then override with .env.local (if present)
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, ".env.local"), override: true });

// --------- basic validation ----------
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error(
    "Missing OPENAI_API_KEY in environment. Set it in .env or .env.local",
  );
  process.exit(1);
}

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO = process.env.CONTACT_TO || SMTP_USER;
const canSendMail = SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO;

// --------- app & client ----------
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true, // set CORS_ORIGIN in env if you want to restrict
  }),
);

const client = new OpenAI({ apiKey: OPENAI_API_KEY });
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

// Put large system prompt in a constant for readability
const SYSTEM_PROMPT = `You are Omid's AI assistant.
Answer ONLY questions related to:
• Omid Teimory’s background
• His coding skills
• His tech stack
• His projects
• His professional plans
• His freelancing
• His deployment/server work
• His career development
Be clear, direct, and helpful.

FULL CAREER OVERVIEW (OMID TEIMORY)

IDENTITY
• Omid Teimory — 18 years old — Iranian-born — living in Austria.
• Self-taught developer building a full-stack career from zero.

CORE ROLE
• Frontend Web Developer → aspiring Full-Stack Engineer.

TECH SKILLS
• HTML, CSS, JavaScript
• React.js, Tailwind CSS
• React Router DOM
• Redux
• Git/GitHub
• Learning backend: Node.js, APIs, Databases
• Deployment: Ubuntu server, Nginx, SSH, Git workflows
• UI/UX Design with Figma
• Adobe Illustrator (basic logo & branding work)

MAJOR PROJECTS
1. Portfolio Website
   - React + Tailwind
   - Deployed on Ubuntu server (Nginx)
   - Hosted in /var/www/portfolio
   - Regular updates using git pull → npm build → restart nginx.

2. Velora E-commerce Web App
   - Full product pages
   - Dynamic cart logic (shipping, tax, totals)
   - Checkout flow
   - Login + Register popups
   - Google Sign-In
   - LocalStorage user persistence
   - Apple Pay UI placeholder
   - Tailwind responsive UI
   - Advanced frontend UX (forms, modals, toggles, read-only states).


SERVER / DEVOPS
• Works with Ubuntu 22.04 VPS
• Uses Nginx for deployments
• Familiar with logs, file directories, restarts
• Uses commands: git pull, npm install, npm run build, cp builds, systemctl restart nginx.

FREELANCING & PROFESSIONAL PATH
• Active on Upwork
• Developing a strong LinkedIn presence.

SOCIAL MEDIA (RELATED TO CAREER)
• Strong Twitter/X presence among U.S. veterans, Marines, patriots, and tech-minded followers.

CURRENT CAREER PHASE
• Get first Austrian developer job

LONG-TERM PLAN
Phase 1 (2025–2026): Become a full-stack developer in Austria, build portfolio, get job.
Phase 2 (2026–2027): Gain 1–2 years experience, strong GitHub/LinkedIn, save €1k/mo.
Phase 3 (2027–2029): Get U.S. job sponsorship (H-1B, L-1, EB-3, EB-2 NIW).
Phase 4 (2028–2030): Move to U.S. → Join U.S. Marine Corps.
Phase 5: Gain U.S. citizenship through service.
Phase 6: Attempt entry into Special Operations (MARSOC / SEALs / Rangers).

SUMMARY
Omid is a rising full-stack developer specializing in React + Tailwind + modern frontend engineering, building a full professional portfolio, deploying on Linux servers, growing a freelancing presence, and systematically preparing for a tech career in Austria and then the United States.
`;

// --------- routes ----------
app.post("/api/chat", async (req, res) => {
  const userMessage = (req.body && req.body.message) || "";
  if (!userMessage.trim()) {
    return res
      .status(400)
      .json({ reply: "Missing or empty 'message' in request body." });
  }

  try {
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

    const reply =
      completion?.choices?.[0]?.message?.content ?? "No reply from OpenAI.";

    return res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err?.message ?? err);
    return res.status(500).json({ reply: "Server error." });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!mailer) {
    return res
      .status(500)
      .json({ message: "Contact service not configured on server." });
  }

  try {
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

    return res.json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact send error:", err?.message || err);
    return res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
});

// --------- start server ----------
const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Chat API running on port ${PORT}`);
});
