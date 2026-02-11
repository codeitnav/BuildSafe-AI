import express from "express";
import fs from "fs";
import { upload } from "../middlewares/upload.middleware.js";
import { extractTextFromFile } from "../utils/textExtractor.js";
import { cleanText } from "../utils/textCleaner.js";
import { splitRequirements } from "../utils/requirementSplitter.js";
import { validateRequirement } from "../utils/requirementValidator.js";
import { analyzeRequirementWithAI } from "../ai/aiService.js";
import llmClient from "../config/llmClient.js";
import Analysis from "../models/Analysis.js";

import { calculateRequirementRisk } from "../risk/calculateRequirementRisk.js";
import { calculateProjectRisk } from "../risk/calculateProjectRisk.js";

const router = express.Router();

/*
  @desc    Full pipeline:
           upload → extract → clean → split
           → rule validation → AI analysis
           → risk scoring → project aggregation
  @route   POST /api/extract
  @access  Public
*/
router.post("/extract", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const { ownerType, ownerId } = req.body;

        // Validate ownership
        if (!ownerType || !ownerId) {
            if (req.file?.path) fs.unlinkSync(req.file.path);

            return res.status(400).json({
                success: false,
                message: "ownerType and ownerId are required"
            });
        }

        if (!["anonymous", "user"].includes(ownerType)) {
            if (req.file?.path) fs.unlinkSync(req.file.path);

            return res.status(400).json({
                success: false,
                message: "Invalid ownerType"
            });
        }

        // 1. Extract
        const rawText = await extractTextFromFile(req.file);

        // 2. Clean
        const cleanedText = cleanText(rawText);

        // 3. Split
        const requirements = splitRequirements(cleanedText);

        if (!requirements.length) {
            fs.unlinkSync(req.file.path);

            return res.status(400).json({
                success: false,
                message: "No valid requirements detected in document"
            });
        }

        // 4. Rule validation
        const validatedRequirements = requirements.map(validateRequirement);

        const results = [];

        // 5. AI + Risk calculation
        for (const item of validatedRequirements) {
            const aiAnalysis = await analyzeRequirementWithAI(
                item.requirement,
                item.issues,
                llmClient
            );

            const risk = calculateRequirementRisk(item.issues, aiAnalysis);

            results.push({
                ...item,
                aiAnalysis,
                risk
            });
        }

        // 6. Project aggregation (safe against zero division)
        const projectRisk =
            results.length === 0
                ? {
                      totalRequirements: 0,
                      highRiskCount: 0,
                      mediumRiskCount: 0,
                      projectRisk: "Low"
                  }
                : calculateProjectRisk(results.map(r => r.risk));

        // 7. Store in DB with ownership
        const analysis = await Analysis.create({
            ownerType,
            ownerId,
            sourceFileName: req.file.originalname,
            totalRequirements: results.length,
            projectRisk,
            results
        });

        // 8. Delete uploaded file
        fs.unlinkSync(req.file.path);

        // 9. Return response
        return res.status(200).json({
            success: true,
            analysisId: analysis._id,
            projectRisk,
            totalRequirements: results.length
        });

    } catch (error) {
        if (req.file?.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (_) {}
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
});

export default router;
