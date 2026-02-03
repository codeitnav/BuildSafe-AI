import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.routes.js";
import extractRoutes from "./routes/extract.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", uploadRoutes);
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
