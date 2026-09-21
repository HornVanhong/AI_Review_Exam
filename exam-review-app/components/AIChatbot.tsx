"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  User,
  Send,
  Square,
  Trash2,
  Settings,
  Sparkles,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  RefreshCw,
  Terminal,
  Zap,
  HelpCircle,
  AlertCircle,
  Key,
  Eye,
  EyeOff,
  ExternalLink,
  Globe
} from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

const DEFAULT_SYSTEM_PROMPT = `You are the Expert AI Exam Tutor for the September Monthly Exam.
Your mission is to help students review and pass the exam by strictly following ONLY the topics highlighted by the teacher:

1. Part 1: 04. Workflow Engineering with LLM Frameworks
   - What is an LLM Workflow, why we need it, and core components (Nodes, Edges, State)
   - Chains & execution patterns: Sequential, Conditional (Branching), Parallel, and Self-Correction Loops
   - State vs. Memory: State is turn-scoped; Memory is persistent across sessions (LangGraph Checkpointer with thread_id)
   - Document Ingestion Pipelines: ETL (Extract, Transform/Chunk, Load) and file hash deduplication
   - Modular workflow design: Decoupling components for easy testing and model swapping
   - Orchestration Frameworks: LlamaIndex (data/search), LangChain (chains), LangGraph (state machine graphs & cycles)

2. Part 2: Module 1 — RAG Fundamentals
   - 5-stage pipeline: Ingestion -> Indexing -> Retrieval -> Augmentation -> Generation
   - When to use RAG vs Fine-Tuning vs Long-Context Prompting
   - Key components: Document store, embedding model, vector index, retriever, LLM
   - Metadata preservation (source, page number) for citations and filtering
   - Embeddings (vector representation of meaning) & similarity search (Cosine, Dot Product, Euclidean L2)
   - Top-K retrieval & similarity score thresholds
   - Chunk size sweet spot (300-500 tokens) & Chunk overlap (prevents severed sentences)
   - Document-structure-aware splitting (headers, tables, code blocks)
   - Local embeddings vs Cloud API embeddings (privacy & free vs convenience & cost)
   - Vector DB vs Traditional DB (semantic similarity vs exact match) & choosing DB (embedded ChromaDB vs client-server Qdrant)

3. Part 3: Module 2 — Advanced RAG Architecture & Evaluation
   - Hybrid Retrieval: Pure dense fails on IDs/acronyms; BM25 fails on synonyms; Reciprocal Rank Fusion (RRF with k=60)
   - Graph RAG: Solving multi-hop questions with knowledge graph triples; Neo4j Cypher (MERGE for idempotent ingestion, DETACH DELETE)
   - Agentic RAG: Multi-step reasoning loops, query decomposition, self-reflection, and tool routing
   - Reranking with Cross-Encoders: 2-stage retrieval (Bi-Encoder fast top-50 -> Cross-Encoder deep attention top-5)
   - Context Management: Context window budgeting, the "Lost in the Middle" effect (place best chunks at top and bottom), deduplication

4. Part 4: Autonomous Agents & Tool Integration
   - Tool Calling: Why agents need tools; Golden rule ("Model REQUESTS the action, application EXECUTES it"); finish_reason: "tool_calls"
   - Structured Invocation: JSON schemas, Pydantic type validation (ge=0), schema vs business validation
   - Bounded Actions: Sandboxed containers (Docker), Principle of Least Privilege (read-only SELECT)
   - Safety & Failure Boundaries: Step limits (recursion_limit), isolating tool crashes with try/catch, idempotency keys
   - Agent Patterns: ReAct loop (Thought -> Action -> Observation), Reflection, Router, Planner-Executor, Multi-Agent
   - Harness Design: Surrounding control layer managing tool discovery, state, safety limits, and trajectory logging
   - MCP Server (Model Context Protocol): Host/Client/Server architecture, Tools vs Resources vs Prompts, FastMCP @mcp.tool()
   - Local Tools vs MCP: In-process Python (fast, simple) vs MCP Server (reusable across Claude Desktop, Cursor, agents)
   - Human-in-the-Loop (HITL): Approval breakpoints (interrupt_before) for high-stakes actions; HITL vs HOTL vs HOOTL

Style & Language Rules:
- Keep language simple, clear, and direct. Avoid overwhelming academic jargon.
- Use clear Markdown headings (### **Section Title**) to organize answers.
- Highlight critical tips using callouts:
   > 💡 **Exam Tip:** [Quick memorization rule]
   > 🚨 **Common Mistake:** [Mistake students make]
- Answer ONLY what the teacher highlighted. Do not confuse the student with outside topics.`;

const QUICK_PROMPTS = [
  {
    title: "Neo4j CREATE vs MERGE",
    prompt: "Explain the Cypher query 'CREATE (a:Entity {name: \"Sokha\"})-[r:WORKS_ON]->(b:Entity {name: \"Invoicing Service\"}) RETURN a, r, b;' and why the exam slide advises 'Always MERGE, never CREATE' in ingestion pipelines."
  },
  {
    title: "Reciprocal Rank Fusion (RRF)",
    prompt: "How does Reciprocal Rank Fusion (RRF) fuse sparse BM25 and dense vector search results? Give the exact formula and explain the start=1 rank index trap."
  },
  {
    title: "State vs. Memory in Workflows",
    prompt: "What is the difference between State and Memory in an AI workflow, and how do LangGraph Checkpointer (InMemorySaver) and Store (InMemoryStore) handle them?"
  },
  {
    title: "Docker --ipc=host for vLLM",
    prompt: "Why is the '--ipc=host' flag strictly required when deploying vLLM inference containers in Docker?"
  },
  {
    title: "FastMCP Tools vs Resources",
    prompt: "In Model Context Protocol (MCP) and FastMCP, what is the exact difference between @mcp.tool() and @mcp.resource()?"
  },
  {
    title: "GraphRAG Global vs Local",
    prompt: "In Microsoft GraphRAG, when should an engineer use '--method global' versus '--method local'?"
  }
];

export const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `👋 **Hello! I am your Local AI Exam Tutor powered by Qwen 35B.**\n\nI can help you review and test your knowledge on:\n- **Neo4j & Cypher Scripts** (such as the *Sokha WORKS_ON Invoicing Service* exam pattern)\n- **Ollama CLI, Modelfiles, and Local Serving**\n- **Hybrid RAG & Reciprocal Rank Fusion (RRF)**\n- **LangGraph Workflows & Autonomous Agents**\n\nAsk me any question or pick a quick topic below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Provider State: Local Ollama vs Google Gemini
  const [provider, setProvider] = useState<"ollama" | "gemini">("gemini");
  const [geminiModel, setGeminiModel] = useState<string>("gemini-3.6-flash");

  // Settings State
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("http://127.0.0.1:11434");
  const [model, setModel] = useState<string>("qwen3.6-35b-opt:latest");
  const [temperature, setTemperature] = useState<number>(0.3);
  const [systemPrompt, setSystemPrompt] = useState<string>(DEFAULT_SYSTEM_PROMPT);

  // Connection & Model Discovery State
  const [availableModels, setAvailableModels] = useState<string[]>([
    "qwen3.6-35b-opt:latest",
    "qwen2.5:3b",
    "llama3.2:latest"
  ]);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load saved Provider & Gemini Model preference on mount
  useEffect(() => {
    try {
      const isCloud =
        typeof window !== "undefined" &&
        window.location.hostname !== "localhost" &&
        window.location.hostname !== "127.0.0.1";

      const savedProvider = localStorage.getItem("exam_ai_provider");
      if (isCloud) {
        // On cloud (e.g. Vercel), default to Gemini because local Ollama (127.0.0.1) cannot be reached
        setProvider("gemini");
      } else if (savedProvider === "gemini" || savedProvider === "ollama") {
        setProvider(savedProvider as "ollama" | "gemini");
      }

      const savedGeminiModel = localStorage.getItem("exam_gemini_model");
      if (savedGeminiModel && savedGeminiModel !== "gemini-2.0-flash") {
        setGeminiModel(savedGeminiModel);
      } else {
        setGeminiModel("gemini-3.6-flash");
      }

      const savedEndpoint = localStorage.getItem("exam_ollama_endpoint");
      if (savedEndpoint) {
        setEndpoint(savedEndpoint);
      }
    } catch {}
  }, []);

  const handleSelectGeminiModel = (m: string) => {
    setGeminiModel(m);
    try {
      localStorage.setItem("exam_gemini_model", m);
    } catch {}
  };

  const handleSwitchProvider = (p: "ollama" | "gemini") => {
    setProvider(p);
    try {
      localStorage.setItem("exam_ai_provider", p);
    } catch {}
  };

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Ping Ollama and fetch models on mount
  useEffect(() => {
    checkConnection();
  }, [endpoint]);

  const checkConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const res = await fetch(`/api/models?endpoint=${encodeURIComponent(endpoint)}`);
      const data = await res.json();
      setIsConnected(data.connected);
      if (data.models && Array.isArray(data.models) && data.models.length > 0) {
        setAvailableModels(data.models);
        // If current model is not in list, keep or select first
        if (!data.models.includes(model) && data.models.includes("qwen3.6-35b-opt:latest")) {
          setModel("qwen3.6-35b-opt:latest");
        }
      }
    } catch {
      setIsConnected(false);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isStreaming) return;

    const userMessage: Message = {
      id: "msg-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const assistantPlaceholderId = "resp-" + (Date.now() + 1);
    const assistantMessage: Message = {
      id: assistantPlaceholderId,
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const newMessages = [...messages, userMessage, assistantMessage];
    setMessages(newMessages);
    setInputPrompt("");
    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const payloadMessages = newMessages
        .filter((m) => m.id !== "welcome" && m.id !== assistantPlaceholderId)
        .map((m) => ({ role: m.role, content: m.content }));

      const activeModel = provider === "gemini" ? geminiModel : model;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          messages: payloadMessages,
          model: activeModel,
          endpoint,
          temperature,
          systemPrompt
        }),
        signal: abortController.signal
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}: Failed to generate`);
      }

      if (!res.body) {
        throw new Error("No response stream body available");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId ? { ...msg, content: accumulated } : msg
          )
        );
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId
              ? { ...msg, content: msg.content + "\n\n*[Generation stopped by user]*" }
              : msg
          )
        );
      } else {
        const isCloudHost =
          typeof window !== "undefined" &&
          window.location.hostname !== "localhost" &&
          window.location.hostname !== "127.0.0.1";

        const errorContent =
          provider === "gemini"
            ? `⚠️ **Google Gemini:** ${err.message}\n\n*Setup Reminder:*\nPlease ensure your key is added in Vercel Environment Variables or \`.env.local\`:\n\`\`\`bash\nGEMINI_API_KEY=AIzaSy...\n\`\`\`\nGet a free key in 30 seconds at [Google AI Studio](https://aistudio.google.com/app/apikey).`
            : isCloudHost
            ? `⚠️ **Local Ollama Cannot Be Reached from Vercel Cloud:**\n\nYou are viewing this site online at \`${window.location.hostname}\`.\nOllama runs locally on your PC (\`127.0.0.1:11434\`), which Vercel's cloud servers cannot access over the public internet.\n\n👉 **To fix this right now:**\nSwitch to **[✨ Google Gemini API]** at the top or bottom of this chat! Gemini runs 100% in the cloud and answers instantly.\n\n*(If you want to use local Qwen 35B offline, run the app on your computer at \`http://localhost:3000\`)*.`
            : `⚠️ **Connection Error:** ${err.message}\n\n*Troubleshooting Tips:*\n1. Verify Ollama is running in background (\`ollama serve\`).\n2. Run \`ollama list\` to verify \`${model}\` is installed.\n3. Check endpoint in Settings (default is \`http://127.0.0.1:11434\`).`;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholderId
              ? { ...msg, content: errorContent }
              : msg
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleClearChat = () => {
    if (confirm("Clear all conversation messages?")) {
      setMessages([
        {
          id: "welcome-" + Date.now(),
          role: "assistant",
          content: `🧹 Chat cleared. Ready for your next exam questions on Qwen 35B!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to format messages with thinking sections and code blocks
  const renderFormattedContent = (rawText: string, isCurrentStreaming: boolean = false) => {
    // Check for thinking blocks <think>...</think>
    let thinkingPart = "";
    let mainPart = rawText;

    const thinkMatch = rawText.match(/<think>([\s\S]*?)<\/think>/);
    if (thinkMatch) {
      thinkingPart = thinkMatch[1].trim();
      mainPart = rawText.replace(/<think>[\s\S]*?<\/think>/, "").trim();
    } else if (rawText.startsWith("<think>")) {
      // In-progress thinking
      thinkingPart = rawText.replace("<think>", "").trim();
      mainPart = "";
    }

    // Split by code blocks ```
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    type ContentPart =
      | { type: "text"; content: string }
      | { type: "code"; language: string; code: string };

    const parts: ContentPart[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(mainPart)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: "text", content: mainPart.substring(lastIndex, match.index) });
      }
      parts.push({ type: "code", language: match[1] || "text", code: match[2] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < mainPart.length) {
      parts.push({ type: "text", content: mainPart.substring(lastIndex) });
    }

    const isActivelyThinking = isCurrentStreaming && Boolean(thinkingPart) && !mainPart;

    return (
      <div className="space-y-3">
        {/* Thinking section if available */}
        {thinkingPart && (
          <details
            open={Boolean(isActivelyThinking)}
            className="group bg-slate-950/80 rounded-xl border border-indigo-900/50 p-3 text-xs text-slate-300"
          >
            <summary className="cursor-pointer font-semibold text-indigo-400 flex items-center justify-between select-none">
              <span className="flex items-center space-x-1.5">
                <Zap className={`w-3.5 h-3.5 ${isActivelyThinking ? "text-amber-400 animate-spin" : "text-indigo-400"}`} />
                <span>
                  {isActivelyThinking ? "Qwen 35B is actively reasoning (streaming thoughts)..." : "Qwen 35B Reasoning Trace"}
                </span>
              </span>
              <span className="text-[10px] text-slate-500 font-normal">
                {isActivelyThinking ? "Live stream" : "Click to view reasoning"}
              </span>
            </summary>
            <div className="mt-2 text-[11px] font-mono text-slate-400 whitespace-pre-wrap leading-relaxed border-t border-slate-800/80 pt-2">
              {thinkingPart}
            </div>
          </details>
        )}

        {/* If actively thinking with no main text yet, show live status */}
        {isActivelyThinking && (
          <div className="flex items-center space-x-2 text-xs text-cyan-300 italic animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Formulating verified exam answer...</span>
          </div>
        )}

        {/* Main Content */}
        {parts.map((p, idx) => {
          if (p.type === "code") {
            const blockId = `code-block-${idx}`;
            const isBlockCopied = copiedId === blockId;
            return (
              <div key={idx} className="relative my-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <span className="uppercase text-cyan-400 font-bold">{p.language}</span>
                  <button
                    onClick={() => handleCopyText(blockId, p.code)}
                    className="flex items-center space-x-1 hover:text-white transition"
                    title="Copy code"
                  >
                    {isBlockCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
                  <code>{p.code}</code>
                </pre>
              </div>
            );
          } else {
            return <MarkdownRenderer key={idx} content={p.content} />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-900/95 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[780px]">
      
      {/* Top Bar */}
      <div className="p-4 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Status */}
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg ${
            provider === "gemini"
              ? "bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 shadow-purple-600/30"
              : "bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-blue-600/30"
          }`}>
            {provider === "gemini" ? <Sparkles className="w-5 h-5 text-amber-300" /> : <Bot className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">
                {provider === "gemini" ? "Google Gemini Exam Tutor" : "Local AI Exam Tutor"}
              </h3>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                provider === "gemini"
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                  : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
              }`}>
                {provider === "gemini" ? geminiModel : model}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              {provider === "gemini" ? (
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-medium">Google Gemini Cloud Active</span>
                  <span>&bull;</span>
                  <span className="text-slate-500">.env.local</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                    }`}
                  />
                  <span className={isConnected ? "text-emerald-400 font-medium" : "text-rose-400"}>
                    {isCheckingConnection
                      ? "Checking..."
                      : isConnected
                      ? "Ollama Connected"
                      : "Ollama Offline"}
                  </span>
                  <span>&bull;</span>
                  <span className="font-mono text-slate-500">{endpoint}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Primary Provider Toggle */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => handleSwitchProvider("ollama")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              provider === "ollama"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>💻 Local Ollama</span>
          </button>

          <button
            onClick={() => handleSwitchProvider("gemini")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
              provider === "gemini"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>✨ Google Gemini API</span>
          </button>
        </div>

        {/* Model Sub-Selectors */}
        <div className="flex items-center space-x-1">
          {provider === "gemini" ? (
            <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => handleSelectGeminiModel("gemini-3.6-flash")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                  geminiModel === "gemini-3.6-flash"
                    ? "bg-purple-600 text-white shadow-sm ring-1 ring-purple-400"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Gemini 3.6 Flash: Latest Google flagship model (~0.8s), recommended for monthly exam questions"
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span>⚡ 3.6 Flash (~0.8s)</span>
              </button>

              <button
                onClick={() => handleSelectGeminiModel("gemini-3.5-flash")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                  geminiModel === "gemini-3.5-flash"
                    ? "bg-purple-600 text-white shadow-sm ring-1 ring-purple-400"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Gemini 3.5 Flash: High-speed stable model"
              >
                <span>⚡ 3.5 Flash</span>
              </button>

              <button
                onClick={() => handleSelectGeminiModel("gemini-1.5-pro")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition ${
                  geminiModel === "gemini-1.5-pro"
                    ? "bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Gemini 1.5 Pro: Deep reasoning & complex code analysis"
              >
                <Cpu className="w-3 h-3 text-cyan-300" />
                <span>🧠 1.5 Pro</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setModel("qwen2.5:3b")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                  model === "qwen2.5:3b"
                    ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Qwen 2.5 3B: Runs 100% in GPU VRAM, responds in 2-5 seconds"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>⚡ Fast (Qwen 3B &bull; ~3s)</span>
              </button>

              <button
                onClick={() => setModel("qwen3.6-35b-opt:latest")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                  model === "qwen3.6-35b-opt:latest"
                    ? "bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Qwen 35B: 35B MoE, runs 58% on CPU, takes ~45-90s for deep reasoning"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                <span>🧠 Deep (Qwen 35B)</span>
              </button>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center space-x-1 ml-1">
            {provider === "ollama" && (
              <button
                onClick={checkConnection}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                title="Refresh Ollama connection"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCheckingConnection ? "animate-spin" : ""}`} />
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg border transition flex items-center space-x-1 ${
                showSettings
                  ? "bg-purple-600 text-white border-purple-500"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700"
              }`}
              title="Provider & Model Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleClearChat}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition"
              title="Clear conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Speed & Provider Performance Notice */}
      <div className="px-4 py-2 bg-slate-950/95 border-b border-slate-800/60 text-xs">
        {provider === "gemini" ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-purple-200">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span>
                <strong className="text-purple-300">Google Gemini Active ({geminiModel}):</strong> Ultra-fast cloud streaming (~0.8s) powered by <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300 font-mono text-[11px]">.env.local</code>. Zero CPU/GPU overhead on your laptop.
              </span>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleSwitchProvider("ollama")}
                className="text-cyan-400 hover:text-cyan-300 font-medium underline text-[11px]"
              >
                Switch to Local Ollama &rarr;
              </button>
            </div>
          </div>
        ) : model === "qwen3.6-35b-opt:latest" ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
              <span>
                <strong className="text-amber-300">Qwen 35B Active:</strong> 35.5B parameters (running 58% on CPU + 42% on GPU). Thinking models generate deep internal reasoning before replying (~45–90s).
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setModel("qwen2.5:3b")}
                className="text-emerald-400 hover:text-emerald-300 font-bold underline shrink-0 cursor-pointer"
              >
                ⚡ Fast Qwen 3B (~3s) &rarr;
              </button>
              <span>or</span>
              <button
                onClick={() => handleSwitchProvider("gemini")}
                className="text-purple-400 hover:text-purple-300 font-bold underline shrink-0 cursor-pointer"
              >
                ✨ Use Gemini Cloud (~0.8s) &rarr;
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-emerald-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span>
                <strong>⚡ Fast Mode Active ({model}):</strong> Fits 100% in GPU VRAM. Provides instant exam answers in ~2–5 seconds!
              </span>
            </div>
            <button
              onClick={() => handleSwitchProvider("gemini")}
              className="text-purple-400 hover:text-purple-300 font-semibold underline text-[11px]"
            >
              Try Google Gemini (~0.8s) &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Expandable Settings Drawer */}
      {showSettings && (
        <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-5 space-y-4 animate-in slide-in-from-top-2 duration-150 text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Active AI Provider:</label>
              <select
                value={provider}
                onChange={(e) => handleSwitchProvider(e.target.value as "ollama" | "gemini")}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono text-xs font-semibold"
              >
                <option value="gemini">✨ Google Gemini (Cloud API)</option>
                <option value="ollama">💻 Local Ollama (Offline)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Gemini Model:</label>
              <select
                value={geminiModel}
                onChange={(e) => handleSelectGeminiModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-purple-500 font-mono text-xs"
              >
                <option value="gemini-3.6-flash">gemini-3.6-flash (Recommended &bull; ~0.8s)</option>
                <option value="gemini-3.5-flash">gemini-3.5-flash (Fast &bull; Stable)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (Deep Reasoning & Code)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Local Ollama Model:</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-xs"
              >
                {availableModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-400 font-medium">Temperature: {temperature}</label>
                <span className="text-slate-500 text-[10px]">0.0 = exact, 1.0 = creative</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-500 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Ollama Server Endpoint:
                <span className="text-slate-500 font-normal ml-1">
                  (Default: <code>http://127.0.0.1:11434</code> or your Cloudflare/Ngrok URL)
                </span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => {
                    setEndpoint(e.target.value);
                    try { localStorage.setItem("exam_ollama_endpoint", e.target.value); } catch {}
                  }}
                  placeholder="http://127.0.0.1:11434 or https://xxxx.trycloudflare.com"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={checkConnection}
                  disabled={isCheckingConnection}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-200 font-medium text-xs transition"
                >
                  {isCheckingConnection ? "Testing..." : "Test"}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span>
                <strong>Cloud Hosting Tip:</strong> When using Vercel, tunnel your local Ollama using Cloudflare (<code>cloudflared tunnel --url http://localhost:11434</code>) or use <strong>✨ Google Gemini API</strong> for 24/7 cloud access.
              </span>
            </div>
          </div>

          {/* System Prompt Customizer */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-400 font-medium">System Prompt Instructions:</label>
              <button
                onClick={() => setSystemPrompt(DEFAULT_SYSTEM_PROMPT)}
                className="text-blue-400 hover:text-blue-300 text-[11px]"
              >
                Reset to Default
              </button>
            </div>
            <textarea
              rows={2}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-blue-500 text-xs font-mono"
            />
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[94%] sm:max-w-[88%] rounded-2xl p-4 sm:p-5 shadow-lg ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-slate-900/95 text-slate-100 border border-slate-800 rounded-tl-sm"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] opacity-75 mb-2 pb-1.5 border-b border-slate-800/60">
                  <span className="font-semibold flex items-center space-x-1.5">
                    {isUser ? (
                      <span>You</span>
                    ) : provider === "gemini" ? (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-300 inline" />
                        <span className="text-purple-300 font-bold">Google Gemini ({geminiModel})</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-3 h-3 text-cyan-400 inline" />
                        <span className="text-cyan-300 font-bold">Ollama AI Tutor ({model})</span>
                      </>
                    )}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{msg.timestamp}</span>
                </div>

                {isUser ? (
                  <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  renderFormattedContent(msg.content, isStreaming && idx === messages.length - 1)
                )}
              </div>
            </div>
          );
        })}

        {/* Streaming Cursor */}
        {isStreaming && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 pl-10 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {provider === "gemini"
                ? `Google Gemini (${geminiModel}) is streaming response...`
                : `${model} is thinking & generating tokens...`}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Questions Drawer */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Quick Prompts:</span>
        </span>
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            disabled={isStreaming}
            onClick={() => handleSendMessage(qp.prompt)}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700/50 transition disabled:opacity-50"
          >
            {qp.title}
          </button>
        ))}
      </div>

      {/* Input Box Area */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="relative flex items-center">
          <textarea
            rows={1}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask Qwen 35B about Neo4j Cypher, Ollama commands, RAG, agents, or exam traps..."
            disabled={isStreaming}
            className="w-full pl-4 pr-24 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none disabled:opacity-60"
          />

          <div className="absolute right-2 flex items-center space-x-1.5">
            {isStreaming ? (
              <button
                onClick={handleStopStream}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center space-x-1 transition shadow"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputPrompt.trim()}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white disabled:text-slate-500 transition shadow"
                title="Send message (Enter)"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for newline</span>
          <button
            type="button"
            onClick={() => handleSwitchProvider(provider === "gemini" ? "ollama" : "gemini")}
            className="flex items-center space-x-1.5 font-mono text-[10px] px-2 py-0.5 rounded-md hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-700"
            title="Click to switch between Google Gemini Cloud and Local Ollama"
          >
            {provider === "gemini" ? (
              <>
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                <span className="text-purple-300 font-semibold">✨ Gemini Cloud ({geminiModel})</span>
                <span className="text-slate-500 text-[9px] underline">(Switch)</span>
              </>
            ) : (
              <>
                <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="text-cyan-300 font-semibold">💻 Local Ollama ({model})</span>
                <span className="text-slate-500 text-[9px] underline">(Switch)</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
