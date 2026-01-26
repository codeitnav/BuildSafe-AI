# BuildSafe AI

BuildSafe AI is a web-based system that helps software teams identify risks in software requirement documents **before development begins**.  
It analyzes informal or incomplete requirements using Generative AI and software engineering principles to detect ambiguity, missing details, unrealistic expectations, and hidden dependencies.

The goal is to **prevent software project failures early**, saving time, cost, and effort.

---

## 🚀 Features

- Upload or paste software requirement text (formal or informal)
- Automatic text cleaning and preprocessing
- Intelligent splitting into individual requirements
- AI-based understanding of each requirement
- Detection of:
  - Ambiguous or unclear wording
  - Missing or incomplete details
  - Unrealistic or infeasible expectations
  - Hidden dependencies between requirements
- Risk scoring:
  - Per-requirement risk level
  - Overall project risk level
- Simple explanations of detected issues
- AI-generated rewritten requirements that are clearer and developer-friendly
- Dashboard to view past analyses and risk summaries

---

## 🏗️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### AI Layer
- Generative AI (LLM-based analysis)
- Prompt-based reasoning
- Rule-based validation combined with AI outputs

---