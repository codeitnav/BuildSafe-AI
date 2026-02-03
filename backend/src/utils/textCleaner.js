/*
  @desc    Clean and normalize extracted requirement text
  @params  rawText {string}
  @returns {string} normalized text
  @notes   Deterministic preprocessing only
*/
export const cleanText = (rawText) => {
    if (!rawText || typeof rawText !== "string") {
        return "";
    }

    let text = rawText;

    // Normalize line endings
    text = text.replace(/\r\n/g, "\n");

    // Remove repeated spaces and tabs
    text = text.replace(/[ \t]+/g, " ");

    // Remove standalone page numbers
    text = text.replace(/^\s*\d+\s*$/gm, "");

    // Remove excessive blank lines
    text = text.replace(/\n{2,}/g, "\n");

    // Trim each line
    text = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join("\n");

    return text.trim();
};
