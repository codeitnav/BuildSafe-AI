# BuildSafe AI

**BuildSafe AI** is an intelligent, web-based system designed to identify **risks in software requirement documents before development begins**.  
It helps software teams, students, and researchers detect ambiguity, missing details, unrealistic expectations, and hidden dependencies in requirements using a combination of **software engineering rules** and **Generative AI**.

The primary objective is to **reduce software project failures early in the lifecycle**, saving time, cost, and development effort.

---

## 🚀 Key Features

- Upload or paste software requirements (formal or informal)
- Support for **PDF**, **DOC**, and **DOCX** requirement documents
- Deterministic text extraction from uploaded files
- Automatic text cleaning and normalization
- Intelligent splitting into individual requirements
- Rule-based requirement validation
- AI-powered semantic analysis of each requirement
- Detection of common requirement issues:
  - Ambiguity and vague wording
  - Missing actors, actions, or constraints
  - Non-testable or unverifiable statements
  - Unrealistic performance or scalability expectations
- **Risk scoring**:
  - Per-requirement risk (Low / Medium / High)
  - Overall project-level risk
- Clear, human-readable explanations for detected risks
- AI-generated **improved rewrites** of problematic requirements
- Persistent storage of analysis history (MongoDB)
- Export complete analysis reports as **PDF**
- History dashboard to view and revisit past analyses

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
- MongoDB with Mongoose
- RESTful API architecture

### AI & Analysis Layer
- Large Language Model (LLM) based semantic analysis
- Rule-based validation (software engineering principles)
- Hybrid risk scoring (rule-based + AI-based)

---

## 📄 Supported Input Formats & Processing

BuildSafe AI is designed for real-world requirement documents and supports multiple input formats.

### Supported Input Types
- **Plain Text**: Paste raw requirement text directly.
- **PDF Documents**: Upload Software Requirement Specification (SRS) PDFs.
- **DOC / DOCX Documents**: Upload Word-based requirement documents.

### Input Processing Pipeline
- Uploaded files are **programmatically parsed** to extract plain text.
- Noise such as headers, footers, page numbers, and formatting artifacts is removed.
- All inputs are normalized into a **clean, consistent text format** before analysis.

### Important Clarification
- Generative AI **does not read files directly**.
- AI operates **only on extracted plain text**.
- File parsing and text extraction are **deterministic**, ensuring repeatability and transparency.

---

## 🔁 System Workflow

The system follows a clear, explainable pipeline:

1. User uploads a document or pastes requirement text  
2. Text is deterministically extracted (if a file is uploaded)  
3. Extracted text is cleaned and normalized  
4. Content is split into individual requirements  
5. Rule-based validation detects structural issues  
6. AI analyzes semantic meaning and intent  
7. Requirement-level risk is calculated  
8. Project-level risk is aggregated  
9. AI generates explanations and rewritten requirements  
10. Analysis results are stored in MongoDB  
11. User can view history or export results as a PDF report  

---

## 📊 Risk Scoring Model

Each requirement is evaluated using a hybrid approach:

### Rule-Based Risk
- Ambiguity
- Missing action or actor
- Missing constraints
- Non-testable statements

### AI-Based Risk
- Semantic clarity
- Feasibility
- Completeness
- Estimability

### Final Risk Levels
- **Low Risk**: Clear, testable, and complete
- **Medium Risk**: Needs clarification or refinement
- **High Risk**: Likely to cause implementation failure

Project risk is computed by aggregating individual requirement risks.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- MongoDB (local or cloud)
- npm

### Clone the Repository
```bash
git clone https://github.com/your-username/BuildSafe-AI.git
cd BuildSafe-AI
```

### Backend Setup

### 1. Install Dependencies

```bash
npm install
```
### 2. Create Environment File

Create a .env file in the root directory:
```bash
PORT=8000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY==your_groq_api_key
```

### 3. Start the Server
```bash
npm start
```

Server runs at:
```bash
http://localhost:8000
```

### Frontend Setup

### 1. Install Dependencies
```bash
npm install
```
Create a .env file in the root directory:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 2. Run Development Server
```bash
npm run dev
```

## 🎯 Intended Use Cases
- Software engineering students (SRS analysis & viva preparation)
- Early-stage project planning
- Requirement quality audits
- Academic research in software engineering & AI
- Teams practicing requirement-driven development

## 📜 License
This project is licensed under the MIT License.