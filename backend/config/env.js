import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// --------- env setup ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load base .env then override with .env.local (if present)
dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env.local"), override: true });

// --------- env values ----------
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
const CORS_ORIGIN = process.env.CORS_ORIGIN || true;
const PORT = Number(process.env.PORT) || 3001;

const canSendMail = SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO;

export {
  OPENAI_API_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CONTACT_TO,
  CORS_ORIGIN,
  PORT,
  canSendMail,
};