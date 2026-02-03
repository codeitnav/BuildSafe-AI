/*
  @desc    Split cleaned SRS text into individual requirements
  @params  text {string}
  @returns {string[]} array of requirement strings
  @notes   Handles numbered, inline-numbered, and bullet requirements
*/
export const splitRequirements = (text) => {
    if (!text || typeof text !== "string") {
        return [];
    }

    // Step 1: Force numbered requirements onto new lines
    // Handles cases like "1. req 2. req 3. req"
    let normalized = text.replace(
        /(\s|^)(\d{1,3})\.\s+/g,
        "\n$2. "
    );

    // Step 2: Split by newline
    const lines = normalized
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);

    const requirements = [];

    for (const line of lines) {
        // Accept only requirement-like sentences
        if (!/(shall|must|should|will)/i.test(line)) continue;

        // Remove numbering or bullets
        const cleaned = line.replace(
            /^(\d+[\.\)]|\-|\•|\*)\s+/,
            ""
        );

        // Ignore very short fragments
        if (cleaned.length < 20) continue;

        requirements.push(cleaned);
    }

    return requirements;
};
