import express from "express";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

/*
  @desc    Upload a requirement document
  @route   POST /api/upload
  @access  Public
  @returns Uploaded file metadata
*/
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        file: {
            originalName: req.file.originalname,
            storedName: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size
        }
    });
});

export default router;
