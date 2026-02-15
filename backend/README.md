# BuildSafe AI – Backend

Backend service for **BuildSafe AI**, an intelligent system that detects risks in software requirement documents before development begins.

This service provides:

- Authentication & authorization
- Requirement document processing
- Rule-based validation
- AI-powered semantic analysis
- Risk scoring engine
- PDF report generation
- Persistent storage using MongoDB
- RESTful API endpoints consumed by the frontend

---

## Overview

The backend is responsible for the complete analysis pipeline:

1. Accept requirement text or file uploads  
2. Extract and normalize content  
3. Split text into individual requirements  
4. Perform rule-based validation  
5. Perform AI-powered semantic evaluation  
6. Calculate per-requirement and project-level risk  
7. Generate explanations and improved rewrites  
8. Store results in MongoDB  
9. Serve historical data and export reports  

The architecture follows a modular and scalable REST API design.

---

## Tech Stack

### Runtime & Framework
- Node.js (ES Modules)
- Express.js 5

### Database
- MongoDB
- Mongoose ODM

### Authentication
- JWT (jsonwebtoken)
- bcryptjs (password hashing)

### File Handling
- multer (file uploads)
- pdfjs-dist (PDF text extraction)
- mammoth (DOCX parsing)

### AI Integration
- OpenAI SDK
- Prompt-engineered reasoning layer
- Bottleneck (rate limiting for AI calls)

### Reporting
- pdfkit (PDF report generation)

### Environment Configuration
- dotenv

---

## Core Capabilities

### Authentication System
- User registration
- Secure password hashing
- JWT-based login
- Token verification middleware
- Protected routes

### Document Processing
- Upload PDF, DOC, DOCX
- Deterministic text extraction
- Content cleaning & normalization
- Conversion to structured requirement units

### Risk Analysis Engine

#### Rule-Based Validation
Detects:
- Ambiguity
- Missing actor or action
- Missing constraints
- Non-testable statements
- Unrealistic performance expectations

#### AI-Based Semantic Evaluation
Evaluates:
- Clarity
- Feasibility
- Completeness
- Testability
- Hidden assumptions

#### Hybrid Risk Scoring
Combines:
- Structural validation score
- AI semantic confidence score

Final output:
- Low Risk
- Medium Risk
- High Risk

### Persistence
Each analysis stores:
- User reference
- Original text or file name
- Requirement-level breakdown
- Risk scores
- AI explanations
- Suggested rewrites
- Timestamp

### PDF Report Export
Generates downloadable reports including:
- Requirement summary
- Risk breakdown
- AI explanations
- Suggested improvements
- Overall project risk score

---

## Installation & Setup

### Prerequisites

- Node.js v18+
- MongoDB (local or cloud)
- OpenAI API key

---

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

### Architecture Principles
- Stateless REST API
- Token-based authentication
- Clear separation of concerns
- Deterministic preprocessing before AI
- Hybrid validation model
- Explainable AI outputs
- Scalable middleware-based structure