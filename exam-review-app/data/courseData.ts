export interface ModuleTopic {
  id: string;
  title: string;
  isHighlighted: boolean;
  summary: string;
  details: string[];
  keyTakeaway?: string;
  formula?: string;
}

export interface CourseModule {
  id: string;
  number: string;
  title: string;
  description: string;
  color: string;
  topics: ModuleTopic[];
}

export interface CodeSnippet {
  id: string;
  moduleId: string;
  title: string;
  language: string;
  description: string;
  code: string;
  explanation: string[];
  examTraps: string[];
}

export interface QuizQuestion {
  id: number;
  partId: 'part1' | 'part2' | 'part3' | 'part4';
  partTitle: string;
  subtopic: string;
  moduleId: string;
  type: 'qcm' | 'true-false' | 'fill-in-blank' | 'open-question';
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctIndex?: number;
  acceptedAnswers?: string[];
  placeholder?: string;
  modelAnswer?: string;
  keyPoints?: string[];
  explanation: string;
  slideRef: string;
}

export interface Flashcard {
  id: number;
  moduleId: string;
  front: string;
  back: string;
  category: string;
}

export interface CommandFlag {
  flag: string;
  description: string;
}

export interface CLICommand {
  id: string;
  category: "ollama" | "docker" | "graphrag" | "vllm" | "validation" | "curl" | "pip" | "cypher";
  categoryLabel: string;
  title: string;
  command: string;
  description: string;
  flags?: CommandFlag[];
  exampleOutput?: string;
  examWarning: string;
  slideRef: string;
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "mod04",
    number: "04",
    title: "Workflow Engineering with LLM Frameworks",
    description: "Chaining patterns, State vs Memory persistence, Document Ingestion pipelines, and Orchestration with LangGraph, LangChain, and LlamaIndex.",
    color: "blue",
    topics: [
      {
        id: "m4-1",
        title: "Introduction to LLM Workflow",
        isHighlighted: true,
        summary: "An AI Workflow combines multiple LLM calls, tool usages, and data-processing steps into an organized, automated pipeline.",
        details: [
          "Problem Statement: A single prompt is like an intern with great memory but no structure. Asking it to write, test, and deploy a whole project in one prompt fails due to context limits, hallucination, and lack of structure.",
          "Solution: Workflows decompose complex problems into small, reliable, validated steps where each step can use different specialized models.",
          "The 4 Levels of AI Automation: Level 1 (Single Q&A prompting) -> Level 2 (Chaining fixed workflows) -> Level 3 (Agents with dynamic loops) -> Level 4 (Autonomous Multi-Agent systems).",
          "Core Components: LLM (the brain), Tools (external actions), Memory (long-term retention), State (execution context), Orchestrator (control flow), and Guardrails/Safety."
        ],
        keyTakeaway: "Workflows bring structure, determinism, and modularity to stochastic language models."
      },
      {
        id: "m4-2",
        title: "Chaining & Execution Patterns",
        isHighlighted: true,
        summary: "Chaining connects multiple LLMs or their outputs to tools/services where output of step N becomes input to step N+1.",
        details: [
          "Workflow vs Chain: A chain is an execution pattern; a workflow is the complete automated system. A workflow can exist without chaining (e.g. single-inference augmented RAG or parallel fan-out).",
          "Why Chaining Matters: Decomposes giant tasks into focused specialists, overcomes context limits, improves reliability, and enables targeted debugging and evaluation.",
          "Sequential Chain: Linear, deterministic pipeline executed in fixed order. Best for predictable processes (e.g., Extract risks -> Translate to Khmer -> Format email).",
          "Conditional Routing: Incorporates dynamic 'if-then' branching logic at runtime based on classification or state (e.g., Customer service routing to Pricing, Refund, or Tech Support)."
        ],
        keyTakeaway: "Sequential chains enforce fixed pipelines; Conditional routing dynamically directs execution."
      },
      {
        id: "m4-3",
        title: "Managing State, Memory, and Persistence",
        isHighlighted: true,
        summary: "State manages the short-term current execution run; Memory records long-term facts and habits across multiple sessions.",
        details: [
          "State (Short-term): Current inputs, intermediate variables, tool outputs, step pointer. Temporary, cleared after task completion.",
          "Memory (Long-term): Preferences, user history, persistent facts. Intentionally retained in a database across sessions.",
          "LangGraph Mapping: Short-term memory is handled by Checkpointer (InMemorySaver, PostgresSaver) scoped by thread_id; Long-term memory is handled by Store (InMemoryStore) scoped by namespaces (e.g., users, user_123).",
          "Why Critical: Without proper management, users must repeat info, token costs spike, and workflows cannot recover from mid-run failures."
        ],
        keyTakeaway: "State = current task context; Memory = cross-session knowledge; Checkpointer = survivable pause/resume."
      },
      {
        id: "m4-4",
        title: "Document Ingestion Pipelines",
        isHighlighted: true,
        summary: "The offline preparation process transforming raw files (PDFs, DOCX, CSVs) into structured, searchable knowledge.",
        details: [
          "Step 1 (Loading): Data readers (e.g., SimpleDirectoryReader) convert raw files into standardized Document objects with stable IDs.",
          "Step 2 (Check Cache/Hash): Docstore checks cryptographic content hash (doc_id -> hash). Unchanged files are skipped, saving compute and embedding costs.",
          "Step 3 (Transformations): Chunking (SentenceSplitter) -> Metadata Extraction (TitleExtractor) -> Embedding Generation.",
          "Step 4 (Save to Vector Store): Persists chunk nodes, metadata, and vectors into the vector database (upsert support)."
        ],
        keyTakeaway: "Cache hashing avoids costly re-embeddings; transformations make raw documents retrieval-ready."
      },
      {
        id: "m4-5",
        title: "Modular Workflow Design",
        isHighlighted: true,
        summary: "Building applications as small, independently swappable pieces connected through standard interfaces.",
        details: [
          "Four Layers: Model Layer (swappable LLM access), Orchestration Layer (sequencing & state), Data Layer (retrieval & embeddings), Observability & Guardrails Layer (tracing & validation).",
          "Three Principles: Single Responsibility (one job per piece), Standard Interfaces (plug-and-play swappability), Composability (linking blocks together via shared formats)."
        ]
      }
    ]
  },
  {
    id: "mod05",
    number: "05",
    title: "Module 1: RAG Fundamentals",
    description: "The 5-stage RAG pipeline, Embeddings, Similarity search metrics (Cosine, Dot Product, Euclidean), Chunking strategies, and Vector Database setup (ChromaDB).",
    color: "emerald",
    topics: [
      {
        id: "m5-1",
        title: "RAG Architecture Overview & Comparison",
        isHighlighted: true,
        summary: "Connects an LLM to an external knowledge base to retrieve relevant context before generating an answer.",
        details: [
          "Why RAG Exists: Solves LLM weaknesses: Hallucination (grounds in real text), Staleness (accesses recent data), No Private Data (connects company docs), and Costly Updates (just update documents, no retraining).",
          "Two Pipelines: Offline setup pipeline (Ingest -> Chunk -> Embed -> Vector DB) runs once. Online query pipeline (Query -> Embed Query -> Retrieve -> Augment -> Generate) runs on every question.",
          "RAG vs Fine-Tuning vs Long-Context: RAG is for dynamic facts & citations; Fine-tuning is for style/format behavior; Long-context is for one-off ad-hoc analysis with high per-query token cost."
        ],
        keyTakeaway: "Documents are embedded once offline; only the query is embedded live at runtime."
      },
      {
        id: "m5-2",
        title: "Embeddings & Similarity Search",
        isHighlighted: true,
        summary: "Dense numerical vector representations of meaning, enabling semantic search beyond exact keywords.",
        details: [
          "What an Embedding is: A high-dimensional vector (e.g., 768 dims) where concepts with similar meanings sit close together.",
          "Cosine Similarity: Measures the angle between vectors (invariant to text length). Range -1 to 1 (0 to 1 for normalized vectors).",
          "Dot Product: Takes into account both angle and magnitude. When vectors are unit-normalized, Dot Product equals Cosine Similarity and is faster.",
          "Euclidean Distance (L2): Straight-line geometric distance. Lower distance means higher similarity.",
          "Top-k vs Threshold: Top-k guarantees k chunks (may include noise); Threshold filters by minimum similarity score (can return zero chunks to refuse)."
        ],
        formula: "Cosine = (A · B) / (||A|| ||B||) | Dot Product = Σ(A_i * B_i)"
      },
      {
        id: "m5-3",
        title: "Chunking Strategies & Overlap",
        isHighlighted: true,
        summary: "Dividing long documents into retrieval-ready segments to optimize context window and precision.",
        details: [
          "Why Chunk Size Matters: Small chunks (100-250 tok) have high precision but lack context; Large chunks (1000+ tok) preserve context but dilute specific facts and crowd the prompt.",
          "Chunk Overlap (10-20%, 50-100 tok): Repeats boundary tokens so sentences cut in the middle appear completely intact in at least one chunk.",
          "Recursive Splitting: Cuts at natural boundaries: Paragraphs (\\n\\n) -> Sentences (. ) -> Words ( ).",
          "Document-Structure-Aware: Splits along Markdown headers, HTML tags, or code blocks to preserve tables and functional structures."
        ]
      },
      {
        id: "m5-4",
        title: "Vector Databases (ChromaDB, Qdrant, Pgvector)",
        isHighlighted: true,
        summary: "Specialized databases using Approximate Nearest Neighbor (HNSW) algorithms for fast high-dimensional search.",
        details: [
          "Difference from Traditional DB: Traditional DBs use B-trees for exact relational matches (WHERE id = 5). Vector DBs use HNSW graphs to find nearest semantic vectors in sub-linear time O(log N).",
          "Embedded/Local (ChromaDB): Runs in-process, zero Docker, fastest path for prototypes up to 1M vectors.",
          "Client-Server (Qdrant, Milvus): Standalone service via Docker, handles multi-user concurrency, horizontal scale, and rich payload filtering.",
          "Relational Extension (Pgvector): Adds vector indexing to PostgreSQL, keeping relational and vector data in one database."
        ]
      }
    ]
  },
  {
    id: "mod06",
    number: "06",
    title: "Module 2: Advanced RAG Architecture & Evaluation",
    description: "Hybrid keyword + vector retrieval (BM25 + RRF), Graph RAG, Agentic self-reflective loops, Cross-Encoder reranking, and Context Management.",
    color: "indigo",
    topics: [
      {
        id: "m6-1",
        title: "Hybrid Retrieval: Keyword + Vector Search",
        isHighlighted: true,
        summary: "Combines dense vector search with sparse BM25 search to eliminate the blind spots of both approaches.",
        details: [
          "Dense Blind Spots: Fails on tokens carrying identity rather than meaning (SKU part numbers, error codes like E-1147, rare acronyms).",
          "BM25 Blind Spots: Matches exact strings, failing on synonyms (car vs automobile), paraphrases, and translations (vocabulary mismatch problem).",
          "BM25 Parameters: k1 (1.2-2.0) controls term frequency saturation; b (0.75) normalizes for document length relative to avgdl.",
          "Reciprocal Rank Fusion (RRF): Discards raw scores and fuses solely by rank position. Standard k = 60. Agreement wins!"
        ],
        formula: "RRF(d) = Σ 1 / (k + rank_i(d)), where k = 60"
      },
      {
        id: "m6-2",
        title: "Graph RAG (Microsoft Approach)",
        isHighlighted: true,
        summary: "Connects knowledge across chunks using entity-relationship graphs to answer multi-hop and thematic questions.",
        details: [
          "Chunk Limitations: Fails on multi-hop questions (vendor in Chunk 14, supplier in Chunk 902) and global thematic questions (summarize 400 reports).",
          "Graph Construction (Offline): Entity Extraction -> Relationship Extraction (Triples: Subject -[REL]-> Object) -> Duplicate Resolution -> Neo4j MERGE.",
          "Hierarchical Leiden Clustering: Partitions graph into communities across hierarchical levels (Level 0 broad themes to Level 2 fine-grained clusters).",
          "Local vs Global Querying: Local search walks 1-2 hops from named entities; Global search runs map-reduce over community summary reports."
        ]
      },
      {
        id: "m6-3",
        title: "Agentic RAG & Self-Reflection",
        isHighlighted: true,
        summary: "The retrieval strategy is chosen dynamically at runtime by the model in an iterative loop.",
        details: [
          "What Makes it Agentic: Decision loop (Retrieve -> Judge -> Rewrite -> Retrieve Again), tool selection, and state that survives steps.",
          "Self-Reflective Checks: Check 1 (Are retrieved chunks relevant? Filter no's), Check 2 (Is draft answer grounded in context? Catches hallucinations), Check 3 (Does it answer the user's question?).",
          "Execution Caps: Must enforce hard stopping conditions (max 3 iterations) to prevent infinite loops on unanswerable questions."
        ]
      },
      {
        id: "m6-4",
        title: "Reranking with Cross-Encoders",
        isHighlighted: true,
        summary: "Uses full cross-attention to rescore a candidate shortlist, dramatically raising precision.",
        details: [
          "Bi-Encoder vs Cross-Encoder: Bi-Encoder embeds query and doc separately (two towers, fast vector search); Cross-Encoder feeds [CLS] query [SEP] doc into one model with full cross-attention.",
          "Two-Stage Pipeline: Stage 1 Recall (Hybrid retrieves top-50 candidates in ms) -> Stage 2 Precision (Cross-Encoder reranks all 50 pairs and keeps top-5 in 100-300ms).",
          "Popular Rerankers: BAAI/bge-reranker-base (CPU-friendly local default), ms-marco-MiniLM-L-6-v2 (fastest), Cohere Rerank (API)."
        ]
      },
      {
        id: "m6-5",
        title: "Context Management & Lost in the Middle",
        isHighlighted: true,
        summary: "Budgeting context tokens, deduplicating chunks, and reordering to prevent attention degradation.",
        details: [
          "Lost in the Middle: Accuracy drops when critical facts sit in the middle of a prompt. Models attend best to the beginning and the end.",
          "Fix (Reordering): Even/odd split places Rank 1 first, Rank 2 last, and buries weaker chunks in the middle.",
          "Deduplication: Overlap duplicates (hash normalized text) and Semantic duplicates (Maximal Marginal Relevance - MMR filter with threshold 0.92)."
        ]
      }
    ]
  },
  {
    id: "mod07",
    number: "07",
    title: "Autonomous Agents & Tool Integration",
    description: "Tool Calling lifecycle, Schema vs Business validation, Bounded Actions, Agent Patterns, Harness Kernel, MCP Server, and Human-in-the-Loop design.",
    color: "rose",
    topics: [
      {
        id: "m7-1",
        title: "Tool Calling with Local Models",
        isHighlighted: true,
        summary: "The mechanism allowing an LLM to request named actions with structured arguments outside itself.",
        details: [
          "Fundamental Rule: 'The model requests the action; the application executes it.'",
          "Lifecycle (6 Steps): 1. User request -> 2. Model decides -> 3. Structured tool call emitted -> 4. Application executes -> 5. Tool result produced -> 6. Result returned to model for next decision.",
          "Local Model Reality: Local models in Ollama have no direct sockets or shell access. They emit structured strings asking the host Python app to run the tool."
        ],
        keyTakeaway: "The model proposes. The application executes."
      },
      {
        id: "m7-2",
        title: "Structured Function Invocation & Validation",
        isHighlighted: true,
        summary: "Schemas act as API contracts making model requests checkable before anything executes.",
        details: [
          "Tool Schema Anatomy: name, description (guides the model when to call it), parameters (JSON Schema with types & required fields), output schema.",
          "Schema Validation vs Business Validation: Schema checks well-formedness (types, required fields); Business checks domain rules and DB state (is item in stock? does user have permission?).",
          "Exam Quote: 'A valid schema does not guarantee a valid argument (-5 is a valid integer, but not a valid product ID).'",
          "Structured Output vs Tool Call: Structured output returns data in JSON mode; Tool call requests an external action."
        ]
      },
      {
        id: "m7-3",
        title: "Bounded Actions & Failure Boundaries",
        isHighlighted: true,
        summary: "Giving agents capabilities while strictly bounding resources, risk tiers, and error recovery.",
        details: [
          "Least Privilege: Never expose raw eval(), exec(), raw shell, or unparameterized SQL. Use allowlists of narrow tools.",
          "Risk Ladder: Green/Read (auto-execute: check_stock), Yellow/Write (auto-execute with audit & rollback: update_address), Red/Destructive (strict human approval: delete_order).",
          "Failure Boundaries: Wrap tool calls in granular handlers so exceptions become sanitized observations. The agent observes the error and self-corrects.",
          "Execution Boundaries: Hard limits on MAX_ITERATIONS (e.g. 10 steps), timeouts, rate limits, and retry limits."
        ]
      },
      {
        id: "m7-4",
        title: "Agent Patterns & Harness Architecture",
        isHighlighted: true,
        summary: "Structural patterns for decision loops and the kernel layer that surrounds them with control.",
        details: [
          "5 Core Patterns: ReAct (Thought -> Action -> Observation loop), Router (classifier routes to specialist), Planner-Executor (plan upfront, execute, replan on failure), Reflection (Generator -> Critic -> Reviser), Multi-Agent (supervisor delegates to specialists).",
          "The Harness OS-Kernel Analogy: The Model is an untrusted CPU (generates instructions); the Harness is the Kernel (enforces syscalls, permissions, sandboxes, and budgets).",
          "Harness Request Path: Input -> State -> LLM Proposes -> Security Checkpoint -> Execution Control -> Sandboxed Execution -> Error Sanitization -> State."
        ]
      },
      {
        id: "m7-5",
        title: "MCP Server & Human-in-the-Loop",
        isHighlighted: true,
        summary: "Standard protocol for host-tool communication and gating high-stakes actions.",
        details: [
          "Model Context Protocol (MCP): Solves the M x N problem by standardizing discovery and invocation between hosts (Claude, IDEs) and servers.",
          "Three Primitives: Tools (model-called actions), Resources (readable data attachments), Prompts (user slash commands).",
          "Transports: stdio (local subprocess, lifecycle tied to parent) vs Streamable HTTP (remote service, needs auth).",
          "HITL vs HOTL vs HOOTL: Human-IN-the-loop (halts execution until approved); Human-ON-the-loop (executes with live rollback audit); Human-OUT-of-the-loop (full autonomy for read-only tasks).",
          "Interrupt & Resume: Gated tools serialize state as SUSPENDED in durable storage, display a review card with literal arguments, and resume upon approval."
        ]
      }
    ]
  }
];

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: "code-1",
    moduleId: "mod04",
    title: "LlamaIndex: Ingestion Pipeline with Docstore Hash Caching",
    language: "python",
    description: "Loads documents, splits into nodes, and checks content hashes in the docstore to skip unchanged files.",
    code: `from llama_index.core import SimpleDirectoryReader, StorageContext
from llama_index.core.ingestion import IngestionPipeline, DocstoreStrategy
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.extractors import TitleExtractor
from llama_index.core.storage.docstore import SimpleDocumentStore

# 1. Loading documents with stable deterministic IDs
documents = SimpleDirectoryReader(
    input_dir="./data",
    filename_as_id=True
).load_data()

# 2. Attach docstore to maintain cryptographic content hashes
docstore = SimpleDocumentStore()

# 3. Define transformations (Chunking + Metadata)
pipeline = IngestionPipeline(
    transformations=[
        SentenceSplitter(chunk_size=512, chunk_overlap=50),
        TitleExtractor(nodes=5),
    ],
    docstore=docstore,
    docstore_strategy=DocstoreStrategy.UPSERTS
)

# 4. Run pipeline (skips unchanged documents automatically!)
nodes = pipeline.run(documents=documents, show_progress=True)`,
    explanation: [
      "filename_as_id=True ensures consistent document IDs across recurring ingestion runs.",
      "The docstore hashes the document content. If the hash matches an existing record, the pipeline skips processing it entirely.",
      "Chunk overlap (50 tokens) prevents concepts cut at boundaries from losing context."
    ],
    examTraps: [
      "Omitting the docstore means every ingestion run will re-chunk and re-embed all documents, running up massive API bills.",
      "Chunk overlap is NOT redundant waste—it is essential for sentence continuity."
    ]
  },
  {
    id: "code-2",
    moduleId: "mod04",
    title: "LangGraph: StateGraph, Conditional Routing & Checkpointing",
    language: "python",
    description: "Defines a stateful graph with conditional edges, Command routing, and InMemorySaver short-term memory.",
    code: `from typing import TypedDict, Literal
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.types import Command

# 1. Shared State Schema
class State(TypedDict):
    ticket: str
    category: str
    tries: int

# 2. Node using modern Command (updates state + chooses next destination)
def classifier_node(state: State) -> Command[Literal["billing_agent", "tech_agent"]]:
    ticket_text = state["ticket"].lower()
    new_tries = state["tries"] + 1
    if "refund" in ticket_text or "invoice" in ticket_text:
        return Command(update={"category": "billing", "tries": new_tries}, goto="billing_agent")
    return Command(update={"category": "tech", "tries": new_tries}, goto="tech_agent")

def billing_agent(state: State) -> dict:
    return {"ticket": f"Processed billing for: {state['ticket']}"}

def tech_agent(state: State) -> dict:
    return {"ticket": f"Processed tech support for: {state['ticket']}"}

# 3. Assemble and compile graph with Checkpointer
builder = StateGraph(State)
builder.add_node("classifier", classifier_node)
builder.add_node("billing_agent", billing_agent)
builder.add_node("tech_agent", tech_agent)

builder.add_edge(START, "classifier")
builder.add_edge("billing_agent", END)
builder.add_edge("tech_agent", END)

# Checkpointer manages short-term memory per thread_id
checkpointer = InMemorySaver()
app = builder.compile(checkpointer=checkpointer)

# 4. Invoke with thread_id
config = {"configurable": {"thread_id": "session-user-42"}}
result = app.invoke({"ticket": "I need a refund for my order", "tries": 0}, config)`,
    explanation: [
      "StateGraph(State) establishes the shared typed data structure flowing through the nodes.",
      "Command is a modern primitive that updates the state and directs the graph (goto='billing_agent') in one return call.",
      "InMemorySaver handles short-term memory scoped to config['configurable']['thread_id']."
    ],
    examTraps: [
      "Calls with the same thread_id share conversational history; different thread_ids start completely fresh conversations.",
      "InMemorySaver is RAM-only. When the process restarts, all checkpoints are erased. Use PostgresSaver in production."
    ]
  },
  {
    id: "code-3",
    moduleId: "mod05",
    title: "ChromaDB: Local In-Process Setup, Collection & CRUD",
    language: "python",
    description: "Sets up local in-process ChromaDB, creates a collection, adds text documents with metadata, and queries with similarity search.",
    code: `import chromadb

# 1. Initialize client (PersistentClient saves to disk; Client() is in-memory)
client = chromadb.PersistentClient(path="./chroma_db")

# 2. Create or get collection
collection = client.get_or_create_collection(
    name="company_policies",
    metadata={"hnsw:space": "cosine"} # Set distance metric
)

# 3. Add documents (Chroma automatically embeds using default model if none specified)
collection.add(
    ids=["chunk_001", "chunk_002", "chunk_003"],
    documents=[
        "Employees can request up to 20 days paid annual leave.",
        "Annual plan subscriptions can be refunded within 30 days of purchase.",
        "Health insurance coverage begins on the first day of the calendar month."
    ],
    metadatas=[
        {"dept": "HR", "category": "benefits"},
        {"dept": "Billing", "category": "refunds"},
        {"dept": "HR", "category": "insurance"}
    ]
)

# 4. Query top-k with metadata filtering
results = collection.query(
    query_texts=["Can I get money back for my yearly plan?"],
    n_results=2,
    where={"dept": "Billing"} # Payload filtering before similarity ranking
)

print("Top matched chunk ID:", results["ids"][0][0])
print("Document content:", results["documents"][0][0])
print("Distance:", results["distances"][0][0])`,
    explanation: [
      "PersistentClient(path=...) persists embeddings to local storage, unlike in-memory Client().",
      "where={'dept': 'Billing'} filters candidate vectors by metadata before returning the closest matches.",
      "Lower distance means higher similarity under Chroma's cosine distance calculation."
    ],
    examTraps: [
      "In Chroma, results['ids'] is a nested list: results['ids'][0] holds the IDs for the first query.",
      "Chroma distances represent distance, NOT similarity logits. Smaller distance = closer match!"
    ]
  },
  {
    id: "code-4",
    moduleId: "mod06",
    title: "Hybrid Retrieval & Reciprocal Rank Fusion (RRF)",
    language: "python",
    description: "Combines sparse BM25 keyword matching with dense vector retrieval using 1-based RRF fusion.",
    code: `from rank_bm25 import BM25Okapi

# 1. Setup sparse BM25 index
corpus_tokens = [chunk["text"].lower().split() for chunk in chunks]
bm25 = BM25Okapi(corpus_tokens, k1=1.5, b=0.75)

def sparse_search(query: str, top_n: int = 50) -> list[str]:
    query_tokens = query.lower().split()
    scores = bm25.get_scores(query_tokens)
    ranked_indices = sorted(range(len(scores)), key=lambda i: -scores[i])
    return [chunks[i]["id"] for i in ranked_indices[:top_n]]

def dense_search(query: str, top_n: int = 50) -> list[str]:
    res = collection.query(query_texts=[query], n_results=top_n)
    return res["ids"][0]

# 2. Reciprocal Rank Fusion (RRF) Algorithm
def reciprocal_rank_fusion(*ranked_lists, k: int = 60, top_k: int = 5) -> list[str]:
    """Combines multiple ranked lists using RRF score = sum(1 / (k + rank))."""
    fused_scores = {}
    for id_list in ranked_lists:
        # CRITICAL: rank must be 1-based (start=1)
        for rank, doc_id in enumerate(id_list, start=1):
            fused_scores[doc_id] = fused_scores.get(doc_id, 0.0) + (1.0 / (k + rank))
    
    # Sort descending by fused score
    sorted_ids = sorted(fused_scores, key=fused_scores.get, reverse=True)
    return sorted_ids[:top_k]

# Run Stage 1: Retrieve broad (50 each), fuse to top-5
fused_top5 = reciprocal_rank_fusion(dense_search("error code E-1147"), sparse_search("error code E-1147"))`,
    explanation: [
      "BM25 handles exact tokens (E-1147); dense handles semantic concepts.",
      "RRF uses enumerate(..., start=1) to ensure the first item gets 1 / (60 + 1). Starting at 0 breaks the formula.",
      "The join key between both searches is the stable chunk ID."
    ],
    examTraps: [
      "Enumerate without start=1 uses 0-based indexing, skewing the math.",
      "RRF does NOT normalize scores; it deliberately throws away raw scores and compares positions only."
    ]
  },
  {
    id: "code-5",
    moduleId: "mod06",
    title: "Two-Stage Retrieval & Cross-Encoder Reranker",
    language: "python",
    description: "Scores candidate pairs with full cross-attention and reorders chunks to eliminate the Lost-in-the-Middle penalty.",
    code: `from sentence_transformers import CrossEncoder

# LOAD ONCE at module level (never inside the query handler!)
reranker = CrossEncoder("BAAI/bge-reranker-base", max_length=512)

def rerank_stage2(query: str, candidate_chunks: list[dict], top_k: int = 5) -> list[dict]:
    # Form (query, passage) pairs for joint token attention
    pairs = [(query, chunk["text"]) for chunk in candidate_chunks]
    
    # Predict relevance logits
    scores = reranker.predict(pairs, batch_size=16)
    
    # Sort descending (higher logit = more relevant)
    ranked = sorted(zip(candidate_chunks, scores), key=lambda x: x[1], reverse=True)
    return [chunk for chunk, _ in ranked[:top_k]]

def reorder_for_lost_in_middle(chunks: list[dict]) -> list[dict]:
    """Puts Rank 1 at head, Rank 2 at tail, weakest in middle."""
    head, tail = [], []
    for i, c in enumerate(chunks):
        (head if i % 2 == 0 else tail).append(c)
    return head + tail[::-1]

# Complete Pipeline Execution:
# Stage 1: Broad hybrid retrieval (50 candidates)
# Stage 2: Cross-encoder reranks 50 down to 5
# Stage 3: Reorder 5 chunks to optimize prompt attention`,
    explanation: [
      "CrossEncoder concatenates query and doc together, enabling full token-to-token cross-attention.",
      "reverse=True because CrossEncoder outputs logits where higher values indicate higher relevance.",
      "reorder_for_lost_in_middle places Rank 1 at index 0 and Rank 2 at index -1, taking advantage of transformer primacy and recency bias."
    ],
    examTraps: [
      "Instantiating CrossEncoder inside the per-query request function causes huge latency spikes because weights reload on every call.",
      "CrossEncoder scores are logits (unbounded), not calibrated probabilities. Never filter with a raw absolute threshold across queries."
    ]
  },
  {
    id: "code-6",
    moduleId: "mod07",
    title: "Safe Tool Calling with Failure Boundaries",
    language: "python",
    description: "Implements bounded tool execution, parameter validation, and an error recovery boundary.",
    code: `import inspect

# 1. Bounded function with schema and validation
def check_stock(product_id: int) -> dict:
    """Check current warehouse inventory for a given product ID."""
    # Business validation
    if product_id <= 0:
        return {"error": "Invalid product_id: Must be a positive integer"}
    if product_id > 10000:
        return {"error": f"Product {product_id} not found in catalog"}
    return {"product_id": product_id, "in_stock": True, "quantity": 45}

# Tool Registry
TOOL_REGISTRY = {"check_stock": check_stock}

# 2. Safe Execution Layer with Failure Boundary
def execute_tool_safely(tool_name: str, arguments: dict) -> dict:
    if tool_name not in TOOL_REGISTRY:
        # Failure boundary: Return controlled observation instead of crashing
        return {"error": f"Tool '{tool_name}' is not in the allowlist"}
    
    fn = TOOL_REGISTRY[tool_name]
    try:
        # Schema validation & invocation
        result = fn(**arguments)
        return {"status": "success", "result": result}
    except TypeError as te:
        # Parameter mismatch handled gracefully
        return {"status": "error", "message": f"Invalid arguments provided: {str(te)}"}
    except Exception as e:
        # Catches unexpected tool crashes and converts to agent observation
        return {"status": "error", "message": f"Execution failed: {str(e)}"}`,
    explanation: [
      "TOOL_REGISTRY acts as an allowlist, enforcing the principle of least privilege.",
      "Business validation rejects product_id <= 0 even if it passed integer schema validation.",
      "The try/except failure boundary guarantees that tool crashes return observations to the agent rather than terminating the application."
    ],
    examTraps: [
      "A bare exception crash terminates the agent loop. A failure boundary converts errors into observations so the agent can self-correct.",
      "Never pass unvalidated user or LLM arguments into eval(), subprocess, or raw SQL strings."
    ]
  },
  {
    id: "code-7",
    moduleId: "mod07",
    title: "FastMCP Server & Human-in-the-Loop Gating",
    language: "python",
    description: "Defines an MCP server with tools and resources, alongside a Human-in-the-Loop approval gate.",
    code: `from mcp.server.fastmcp import FastMCP

# 1. Initialize FastMCP Server
mcp = FastMCP("warehouse-ops")

# Tool Definition (Model-controlled action)
@mcp.tool()
def update_inventory(product_id: int, quantity_change: int) -> str:
    """Adjust stock quantity for a product ID in the warehouse."""
    return f"Product {product_id} adjusted by {quantity_change} units."

# Resource Definition (Read-only data attachment)
@mcp.resource("inventory://catalog")
def get_catalog() -> str:
    """Read-only catalog list available for user or context attachment."""
    return "101: Laptop, 102: Monitor, 103: Keyboard"

# 2. Human-in-the-Loop (HITL) Gate in the Harness
SENSITIVE_TOOLS = {"delete_product", "update_inventory", "transfer_funds"}

def harness_execute(tool_name: str, args: dict, user_role: str):
    if tool_name in SENSITIVE_TOOLS:
        # Suspend workflow and create review card
        print(f"[HITL GATE] Execution paused. Requesting approval for {tool_name}({args})")
        approved = wait_for_human_review(tool_name, args)
        if not approved:
            return {"status": "rejected", "reason": "Action denied by supervisor"}
    
    # Auto-execute safe/approved action
    return {"status": "executed", "result": "Action completed"}`,
    explanation: [
      "@mcp.tool() registers a callable action with automatic schema generation from type hints and docstring.",
      "@mcp.resource() exposes read-only data, similar to opening a file.",
      "The HITL gate intercepts sensitive/destructive actions and waits for approval before invoking execution."
    ],
    examTraps: [
      "Tools are called by the model with model-constructed arguments; Resources are attached by the user or host app.",
      "Too many approval gates create approval fatigue. Only gate truly high-impact, irreversible actions (Red tools)."
    ]
  },
  {
    id: "code-8",
    moduleId: "mod06",
    title: "Neo4j Cypher Scripting & Graph RAG Traversal",
    language: "cypher",
    description: "Creating knowledge triples, idempotent MERGE, multi-hop relationship matching, and Python driver graph traversal.",
    code: `// 1. BASIC TRIPLE CREATION (EXAM SCRIPT)
// Creates two nodes connected by a directed relationship
CREATE (a:Entity {name: "Sokha"})-[r:WORKS_ON]->(b:Entity {name: "Invoicing Service"})
RETURN a, r, b;

// 2. PRODUCTION IDEMPOTENT LOADING (Lesson 06 Slide 29)
// Always MERGE, never CREATE: Prevents duplicate nodes and edges when re-running ingestion
MERGE (a:Person {name: "Sokha"})
MERGE (b:Service {name: "Invoicing Service"})
MERGE (a)-[r:OWNS]->(b)
SET r.chunk_id = "handbook::chunk_12", r.weight = 8
RETURN a, r, b;

// 3. ONE-HOP DIRECT MATCHING
// Query team membership for Sokha
MATCH (p:Person {name: "Sokha"})-[:MEMBER_OF]->(t:Team)
RETURN t.name;

// 4. MULTI-HOP RELATIONSHIP TRAVERSAL (The core of Graph RAG)
// Connects Service <- OWNS - Person - MEMBER_OF -> Team in one query
MATCH (s:Service {name: "Billing"})<-[:OWNS]-(p:Person)-[:MEMBER_OF]->(t:Team)
RETURN p.name AS person, t.name AS team;

// 5. VARIABLE-LENGTH PATH TRAVERSAL (1 to 3 hops)
// CRITICAL: Always bound traversals (*1..3) and apply LIMIT to prevent hanging!
MATCH path = (a:Entity {name: "LegacyPay"})-[*1..3]-(b:Entity)
RETURN path
LIMIT 25;

// 6. SAFE NODE DELETION (DETACH DELETE)
// Regular DELETE fails if node still has relationships attached!
MATCH (a:Entity {name: "Sokha"})
DETACH DELETE a;

// 7. PYTHON NEO4J DRIVER INTEGRATION (Lesson 06 Slide 31)
# from neo4j import GraphDatabase
# driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "kshrd2026"))
# with driver.session() as s:
#     rows = s.run("MATCH (n:Entity {name: $name})-[r*1..2]-(m) RETURN m.name", name="Sokha").data()`,
    explanation: [
      "CREATE (a:Entity {name: 'Sokha'})-[r:WORKS_ON]->(b:Entity {name: 'Invoicing Service'}) builds two nodes labelled Entity with property 'name', connected by a directed :WORKS_ON relationship.",
      "MERGE is idempotent ('find or create'). Re-running CREATE duplicates the entire graph; re-running MERGE safely matches existing nodes.",
      "Arrows indicate direction: (a)-[r]->(b) is outgoing from a to b; (a)<-[r]-(b) is incoming; (a)-[r]-(b) matches regardless of direction.",
      "DETACH DELETE is required to delete a node that has connected relationships; a bare DELETE will throw an error.",
      "Variable-length traversals must always be bounded (e.g. [*1..3]) and capped with LIMIT to avoid exponential graph explosion."
    ],
    examTraps: [
      "Running CREATE twice creates 2 Sokha nodes, 2 Invoicing Service nodes, and 2 relationships. Use MERGE for idempotent data loading.",
      "DELETE without DETACH throws 'Cannot delete node... because it still has relationships'.",
      "An unbounded [*] traversal on a cyclic graph can exhaust memory and freeze the database."
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    "id": 1,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.1 Introduction to LLM Workflow",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "Why is it better to build a multi-step workflow instead of putting everything into one giant prompt?",
    "options": [
      "Workflows break the job into small steps that are easy to test, fix, and control when the AI makes a mistake.",
      "One giant prompt takes more than 10 hours to send over the internet.",
      "AI models will completely turn off if a prompt has more than 50 words.",
      "Single prompts cannot be typed on a keyboard."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 04 Slide 12-15: Workflows split big problems into smaller, reliable steps with clear error handling.",
    "slideRef": "Lesson 04 Slide 12-15"
  },
  {
    "id": 2,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.1 Introduction to LLM Workflow",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "In AI workflow engineering, is it strictly forbidden for steps to loop back to let the AI fix its own mistakes?",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Loops (cycles) are essential so the AI can review its answer, see errors, and fix them before finishing.",
    "slideRef": "Lesson 04 Slide 22-26"
  },
  {
    "id": 3,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.1 Introduction to LLM Workflow",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "Why are loops (cycles) useful in an AI workflow? Give a simple real-life example.",
    "modelAnswer": "Loops let an AI check its own work and fix mistakes.\nFor example: Step 1 writes code. Step 2 runs a test on the code. If the test fails, the workflow loops back to Step 1 with the error message so the AI can fix the code until it passes.",
    "keyPoints": [
      "Allows the AI to self-correct and improve its output.",
      "Runs tests or checks on the result.",
      "Loops back with feedback if something is wrong.",
      "Stops once the answer is correct or reaches max tries."
    ],
    "explanation": "Lesson 04 Slide 24-26: Evaluator-Optimizer loops allow iterative self-correction.",
    "slideRef": "Lesson 04 Slide 24-26"
  },
  {
    "id": 4,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.1 Introduction to LLM Workflow",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In a graph workflow, each individual task or step is called a ________, and the lines connecting them are called edges.",
    "acceptedAnswers": [
      "node",
      "Node",
      "nodes",
      "Nodes"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 04 Slide 22: Graphs are made of Nodes (steps) and Edges (connections).",
    "slideRef": "Lesson 04 Slide 22"
  },
  {
    "id": 5,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "In an 'Evaluator-Optimizer' workflow loop, what is the job of the Evaluator?",
    "options": [
      "To delete the database files after each step.",
      "To check the AI's answer, score it, and give helpful feedback on what to fix.",
      "To turn your text into raw binary numbers (0s and 1s).",
      "To connect your computer to the WiFi router."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 04 Slide 31-33: The Evaluator checks the generated result and tells the Optimizer what needs improvement.",
    "slideRef": "Lesson 04 Slide 31-33"
  },
  {
    "id": 6,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "In a Sequential Chain, all steps run at the exact same time in parallel.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Sequential means one step after another in a line. Running at the same time is called Parallel execution.",
    "slideRef": "Lesson 04 Slide 28"
  },
  {
    "id": 7,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "What is a 'Router' in an AI workflow, and how does it help handle different user questions?",
    "modelAnswer": "A Router is a step that checks what the user wants and sends their question to the right specialist.\nFor example, if a customer asks about a broken product, the Router sends them to Tech Support. If they ask about a bill, the Router sends them to Billing. If the Router isn't sure, it sends them to a fallback helper.",
    "keyPoints": [
      "A Router inspects user intent and picks the best path.",
      "Routes to specialized chains (e.g., Tech support vs Billing).",
      "Provides a fallback option when the question is unclear.",
      "Keeps workflows organized instead of handling everything in one place."
    ],
    "explanation": "Lesson 04 Slide 29-30: Routers direct traffic to specialized sub-chains based on intent.",
    "slideRef": "Lesson 04 Slide 29-30"
  },
  {
    "id": 8,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "When you run multiple AI tasks at the same time to save time and combine their results later, this is called ________ execution.",
    "acceptedAnswers": [
      "parallel",
      "Parallel",
      "concurrent",
      "Concurrent"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 04 Slide 28: Parallel (Fan-out / Fan-in) runs multiple steps simultaneously.",
    "slideRef": "Lesson 04 Slide 28"
  },
  {
    "id": 9,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "What is the main difference between 'State' and 'Memory' in an AI workflow?",
    "options": [
      "State and Memory are the exact same thing with different spellings.",
      "State is stored in text files; Memory is stored on USB flash drives.",
      "State is the temporary data for the current run right now; Memory saves user facts and history across future conversations.",
      "State only works on mobile phones; Memory only works on supercomputers."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 04 Slide 39-42: State is temporary for the active run; Memory remembers long-term facts across multiple sessions.",
    "slideRef": "Lesson 04 Slide 39-42"
  },
  {
    "id": 10,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "If you use `InMemorySaver` in LangGraph, your chat history will survive even if the server restarts or crashes.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. `InMemorySaver` stores data only in RAM. If the server restarts, everything is erased. You need a database checkpointer like `PostgresSaver` for real persistence.",
    "slideRef": "Lesson 04 Slide 114"
  },
  {
    "id": 11,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "In LangGraph, what is `thread_id`, and what bad thing happens if two different users accidentally share the same `thread_id`?",
    "modelAnswer": "`thread_id` is a unique ID for a specific conversation.\nIf two different users share the same `thread_id`, their chat messages will get mixed together! User A will see User B's private messages and the AI will get confused and hallucinate.",
    "keyPoints": [
      "thread_id identifies and separates different chat sessions.",
      "Keeps each user's history private and isolated.",
      "Sharing thread_id causes chat messages to collide and leak private data.",
      "Checkpointers use thread_id to save and load the right state."
    ],
    "explanation": "Lesson 04 Slide 114: thread_id partitions conversation state in checkpointers.",
    "slideRef": "Lesson 04 Slide 114"
  },
  {
    "id": 12,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LangGraph, the configuration key used to separate chat history for each user conversation is `thread_________`.",
    "acceptedAnswers": [
      "id",
      "ID",
      "thread_id"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 04 Slide 114: thread_id is passed in config={'configurable': {'thread_id': '...'}}.",
    "slideRef": "Lesson 04 Slide 114"
  },
  {
    "id": 13,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "Why do we clean text and add metadata (like titles and keywords) to document chunks before saving them?",
    "options": [
      "To make the files look colorful on the screen.",
      "To encrypt the text with a secret password.",
      "To delete all the words and replace them with numbers.",
      "To help the search engine find the right chunks easily and keep important context attached to each piece."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 04 Slide 48-52: Metadata tags and clean text help the retriever find exact matches and preserve parent document context.",
    "slideRef": "Lesson 04 Slide 48-52"
  },
  {
    "id": 14,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "If your ingestion script does not check for duplicate files, re-running it will create duplicate copies of all your chunks in the vector database.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Without deduplication or document hashing, re-uploading documents will insert duplicate vectors every time.",
    "slideRef": "Lesson 04 Slide 54"
  },
  {
    "id": 15,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "What are the 5 simple steps to process a PDF document so an AI can search it in RAG?",
    "modelAnswer": "1. Load: Read text from the PDF file.\n2. Split (Chunk): Cut long text into small, readable chunks.\n3. Clean/Enrich: Remove messy headers/footers and add tags (titles, dates).\n4. Embed: Convert each text chunk into a vector (list of numbers).\n5. Save (Index): Store the vectors and chunks into a vector database.",
    "keyPoints": [
      "1. Load (read source document).",
      "2. Split / Chunk (divide into smaller pieces).",
      "3. Clean / Enrich (remove noise and add metadata).",
      "4. Embed (convert text to vectors) and Store in database."
    ],
    "explanation": "Lesson 04 Slide 45-56 outlines the Load -> Split -> Transform -> Embed -> Store pipeline.",
    "slideRef": "Lesson 04 Slide 45-56"
  },
  {
    "id": 16,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LlamaIndex, the component that automatically reads chunks and generates a title tag for each one is called ________Extractor.",
    "acceptedAnswers": [
      "Title",
      "title",
      "TitleExtractor"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 04 Slide 51: TitleExtractor creates title metadata for chunks.",
    "slideRef": "Lesson 04 Slide 51"
  },
  {
    "id": 17,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "Why should each step (node) in an AI workflow do only ONE simple job?",
    "options": [
      "It makes it easy to test, fix mistakes, and retry just that one step if it fails.",
      "AI models can only understand one word per minute.",
      "Computer CPUs stop working if you run two lines of code.",
      "Python requires every function to have only 3 letters."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 04 Slide 60-63: Single Responsibility Principle (SRP) makes each node reliable, testable, and easy to debug.",
    "slideRef": "Lesson 04 Slide 60-63"
  },
  {
    "id": 18,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "Using Pydantic or TypedDict to define what data flows through your workflow helps prevent bugs and missing data errors.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Explicit state schemas make sure every step receives the exact data fields it expects.",
    "slideRef": "Lesson 04 Slide 66"
  },
  {
    "id": 19,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "What goes wrong if you ask a single prompt to do 4 things at once: read a PDF, check legal rules, calculate taxes, and write an email?",
    "modelAnswer": "1. High chance of mistakes: The AI gets overloaded and starts hallucinating or skipping instructions.\n2. Hard to fix: If the tax calculation is wrong, you have to re-run the entire expensive prompt from the start.\n3. Hard to test: You cannot easily unit-test the tax math separately from the email writing.",
    "keyPoints": [
      "AI gets confused by too many instructions and hallucinates.",
      "Cannot retry just the failed step (wastes tokens/money).",
      "Impossible to test and debug individual parts in isolation.",
      "Modular steps are much more reliable."
    ],
    "explanation": "Lesson 04 Slide 60-68: Overloaded prompts violate Single Responsibility and increase failure rates.",
    "slideRef": "Lesson 04 Slide 60-68"
  },
  {
    "id": 20,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LangGraph and Python, you can define your state fields with data validation using Pydantic's ________ class.",
    "acceptedAnswers": [
      "BaseModel",
      "base_model",
      "BaseModel()"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 04 Slide 66: Pydantic BaseModel and TypedDict are standard state containers.",
    "slideRef": "Lesson 04 Slide 66"
  },
  {
    "id": 21,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "When should you choose LangGraph instead of simple LangChain chains?",
    "options": [
      "When you only want to translate one sentence into French.",
      "When your AI application needs loops, step-by-step state, and human approval buttons.",
      "When you do not want to use any AI at all.",
      "When your computer has no internet connection."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 04 Slide 105-112: LangGraph is built for stateful graphs, loops, multi-agent systems, and human-in-the-loop workflows.",
    "slideRef": "Lesson 04 Slide 105-112"
  },
  {
    "id": 22,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "In LangChain (LCEL), the pipe operator (`|`) can only be used for math operations, not for chaining prompts and models.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. The pipe symbol `|` in LCEL is specifically used to connect components together into a chain.",
    "slideRef": "Lesson 04 Slide 92"
  },
  {
    "id": 23,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "In simple words, what is LlamaIndex best at, and what is LangGraph best at?",
    "modelAnswer": "LlamaIndex is best for data and documents: reading PDFs, splitting chunks, creating indexes, and retrieving answers (RAG).\nLangGraph is best for decision making and control flow: running loops, managing state, handling agents, and pausing for human approval.",
    "keyPoints": [
      "LlamaIndex: Data-centric, document ingestion, indexing, and smart search.",
      "LangGraph: Agent control, state machines, cycles/loops, and human approval.",
      "They work great together in production systems."
    ],
    "explanation": "Lesson 04 Slide 85-118: LlamaIndex excels at data indexing; LangGraph excels at agent orchestration.",
    "slideRef": "Lesson 04 Slide 85-118"
  },
  {
    "id": 24,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LangChain Expression Language (LCEL), the syntax `prompt | model | parser` uses the ________ operator to link steps together.",
    "acceptedAnswers": [
      "pipe",
      "|",
      "pipe operator"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 04 Slide 92: The pipe symbol '|' chains Runnables in LCEL.",
    "slideRef": "Lesson 04 Slide 92"
  },
  {
    "id": 25,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What is the main advantage of using RAG (Retrieval-Augmented Generation) instead of fine-tuning an AI model on company documents?",
    "options": [
      "Fine-tuning deletes the model's brain, while RAG keeps it intact.",
      "Fine-tuning only works on Apple MacBooks.",
      "RAG lets you add or update private documents immediately without spending thousands of dollars re-training the model.",
      "RAG makes the model answer questions using only 1 single letter."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 05 Slide 10-14: RAG allows real-time knowledge updates, provides source citations, and avoids costly GPU re-training.",
    "slideRef": "Lesson 05 Slide 10-14"
  },
  {
    "id": 26,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "Basic (Naive) RAG is guaranteed to always answer correctly even when an answer is spread across 5 completely different pages.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Naive RAG only looks for single top-k chunk similarities and often misses connections spread across multiple distant pages.",
    "slideRef": "Lesson 05 Slide 18"
  },
  {
    "id": 27,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "In simple words, explain how RAG answers a question like: 'What is our company refund policy?'",
    "modelAnswer": "1. The user asks: 'What is our refund policy?'\n2. The system converts this question into a search vector (numbers).\n3. It searches the vector database and finds the top 2-3 document chunks about refunds.\n4. It pastes those chunks into a prompt: 'Here are the refund rules: [chunks]. Now answer the user's question.'\n5. The AI reads the rules and writes a truthful answer with citations.",
    "keyPoints": [
      "Converts user question to search vector.",
      "Finds matching chunks in vector database.",
      "Pastes chunks into the prompt for the AI to read.",
      "AI writes an answer based strictly on the retrieved facts."
    ],
    "explanation": "Lesson 05 Slide 14-17: RAG query lifecycle: Query -> Search -> Prompt Augmentation -> Generation.",
    "slideRef": "Lesson 05 Slide 14-17"
  },
  {
    "id": 28,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In RAG, putting retrieved document chunks into the prompt so the AI can read them before answering is called prompt ________.",
    "acceptedAnswers": [
      "augmentation",
      "Augmentation",
      "synthesis"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 05 Slide 16: Prompt Augmentation adds retrieved context to the prompt.",
    "slideRef": "Lesson 05 Slide 16"
  },
  {
    "id": 29,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What problem happens if your text chunks are made too small (for example, only 15 words per chunk)?",
    "options": [
      "Your computer screen will run out of colors.",
      "The AI will start typing in Latin.",
      "The vector database will instantly delete itself.",
      "The chunks lose their full meaning and context, so the AI cannot understand the whole explanation."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 05 Slide 28-31: Tiny chunks chop sentences into fragments and lose surrounding context, making retrieval useless.",
    "slideRef": "Lesson 05 Slide 28-31"
  },
  {
    "id": 30,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "In RAG chunking, is it a bad mistake to have any overlap between chunks?",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Overlap (typically 10% to 20%) is recommended because it stops sentences or ideas from being cut right down the middle.",
    "slideRef": "Lesson 05 Slide 32"
  },
  {
    "id": 31,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "What is 'chunk overlap' in RAG, and why is it important when splitting a document?",
    "modelAnswer": "Chunk overlap means the end of one chunk shares some text (like 50 words) with the start of the next chunk.\nThis is important because if a key sentence or definition happens to land right at the split point, overlap prevents it from being chopped in half. At least one chunk will have the complete thought.",
    "keyPoints": [
      "Shares consecutive text across boundary points.",
      "Prevents sentences and ideas from being cut in half.",
      "Ensures complete semantic context in at least one chunk.",
      "Usually set to 10% - 20% of chunk size."
    ],
    "explanation": "Lesson 05 Slide 32: Chunk overlap preserves continuity across split boundaries.",
    "slideRef": "Lesson 05 Slide 32"
  },
  {
    "id": 32,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "When embedding vectors are normalized to length 1.0, Cosine Similarity gives the exact same result as the ________ Product.",
    "acceptedAnswers": [
      "Dot",
      "dot",
      "inner",
      "Dot Product"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 05 Slide 42: When vectors are unit-length, cosine similarity equals dot product.",
    "slideRef": "Lesson 05 Slide 42"
  },
  {
    "id": 33,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "Why is `RecursiveCharacterTextSplitter` better than simply cutting text every 500 characters?",
    "options": [
      "It tries to split at paragraph breaks first, then line breaks, then spaces, keeping whole sentences and thoughts together.",
      "It translates the text into Spanish first.",
      "It deletes all vowels to make the text smaller.",
      "It turns text into MP3 audio files."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 05 Slide 34-36: RecursiveCharacterTextSplitter checks double newlines first, then single newlines, then spaces to keep paragraphs intact.",
    "slideRef": "Lesson 05 Slide 34-36"
  },
  {
    "id": 34,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "Do local embedding models like `bge-small-en-v1.5` require paying API fees to cloud companies?",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Local embedding models run 100% locally on your computer with zero API costs and full privacy.",
    "slideRef": "Lesson 05 Slide 46"
  },
  {
    "id": 35,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "Why is it bad to split Python code or Markdown files by a fixed character count (like every 300 characters)?",
    "modelAnswer": "Fixed character splitting cuts text blindly. It can cut a Python function right in half, separate a class name from its code, or split a Markdown table so it cannot be read.\nUsing a syntax-aware splitter (like MarkdownHeaderTextSplitter or CodeSplitter) respects the code structure so every chunk is a valid, readable piece of code.",
    "keyPoints": [
      "Fixed-length chunking cuts functions and classes in half.",
      "Breaks Markdown tables and headings.",
      "Syntax-aware splitters keep complete code blocks intact.",
      "Allows the AI to read valid code and understand it."
    ],
    "explanation": "Lesson 05 Slide 37-39: Syntax-aware splitters preserve code and markdown structure.",
    "slideRef": "Lesson 05 Slide 37-39"
  },
  {
    "id": 36,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In LangChain, the smart text splitter that tries to split paragraphs, then lines, then words is called ________CharacterTextSplitter.",
    "acceptedAnswers": [
      "Recursive",
      "recursive",
      "RecursiveCharacterTextSplitter"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 05 Slide 34: RecursiveCharacterTextSplitter is the recommended default splitter.",
    "slideRef": "Lesson 05 Slide 34"
  },
  {
    "id": 37,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What are the default network ports used by Qdrant for REST API and gRPC API?",
    "options": [
      "REST: 80, gRPC: 443",
      "REST: 6333, gRPC: 6334",
      "REST: 3000, gRPC: 8080",
      "REST: 5432, gRPC: 11434"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 05 Slide 58-60: Qdrant uses port 6333 for HTTP REST and port 6334 for high-speed gRPC.",
    "slideRef": "Lesson 05 Slide 58-60"
  },
  {
    "id": 38,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "In PostgreSQL, to turn on vector search capabilities, you run the SQL command: `CREATE EXTENSION vector;`.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. `CREATE EXTENSION vector;` enables pgvector data types and similarity search in PostgreSQL.",
    "slideRef": "Lesson 05 Slide 62"
  },
  {
    "id": 39,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "In simple terms, when should you choose ChromaDB, and when should you choose Pgvector?",
    "modelAnswer": "Choose ChromaDB for simple local projects, quick prototypes, or desktop apps because it is lightweight, runs in Python, and needs zero complex setup.\nChoose Pgvector if your company already uses PostgreSQL for regular business data (like users, orders, and products) and you want to keep your vectors and regular tables in the same database with standard SQL.",
    "keyPoints": [
      "ChromaDB: Simple, lightweight, zero-setup, great for quick local apps.",
      "Pgvector: PostgreSQL extension, combines regular SQL tables with vector search.",
      "No need to manage a separate standalone database if using Postgres.",
      "Qdrant: Dedicated high-speed Rust database for large-scale production."
    ],
    "explanation": "Lesson 05 Slide 55-65 compares ChromaDB, Qdrant, and Pgvector use cases.",
    "slideRef": "Lesson 05 Slide 55-65"
  },
  {
    "id": 40,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In ChromaDB Python, to make sure your data is saved to a folder on disk so you don't lose it on exit, you use chromadb.________(path='...').",
    "acceptedAnswers": [
      "PersistentClient",
      "persistent_client",
      "PersistentClient()"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 05 Slide 56: PersistentClient saves ChromaDB collections permanently to disk.",
    "slideRef": "Lesson 05 Slide 56"
  },
  {
    "id": 41,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "Why is Hybrid Search (Keyword BM25 + Vector Search) better than Vector Search alone?",
    "options": [
      "Because Vector search cannot read the English alphabet.",
      "Because Keyword search only works on Saturdays.",
      "Because Keyword search finds exact part numbers and codes, while Vector search finds general concepts and synonyms.",
      "Because Hybrid Search makes the database run on battery power."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 06 Slide 12-15: Vector search struggles with exact IDs, product codes, and rare names. BM25 handles exact terms, giving the best of both worlds.",
    "slideRef": "Lesson 06 Slide 12-15"
  },
  {
    "id": 42,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In Reciprocal Rank Fusion (RRF), the formula for combining search rankings uses a constant `k` that is usually set to 60.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Cormack et al. and Lesson 06 Slide 16 set k=60 to prevent top-ranked outliers from unfairly dominating the score.",
    "slideRef": "Lesson 06 Slide 16"
  },
  {
    "id": 43,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Why does Vector Search sometimes fail to find an exact product code like 'MODEL-X99-PRO', and how does Hybrid Search solve this?",
    "modelAnswer": "Vector models look for general meaning and concepts. Rare product codes or error numbers (like 'MODEL-X99-PRO') look like random letters to an embedding model, so it ranks other general text higher.\nHybrid Search adds keyword matching (BM25). BM25 checks for the exact word 'MODEL-X99-PRO' and immediately brings the exact right document to the top.",
    "keyPoints": [
      "Embedding models struggle with rare codes, acronyms, and product IDs.",
      "BM25 looks for exact character matches regardless of meaning.",
      "Hybrid search combines both lists using RRF.",
      "Gives high accuracy for both exact codes and conceptual questions."
    ],
    "explanation": "Lesson 06 Slide 12-16 explains why BM25 + Vector search covers each other's weaknesses.",
    "slideRef": "Lesson 06 Slide 12-16"
  },
  {
    "id": 44,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In the Reciprocal Rank Fusion (RRF) formula `score = 1 / (k + rank)`, the standard number used for `k` is ________.",
    "acceptedAnswers": [
      "60",
      "k=60",
      "sixty"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 06 Slide 16: The smoothing constant k is standardly set to 60.",
    "slideRef": "Lesson 06 Slide 16"
  },
  {
    "id": 45,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In Neo4j graph database queries, why should you use `MERGE` instead of `CREATE` when loading data?",
    "options": [
      "`CREATE` deletes the computer hard drive.",
      "`CREATE` requires an internet connection to Google.",
      "`MERGE` only works on numbers, not names.",
      "`MERGE` checks if the node already exists so it doesn't create duplicate copies, while `CREATE` creates duplicates every time."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 06 Slide 29: 'Always MERGE, never CREATE.' MERGE is idempotent and prevents creating duplicate nodes and relationships.",
    "slideRef": "Lesson 06 Slide 29"
  },
  {
    "id": 46,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In Microsoft GraphRAG, Local Search looks at specific entities and their neighbors, while Global Search uses community summaries to answer big-picture questions.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Local Search inspects specific entities; Global Search aggregates community summaries across the whole corpus.",
    "slideRef": "Lesson 06 Slide 27"
  },
  {
    "id": 47,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Why is Graph RAG better than simple chunk search for a question like: 'Who is the manager of the person who built the Billing System?'",
    "modelAnswer": "In normal chunk search, the fact 'Alice built Billing' is in Chunk 10, but the fact 'Bob manages Alice' is in Chunk 500. A vector search for 'manager of Billing creator' will find Chunk 10 (because it mentions Billing), but miss Chunk 500 completely!\nGraph RAG connects them with arrows: (Bob)-[:MANAGES]->(Alice)-[:BUILT]->(Billing). A single 2-step hop on the graph easily finds Bob, connecting the facts even if they were written pages apart.",
    "keyPoints": [
      "Facts are separated across distant, unconnected chunks.",
      "Vector search retrieves only chunks with similar words, missing the second step.",
      "Knowledge graphs connect entities with relationship edges.",
      "Can easily follow multi-hop connections to answer complex questions."
    ],
    "explanation": "Lesson 06 Slide 18-22 contrasts chunk retrieval with multi-hop graph traversals.",
    "slideRef": "Lesson 06 Slide 18-22"
  },
  {
    "id": 48,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In Neo4j Cypher, to safely delete a node and all of its attached relationship lines in one command, you write ________ DELETE.",
    "acceptedAnswers": [
      "DETACH",
      "detach",
      "DETACH DELETE"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 06 Slide 29: 'DETACH DELETE n' removes the node and its attached relationships.",
    "slideRef": "Lesson 06 Slide 29"
  },
  {
    "id": 49,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In Corrective RAG (CRAG), what does the system do if it checks the retrieved documents and finds they are completely useless or wrong?",
    "options": [
      "It automatically does a web search to find real information online before answering.",
      "It invents fake facts and guesses.",
      "It crashes the server and stops.",
      "It deletes all user accounts."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 06 Slide 35-37: If retrieved internal documents are evaluated as 'Incorrect', CRAG triggers an external web search fallback.",
    "slideRef": "Lesson 06 Slide 35-37"
  },
  {
    "id": 50,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In Self-RAG, the AI model generates special tokens (like `[Retrieve]`) to decide for itself whether it actually needs to search or if it already knows the answer.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Self-RAG uses reflection tokens to dynamically decide when to retrieve and to check if its answer is supported by evidence.",
    "slideRef": "Lesson 06 Slide 32-34"
  },
  {
    "id": 51,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "In simple words, what is the difference between simple Static RAG and smart Agentic RAG?",
    "modelAnswer": "Static RAG is a rigid 1-way street: it takes your question, searches once, and forces the AI to answer—even if the search results are useless.\nAgentic RAG is smart: it can rewrite bad questions, check if the search results actually answer the question, search again with better keywords if needed, or search the web if internal files don't have the answer.",
    "keyPoints": [
      "Static RAG searches once blindly without checking quality.",
      "Agentic RAG evaluates search quality before answering.",
      "Can rewrite confusing questions to find better results.",
      "Can fallback to web search or retry if results are poor."
    ],
    "explanation": "Lesson 06 Slide 30-38 explores Agentic RAG decision loops vs static pipelines.",
    "slideRef": "Lesson 06 Slide 30-38"
  },
  {
    "id": 52,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In Corrective RAG (CRAG), the evaluator grades search results into 3 categories: Correct, Ambiguous, or ________.",
    "acceptedAnswers": [
      "Incorrect",
      "incorrect"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 06 Slide 35: CRAG grades retrieval into Correct, Ambiguous, or Incorrect.",
    "slideRef": "Lesson 06 Slide 35"
  },
  {
    "id": 53,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "Why do we use a Bi-Encoder first and a Cross-Encoder second in a 2-stage search pipeline?",
    "options": [
      "Because Cross-Encoders can only run on Windows 95.",
      "Because Bi-Encoder is super fast to find the top 50 candidates from 1 million files, and Cross-Encoder is super accurate to pick the best 3.",
      "Because Bi-Encoders only work with numbers less than 10.",
      "Because doing two steps makes the search completely random."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 06 Slide 40-44: Bi-encoder provides fast speed ($O(1)$ vector lookup); Cross-encoder provides maximum accuracy on top candidates.",
    "slideRef": "Lesson 06 Slide 40-44"
  },
  {
    "id": 54,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "A Cross-Encoder is fast enough to search through 10 million documents in 1 millisecond.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Cross-encoders compare every word of the question with every word of the document together, which is slow and can only be used on a few dozen candidates.",
    "slideRef": "Lesson 06 Slide 41"
  },
  {
    "id": 55,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Why is a Cross-Encoder more accurate than a simple vector search (Bi-Encoder)?",
    "modelAnswer": "A Bi-Encoder turns the question into a vector and the document into a vector separately without them seeing each other. Then it just checks the angle between them.\nA Cross-Encoder puts the question and the document together into the model at the same time. Every single word in the question can directly pay attention to every word in the document, catching exact context, negation, and fine details.",
    "keyPoints": [
      "Bi-encoder embeds query and document separately (fast but misses subtle nuance).",
      "Cross-encoder feeds (query + document) together into the transformer.",
      "Full attention between all words gives much higher semantic accuracy.",
      "Eliminates false matches before sending to the LLM."
    ],
    "explanation": "Lesson 06 Slide 40-45 explains the cross-attention difference between Bi-Encoders and Cross-Encoders.",
    "slideRef": "Lesson 06 Slide 40-45"
  },
  {
    "id": 56,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In a 2-stage search system, the fast initial model that converts text into independent vector representations is called a ________-Encoder.",
    "acceptedAnswers": [
      "Bi",
      "bi",
      "Bi-Encoder",
      "bi-encoder"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 06 Slide 40: Bi-Encoders encode texts into separate vectors.",
    "slideRef": "Lesson 06 Slide 40"
  },
  {
    "id": 57,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "What is the 'Lost in the Middle' problem in LLM context windows?",
    "options": [
      "The AI loses its internet connection in the middle of a sentence.",
      "The computer screen goes dark halfway through generation.",
      "The AI pays the most attention to facts at the very beginning and very end of a prompt, often missing or forgetting facts placed in the middle.",
      "The vector database deletes the middle 10 rows."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 06 Slide 50-52: Research (Liu et al.) proves models remember facts at the start and end best, but struggle to notice facts in the middle.",
    "slideRef": "Lesson 06 Slide 50-52"
  },
  {
    "id": 58,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "To help an AI find the most important facts, you should place the highest-ranked documents at the beginning and end of your prompt.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Position-aware reordering puts the best chunks at the start and end to overcome the 'Lost in the Middle' effect.",
    "slideRef": "Lesson 06 Slide 53"
  },
  {
    "id": 59,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "If you give an AI 20 document chunks and it misses the answer hidden in the middle, what are 2 simple ways to solve this?",
    "modelAnswer": "1. Re-order the chunks: Put the most important chunks at the very top and very bottom of the prompt instead of leaving them in the middle.\n2. Cut down to top 3-5 chunks: Instead of dumping 20 chunks, filter out the weak ones so only the most relevant, concise information is passed to the AI.",
    "keyPoints": [
      "Position re-ordering: Place best chunks at the beginning and end.",
      "Reduce chunk count: Only pass top 3-5 chunks to reduce noise.",
      "Context compression: Remove useless sentences before feeding to LLM."
    ],
    "explanation": "Lesson 06 Slide 50-55 covers position-aware chunk placement and context compression.",
    "slideRef": "Lesson 06 Slide 50-55"
  },
  {
    "id": 60,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "The phenomenon where an AI fails to notice information placed in the center of a long prompt is called 'Lost in the ________'.",
    "acceptedAnswers": [
      "Middle",
      "middle",
      "Lost in the Middle"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 06 Slide 50: The 'Lost in the Middle' paper highlights attention drop-off in the middle of prompts.",
    "slideRef": "Lesson 06 Slide 50"
  },
  {
    "id": 61,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "How does an AI model tell your program that it wants to run a tool (function)?",
    "options": [
      "It beeps through the computer speakers.",
      "It prints a screenshot on paper.",
      "It restarts the computer automatically.",
      "It outputs a structured JSON block specifying the function name and arguments to use."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 07 Slide 14-18: The LLM emits structured JSON with the function name and parameters in the `tool_calls` field.",
    "slideRef": "Lesson 07 Slide 14-18"
  },
  {
    "id": 62,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Can local open-source models like Qwen 2.5 and Llama 3.1 run tool calls and output structured JSON?",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Qwen 2.5 and Llama 3.1 are trained specifically on tool calling and output standard OpenAI-compatible tool_calls.",
    "slideRef": "Lesson 07 Slide 16"
  },
  {
    "id": 63,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "In simple steps, what happens when a user asks an AI: 'What is the weather in Tokyo?' and the AI has a `get_weather(city)` tool?",
    "modelAnswer": "1. The user asks the question.\n2. The AI realizes it doesn't know live weather, so it outputs a tool request: `get_weather(city='Tokyo')`.\n3. Your Python code runs the real `get_weather` function and gets the result: '22°C, Sunny'.\n4. Your code feeds that result back to the AI.\n5. The AI reads the result and tells the user: 'The weather in Tokyo is 22°C and sunny.'",
    "keyPoints": [
      "User asks question needing live data.",
      "AI outputs tool call with parameters (city='Tokyo').",
      "Application runs the real function.",
      "Result sent back to AI to write final human answer."
    ],
    "explanation": "Lesson 07 Slide 14-22: Tool call lifecycle: Schema -> Call -> Execution -> Tool Message -> Final Answer.",
    "slideRef": "Lesson 07 Slide 14-22"
  },
  {
    "id": 64,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "When an AI finishes its response by requesting a tool execution, its API response sets finish_reason = '________'.",
    "acceptedAnswers": [
      "tool_calls",
      "tool_call",
      "tool_calls'"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 18: finish_reason='tool_calls' signals that the AI wants to run a tool.",
    "slideRef": "Lesson 07 Slide 18"
  },
  {
    "id": 65,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "Why do we use Pydantic models when receiving function arguments from an AI?",
    "options": [
      "To check that the AI provided the right data types (like numbers, strings, positive values) and catch invalid inputs.",
      "To translate Python code into HTML.",
      "To delete unused variables from computer RAM.",
      "To speed up the internet speed by 2x."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 24-28: Pydantic validates types, ranges, and required fields, preventing corrupt data from running in your functions.",
    "slideRef": "Lesson 07 Slide 24-28"
  },
  {
    "id": 66,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "If an AI generates an invalid age like -10, Pydantic will raise a `ValidationError` so your program can tell the AI to fix its mistake.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Pydantic catches invalid values and allows the harness to prompt the AI to correct its arguments.",
    "slideRef": "Lesson 07 Slide 26"
  },
  {
    "id": 67,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Why is structured output validation (like Pydantic or Instructor) important when an AI talks to a real database?",
    "modelAnswer": "Without validation, an AI might generate bad data—like typing words where a number is needed, missing a required field, or sending a negative price. If that bad data is sent to a database, the database will crash or save corrupt data.\nPydantic checks every field first. If anything is wrong, it blocks the action and asks the AI to fix the mistake before anything touches the real database.",
    "keyPoints": [
      "AI output can have formatting mistakes or wrong data types.",
      "Pydantic validates fields, types, and value limits.",
      "Blocks invalid data before it executes in the database.",
      "Can automatically ask the AI to correct invalid fields."
    ],
    "explanation": "Lesson 07 Slide 24-28: Schema enforcement ensures contract safety between AI output and backend systems.",
    "slideRef": "Lesson 07 Slide 24-28"
  },
  {
    "id": 68,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In Pydantic field validation, the argument used to say a number must be 'greater than or equal to 18' is Field(________=18).",
    "acceptedAnswers": [
      "ge",
      "ge=18",
      "ge = 18"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 26: 'ge' stands for Greater than or Equal to.",
    "slideRef": "Lesson 07 Slide 26"
  },
  {
    "id": 69,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "Why must an AI agent run shell commands or code inside an isolated sandbox (like a Docker container)?",
    "options": [
      "Because Python cannot run directly on Windows or Mac.",
      "To stop the AI from accidentally deleting files, stealing private data, or damaging your main computer.",
      "Because Docker makes computer graphics look sharper.",
      "To make the code execute 10 times faster."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 07 Slide 34-38: Sandboxes prevent unintended harm, file deletion, and security breaches by isolating the AI execution environment.",
    "slideRef": "Lesson 07 Slide 34-38"
  },
  {
    "id": 70,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "It is safe to give an autonomous AI agent full administrator (root) access to your production database as long as its temperature is set to 0.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Temperature 0 does not prevent errors, hallucinations, or prompt injection. Never give root access; always use least privilege.",
    "slideRef": "Lesson 07 Slide 36"
  },
  {
    "id": 71,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Name 3 simple safety rules to protect your system when an AI is allowed to run tools.",
    "modelAnswer": "1. Read-only permissions: Give the AI only read access (SELECT), not permission to delete or drop tables.\n2. Isolated sandbox: Run code in a Docker container with no access to your personal files.\n3. Timeouts and limits: Set a timer (e.g. max 5 seconds) so a stuck command cannot hang your system forever.",
    "keyPoints": [
      "Least privilege (read-only, restrict DROP/DELETE).",
      "Isolated sandbox or container execution.",
      "Strict timeouts and resource limits (memory/CPU).",
      "Mandatory query LIMITs to prevent memory overflow."
    ],
    "explanation": "Lesson 07 Slide 35-40 outlines security boundaries and isolation techniques for agent tools.",
    "slideRef": "Lesson 07 Slide 35-40"
  },
  {
    "id": 72,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The golden security rule that says an AI should only be given the minimum permissions needed to do its job is the Principle of Least ________.",
    "acceptedAnswers": [
      "Privilege",
      "privilege",
      "Least Privilege"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 37: Principle of Least Privilege restricts agent capabilities to only what is necessary.",
    "slideRef": "Lesson 07 Slide 37"
  },
  {
    "id": 73,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What stops an autonomous AI agent from running in an endless loop forever if a tool keeps returning errors?",
    "options": [
      "Changing the font size to 12.",
      "Turning off the computer monitor.",
      "Setting a maximum step limit (such as `recursion_limit` or max 10 steps).",
      "Saving the file as a PDF."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 07 Slide 44-46: Hard step limits act as circuit breakers, stopping runaway execution and notifying the user.",
    "slideRef": "Lesson 07 Slide 44-46"
  },
  {
    "id": 74,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "An 'Indirect Prompt Injection' happens when an AI reads an untrusted website or email that contains secret hidden instructions telling the AI to disobey its original job.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Indirect prompt injection is a serious risk where external untrusted content hijacks the agent's instructions.",
    "slideRef": "Lesson 07 Slide 48"
  },
  {
    "id": 75,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "What is an 'Idempotency Key', and why is it important when an AI calls a payment or order tool?",
    "modelAnswer": "An Idempotency Key is a unique ticket number (like `order-101`) sent with a transaction.\nIf the AI tries to charge a credit card, but the internet hiccups for 1 second, the AI might try calling the tool again. With an idempotency key, the payment system sees the same key and says: 'I already charged this! Here is the receipt' instead of charging the customer twice!",
    "keyPoints": [
      "A unique ID attached to an action or request.",
      "Ensures the action only happens once, even if called multiple times.",
      "Protects against duplicate charges during network retries.",
      "Critical safety boundary for real-world mutations."
    ],
    "explanation": "Lesson 07 Slide 45-47 covers idempotency keys and safe retry boundaries.",
    "slideRef": "Lesson 07 Slide 45-47"
  },
  {
    "id": 76,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In LangGraph and agent loops, the setting that sets a maximum ceiling on the number of steps to prevent infinite loops is called the ________ limit.",
    "acceptedAnswers": [
      "recursion",
      "recursion_limit",
      "recursion limit"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 44: recursion_limit terminates graphs if they exceed a maximum step count.",
    "slideRef": "Lesson 07 Slide 44"
  },
  {
    "id": 77,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What are the 3 simple steps of the ReAct pattern that repeat in a loop?",
    "options": [
      "Download -> Compile -> Install",
      "Select -> Copy -> Paste",
      "Click -> Drag -> Drop",
      "Thought (Think) -> Action (Use tool) -> Observation (Read tool result)"
    ],
    "correctIndex": 3,
    "explanation": "Lesson 07 Slide 52-56: ReAct loops through: Thought (reasoning), Action (calling tool), Observation (getting result) until done.",
    "slideRef": "Lesson 07 Slide 52-56"
  },
  {
    "id": 78,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Does the ReAct pattern eliminate all thinking (Thought) and force the AI to use tools without any reasoning?",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. ReAct explicitly combines Reasoning and Acting: it thinks first (Thought), then acts (Action), then reads the result (Observation).",
    "slideRef": "Lesson 07 Slide 52"
  },
  {
    "id": 79,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Explain how a ReAct agent answers: 'Who won the latest soccer World Cup?' using Thought, Action, and Observation.",
    "modelAnswer": "Step 1:\n- Thought: I need to find who won the most recent World Cup. I will use the search tool.\n- Action: search('2022 World Cup winner')\n- Observation: 'Argentina won the 2022 FIFA World Cup.'\n\nStep 2:\n- Thought: I now have the answer from the observation.\n- Final Answer: 'Argentina won the latest FIFA World Cup.'",
    "keyPoints": [
      "Thought: Plans what information is missing.",
      "Action: Invokes search tool with query.",
      "Observation: Receives tool result.",
      "Final Thought/Answer: Formulates final response based on observation."
    ],
    "explanation": "Lesson 07 Slide 52-58 outlines the ReAct prompt format and trace steps.",
    "slideRef": "Lesson 07 Slide 52-58"
  },
  {
    "id": 80,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The ReAct agent pattern gets its name by combining two words: ________ and Acting.",
    "acceptedAnswers": [
      "Reasoning",
      "reasoning"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 52: ReAct = Reasoning + Acting (Yao et al., 2022).",
    "slideRef": "Lesson 07 Slide 52"
  },
  {
    "id": 81,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What is an AI Evaluation Test Harness used for?",
    "options": [
      "To test the AI automatically in a safe, repeatable sandbox and score whether it solved tasks correctly.",
      "To format USB drives.",
      "To turn Python code into an MP4 video.",
      "To change computer desktop wallpaper."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 62-66: A test harness provides reproducible environments, mocked tools, and telemetry to measure agent accuracy.",
    "slideRef": "Lesson 07 Slide 62-66"
  },
  {
    "id": 82,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Keeping trajectory logs of an AI's tool calls and reasoning steps is completely useless in production.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Trajectory logs are essential for debugging mistakes, monitoring latency, and auditing safety.",
    "slideRef": "Lesson 07 Slide 64"
  },
  {
    "id": 83,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Why do developers test AI agents with fake (mock) tools instead of real external APIs during automated testing?",
    "modelAnswer": "1. Reliability: Real APIs might go down or have network lag, making tests fail randomly.\n2. Cost and limits: Calling real APIs (like credit card payments or email servers) costs money and burns API rate limits.\n3. Safety: Testing with mock tools prevents the AI from accidentally sending real emails or making real purchases while testing.",
    "keyPoints": [
      "Real APIs can fail or have network lag, causing unreliable test results.",
      "Avoids burning API costs and rate limits during testing.",
      "Prevents real-world accidental mutations (sending real emails/charges).",
      "Guarantees reproducible, fast automated test runs."
    ],
    "explanation": "Lesson 07 Slide 62-68 covers mock environments and deterministic agent evaluation.",
    "slideRef": "Lesson 07 Slide 62-68"
  },
  {
    "id": 84,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The complete recorded step-by-step history of an AI's thoughts, tool calls, and observations during a task is called its ________.",
    "acceptedAnswers": [
      "trajectory",
      "Trajectory",
      "trace",
      "run trace"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 64: An agent's trajectory records its decision steps from start to finish.",
    "slideRef": "Lesson 07 Slide 64"
  },
  {
    "id": 85,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "In simple terms, what is the Model Context Protocol (MCP)?",
    "options": [
      "A video game for programmers.",
      "A standard protocol that lets AI apps (like Claude, Cursor, or custom agents) easily connect to external tools and files without custom code.",
      "A special brand of computer monitor.",
      "A replacement for the Python programming language."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 07 Slide 72-76: Anthropic's Model Context Protocol (MCP) provides a standard open protocol for connecting AI clients to tools and resources.",
    "slideRef": "Lesson 07 Slide 72-76"
  },
  {
    "id": 86,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In Python FastMCP, you turn a function into an AI tool simply by putting the `@mcp.tool()` decorator above it.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. FastMCP uses `@mcp.tool()` for tools, `@mcp.resource()` for data files, and `@mcp.prompt()` for prompt templates.",
    "slideRef": "Lesson 07 Slide 78"
  },
  {
    "id": 87,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "In MCP (Model Context Protocol), what is the difference between a Tool and a Resource?",
    "modelAnswer": "A Tool is an action that does something or changes data (like restarting a server, sending a message, or calculating a number).\nA Resource is read-only data that gives information to the AI (like reading a log file, reading documentation, or viewing a database record) without changing anything.",
    "keyPoints": [
      "Tool: An executable function that performs actions with side-effects.",
      "Resource: A read-only data source (like files or logs) for context.",
      "Tools change state; Resources provide static/read-only context.",
      "Standardized in the MCP specification."
    ],
    "explanation": "Lesson 07 Slide 75-80 contrasts MCP Tools with MCP Resources.",
    "slideRef": "Lesson 07 Slide 75-80"
  },
  {
    "id": 88,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In Python FastMCP, the decorator written above a function to expose it as an AI tool is @mcp.________().",
    "acceptedAnswers": [
      "tool",
      "tool()",
      "@mcp.tool"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 78: '@mcp.tool()' registers a function as an MCP tool.",
    "slideRef": "Lesson 07 Slide 78"
  },
  {
    "id": 89,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What is the main advantage of building an MCP Server instead of hardcoding Python functions directly inside your bot script?",
    "options": [
      "Hardcoded functions use more battery power.",
      "MCP servers do not require a computer processor.",
      "One MCP server can be reused across different apps (like Claude Desktop, Cursor IDE, and custom Python agents) without rewriting the tool code.",
      "Hardcoded functions cannot print text."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 07 Slide 82-86: MCP decouples tools from client apps, allowing the same tool server to work in Claude Desktop, Cursor, or any agent.",
    "slideRef": "Lesson 07 Slide 82-86"
  },
  {
    "id": 90,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Calling an in-memory local Python function is usually faster than calling a remote server over HTTP.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. In-process local function calls have virtually zero network delay, while remote HTTP calls take more time.",
    "slideRef": "Lesson 07 Slide 84"
  },
  {
    "id": 91,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "When should you write a simple local Python function, and when should you build an MCP Server?",
    "modelAnswer": "Use a simple local Python function when you are building a small prototype, need maximum speed with zero network delay, and the tool is only used in this one Python file.\nBuild an MCP Server when you want to share the same tools across multiple tools (like Cursor, Claude Desktop, and web agents), or when you want tools to run in a safe, separate container.",
    "keyPoints": [
      "Local Python function: Best for single apps, fast in-memory speed, simple code.",
      "MCP Server: Best for sharing tools across multiple clients (Cursor, Claude, web).",
      "MCP provides process isolation and multi-language support.",
      "Choice depends on reuse needs vs ultra-low latency."
    ],
    "explanation": "Lesson 07 Slide 82-88 compares in-process functions vs decoupled MCP servers.",
    "slideRef": "Lesson 07 Slide 82-88"
  },
  {
    "id": 92,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The Model Context Protocol (MCP) sends messages between client and server using the JSON-________ standard.",
    "acceptedAnswers": [
      "RPC",
      "rpc",
      "RPC 2.0",
      "JSON-RPC"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 74: MCP uses JSON-RPC 2.0 as its wire messaging protocol.",
    "slideRef": "Lesson 07 Slide 74"
  },
  {
    "id": 93,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "In LangGraph, how do you pause the workflow before a dangerous step (like deleting data or charging a card) so a human can inspect and approve it?",
    "options": [
      "By turning off the WiFi router.",
      "By closing the terminal window.",
      "By writing a 100-page user manual.",
      "By setting an `interrupt_before=['execute_action']` breakpoint when compiling the graph."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 07 Slide 92-96: `interrupt_before` pauses the graph, saves state to the checkpointer, and waits for human review.",
    "slideRef": "Lesson 07 Slide 92-96"
  },
  {
    "id": 94,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In Human-in-the-Loop workflows, after a human reviews and approves the step, does the AI have to start all the way back from step 1?",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Checkpointers save the exact state at the breakpoint, so execution resumes immediately from the paused step without re-running earlier steps.",
    "slideRef": "Lesson 07 Slide 94"
  },
  {
    "id": 95,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Why is Human-in-the-Loop important for high-stakes actions like sending an invoice or deleting customer records?",
    "modelAnswer": "AI models can make mistakes, misunderstand instructions, or hallucinate.\nIf an AI has unrestricted power to send invoices or delete customer records, a single mistake could cost thousands of dollars or lose critical data.\nHuman-in-the-Loop adds a safety checkpoint: the AI drafts the action, but a human must click 'Approve' or make edits before the dangerous command actually runs.",
    "keyPoints": [
      "AI models can hallucinate or misunderstand complex instructions.",
      "Dangerous actions (payments, deletions, emails) cannot be easily undone.",
      "Human review catches errors before damage occurs.",
      "Allows humans to approve, edit, or reject the proposed action."
    ],
    "explanation": "Lesson 07 Slide 92-98 outlines Human-in-the-Loop safety patterns and resume flows.",
    "slideRef": "Lesson 07 Slide 92-98"
  },
  {
    "id": 96,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In LangGraph, the setting used to pause execution immediately before a specific step runs is interrupt_________.",
    "acceptedAnswers": [
      "before",
      "Before",
      "interrupt_before"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Lesson 07 Slide 92: interrupt_before=['step_name'] halts execution before the specified node.",
    "slideRef": "Lesson 07 Slide 92"
  }
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    moduleId: "mod04",
    category: "Workflow",
    front: "State vs. Memory",
    back: "State = Short-term execution context for current task (temporary variables, step pointer).\nMemory = Long-term context across multiple sessions (user habits, persistent facts)."
  },
  {
    id: 2,
    moduleId: "mod04",
    category: "LangGraph",
    front: "Checkpointer vs. Store in LangGraph",
    back: "Checkpointer (InMemorySaver) = Short-term thread memory scoped by thread_id.\nStore (InMemoryStore) = Long-term memory scoped by namespaces (e.g., users, user_123)."
  },
  {
    id: 3,
    moduleId: "mod04",
    category: "Chaining",
    front: "Sequential vs. Conditional Routing",
    back: "Sequential = Linear fixed pipeline (Step 1 -> Step 2 -> Step 3).\nConditional = Dynamic runtime branching (Router directs to specialized branch)."
  },
  {
    id: 4,
    moduleId: "mod05",
    category: "RAG",
    front: "RAG vs. Fine-Tuning",
    back: "RAG = Inject dynamic facts, private data, and verifiable citations (update docs, not weights).\nFine-Tuning = Adapt style, tone, format, or task behavior (expensive, prone to hallucination for facts)."
  },
  {
    id: 5,
    moduleId: "mod05",
    category: "Chunking",
    front: "Chunk Overlap (Why it helps)",
    back: "Repeats 10–20% of boundary tokens between adjacent chunks so sentences sliced at the cut point remain whole in at least one chunk."
  },
  {
    id: 6,
    moduleId: "mod05",
    category: "Math / Metrics",
    front: "Cosine vs. Dot Product",
    back: "Cosine measures angle only (invariant to length).\nDot Product measures angle + magnitude.\nWhen vectors are unit-normalized (length=1), Dot Product == Cosine Similarity!"
  },
  {
    id: 7,
    moduleId: "mod06",
    category: "Hybrid Search",
    front: "Reciprocal Rank Fusion (RRF)",
    back: "Formula: RRF(d) = Σ 1 / (k + rank_i(d)) with k = 60.\nDiscards raw score magnitudes, ranks purely by position. Agreement wins!"
  },
  {
    id: 8,
    moduleId: "mod06",
    category: "Reranking",
    front: "Bi-Encoder vs. Cross-Encoder",
    back: "Bi-Encoder = Two towers, independent embeddings, fast vector search.\nCross-Encoder = Single tower, concatenated tokens, full cross-attention, high accuracy."
  },
  {
    id: 9,
    moduleId: "mod06",
    category: "Context",
    front: "Lost in the Middle & The Fix",
    back: "LLMs recall best at prompt beginning and end.\nFix: Reorder chunks so Rank 1 is first, Rank 2 is last, and weaker chunks are in the middle."
  },
  {
    id: 10,
    moduleId: "mod06",
    category: "Graph RAG",
    front: "Graph RAG: Local vs. Global",
    back: "Local = Entity-focused (1-2 hops for specific facts).\nGlobal = Theme-focused (map-reduce over community summary reports)."
  },
  {
    id: 11,
    moduleId: "mod07",
    category: "Tool Calling",
    front: "Fundamental Rule of Tool Calling",
    back: "\"The model requests the action; the application executes it.\"\nLocal LLMs emit JSON strings; host applications execute code."
  },
  {
    id: 12,
    moduleId: "mod07",
    category: "Security",
    front: "Schema vs. Business Validation",
    back: "Schema = Is request well-formed? (types, required fields).\nBusiness = Is it okay to do? (in stock, permissions). -5 is valid int, invalid product ID!"
  },
  {
    id: 13,
    moduleId: "mod07",
    category: "Architecture",
    front: "Harness OS-Kernel Analogy",
    back: "Model = Untrusted CPU (generates next tokens).\nHarness = Operating System Kernel (enforces syscalls, permissions, sandboxes, and budgets)."
  },
  {
    id: 14,
    moduleId: "mod07",
    category: "MCP",
    front: "The 3 MCP Primitives",
    back: "1. Tools (model-called actions)\n2. Resources (readable data attachments)\n3. Prompts (user-triggered slash commands)"
  },
  {
    id: 15,
    moduleId: "mod07",
    category: "Human Oversight",
    front: "HITL vs. HOTL vs. HOOTL",
    back: "HITL (In-the-loop) = Suspends until human approves.\nHOTL (On-the-loop) = Runs immediately with rollback audit.\nHOOTL (Out-of-the-loop) = Full autonomy."
  },
  {
    id: 16,
    moduleId: "mod07",
    category: "Patterns",
    front: "The 5 Agent Patterns",
    back: "1. ReAct (Thought -> Act -> Observe)\n2. Router (Classify to specialist)\n3. Planner-Executor (Plan upfront, replan)\n4. Reflection (Generator -> Critic)\n5. Multi-Agent (Delegation)"
  },
  {
    id: 17,
    moduleId: "mod02",
    category: "Ollama CLI",
    front: "ollama list vs. ollama ps",
    back: "ollama list = Shows downloaded model weights stored on disk.\nollama ps = Shows models actively loaded into RAM/VRAM with GPU allocation and expiry."
  },
  {
    id: 18,
    moduleId: "mod02",
    category: "Ollama Modelfile",
    front: "Modelfile Directives & Context Setting",
    back: "FROM = Base model weights.\nSYSTEM = Role, personality, constraints.\nPARAMETER num_ctx = Sets context window token budget (e.g. 8192)."
  },
  {
    id: 19,
    moduleId: "mod06",
    category: "Docker & Neo4j",
    front: "Neo4j Container Ports (7474 vs 7687)",
    back: "Port 7474 = HTTP Web Browser visual UI.\nPort 7687 = Bolt binary protocol used by Python drivers and LangChain GraphCypherQAChain."
  },
  {
    id: 20,
    moduleId: "mod05",
    category: "Docker & Qdrant",
    front: "Qdrant Container Ports (6333 vs 6334)",
    back: "Port 6333 = REST HTTP API & Web Dashboard.\nPort 6334 = gRPC high-performance vector search & insertion."
  },
  {
    id: 21,
    moduleId: "mod02",
    category: "Docker & vLLM",
    front: "Why --ipc=host is required for vLLM",
    back: "Shares host IPC memory so PyTorch multi-process workers can exchange large tensor buffers without crashing on Docker's 64MB default limit."
  },
  {
    id: 22,
    moduleId: "mod06",
    category: "GraphRAG CLI",
    front: "GraphRAG Global vs. Local Search",
    back: "--method global = Map-reduce over Leiden community summaries for broad corpus-wide themes.\n--method local = Subgraph traversal around specific seed entities."
  },
  {
    id: 23,
    moduleId: "mod01",
    category: "GPU & System",
    front: "nvidia-smi Performance States (P0 vs P8)",
    back: "P0 = Maximum performance state under active compute load.\nP8 = Lowest power idle state."
  },
  {
    id: 24,
    moduleId: "mod02",
    category: "Local Serving",
    front: "Continuous Batching vs. Static Batching",
    back: "Static = Server waits until every request in the batch finishes.\nContinuous = New requests jump into freed slots at every token generation step."
  },
  {
    id: 25,
    moduleId: "mod06",
    category: "Neo4j Cypher",
    front: "CREATE vs. MERGE in Cypher",
    back: "CREATE = Always makes new nodes & edges (running twice creates duplicate graph).\nMERGE = Idempotent ('find or create'). Re-running safely updates without duplicating!"
  },
  {
    id: 26,
    moduleId: "mod06",
    category: "Neo4j Cypher",
    front: "DELETE vs. DETACH DELETE in Cypher",
    back: "DELETE n = Fails with an error if relationships are still attached to node n.\nDETACH DELETE n = Automatically severs/deletes all connected relationships, then deletes node n."
  }
];

export const COMMANDS_DATA: CLICommand[] = [
  // OLLAMA COMMANDS
  {
    id: "cmd-ollama-pull",
    category: "ollama",
    categoryLabel: "Ollama CLI",
    title: "Download Model Without Running",
    command: "ollama pull llama3.2:1b",
    description: "Downloads model weights, tokenizer, and configuration from the Ollama library directly to local storage without launching a chat session.",
    flags: [
      { flag: "<model>", description: "Model name from Ollama library (e.g. llama3.2, nomic-embed-text)" },
      { flag: ":<tag>", description: "Optional tag specifying parameter size or quantization (e.g. :1b, :8b, :latest)" }
    ],
    exampleOutput: `pulling manifest...
pulling dde5aa3fc5ff 100% [====================] 1.3 GB
verifying sha256 digest
success`,
    examWarning: "Exam Trap: 'ollama pull' only downloads to disk; it does NOT load into RAM/VRAM or start interactive chat. Use 'ollama run' to chat.",
    slideRef: "Lesson 02 Slide 11"
  },
  {
    id: "cmd-ollama-run",
    category: "ollama",
    categoryLabel: "Ollama CLI",
    title: "Pull, Load, and Start Interactive Chat",
    command: 'ollama run llama3.2 "Explain vector embeddings in one sentence."',
    description: "Pulls the model if not already cached, loads it into memory (GPU/CPU), and starts an interactive chat session or executes a one-off prompt.",
    flags: [
      { flag: "<model>", description: "Target model to run" },
      { flag: '"<prompt>"', description: "Optional one-off prompt. If omitted, opens an interactive terminal chat (exit with /bye or Ctrl+D)" }
    ],
    exampleOutput: `Vector embeddings are numerical vectors representing semantic concepts in high-dimensional space.`,
    examWarning: "To exit an interactive Ollama chat session, type '/bye' or press Ctrl+D.",
    slideRef: "Lesson 02 Slide 11, 12"
  },
  {
    id: "cmd-ollama-list",
    category: "ollama",
    categoryLabel: "Ollama CLI",
    title: "List Downloaded Models on Disk",
    command: "ollama list",
    description: "Displays all model weights downloaded and stored on your local disk along with their model IDs, sizes, and last modified dates.",
    exampleOutput: `NAME                ID              SIZE      MODIFIED
llama3.2:1b         a80c4f172d66    1.3 GB    2 hours ago
nomic-embed-text    0a109f422b47    274 MB    3 days ago`,
    examWarning: "'ollama list' only displays what is saved on your drive. It does NOT indicate whether a model is actively loaded into memory.",
    slideRef: "Lesson 02 Slide 11"
  },
  {
    id: "cmd-ollama-ps",
    category: "ollama",
    categoryLabel: "Ollama CLI",
    title: "Show Actively Loaded Models in Memory",
    command: "ollama ps",
    description: "Lists models currently occupying system RAM or GPU VRAM, including memory footprint, hardware acceleration ratio (100% GPU / CPU), and expiry timer.",
    exampleOutput: `NAME            ID              SIZE      PROCESSOR    UNTIL
llama3.2:1b     a80c4f172d66    1.3 GB    100% GPU     4 minutes from now`,
    examWarning: "Frequently tested: Which command inspects running models in VRAM? 'ollama ps' (similar to 'docker ps').",
    slideRef: "Lesson 02 Slide 11"
  },
  {
    id: "cmd-ollama-show",
    category: "ollama",
    categoryLabel: "Ollama CLI",
    title: "Inspect Model Metadata & Architecture",
    command: "ollama show llama3.2:1b",
    description: "Prints deep architectural details: model architecture, parameter count, context window length, embedding length, quantization level, and license.",
    exampleOutput: `Model architecture: llama
parameters: 1.2B
context length: 131072
embedding length: 2048
quantization: Q8_0
License: LLAMA 3.2 COMMUNITY LICENSE`,
    examWarning: "Check quantization (e.g. Q4_K_M vs Q8_0) and maximum context length before planning deployment memory requirements.",
    slideRef: "Lesson 02 Slide 13"
  },
  {
    id: "cmd-ollama-create",
    category: "ollama",
    categoryLabel: "Ollama CLI",
    title: "Compile Custom Model from Modelfile",
    command: "ollama create py-tutor -f ./Modelfile",
    description: "Bakes custom system instructions, sampling temperature, and context length into a permanent named model so you don't need to specify them per request.",
    flags: [
      { flag: "<name>", description: "Identifier name for your customized model" },
      { flag: "-f <path>", description: "Path to the Modelfile definition" }
    ],
    exampleOutput: `transferring system data
parsing Modelfile
packing model layers
writing manifest
success`,
    examWarning: "After creation, launch your custom model with 'ollama run <name>'.",
    slideRef: "Lesson 02 Slide 14"
  },
  {
    id: "cmd-ollama-modelfile",
    category: "ollama",
    categoryLabel: "Ollama Modelfile",
    title: "Modelfile Configuration Directives",
    command: `FROM llama3.2:1b
PARAMETER temperature 0.3
PARAMETER num_ctx 8192
SYSTEM """You are a patient Python tutor for first-year CS students."""`,
    description: "Configuration file that defines the base model, runtime parameters, and persistent system prompt.",
    flags: [
      { flag: "FROM", description: "Specifies base model to inherit weights and tokenizer from" },
      { flag: "PARAMETER temperature", description: "Controls output randomness (0.0 = deterministic, 1.0 = creative)" },
      { flag: "PARAMETER num_ctx", description: "Sets total context window token budget (e.g. 8192 tokens)" },
      { flag: "SYSTEM", description: "Sets persistent system instructions, role, and constraints" }
    ],
    examWarning: "Exam Question: Context window is set in Modelfile via 'PARAMETER num_ctx <tokens>', NOT 'max_tokens'.",
    slideRef: "Lesson 02 Slide 14 & Lesson 03 Slide 27"
  },
  {
    id: "cmd-ollama-serve",
    category: "ollama",
    categoryLabel: "Ollama CLI",
    title: "Daemon Startup & Localhost Binding Guardrail",
    command: "OLLAMA_HOST=127.0.0.1:11434 ollama serve",
    description: "Launches the Ollama background daemon. Setting OLLAMA_HOST=127.0.0.1 prevents binding to 0.0.0.0 which exposes unauthenticated GPU compute.",
    flags: [
      { flag: "OLLAMA_HOST", description: "Environment variable controlling IP address and port binding" }
    ],
    examWarning: "Network Guardrail Alert: Local LLM servers have no authentication by default. Binding to 0.0.0.0 allows anyone on the LAN to burn compute.",
    slideRef: "Lesson 03 Slide 63-64"
  },

  // DOCKER COMMANDS
  {
    id: "cmd-docker-neo4j",
    category: "docker",
    categoryLabel: "Docker Container",
    title: "Run Neo4j Knowledge Graph Database",
    command: "docker run -d --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/kshrd2026 neo4j:5",
    description: "Launches a containerized Neo4j graph database for GraphRAG multi-hop querying, entity relationships, and Cypher graph QA.",
    flags: [
      { flag: "-d", description: "Detached mode (runs container in background)" },
      { flag: "--name neo4j", description: "Assigns friendly name to the container" },
      { flag: "-p 7474:7474", description: "Maps port 7474 for Web Browser visual interface (http://localhost:7474)" },
      { flag: "-p 7687:7687", description: "Maps port 7687 for Bolt binary protocol (used by Python drivers and LangChain)" },
      { flag: "-e NEO4J_AUTH=user/pass", description: "Sets initial credentials for authentication" }
    ],
    exampleOutput: "a7f3b890c21e4a5d8b9910248c028a3f8901bce4710294719283719283719283",
    examWarning: "Exam Port Distinction: Port 7474 is HTTP Web Browser UI; port 7687 is BOLT binary protocol used by Python code. Memorize both!",
    slideRef: "Lesson 06 Slide 30"
  },
  {
    id: "cmd-docker-qdrant",
    category: "docker",
    categoryLabel: "Docker Container",
    title: "Run Qdrant Vector Database with Volume Persistence",
    command: "docker run -d --name qdrant -p 6333:6333 -p 6334:6334 -v $(pwd)/qdrant_storage:/qdrant/storage:z qdrant/qdrant",
    description: "Runs Qdrant vector database container with persistent host storage for vector embeddings and hybrid sparse+dense search.",
    flags: [
      { flag: "-p 6333:6333", description: "HTTP REST API and Web Dashboard" },
      { flag: "-p 6334:6334", description: "gRPC high-throughput vector ingestion port" },
      { flag: "-v <host>:<container>:z", description: "Mounts persistent storage directory so vector indexes survive restarts" }
    ],
    examWarning: "Port 6333 = REST API / Web; Port 6334 = gRPC API. Volume mounting (-v) is mandatory for data persistence.",
    slideRef: "Lesson 05 Slide 60 & Lesson 06 Slide 30"
  },
  {
    id: "cmd-docker-gpu",
    category: "docker",
    categoryLabel: "Docker Container",
    title: "Docker NVIDIA GPU Passthrough Validation",
    command: "docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi",
    description: "Smoke test proving that Docker and the NVIDIA Container Toolkit can successfully expose host GPUs to containerized workloads.",
    flags: [
      { flag: "--rm", description: "Automatically deletes container file system after execution terminates" },
      { flag: "--gpus all", description: "Exposes all host NVIDIA GPUs to the container" }
    ],
    exampleOutput: `+-----------------------------------------------------------------------------+
| NVIDIA-SMI 550.90.07   Driver Version: 550.90.07   CUDA Version: 12.4       |
| GPU  Name   Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC     |
|   0  NVIDIA RTX 4090   On | 00000000:01:00.0 Off |                  Off     |
+-----------------------------------------------------------------------------+`,
    examWarning: "If 'nvidia-container-toolkit' is missing, '--gpus all' will fail with 'could not select device driver'.",
    slideRef: "Lesson 01 Slide 39"
  },
  {
    id: "cmd-docker-vllm",
    category: "docker",
    categoryLabel: "Docker Container",
    title: "Run High-Throughput vLLM Serving Container",
    command: `docker run -d --rm \\
  --gpus '"device=0"' \\
  -p 9040:9040 \\
  -v ~/.cache/huggingface:/root/.cache/huggingface \\
  --ipc=host \\
  --name vllm-qwen \\
  vllm/vllm-openai:latest \\
  --model Qwen/Qwen2.5-3B-Instruct \\
  --gpu-memory-utilization 0.25 \\
  --port 9040`,
    description: "Runs production vLLM inference container pinned to GPU 0 with host IPC memory sharing and model cache persistence.",
    flags: [
      { flag: "--gpus '\"device=0\"'", description: "Pins container to physical GPU device index 0" },
      { flag: "--ipc=host", description: "CRITICAL: Shares host IPC memory for PyTorch inter-process tensor exchange" },
      { flag: "-v ...huggingface", description: "Mounts model cache so weights survive container restarts" },
      { flag: "--gpu-memory-utilization 0.25", description: "Caps GPU VRAM reservation to 25% (default is 0.90)" },
      { flag: "--port 9040", description: "Maps OpenAI-compatible REST API port" }
    ],
    examWarning: "Exam Question (Lesson 02 Slide 38): Why '--ipc=host'? PyTorch multi-worker processes need shared memory to exchange tensor buffers.",
    slideRef: "Lesson 02 Slide 38"
  },
  {
    id: "cmd-docker-compose",
    category: "docker",
    categoryLabel: "Docker Compose",
    title: "Multi-Model Inference Stack with Compose",
    command: "docker compose up -d\ndocker compose down",
    description: "Orchestrates multi-service architectures declared in docker-compose.yml (e.g. Chat model on GPU 0, Embedding model on GPU 1, Neo4j, and Qdrant).",
    flags: [
      { flag: "up -d", description: "Builds and starts all defined services in detached background mode" },
      { flag: "down", description: "Stops and removes containers and default networks" },
      { flag: "restart: unless-stopped", description: "Configures automatic service self-healing if a container crashes" }
    ],
    examWarning: "Allows running multiple distinct LLM models side-by-side on separate ports and dedicated GPUs with a single command.",
    slideRef: "Lesson 02 Slide 39, 40"
  },
  {
    id: "cmd-docker-logs-exec",
    category: "docker",
    categoryLabel: "Docker CLI",
    title: "Container Lifecycle & Debugging",
    command: "docker ps\ndocker logs -f vllm-qwen\ndocker exec -it vllm-qwen /bin/bash\ndocker stop vllm-qwen",
    description: "Essential commands to list containers, tail live server logs, open an interactive bash shell, and stop containers.",
    flags: [
      { flag: "docker ps", description: "Lists running containers with IDs and port mappings" },
      { flag: "docker logs -f", description: "Follows live output stream (essential for catching CUDA Out-of-Memory errors)" },
      { flag: "docker exec -it ... /bin/bash", description: "Opens interactive terminal inside container" }
    ],
    examWarning: "Use 'docker logs -f' immediately after running an LLM container to monitor model loading progress and VRAM allocation.",
    slideRef: "Lesson 01 & 02 Labs"
  },

  // MICROSOFT GRAPHRAG CLI
  {
    id: "cmd-graphrag-init",
    category: "graphrag",
    categoryLabel: "GraphRAG CLI",
    title: "Initialize GraphRAG Project Directory",
    command: "graphrag init --root ./rag-graph",
    description: "Scaffolds a new Microsoft GraphRAG project directory, generating the default 'settings.yaml' configuration file and '.env' API key template.",
    flags: [
      { flag: "--root <dir>", description: "Target root directory for configuration, input text files, and output graph artifacts" }
    ],
    exampleOutput: `Initializing GraphRAG project in ./rag-graph...
Created settings.yaml
Created .env`,
    examWarning: "Always configure your API key / local endpoint and model in '.env' before running indexing.",
    slideRef: "Lesson 06 Slide 30"
  },
  {
    id: "cmd-graphrag-index",
    category: "graphrag",
    categoryLabel: "GraphRAG CLI",
    title: "Offline Knowledge Graph Extraction & Leiden Clustering",
    command: "graphrag index --root ./rag-graph",
    description: "Executes the offline pipeline: chunking documents, extracting entities/relationships via LLM, generating claims, and clustering Leiden communities.",
    flags: [
      { flag: "--root <dir>", description: "Directory containing the 'input/' folder with source text documents" }
    ],
    exampleOutput: `Reading documents...
Extracting entities and relationships...
Generating claim covariates...
Clustering Leiden hierarchical communities...
Generating community summaries...
Graph indexing completed successfully.`,
    examWarning: "Indexing is an offline, computation-heavy process. Once indexed, queries run quickly without re-extracting entities.",
    slideRef: "Lesson 06 Slide 30"
  },
  {
    id: "cmd-graphrag-global",
    category: "graphrag",
    categoryLabel: "GraphRAG CLI",
    title: "Global Search Query — Overarching Corpus Themes",
    command: 'graphrag query --root ./rag-graph --method global --query "What are the major overarching themes across all documents?"',
    description: "Answers broad, holistic questions by performing map-reduce over pre-computed hierarchical Leiden community summaries rather than raw text chunks.",
    flags: [
      { flag: "--method global", description: "Queries community summaries using map-reduce sensemaking" },
      { flag: "--query <string>", description: "Thematic corpus-wide prompt" }
    ],
    examWarning: "Key Exam Match: Use GLOBAL search for overarching themes, summaries, and trends across the whole corpus.",
    slideRef: "Lesson 06 Slide 30"
  },
  {
    id: "cmd-graphrag-local",
    category: "graphrag",
    categoryLabel: "GraphRAG CLI",
    title: "Local Search Query — Entity Subgraph Traversal",
    command: 'graphrag query --root ./rag-graph --method local --query "What are the specific relationships and actions of Entity X?"',
    description: "Performs Local Search by identifying seed entities in the query and traversing neighboring nodes, edges, covariates, and linked raw text chunks.",
    flags: [
      { flag: "--method local", description: "Traverses focused subgraphs around specific entities" },
      { flag: "--query <string>", description: "Entity-specific question" }
    ],
    examWarning: "Key Exam Match: Use LOCAL search for questions focused on specific entities, direct interactions, and detailed facts.",
    slideRef: "Lesson 06 Slide 30"
  },

  // vLLM CLI & LOCAL SERVING
  {
    id: "cmd-vllm-serve-cli",
    category: "vllm",
    categoryLabel: "vLLM CLI",
    title: "Launch vLLM OpenAI-Compatible Server",
    command: "CUDA_VISIBLE_DEVICES=0 vllm serve Qwen/Qwen2.5-3B-Instruct --gpu-memory-utilization 0.25 --port 9040",
    description: "Starts high-throughput inference engine using PagedAttention (OS-style KV cache paging) and continuous batching on GPU 0.",
    flags: [
      { flag: "CUDA_VISIBLE_DEVICES=0", description: "Restricts server process to physical GPU device index 0" },
      { flag: "--gpu-memory-utilization 0.25", description: "Pre-allocates only 25% of GPU VRAM (default is 0.90)" },
      { flag: "--port 9040", description: "Port for HTTP REST server (default is 8000)" }
    ],
    exampleOutput: `INFO: Uvicorn running on http://0.0.0.0:9040 (Press CTRL+C to quit)
INFO: Available routes: /v1/chat/completions, /v1/models`,
    examWarning: "Why choose vLLM over Ollama in production? Continuous batching (new requests join immediately) + PagedAttention (eliminates KV cache memory waste).",
    slideRef: "Lesson 02 Slide 30, 31, 37"
  },
  {
    id: "cmd-vllm-reasoning",
    category: "vllm",
    categoryLabel: "vLLM CLI",
    title: "Enable Reasoning Parser for Thinking Models",
    command: "vllm serve deepseek-r1 --enable-reasoning --reasoning-parser deepseek_r1",
    description: "Enables thinking token parsing for DeepSeek-R1 and similar reasoning models, allowing separate streaming of thought traces and final answers.",
    flags: [
      { flag: "--enable-reasoning", description: "Activates reasoning trace extraction" },
      { flag: "--reasoning-parser <name>", description: "Specifies parser format (e.g. deepseek_r1)" }
    ],
    examWarning: "The thinking toggle exists at two levels: (1) CLI server startup flag, and (2) optional per-request API parameter.",
    slideRef: "Lesson 03 Slide 26"
  },

  // GPU & SYSTEM VALIDATION
  {
    id: "cmd-nvidia-smi",
    category: "validation",
    categoryLabel: "GPU Validation",
    title: "Query GPU Health & VRAM with nvidia-smi",
    command: "nvidia-smi",
    description: "Primary NVIDIA System Management Interface utility to verify GPU driver, CUDA runtime, VRAM usage, temperature, fan speed, and performance state.",
    flags: [
      { flag: "Driver Version", description: "Version of host NVIDIA kernel driver (e.g. 550.90.07)" },
      { flag: "CUDA Version", description: "Maximum supported CUDA version (e.g. 12.4 / 13.0)" },
      { flag: "Perf State (P0-P8)", description: "P0 is maximum performance under load; P8 is idle power-saving" },
      { flag: "Memory-Usage", description: "Current VRAM allocated vs total (e.g. 9428 MiB / 12282 MiB)" },
      { flag: "Fan Speed", description: "0-20% = idle, 20-50% = moderate load, >50% = heavy compute" }
    ],
    exampleOutput: `+-----------------------------------------------------------------------------+
| NVIDIA-SMI 550.90.07   Driver Version: 550.90.07   CUDA Version: 13.0       |
| Fan  Temp  Perf  Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|  30%   45C    P0   173W / 200W |   9428MiB / 12282MiB |     96%      Default |
+-----------------------------------------------------------------------------+`,
    examWarning: "Exam Question (Lesson 01 Slide 33): What is performance state P0? P0 = highest performance state under active workload.",
    slideRef: "Lesson 01 Slide 28-34"
  },
  {
    id: "cmd-env-validation",
    category: "validation",
    categoryLabel: "Environment",
    title: "CUDA Libraries & Environment Variables",
    command: `echo $LD_LIBRARY_PATH | tr ':' '\\n' | grep cuda
export HF_HOME=/mnt/fast_storage/huggingface
export CUDA_VISIBLE_DEVICES=0,1`,
    description: "Verifies that CUDA shared libraries (libcudart.so, libcublas.so) are found in path and overrides Hugging Face storage or GPU visibility.",
    flags: [
      { flag: "HF_HOME", description: "Overrides default Hugging Face model cache storage (~/.cache)" },
      { flag: "CUDA_VISIBLE_DEVICES", description: "Restricts visible GPUs exposed to PyTorch (e.g. only GPUs 0 and 1)" }
    ],
    examWarning: "If CUDA shared libraries are missing from LD_LIBRARY_PATH, PyTorch fails at runtime with 'libcudart.so not found'.",
    slideRef: "Lesson 01 Slide 23, 24, 38"
  },

  // cURL & REST API TESTING
  {
    id: "cmd-curl-vllm",
    category: "curl",
    categoryLabel: "cURL / REST API",
    title: "Test OpenAI-Compatible Chat Endpoint with curl",
    command: `curl http://localhost:9040/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "Qwen/Qwen2.5-0.5B-Instruct",
    "messages": [
      {"role": "user", "content": "What is the capital of Cambodia?"}
    ],
    "max_completion_tokens": 200,
    "temperature": 0.7
  }'`,
    description: "Direct HTTP request testing that a local inference server correctly responds to standard OpenAI chat completion schemas.",
    flags: [
      { flag: "-H 'Content-Type: application/json'", description: "Declares payload format as JSON" },
      { flag: "messages array", description: "Contains message objects with 'role' ('user'/'assistant'/'system') and 'content'" }
    ],
    exampleOutput: `{
  "model": "Qwen/Qwen2.5-0.5B-Instruct",
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "The capital of Cambodia is Phnom Penh."
    },
    "finish_reason": "stop"
  }],
  "usage": { "total_tokens": 145 }
}`,
    examWarning: "Only 'base_url' changes between engines (vLLM, Ollama, OpenAI cloud). The JSON shape is standardized.",
    slideRef: "Lesson 02 Slide 44 & Lesson 03 Slide 11, 66"
  },
  {
    id: "cmd-curl-ollama",
    category: "curl",
    categoryLabel: "cURL / REST API",
    title: "Ollama Native Chat & Embeddings API",
    command: `# Native Chat Request
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "What is RAG?"}],
  "stream": false
}'

# Native Embeddings Request
curl http://localhost:11434/api/embeddings -d '{
  "model": "nomic-embed-text",
  "prompt": "Dense vector retrieval"
}'`,
    description: "Demonstrates Ollama's original native endpoints (/api/chat and /api/embeddings) versus the OpenAI compatibility endpoint (/v1/chat/completions).",
    flags: [
      { flag: "stream: false", description: "Returns full generated output at once instead of streaming token chunks" }
    ],
    examWarning: "Ollama native endpoints are '/api/chat' and '/api/embeddings'. Ollama OpenAI compatibility endpoints are '/v1/chat/completions' and '/v1/embeddings'.",
    slideRef: "Lesson 03 Slide 13"
  },

  // PIP DEPENDENCIES
  {
    id: "cmd-pip-packages",
    category: "pip",
    categoryLabel: "Pip Installation",
    title: "Install Complete Course AI Package Stack",
    command: `# Vector Databases & Hybrid Search
pip install chromadb qdrant-client rank_bm25 sentence-transformers

# Orchestration & Multi-Agent Frameworks
pip install langchain langchain-core langgraph llama-index llama-index-core mcp fastmcp

# High-Performance Serving & Structured Validation
pip install "vllm==0.9.2" instructor pydantic presidio-analyzer presidio-anonymizer graphrag neo4j langchain-neo4j`,
    description: "Comprehensive installation reference for all libraries used across Lessons 01 through 07 in the course.",
    examWarning: "vLLM requires Python 3.9-3.12 and Linux/WSL2 with NVIDIA GPU compute >= 7.0. Always install in a dedicated virtual environment!",
    slideRef: "Lessons 01-07"
  },

  // NEO4J & CYPHER SCRIPTS (EXAM HIGHLIGHT)
  {
    id: "cmd-cypher-create",
    category: "cypher",
    categoryLabel: "Cypher Query",
    title: "CREATE Triple — Node & Relationship Creation (Exam Script)",
    command: `CREATE (a:Entity {name: "Sokha"})-[r:WORKS_ON]->(b:Entity {name: "Invoicing Service"})
RETURN a, r, b;`,
    description: "Creates two nodes with label 'Entity' and property 'name', connected by a directed :WORKS_ON relationship, returning the created pattern.",
    flags: [
      { flag: "(a:Entity {name: '...'})", description: "Node pattern: variable 'a', label 'Entity', property map {name: '...'}" },
      { flag: "-[r:WORKS_ON]->", description: "Directed edge: variable 'r', relationship type 'WORKS_ON'" },
      { flag: "RETURN a, r, b", description: "Projects created nodes and relationship for display" }
    ],
    exampleOutput: `Added 2 nodes, created 1 relationship, set 2 properties.
a: (:Entity {name: "Sokha"})
r: [:WORKS_ON]
b: (:Entity {name: "Invoicing Service"})`,
    examWarning: "Exam Trap: CREATE is not idempotent! Running it twice creates duplicate nodes and duplicate edges. Use MERGE for idempotent loading.",
    slideRef: "Lesson 06 Slide 29 & Exam Highlight"
  },
  {
    id: "cmd-cypher-merge",
    category: "cypher",
    categoryLabel: "Cypher Query",
    title: "MERGE Idempotent Fact Loading (Lesson 06 Slide 29)",
    command: `MERGE (p:Person {name: "Sokha"})
MERGE (t:Team {name: "Platform"})
MERGE (p)-[r:MEMBER_OF]->(t)
SET r.chunk_id = "handbook::chunk_12", r.weight = 9
RETURN p, r, t;`,
    description: "Idempotently finds or creates entities and relationships. Prevents duplicate entity explosion when reloading documents.",
    flags: [
      { flag: "MERGE", description: "Matches existing pattern if found; creates only if absent" },
      { flag: "SET r.chunk_id = ...", description: "Stores source chunk ID for provenance citations" }
    ],
    examWarning: "Rule: Always MERGE, never CREATE. MERGE is idempotent. Re-running your loader with CREATE gives you the same graph twice.",
    slideRef: "Lesson 06 Slide 29"
  },
  {
    id: "cmd-cypher-1hop",
    category: "cypher",
    categoryLabel: "Cypher Query",
    title: "MATCH 1-Hop Pattern Query",
    command: `MATCH (p:Person {name: "Sokha"})-[:MEMBER_OF]->(t:Team)
RETURN t.name;`,
    description: "Traverses 1 hop from Person 'Sokha' across the directed :MEMBER_OF edge to retrieve the associated Team name.",
    flags: [
      { flag: "MATCH", description: "Pattern matching clause (ASCII drawing of the graph sub-structure)" },
      { flag: "RETURN t.name", description: "Returns only the 'name' property of the target Team node" }
    ],
    examWarning: "Omit relationship variable when not inspecting edge properties: '[:MEMBER_OF]' instead of '[r:MEMBER_OF]'.",
    slideRef: "Lesson 06 Slide 29"
  },
  {
    id: "cmd-cypher-multihop",
    category: "cypher",
    categoryLabel: "Cypher Query",
    title: "Multi-Hop Traversal Query (The Core of Graph RAG)",
    command: `MATCH (s:Service {name: "Billing"})<-[:OWNS]-(p:Person)-[:MEMBER_OF]->(t:Team)
RETURN p.name AS person, t.name AS team;`,
    description: "Solves multi-hop questions in one statement by joining paths: finds who owns Billing and what Team they belong to.",
    flags: [
      { flag: "(s)<-[:OWNS]-(p)", description: "Reverse incoming arrow: Person p owns Service s" },
      { flag: "(p)-[:MEMBER_OF]->(t)", description: "Outgoing arrow: Person p is member of Team t" }
    ],
    examWarning: "Direction is meaning: swapping '<-' and '->' reverses the meaning and breaks traversal.",
    slideRef: "Lesson 06 Slide 29"
  },
  {
    id: "cmd-cypher-bounded",
    category: "cypher",
    categoryLabel: "Cypher Query",
    title: "Variable-Length Bounded Path Query",
    command: `MATCH path = (a:Entity {name: "LegacyPay"})-[*1..3]-(b:Entity)
RETURN path
LIMIT 25;`,
    description: "Traverses any relationship from 1 to 3 hops away in any direction from 'LegacyPay', returning subgraphs capped at 25 paths.",
    flags: [
      { flag: "[*1..3]", description: "Variable length path: minimum 1 hop, maximum 3 hops" },
      { flag: "LIMIT 25", description: "Caps the maximum number of matched paths to prevent exponential slowdown" }
    ],
    examWarning: "Exam Rule: Always bound your traversals (*1..3) and add LIMIT. An unbounded [*] on a real graph will hang!",
    slideRef: "Lesson 06 Slide 29"
  },
  {
    id: "cmd-cypher-delete",
    category: "cypher",
    categoryLabel: "Cypher Query",
    title: "Safe Deletion with DETACH DELETE",
    command: `MATCH (a:Entity {name: "Sokha"})
DETACH DELETE a;`,
    description: "Deletes the node and automatically severs and deletes all connected relationships first.",
    flags: [
      { flag: "DETACH DELETE", description: "Cascades deletion to attached incoming/outgoing edges before deleting node" }
    ],
    examWarning: "Running 'DELETE a' on a node with existing relationships will fail with an error. Always use 'DETACH DELETE a'.",
    slideRef: "Lesson 06 Slide 29"
  }
];
