import express from "express";
import Analysis from "../models/Analysis.js";
import { generateAnalysisPDF } from "../utils/pdfGenerator.js";

const router = express.Router();

/*
  @desc    Get all past analyses (filtered by owner)
  @route   GET /api/analysis?ownerId=xxx
  @access  Public
*/
router.get("/", async (req, res) => {
    try {
        const { ownerId } = req.query;

        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: "ownerId is required"
            });
        }

        const analyses = await Analysis.find({ ownerId })
            .sort({ createdAt: -1 })
            .select("sourceFileName projectRisk totalRequirements createdAt");

        return res.status(200).json({
            success: true,
            count: analyses.length,
            analyses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
});


/*
  @desc    Get a single analysis by ID (ownership enforced)
  @route   GET /api/analysis/:id?ownerId=xxx
  @access  Public
*/
router.get("/:id", async (req, res) => {
    try {
        const { ownerId } = req.query;

        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: "ownerId is required"
            });
        }

        const analysis = await Analysis.findOne({
            _id: req.params.id,
            ownerId
        });

        if (!analysis) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found"
            });
        }

        return res.status(200).json({
            success: true,
            analysis
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
});


/*
  @desc    Export analysis report as PDF (ownership enforced)
  @route   GET /api/analysis/:id/export/pdf?ownerId=xxx
  @access  Public
*/
router.get("/:id/export/pdf", async (req, res) => {
    try {
        const { ownerId } = req.query;

        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: "ownerId is required"
            });
        }

        const analysis = await Analysis.findOne({
            _id: req.params.id,
            ownerId
        });

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

        return res.send(pdfBuffer);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
});

export default router;
