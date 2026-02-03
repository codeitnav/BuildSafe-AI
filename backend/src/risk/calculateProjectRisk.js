/*
  @desc    Aggregate requirement-level risks into project-level risk
  @params  requirementRisks {Array<{ riskLevel: string }>}
  @returns {Object}
*/
export const calculateProjectRisk = (requirementRisks) => {
    const total = requirementRisks.length;

    let high = 0;
    let medium = 0;

    for (const r of requirementRisks) {
        if (r.riskLevel === "High") high++;
        else if (r.riskLevel === "Medium") medium++;
    }

    let projectRisk = "Low";

    if (high > 0 || medium / total > 0.5) {
        projectRisk = "High";
    } else if (medium > 0) {
        projectRisk = "Medium";
    }

    return {
        totalRequirements: total,
        highRiskCount: high,
        mediumRiskCount: medium,
        projectRisk
    };
};
