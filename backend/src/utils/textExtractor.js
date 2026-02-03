import fs from "fs";
import mammoth from "mammoth";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

/*
  @desc    Extract plain text from uploaded requirement files
  @params  file {Object} - multer file object
  @returns {Promise<string>} extracted text
  @notes   Deterministic, non-AI processing only
*/

export const extractTextFromFile = async (file) => {
    if (!file) {
        throw new Error("File not provided for text extraction");
    }

    const { mimetype, path } = file;

    if (mimetype === "application/pdf") {
        return extractFromPDF(path);
    }

    if (
        mimetype === "application/msword" ||
        mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return extractFromDoc(path);
    }

    throw new Error("Unsupported file type for text extraction");
};

const extractFromPDF = async (filePath) => {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjs.getDocument({ data }).promise;

    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        text += strings.join(" ") + "\n";
    }

    return text.trim();
};

const extractFromDoc = async (filePath) => {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
};
