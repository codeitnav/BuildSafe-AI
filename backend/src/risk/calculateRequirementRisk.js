import { ISSUE_WEIGHTS } from "./riskWeights.js";
import { AI_RISK_WEIGHTS } from "./aiRiskWeights.js";

/*
  @desc    Calculate numeric and categorical risk for a requirement
  @params  issues {Array}
  @params  aiAnalysis {Object}
  @returns {Object}
*/
export const calculateRequirementRisk = (issues, aiAnalysis) => {
    let ruleScore = 0;

    for (const issue of issues) {
        ruleScore += ISSUE_WEIGHTS[issue.type] || 1;
    }

    const aiScore = AI_RISK_WEIGHTS[aiAnalysis?.riskLevel] || 2;

    const totalScore = ruleScore + aiScore;

    let riskLevel = "Low";

    if (totalScore >= 7) riskLevel = "High";
    else if (totalScore >= 4) riskLevel = "Medium";

    return {
        ruleScore,
        aiScore,
        totalScore,
        riskLevel
    };
};
