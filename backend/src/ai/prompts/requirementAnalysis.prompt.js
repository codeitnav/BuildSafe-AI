/*
  @desc   Constructs a highly structured prompt for AI requirement analysis
  @param  requirement {string} - The raw requirement text to analyze
  @param  issues {Array} - List of rule-based issues detected (e.g. from regex)
  @param  projectContext {string} - (Optional) Description of the project domain
*/
export const buildRequirementPrompt = (requirement, issues = [], projectContext = "General Software Project") => {
    
    const formattedIssues = issues.length > 0 
        ? issues.map(i => `- [Rule Detection] ${i.type}: ${i.message}`).join("\n") 
        : "No syntax-level issues detected.";

    return `
You are a generic Senior Business Analyst and QA Architect. 
Your goal is to validate software requirements for a system described as: "${projectContext}".

## INPUT DATA
**Requirement:** "${requirement}"
**Pre-detected Constraints:**
${formattedIssues}

## ANALYSIS FRAMEWORK
Evaluate the requirement using the INVEST matrix (Independent, Negotiable, Valuable, Estimable, Small, Testable) and SMART criteria.

## TASKS
1. **Analyze Validity:** Determine if the input is a valid software requirement. If it is gibberish or unrelated, mark strictly as invalid.
2. **Identify Risks:** Look for ambiguity, hidden dependencies, untestable logic, or security gaps.
3. **Refine:** Rewrite the requirement to be atomic, clear, and ready for a developer.
4. **Rate:** Assign a risk score (Low/Medium/High) based on the likelihood of implementation failure.

## OUTPUT FORMAT
You must respond with ONLY a valid JSON object. Do not include markdown formatting (like \`\`\`json).
Follow this schema strictly:

{
  "isValid": boolean, // false if input is gibberish
  "riskLevel": "Low" | "Medium" | "High",
  "explanation": "Concise technical explanation of the flaws found. Reference specific principles (e.g., 'Violates testability').",
  "suggestedRewrite": "The professional, standardized version of the requirement.",
  "missingDetails": ["List of specific questions to ask the user to clarify this requirement"]
}
`;
};