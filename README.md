# 🎓 AI Engineering & Local LLM Systems — Exam Review Portal

> A comprehensive, interactive exam preparation platform and study repository covering Local AI Infrastructure, LLM Serving, Frameworks (LangChain/LangGraph), RAG & Advanced RAG, Autonomous Agents, and Neo4j GraphRAG.

---

## 🚀 Quick Start

### 1. Launch Next.js Review App
Double-click \start-review-web.bat\ or run:
\\\ash
cd exam-review-app
npm install
npm run dev
\\\
Then open your browser at **[http://localhost:3000](http://localhost:3000)**.

### 2. Configure AI Chatbot (Optional)
Copy \.env.example\ to \.env.local\ inside \exam-review-app/\:
\\\ash
cp exam-review-app/.env.example exam-review-app/.env.local
\\\
- **Local AI**: Works out of the box with Ollama (\qwen3.6-35b-opt:latest\ or \qwen2.5:3b\).
- **Google Gemini Cloud**: Add your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey) to \.env.local\:
  \\\env
  GEMINI_API_KEY=AIzaSy...
  \\\

---

## 📦 Repository Structure

\\\
AI_Review_Exam/
├── 📄 README.md                                  # Repository overview & setup guide
├── 📖 Exam_Review_Comprehensive_Guide.md        # 65KB comprehensive exam study notes
├── 🌐 index.html                                 # Standalone zero-dependency offline review web
├── 🚀 start-review-web.bat                       # One-click startup script for Windows
├── 📁 exam-review-app/                           # Full-stack Next.js 16 + React 19 web app
│   ├── app/                                      # Next.js App Router (chat & model APIs)
│   ├── components/                               # Interactive React UI components
│   │   ├── AIChatbot.tsx                         # AI Tutor (Ollama Qwen 35B / Gemini API)
│   │   ├── ExamSimulator.tsx                     # Timed exam test simulator
│   │   ├── CodeLab.tsx                           # Interactive code review & syntax highlighting
│   │   ├── CommandsLab.tsx                       # Docker, Ollama, and Neo4j CLI runner
│   │   ├── FlashcardDeck.tsx                     # Spaced repetition study flashcards
│   │   ├── ModuleReview.tsx                      # Lesson-by-lesson deep dive summaries
│   │   └── VisualDiagrams.tsx                    # Interactive architecture flowcharts
│   └── data/courseData.ts                        # Course questions, modules, and code snippets
├── 📚 Lecture Slides (.pptx)
│   ├── 1. Local AI Infrastructure Foundations.pptx
│   ├── 2. Local LLM Serving.pptx
│   ├── 3. Local LLM Integration.pptx
│   ├── 4. Workflow Engineering with LLM Frameworks.pptx
│   ├── 05. RAG.pptx
│   ├── 06. Advanced RAG & Evaluation.pptx
│   └── 7. Autonomous Agents and Tool Integration.pptx
└── 📝 Teacher Review Notes (.docx)
    ├── Highlights of RAG & Advance RAG Lesson to Review.docx
    └── Lesson Review for September Monthly Exam.docx
\\\

---

## 🎯 Course Modules & Key Exam Topics

| Module | Core Concepts & Exam Focus |
| :--- | :--- |
| **1. Local AI Infrastructure** | GPU Architecture, Tensor Cores, VRAM budgeting, Quantization (GGUF, AWQ, GPTQ), CUDA execution |
| **2. Local LLM Serving** | Ollama, vLLM, PagedAttention, KV Cache optimization, Continuous Batching |
| **3. Local LLM Integration** | OpenAI SDK compatibility, LiteLLM, Ollama REST API endpoints, JSON structured outputs |
| **4. Workflow Engineering** | LangChain pipelines, LangGraph StateGraph, memory checkpointers, conditional edge routing |
| **5. Core RAG Architecture** | Chunking strategies, Embedding models, Dense vector retrieval, ChromaDB vector stores |
| **6. Advanced RAG & Evaluation** | HyDE, Multi-Query expansion, Parent Document Retrieval, Cross-Encoder Re-ranking, Ragas framework |
| **7. Agents & Tool Integration** | ReAct pattern, Function Calling, Multi-agent collaboration, Neo4j GraphRAG & Cypher queries |

---

## 🛠️ Neo4j Cypher Script Cheatsheet

Exam-highlighted relationship query:
\\\cypher
// Create entity relationship
CREATE (a:Entity {name: "Sokha"})-[r:WORKS_ON]->(b:Entity {name: "Invoicing Service"})
RETURN a, r, b;

// Find connected entities
MATCH (p:Entity {name: "Sokha"})-[r:WORKS_ON]->(s:Entity)
RETURN p.name, type(r), s.name;
\\\

---

## 🤖 AI Chatbot Features
- **Dual Providers**: Seamless toggle between **💻 Local Ollama** (offline privacy) and **✨ Google Gemini** (sub-second cloud latency).
- **Zero UI Key Hassle**: Keys are stored securely in \.env.local\ on the server; never exposed to browser client.
- **Thinking Token Rendering**: Automatically handles reasoning models (\<think>...</think>\) like Qwen 35B.

---

## 📄 License
Educational review material for AI Engineering Monthly Exam.
