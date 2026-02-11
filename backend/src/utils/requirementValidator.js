import {
    AMBIGUOUS_TERMS,
    NON_TESTABLE_TERMS,
    ACTION_VERBS
} from "./validationRules.js";

export const validateRequirement = (requirement) => {
    const issues = [];

    const lower = requirement.toLowerCase();

    const ambiguousHits = AMBIGUOUS_TERMS.filter(term =>
        lower.includes(term)
    );
    if (ambiguousHits.length > 0) {
        issues.push({
            type: "Ambiguity",
            message: `Contains vague terms: ${ambiguousHits.join(", ")}`
        });
    }

    const nonTestableHits = NON_TESTABLE_TERMS.filter(term =>
        lower.includes(term)
    );
    if (nonTestableHits.length > 0) {
        issues.push({
            type: "NonTestable",
            message: `Uses non-testable language: ${nonTestableHits.join(", ")}`
        });
    }

    if (!/user|system|admin|application|server/i.test(requirement)) {
        issues.push({
            type: "MissingActor",
            message: "Actor is not clearly specified"
        });
    }

    // Action verb check
    const hasAction = ACTION_VERBS.some(verb =>
        lower.includes(verb)
    );
    if (!hasAction) {
        issues.push({
            type: "MissingAction",
            message: "No clear action verb found"
        });
    }

    return {
        requirement,
        issueCount: issues.length,
        issues
    };
};
