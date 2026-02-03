import multer from "multer";
import path from "path";
import fs from "fs";

/*
  @desc    Configure temporary file storage for uploads
  @notes   Files are stored locally and processed later
*/

const UPLOAD_DIR = "uploads";

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(
            new Error("Only PDF, DOC, and DOCX files are allowed"),
            false
        );
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 15 * 1024 * 1024 // 15 MB max file size
    }
});
