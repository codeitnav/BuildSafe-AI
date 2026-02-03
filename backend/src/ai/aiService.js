import { buildRequirementPrompt } from "./prompts/requirementAnalysis.prompt.js";

export const analyzeRequirementWithAI = async (
    requirement,
    issues,
    llmClient,
    projectContext = "General Software Project"
) => {
    const prompt = buildRequirementPrompt(requirement, issues, projectContext);

    try {
        const response = await llmClient.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: "You are a precise QA Architect. Respond with strictly valid JSON only. Do not include markdown, comments, or extra text."
                },
                { role: "user", content: prompt }
            ],
            temperature: 0.2,
        });

        const raw = response.choices[0].message.content;
        const cleanJson = raw.replace(/```json|```/g, "").trim();

        return JSON.parse(cleanJson);

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        
        return {
            isValid: true,
            riskLevel: "Unknown",
            explanation: "AI service temporarily unavailable.",
            suggestedRewrite: requirement,
            missingDetails: []
        };
    }
};