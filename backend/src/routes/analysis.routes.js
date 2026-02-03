import express from "express";
import Analysis from "../models/Analysis.js";
import { generateAnalysisPDF } from "../utils/pdfGenerator.js";

const router = express.Router();

/*
  @desc    Get all past analyses (history)
  @route   GET /api/analysis
  @access  Public
*/
router.get("/", async (req, res) => {
    try {
        const analyses = await Analysis.find()
            .sort({ createdAt: -1 })
            .select("sourceFileName projectRisk totalRequirements createdAt");

        res.status(200).json({
            success: true,
            count: analyses.length,
            analyses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/*
  @desc    Get a single analysis by ID
  @route   GET /api/analysis/:id
  @access  Public
*/
router.get("/:id", async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id);

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found"
            });
        }

        res.status(200).json({
            success: true,
            analysis
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/*
  @desc    Export analysis report as PDF
  @route   GET /api/analysis/:id/export/pdf
  @access  Public
*/
router.get("/:id/export/pdf", async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id);

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found"
            });
        }

        const pdfBuffer = await generateAnalysisPDF(analysis);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=BuildSafe_Report_${analysis._id}.pdf`
        );

        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;