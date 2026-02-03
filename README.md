# BuildSafe AI

BuildSafe AI is a web-based system that helps software teams identify risks in software requirement documents **before development begins**.  
It analyzes informal or incomplete requirements using Generative AI and software engineering principles to detect ambiguity, missing details, unrealistic expectations, and hidden dependencies.

The goal is to **prevent software project failures early**, saving time, cost, and effort.

---

## 🚀 Features

- Upload or paste software requirement text (formal or informal)
- Upload requirement documents in PDF or DOC/DOCX format
- Automatic text extraction from uploaded documents
- Text cleaning and preprocessing
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

## 📄 Supported Input Formats and Processing

BuildSafe AI supports multiple input formats to make requirement analysis flexible and practical for real-world use.

### Supported Input Types
- **Plain Text**: Users can directly paste requirement text into the application.
- **PDF Documents**: Upload software requirement specification files in PDF format.
- **DOC / DOCX Documents**: Upload requirement documents created using word processors.

### Input Processing Approach
- Uploaded documents are **programmatically parsed** to extract readable plain text.
- Headers, footers, page numbers, and formatting artifacts are removed during preprocessing.
- All inputs, regardless of format, are converted into a **clean text representation** before analysis.

### Important Clarification
- **Generative AI does not read files directly**.
- AI operates **only on extracted and cleaned plain text**.
- File parsing and text extraction are **fully deterministic**, ensuring consistent and repeatable preprocessing results.

---

## 🔁 System Workflow

The system follows a structured pipeline to ensure accurate and explainable analysis:

1. User uploads or pastes requirement text  
2. If a file is uploaded, text is deterministically extracted from the document  
3. Extracted text is cleaned and normalized  
4. Requirements are split into individual units  
5. Rule-based validation is applied to detect basic issues  
6. AI analyzes semantics and intent of each requirement  
7. Risks are detected and scored at both requirement and project level  
8. AI generates explanations and clearer rewritten requirements  
9. Results are stored and visualized in the dashboard  

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
```