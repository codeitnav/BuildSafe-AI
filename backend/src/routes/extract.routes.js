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
import { expandIdeaWithAI } from "../ai/aiService.js";

import { calculateRequirementRisk } from "../risk/calculateRequirementRisk.js";
import { calculateProjectRisk } from "../risk/calculateProjectRisk.js";


const router = express.Router();

/*
  @desc    Full pipeline:
           upload OR text → clean → split
           → rule validation → AI analysis
           → risk scoring → project aggregation
  @route   POST /api/extract
  @access  Public
*/
router.post("/extract", upload.single("file"), async (req, res) => {
    try {
        const { ownerType, ownerId, text } = req.body;

        if (!ownerType || !ownerId) {
            return res.status(400).json({
                success: false,
                message: "ownerType and ownerId are required"
            });
        }

        let rawText = "";

        // Case 1: File Upload
        if (req.file) {
            rawText = await extractTextFromFile(req.file);
        }

        // Case 2: Pasted Text
        else if (text && text.trim().length > 0) {
            rawText = text;
        }

        else {
            return res.status(400).json({
                success: false,
                message: "Either file or text input is required"
            });
        }

        const cleanedText = cleanText(rawText);
        let requirements = splitRequirements(cleanedText);
        if (requirements.length <= 3) {
            const suggestion = await expandIdeaWithAI(cleanedText, llmClient);

            return res.status(200).json({
                success: true,
                mode: "IDEA_LEVEL_INPUT",
                detectedCount: requirements.length,
                suggestion
            });
        }


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
            ownerType,
            ownerId,
            sourceFileName: req.file ? req.file.originalname : "Typed Input",
            totalRequirements: results.length,
            projectRisk,
            results
        });

        if (req.file?.path) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(200).json({
            success: true,
            analysisId: analysis._id
        });

    } catch (error) {
        if (req.file?.path) {
            try { fs.unlinkSync(req.file.path); } catch (_) {}
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


export default router;
