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


### Frontend (Next.js)
- User authentication
- Requirement upload and preview
- Risk visualization dashboards
- Detailed requirement-level analysis views

### Backend (Express)
- Authentication APIs
- Project and requirement management
- AI analysis orchestration
- Risk calculation and storage

---

## 🔁 System Workflow

1. User uploads or pastes requirement text
2. Text is cleaned and normalized
3. Requirements are split into individual units
4. Rule-based validation is applied
5. AI analyzes semantics and intent
6. Risks are detected and scored
7. Suggestions and rewrites are generated
8. Results are stored and visualized

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- MongoDB (local or cloud)
- npm

### Clone the repository
```bash
git clone https://github.com/your-username/buildsafe-ai.git
cd buildsafe-ai
