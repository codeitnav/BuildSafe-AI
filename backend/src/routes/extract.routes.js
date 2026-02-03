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

        const rawText = await extractTextFromFile(req.file);
        const cleanedText = cleanText(rawText);

        const requirements = splitRequirements(cleanedText);

        const validatedRequirements = requirements.map(validateRequirement);

        const results = [];

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

        const projectRisk = calculateProjectRisk(
            results.map(r => r.risk)
        );

        const analysis = await Analysis.create({
            sourceFileName: req.file.originalname,
            totalRequirements: results.length,
            projectRisk,
            results
        });


        fs.unlinkSync(req.file.path);

        return res.status(200).json({
            success: true,
            analysisId: analysis._id,
            projectRisk,
            totalRequirements: results.length,
            results
        });

    } catch (error) {
        if (req.file?.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (_) {}
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
