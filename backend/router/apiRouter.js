import express from "express";
import { chatHandler } from "../controller/chatController.js";
import { contactHandler } from "../controller/contactController.js";

// --------- router: api ----------
const router = express.Router();

router.post("/chat", chatHandler);
router.post("/contact", contactHandler);

export default router;