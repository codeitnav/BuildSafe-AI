import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import extractRoutes from "./routes/extract.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://build-safe-ai.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", extractRoutes);
app.use("/api/analysis", analysisRoutes);

/*
  @desc    Health check endpoint
  @route   GET /api/health
  @access  Public
*/
app.get("/api/health", (req, res) => {
    res.json({ status: "Hello from backend" });
});

export default app;
