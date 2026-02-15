export const buildIdeaExpansionPrompt = (idea) => {
  return `
You are helping a user refine a high-level product idea into clearer system requirements.

User Idea:
"${idea}"

Generate 4 to 5 structured requirement statements.

Rules:
- Use words like "shall", "must", or "should"
- Keep them realistic but slightly general
- Do NOT over-specify numbers unless obvious
- Keep them suitable for further risk analysis
- Output plain text only
- Do not explain anything
`;
};
