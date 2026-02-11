export interface Requirement {
  id: string;
  originalText: string;
  riskLevel: "high" | "medium" | "low";
  issues: string[];
  suggestedRewrite: string;
}

export interface AnalysisResult {
  projectName: string;
  date: string;
  projectRisk: number;
  totalRequirements: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  ambiguitiesFound: number;
  requirements: Requirement[];
}

export const mockAnalysisResult: AnalysisResult = {
  projectName: "E-Commerce Platform v2.0",
  date: "2026-02-10",
  projectRisk: 72,
  totalRequirements: 8,
  highRiskCount: 3,
  mediumRiskCount: 3,
  lowRiskCount: 2,
  ambiguitiesFound: 5,
  requirements: [
    {
      id: "REQ-001",
      originalText: "The system should be fast and responsive for all users.",
      riskLevel: "high",
      issues: [
        "Ambiguous phrasing: 'fast' is not measurable — no latency target defined.",
        "Scope creep: 'all users' lacks definition of user types or load expectations.",
        "Missing acceptance criteria for 'responsive' behavior.",
      ],
      suggestedRewrite:
        "The system SHALL respond to user interactions within 200ms under a load of 10,000 concurrent users, with page load times not exceeding 2 seconds on a 4G connection.",
    },
    {
      id: "REQ-002",
      originalText: "Users should be able to easily navigate the platform.",
      riskLevel: "high",
      issues: [
        "Subjective: 'easily' cannot be tested or measured.",
        "No mention of accessibility standards (WCAG).",
        "Missing definition of navigation patterns or user flows.",
      ],
      suggestedRewrite:
        "The platform SHALL implement a navigation structure that allows users to reach any primary feature within 3 clicks, complying with WCAG 2.1 AA standards.",
    },
    {
      id: "REQ-003",
      originalText: "The checkout process must handle payments securely.",
      riskLevel: "medium",
      issues: [
        "Vague security standard: does not specify PCI-DSS compliance level.",
        "No mention of encryption requirements for data in transit.",
      ],
      suggestedRewrite:
        "The checkout process SHALL comply with PCI-DSS Level 1, encrypting all payment data using TLS 1.3+ in transit and AES-256 at rest.",
    },
    {
      id: "REQ-004",
      originalText: "The system should support multiple languages eventually.",
      riskLevel: "medium",
      issues: [
        "Timeline ambiguity: 'eventually' provides no delivery target.",
        "No specification of which languages or localization depth.",
      ],
      suggestedRewrite:
        "The system SHALL support English, Spanish, and French localization by Q3 2026, with a pluggable i18n architecture for additional languages.",
    },
    {
      id: "REQ-005",
      originalText: "Admin users can manage products and view reports.",
      riskLevel: "low",
      issues: [
        "Missing RBAC detail: does not define admin permission levels.",
      ],
      suggestedRewrite:
        "Admin users with the 'Product Manager' role SHALL be able to create, update, and delete products. Admins with the 'Analyst' role SHALL access read-only sales and inventory reports.",
    },
    {
      id: "REQ-006",
      originalText: "The search feature needs to work well with large catalogs.",
      riskLevel: "high",
      issues: [
        "Ambiguous: 'work well' is not measurable.",
        "No performance benchmark for 'large catalogs' (10K? 1M? items).",
        "Missing requirements for search relevance or ranking.",
      ],
      suggestedRewrite:
        "The search feature SHALL return results within 500ms for catalogs up to 1 million products, supporting full-text search, filtering by category, and relevance-based ranking.",
    },
    {
      id: "REQ-007",
      originalText: "Order notifications should be sent to customers promptly.",
      riskLevel: "medium",
      issues: [
        "Ambiguous timing: 'promptly' is not defined.",
        "Missing channel specification (email, SMS, push).",
      ],
      suggestedRewrite:
        "Order confirmation notifications SHALL be sent via email within 30 seconds of order placement. SMS notifications SHALL be sent for shipping updates.",
    },
    {
      id: "REQ-008",
      originalText: "The system shall log all user authentication events with timestamps.",
      riskLevel: "low",
      issues: [
        "Minor: consider specifying log retention period and format.",
      ],
      suggestedRewrite:
        "The system SHALL log all authentication events (login, logout, failed attempts) with ISO 8601 timestamps, retaining logs for 90 days in a structured JSON format.",
    },
  ],
};

export const terminalSteps = [
  "> Uploading document...",
  "> Extracting text from PDF...",
  "> Cleaning and tokenizing data...",
  "> Identifying requirement blocks...",
  "> Running NLP ambiguity detection...",
  "> Scoring risk levels per requirement...",
  "> Generating AI rewrites...",
  "> Calculating overall project risk...",
  "> Compiling final report...",
  "> ✓ Analysis complete.",
];
