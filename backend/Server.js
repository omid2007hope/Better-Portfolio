import express from "express";
import cors from "cors";
import apiRouter from "./router/apiRouter.js";
import { CORS_ORIGIN, PORT } from "./config/env.js";

// --------- app ----------
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN, // set CORS_ORIGIN in env if you want to restrict
  }),
);

// --------- routes ----------
app.use("/api", apiRouter);

// --------- start server ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Chat API running on port ${PORT}`);
});