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
    "question": "Why do complex real-world AI applications require structured LLM Workflows instead of a single massive prompt?",
    "options": [
      "Workflows decompose tasks into modular, debuggable steps with deterministic control flow, error handling, and specialized prompts.",
      "Single prompts cannot be version-controlled in Git repositories.",
      "Single prompts exceed GPU memory limits regardless of model context size.",
      "LLMs refuse to generate text when prompt lengths exceed 500 characters."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 04 Slide 12-15: Monolithic prompts are brittle, lack predictable intermediate checkpoints, and suffer from high hallucination rates. Workflows provide modularity, inspectability, and robust branching.",
    "slideRef": "Lesson 04 Slide 12-15"
  },
  {
    "id": 2,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.1 Introduction to LLM Workflow",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "In LLM workflow engineering, cyclical graphs containing loops are strictly forbidden because LLMs cannot be re-invoked within the same execution thread.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Cyclical workflows (graphs with loops) are essential in modern LLM engineering for reflection, iterative evaluation, and self-correction loops (such as Evaluator-Optimizer and Agentic loops).",
    "slideRef": "Lesson 04 Slide 22"
  },
  {
    "id": 3,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.1 Introduction to LLM Workflow",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "Explain why cyclical graphs (workflows with loops) are necessary for LLM applications, whereas standard data pipelines traditionally enforce strict DAGs (Directed Acyclic Graphs).",
    "modelAnswer": "Standard ETL data pipelines assume deterministic transformations where operations succeed or fail cleanly in one downstream pass. In contrast, LLMs are non-deterministic and can produce invalid JSON, incomplete answers, or hallucinations. Cyclical workflows enable iterative self-correction (reflection, evaluator-optimizer loops) where an evaluator inspects the output and routes back to the generator node with specific critique until quality conditions are met or maximum retry limits are reached.",
    "keyPoints": [
      "LLMs are probabilistic and prone to intermediate failures/hallucinations.",
      "Cyclic workflows enable iterative reflection, evaluation, and repair loops.",
      "Standard DAGs cannot loop back without complex unrolling or recursion.",
      "Loops must include termination boundaries (e.g. max retries) to prevent infinite loops."
    ],
    "explanation": "Lesson 04 Slide 24-26 emphasizes that agentic workflows require cycles for reflection, error recovery, and iterative refinement.",
    "slideRef": "Lesson 04 Slide 24-26"
  },
  {
    "id": 4,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.1 Introduction to LLM Workflow",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In graph-based LLM architectures, computational units that perform individual tasks (such as LLM generation or tool execution) are called ________, while transitions connecting them are called edges.",
    "acceptedAnswers": [
      "nodes",
      "node",
      "Nodes",
      "Node"
    ],
    "placeholder": "e.g., nodes",
    "explanation": "Lesson 04 Slide 22: Graph workflows are built from Nodes (discrete computation functions) and Edges (transitions and routing logic).",
    "slideRef": "Lesson 04 Slide 22"
  },
  {
    "id": 5,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "In the 'Evaluator-Optimizer' workflow execution pattern, what is the primary role of the Evaluator node?",
    "options": [
      "To tokenize raw text into integer vectors before vector database insertion.",
      "To critique and score the optimizer's candidate output against criteria and provide actionable feedback for the next iteration.",
      "To run PyTorch backpropagation to fine-tune the base foundation weights.",
      "To terminate the process immediately whenever an LLM generates a refusal token."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 04 Slide 31-33: The Evaluator-Optimizer loop uses an Evaluator to inspect candidate answers against rubric/criteria, providing feedback to guide the Optimizer's revision loop.",
    "slideRef": "Lesson 04 Slide 31-33"
  },
  {
    "id": 6,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "In a Sequential Chaining workflow pattern, all downstream tasks execute simultaneously in parallel across independent threads to minimize latency.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Sequential chaining executes tasks strictly one after another in linear order. Simultaneous execution is characteristic of Parallel (Fan-out / Fan-in) execution patterns.",
    "slideRef": "Lesson 04 Slide 28"
  },
  {
    "id": 7,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "You are designing an AI customer support router. Incoming user tickets can be Technical, Billing, or Sales inquiries. Describe how you would implement a Routing Pattern and detail the fallback mechanism when classification fails.",
    "modelAnswer": "1) Router Node: An intent classification LLM or embedding classifier receives the user query and outputs a structured category: Technical, Billing, or Sales.\n2) Conditional Edges: The graph routes execution to the appropriate specialized subgraph (e.g. TechnicalSupportChain with docs, BillingChain with invoice tool).\n3) Fallback Mechanism: If the classifier returns 'Unknown', confidence score is below threshold (< 0.7), or an exception occurs, route to a GeneralFallbackNode that provides a graceful default answer, asks the user for clarification, or creates a human agent escalation ticket.",
    "keyPoints": [
      "Intent classifier / Router node at entry point.",
      "Conditional edges directing execution to domain-specific chains.",
      "Fallback node triggered on low confidence, exceptions, or unclassified queries.",
      "Human-in-the-loop escalation or clarification prompt."
    ],
    "explanation": "Lesson 04 Slide 29-30: Router patterns direct traffic dynamically based on intent classification with explicit fallback paths.",
    "slideRef": "Lesson 04 Slide 29-30"
  },
  {
    "id": 8,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.2 Chaining & Execution Patterns",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "The execution pattern where an LLM repeatedly generates content, an evaluator critiques it, and the loop continues until a quality threshold is reached is called the ________-Optimizer loop.",
    "acceptedAnswers": [
      "Evaluator",
      "evaluator",
      "Evaluator-Optimizer"
    ],
    "placeholder": "e.g., Evaluator",
    "explanation": "Lesson 04 Slide 31: The Evaluator-Optimizer loop is a foundational iterative pattern for high-stakes generation tasks.",
    "slideRef": "Lesson 04 Slide 31"
  },
  {
    "id": 9,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "What is the fundamental architectural distinction between 'State' and 'Memory' in an AI workflow?",
    "options": [
      "State is persistent across server reboots; Memory is always wiped immediately after every token.",
      "State is stored in a vector DB; Memory is stored exclusively in GPU VRAM registers.",
      "State manages the transient execution context of the current run; Memory retains long-term user context and facts across multiple sessions.",
      "State is only for single-turn chats; Memory is only for image processing models."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 04 Slide 39-42: State is the temporary, execution-scoped data container for an ongoing workflow run. Memory is cross-session persistence that stores long-term facts, preferences, and chat history.",
    "slideRef": "Lesson 04 Slide 39-42"
  },
  {
    "id": 10,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "In LangGraph, using an `InMemorySaver` checkpointer guarantees that conversational state survives container restarts and server redeployments.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 04 Slide 114: InMemorySaver stores checkpoints in Python process RAM only. When the container restarts or crashes, all state is lost. Production requires PostgresSaver or MongoSaver.",
    "slideRef": "Lesson 04 Slide 114"
  },
  {
    "id": 11,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "Explain how LangGraph partitions conversational state using `thread_id` and how cross-session long-term memory can be isolated across multiple users.",
    "modelAnswer": "1) Short-term Thread State: LangGraph uses a checkpointer (e.g. PostgresSaver) where every conversation run receives a configuration key `{'configurable': {'thread_id': '<id>'}}`. The checkpointer indexes checkpoints by `thread_id`, ensuring calls within that thread share message history and intermediate graph variables.\n2) Long-term Cross-Thread Memory: LangGraph Store (e.g. `InMemoryStore` or `AsyncPostgresStore`) manages persistent memory using hierarchical namespaces, such as `(user_id, 'profile')` or `(user_id, 'memories')`. This allows an agent to save user preferences across conversations while strictly preventing user data leaks.",
    "keyPoints": [
      "thread_id scopes short-term checkpoints to a specific conversation thread.",
      "Checkpointer persists intermediate graph state snapshots per thread_id.",
      "Long-term memory is managed via LangGraph Store using namespaced keys (e.g. user_id, profile).",
      "Strict separation prevents cross-tenant data leaks in multi-user applications."
    ],
    "explanation": "Lesson 04 Slide 114-118: Checkpointers isolate threads via thread_id; Stores manage persistent cross-session memory namespaces.",
    "slideRef": "Lesson 04 Slide 114-118"
  },
  {
    "id": 12,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.3 Managing State, Memory, and Persistence",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LangGraph, the configuration parameter passed in `config={'configurable': {'________': 'conv-101'}}` is used to partition short-term conversation checkpoints.",
    "acceptedAnswers": [
      "thread_id",
      "thread_id",
      "threadId"
    ],
    "placeholder": "e.g., thread_id",
    "explanation": "Lesson 04 Slide 114: thread_id is the primary session identifier for LangGraph checkpointers.",
    "slideRef": "Lesson 04 Slide 114"
  },
  {
    "id": 13,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "During document ingestion, what is the primary benefit of applying metadata extractors (e.g. TitleExtractor, KeywordExtractor)?",
    "options": [
      "They translate English documents into binary machine code.",
      "They compress text so that 10,000 pages fit into 1 single token.",
      "They automatically fine-tune the LLM weights without gradient descent.",
      "They enrich chunks with contextual tags, enabling hybrid filtering and mitigating loss of global document context."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 04 Slide 48-52: Chunks lose parent context when split. Metadata extractors (titles, summaries, entity tags) enrich chunks, allowing vector databases to filter by metadata and improving retrieval precision.",
    "slideRef": "Lesson 04 Slide 48-52"
  },
  {
    "id": 14,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "Running a document ingestion pipeline without document hashing or deduplication checks causes duplicate vectors to accumulate every time the pipeline is re-run.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 04 Slide 54: Ingestion pipelines must maintain document hashes or use upsert/idempotent keys; otherwise, re-indexing inserts duplicate chunks, bloating the index and corrupting ranking.",
    "slideRef": "Lesson 04 Slide 54"
  },
  {
    "id": 15,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "List the 5 primary stages of a robust document ingestion pipeline and explain why preprocessing/cleaning text is critical before generating vector embeddings.",
    "modelAnswer": "The 5 primary stages are:\n1) Load: Extract raw text and metadata from sources (PDFs, Markdown, Web, DBs).\n2) Split/Chunk: Partition continuous text into manageable, overlapping chunks.\n3) Transform/Enrich: Clean formatting artifacts and extract metadata (titles, keywords, summaries).\n4) Embed: Convert cleaned text chunks into dense mathematical vectors using an embedding model.\n5) Index/Store: Upsert vectors and metadata into the vector database.\n\nCleaning text is critical because uncleaned noise (headers, footers, whitespace, boilerplate CSS/HTML, repeated logos) pollutes embedding representations, wastes token context budgets, and causes semantic drift that lowers retrieval similarity scores.",
    "keyPoints": [
      "5 stages: Load, Split/Chunk, Transform/Enrich, Embed, Index/Store.",
      "Noise and boilerplate distort semantic vector embeddings.",
      "Reduces token waste and context dilution during prompt generation.",
      "Enables high-fidelity similarity matching."
    ],
    "explanation": "Lesson 04 Slide 45-56 outlines the end-to-end ingestion pipeline architecture and data sanitization guidelines.",
    "slideRef": "Lesson 04 Slide 45-56"
  },
  {
    "id": 16,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.4 Document Ingestion Pipelines",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LlamaIndex ingestion pipelines, the transformation component used to generate semantic document title tags for chunks is called ________.",
    "acceptedAnswers": [
      "TitleExtractor",
      "TitleExtractor()",
      "title_extractor"
    ],
    "placeholder": "e.g., TitleExtractor",
    "explanation": "Lesson 04 Slide 51: TitleExtractor extracts contextual document titles from chunks to inject into metadata.",
    "slideRef": "Lesson 04 Slide 51"
  },
  {
    "id": 17,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "Which software engineering principle is violated when a single LLM prompt is asked to extract entities, analyze sentiment, query a database, and draft a final customer email all at once?",
    "options": [
      "Single Responsibility Principle (SRP)",
      "Liskov Substitution Principle",
      "Don't Repeat Yourself (DRY)",
      "Open-Closed Principle"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 04 Slide 60-63: Combining multiple disparate tasks into one mega-prompt violates the Single Responsibility Principle, dramatically increasing hallucination rates and making debugging impossible.",
    "slideRef": "Lesson 04 Slide 60-63"
  },
  {
    "id": 18,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "Defining strongly-typed State schemas (using TypedDict or Pydantic) in modular workflows allows static type checkers and IDEs to catch runtime key errors before deployment.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 04 Slide 66: Explicit state schemas (TypedDict, Pydantic) ensure contract safety between workflow nodes, preventing runtime KeyErrors when nodes pass data.",
    "slideRef": "Lesson 04 Slide 66"
  },
  {
    "id": 19,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "Why is modular workflow design superior to monolithic mega-prompts when building enterprise AI systems? Provide 3 distinct technical reasons.",
    "modelAnswer": "1) Isolated Error Handling & Granular Retries: If entity extraction fails, only the extraction node needs to be retried rather than the entire multi-step pipeline.\n2) Independent Caching & Cost Optimization: Deterministic or repetitive sub-tasks (e.g. classification or embeddings) can be cached; expensive frontier LLMs can be reserved only for complex reasoning nodes while smaller local models handle simple parsing.\n3) Unit Testability & Observability: Each node has explicit input/output contracts (e.g. Pydantic schemas) allowing automated unit tests, latency profiling, and regression tracking.",
    "keyPoints": [
      "Granular retries without re-running the entire workflow.",
      "Model tiering and selective caching (small fast models for parsing, large models for reasoning).",
      "Independent unit testing and observability per node.",
      "Prevents prompt degradation and attention diffusion seen in monolithic prompts."
    ],
    "explanation": "Lesson 04 Slide 60-68 discusses modularity benefits: testability, cost control, caching, and resiliency.",
    "slideRef": "Lesson 04 Slide 60-68"
  },
  {
    "id": 20,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.5 Modular Workflow Design",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LangGraph, state schemas are defined as Python classes inheriting from ________ (or TypedDict) to specify the state fields and reducer functions.",
    "acceptedAnswers": [
      "BaseModel",
      "TypedDict",
      "pydantic.BaseModel"
    ],
    "placeholder": "e.g., BaseModel",
    "explanation": "Lesson 04 Slide 66: Pydantic BaseModel and typing.TypedDict are standard schemas for LangGraph State definition.",
    "slideRef": "Lesson 04 Slide 66"
  },
  {
    "id": 21,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "qcm",
    "question": "When should an architect select LangGraph over basic LangChain Linear Chains (LCEL)?",
    "options": [
      "When the application only runs on mobile devices with zero internet access.",
      "When the application requires cyclical flows, branching state machines, multi-agent collaboration, and human-in-the-loop checkpoints.",
      "When the application does not use any LLMs and only performs SQL queries.",
      "When the application needs to run exclusively on CUDA compute capability 3.0."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 04 Slide 105-112: LangChain LCEL is designed for linear DAG pipelines; LangGraph is designed for complex cyclical graphs, multi-agent coordination, and persistent state machines with human intervention.",
    "slideRef": "Lesson 04 Slide 105-112"
  },
  {
    "id": 22,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "true-false",
    "question": "In LangChain Expression Language (LCEL), the syntax `chain = prompt | model | StrOutputParser()` uses the pipe operator (`|`) to compose Runnables sequentially.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 04 Slide 92: The pipe operator in LCEL connects Runnables, piping the dictionary or text output of the upstream component into the downstream component.",
    "slideRef": "Lesson 04 Slide 92"
  },
  {
    "id": 23,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "open-question",
    "question": "Compare LlamaIndex, LangChain, and LangGraph. In what practical architectural scenario would you integrate all three frameworks together?",
    "modelAnswer": "1) LlamaIndex: Specialized for data-centric pipelines—document connectors, hierarchical indexing, chunking, and advanced vector/graph retrieval.\n2) LangChain: General-purpose LLM building blocks—standardized model wrappers, prompt templates, output parsers, and tool interfaces.\n3) LangGraph: State machine orchestrator—coordinates complex multi-step cycles, agents, human approvals, and persistent state.\n\nUnified Architecture Scenario:\nIn an enterprise compliance agent: LlamaIndex indexes 100,000 regulatory PDFs and retrieves relevant sections; LangChain provides prompt templates and structured Pydantic output parsers; LangGraph manages the multi-agent review graph, routing between auditor and reviewer agents, maintaining checkpoint state, and pausing for human compliance sign-off.",
    "keyPoints": [
      "LlamaIndex specializes in data ingestion, indexing, and advanced retrieval.",
      "LangChain provides core model wrappers, prompt templates, and output parsers.",
      "LangGraph manages stateful orchestration, cycles, and human-in-the-loop.",
      "Unified scenario: LlamaIndex as retriever, LangChain for parsing/prompts, LangGraph as overarching coordinator."
    ],
    "explanation": "Lesson 04 Slide 85-118 provides comparative analysis across LlamaIndex, LangChain, and LangGraph.",
    "slideRef": "Lesson 04 Slide 85-118"
  },
  {
    "id": 24,
    "partId": "part1",
    "partTitle": "Part 1: Workflow Engineering with LLM Frameworks",
    "subtopic": "1.6 Orchestration Frameworks: LlamaIndex, LangChain, LangGraph",
    "moduleId": "mod04",
    "type": "fill-in-blank",
    "question": "In LangChain Expression Language (LCEL), the overloaded Python operator used to compose Runnables into a chain is the ________ operator.",
    "acceptedAnswers": [
      "pipe",
      "|",
      "pipe operator",
      "pipe (|)"
    ],
    "placeholder": "e.g., pipe",
    "explanation": "Lesson 04 Slide 92: The pipe operator '|' connects Runnables in LCEL.",
    "slideRef": "Lesson 04 Slide 92"
  },
  {
    "id": 25,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What is the primary technical motivation for deploying Retrieval-Augmented Generation (RAG) instead of fine-tuning a model on private data?",
    "options": [
      "Fine-tuning completely eliminates hallucinations forever, whereas RAG does not.",
      "RAG reduces model parameter count from 70B down to 1B automatically.",
      "RAG allows models to ground responses in private, rapidly updating dynamic documents with source citations without costly GPU re-training.",
      "RAG bypasses the need for prompt engineering and tokenizers entirely."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 05 Slide 10-14: RAG grounds LLM generation in external authoritative documents, supports real-time updates without re-training, provides document citations, and prevents parametric hallucinations.",
    "slideRef": "Lesson 05 Slide 10-14"
  },
  {
    "id": 26,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "Naive RAG guarantees 100% accuracy on multi-hop questions where facts are distributed across disparate document pages.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 05 Slide 18 & Lesson 06 Slide 8: Naive RAG relies solely on semantic top-k similarity and frequently misses multi-hop relationships spread across non-adjacent chunks.",
    "slideRef": "Lesson 05 Slide 18"
  },
  {
    "id": 27,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "Walk through the complete end-to-end data flow of a standard Naive RAG pipeline when a user submits the question: 'What is our return policy for damaged electronics?'",
    "modelAnswer": "1) User Query: User submits query string.\n2) Query Embedding: The query is passed to an embedding model (e.g. BGE or text-embedding-3-small) which generates a dense numerical vector representation.\n3) Vector Database Search: The vector DB executes an approximate nearest neighbor (ANN) search (e.g. cosine similarity) comparing the query vector against pre-indexed document chunk vectors.\n4) Top-K Retrieval: The vector DB returns the top K most similar text chunks (e.g. K=3) along with metadata.\n5) Prompt Augmentation: The application synthesizes an augmented prompt containing: System instructions, the retrieved context chunks, and the user's original question.\n6) Generation: The LLM processes the augmented prompt and generates a grounded response referencing the specific return policy terms.",
    "keyPoints": [
      "Query embedding generation using dense encoder.",
      "Vector database ANN search (cosine similarity) to retrieve top-k chunks.",
      "Prompt augmentation combining retrieved chunks, system prompt, and question.",
      "LLM generation grounded strictly on retrieved context."
    ],
    "explanation": "Lesson 05 Slide 14-17 illustrates the end-to-end Naive RAG query and generation lifecycle.",
    "slideRef": "Lesson 05 Slide 14-17"
  },
  {
    "id": 28,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "The process of combining the user question with the retrieved document chunks inside the system prompt before calling the LLM is known as prompt ________.",
    "acceptedAnswers": [
      "augmentation",
      "synthesis",
      "construction",
      "Prompt Augmentation"
    ],
    "placeholder": "e.g., augmentation",
    "explanation": "Lesson 05 Slide 16: Prompt Augmentation injects retrieved context chunks into the model's context window.",
    "slideRef": "Lesson 05 Slide 16"
  },
  {
    "id": 29,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What is the operational consequence of setting chunk size too small (e.g., 30 tokens) in a RAG pipeline?",
    "options": [
      "Vector search latency increases by 1000x.",
      "Embeddings cannot be computed because models require minimum 512 tokens.",
      "The vector database throws a dimension mismatch error.",
      "Chunks lose crucial semantic context and sentence completeness, causing retrieval to return fragments that cannot answer the query."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 05 Slide 28-31: Tiny chunks strip context from surrounding ideas, resulting in fragmented snippets. Conversely, overly large chunks dilute specific facts with irrelevant noise.",
    "slideRef": "Lesson 05 Slide 28-31"
  },
  {
    "id": 30,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "Setting chunk overlap to 0% is the recommended best practice in RAG ingestion because overlapping tokens corrupt the mathematical calculation of cosine similarity.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Chunk overlap (typically 10-20%) is standard practice to prevent sentences or semantic thoughts from being severed across chunk boundaries, ensuring complete contextual capture.",
    "slideRef": "Lesson 05 Slide 32"
  },
  {
    "id": 31,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "Detail the trade-offs between Cosine Similarity, Dot Product, and Euclidean Distance (L2) when querying vector databases for RAG retrieval.",
    "modelAnswer": "1) Cosine Similarity: Measures the cosine of the angle between two vectors, ignoring magnitude. Range is [-1, 1] (or [0, 1] for positive embeddings). Best when document length varies or embeddings are not normalized, focusing purely on orientation/semantic direction.\n2) Dot Product (Inner Product): Computes the sum of products of corresponding vector components. Sensitive to both vector length and direction. If vectors are unit-normalized (length=1.0), Dot Product is mathematically identical to Cosine Similarity but computationally faster.\n3) Euclidean Distance (L2): Measures the straight-line geometric distance between two points in n-dimensional space. Distance is 0 for identical vectors and increases with dissimilarity. Sensitive to scale and magnitude unless vectors are normalized.",
    "keyPoints": [
      "Cosine similarity measures angle/direction independent of magnitude.",
      "Dot product is fast and equals cosine similarity when vectors are unit-normalized.",
      "Euclidean (L2) measures geometric distance (0 = identical).",
      "Normalized embeddings allow dot product for maximum computational efficiency."
    ],
    "explanation": "Lesson 05 Slide 40-44 explains similarity metrics and vector distance calculations in embedding space.",
    "slideRef": "Lesson 05 Slide 40-44"
  },
  {
    "id": 32,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "When all embedding vectors are unit-normalized (length = 1.0), the Cosine Similarity metric produces the exact same numerical ranking as the ________ Product metric.",
    "acceptedAnswers": [
      "Dot",
      "dot",
      "inner",
      "Dot Product",
      "Inner Product"
    ],
    "placeholder": "e.g., Dot",
    "explanation": "Lesson 05 Slide 42: For unit-length vectors (||u||=||v||=1), dot product u · v equals cosine similarity.",
    "slideRef": "Lesson 05 Slide 42"
  },
  {
    "id": 33,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "How does LangChain's `RecursiveCharacterTextSplitter` split text differently than a naive `CharacterTextSplitter`?",
    "options": [
      "It attempts splits using a hierarchy of separators (['\\n\\n', '\\n', ' ', '']) in order, preserving paragraphs and sentences as cohesive units.",
      "It splits text based on character counts regardless of word boundaries.",
      "It splits text strictly by sentence punctuation (.) without checking length.",
      "It calls an external LLM to decide split points using zero-shot reasoning."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 05 Slide 34-36: RecursiveCharacterTextSplitter tests double newlines first, then single newlines, then spaces, keeping semantic paragraphs and sentences intact.",
    "slideRef": "Lesson 05 Slide 34-36"
  },
  {
    "id": 34,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "Local embedding models like BAAI/bge-small-en-v1.5 require continuous internet connectivity to proprietary cloud APIs to generate vector embeddings.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Models like BAAI/bge-small-en-v1.5 and all-MiniLM-L6-v2 run completely offline locally on CPU or local GPU via HuggingFace sentence-transformers with zero internet dependency.",
    "slideRef": "Lesson 05 Slide 46"
  },
  {
    "id": 35,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "Explain why syntax-aware splitting (e.g., MarkdownHeaderTextSplitter or CodeSplitter) is far superior to fixed-size character chunking when indexing technical documentation or Python source code.",
    "modelAnswer": "Fixed-size character chunking blindly cuts text at arbitrary character limits (e.g. 500 characters), splitting code in the middle of a function definition, separating a class header from its methods, or severing Markdown tables and section headers from their explanations. This produces syntactically broken snippets that confuse the retriever and hallucinate answers.\n\nIn contrast, syntax-aware splitters parse the AST or Markdown structure:\n1) MarkdownHeaderTextSplitter: Splits by headers (#, ##, ###), keeping entire sections intact and injecting header hierarchy (e.g. Header 1 > Header 2) into chunk metadata.\n2) CodeSplitter: Parses language grammar (classes, functions, decorators), ensuring each chunk contains a complete, valid code block with docstrings.",
    "keyPoints": [
      "Fixed-size chunking cuts through functions, classes, and Markdown tables arbitrarily.",
      "Syntax-aware splitters preserve semantic AST structures and section boundaries.",
      "MarkdownHeaderTextSplitter injects header hierarchy into chunk metadata.",
      "Provides self-contained, valid context to the generator model."
    ],
    "explanation": "Lesson 05 Slide 37-39 contrasts naive splitting with structural Markdown/Code text splitting.",
    "slideRef": "Lesson 05 Slide 37-39"
  },
  {
    "id": 36,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In LangChain, the recommended text splitter that attempts splits on `['\\n\\n', '\\n', ' ', '']` in descending order is called ________CharacterTextSplitter.",
    "acceptedAnswers": [
      "Recursive",
      "recursive",
      "RecursiveCharacterTextSplitter"
    ],
    "placeholder": "e.g., Recursive",
    "explanation": "Lesson 05 Slide 34: RecursiveCharacterTextSplitter is the standard text splitting strategy.",
    "slideRef": "Lesson 05 Slide 34"
  },
  {
    "id": 37,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "Which default network ports are utilized by Qdrant for its REST API and high-performance gRPC API respectively?",
    "options": [
      "REST: 8080, gRPC: 8081",
      "REST: 6333, gRPC: 6334",
      "REST: 5432, gRPC: 5433",
      "REST: 11434, gRPC: 11435"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 05 Slide 58-60: Qdrant runs REST on port 6333 and gRPC on port 6334 by default.",
    "slideRef": "Lesson 05 Slide 58-60"
  },
  {
    "id": 38,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "In PostgreSQL, enabling the pgvector extension requires running the SQL command: `CREATE EXTENSION vector;`.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 05 Slide 62 & Exam CLI Cheatsheet: 'CREATE EXTENSION vector;' installs the vector data type and indexing operators into PostgreSQL.",
    "slideRef": "Lesson 05 Slide 62"
  },
  {
    "id": 39,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "Compare ChromaDB, Qdrant, and Pgvector. What criteria determine when an engineering team should pick each one?",
    "modelAnswer": "1) ChromaDB: Lightweight, embedded or client-server Python vector store. Ideal for rapid prototyping, research, local desktop apps, and lightweight workloads where simplicity is paramount and SQLite persistence suffices.\n2) Qdrant: Production-grade, high-performance standalone vector database written in Rust. Features advanced payload filtering, HNSW indexing, distributed clustering, low-latency gRPC (port 6334), and snapshot management. Pick Qdrant for large-scale production RAG with millions of vectors and complex metadata filtering.\n3) Pgvector: PostgreSQL extension adding vector data types and indexing (HNSW, IVFFlat). Pick Pgvector when an enterprise already uses PostgreSQL for relational data and wants ACID transactions, unified joins between business data and embeddings, and zero extra database infrastructure to maintain.",
    "keyPoints": [
      "ChromaDB: Lightweight, embedded SQLite, rapid local prototyping.",
      "Qdrant: Rust-based, enterprise scale, fast gRPC (6334), advanced payload filtering.",
      "Pgvector: PostgreSQL extension, ACID transactions, unified relational + vector queries.",
      "Decision driven by operational complexity, existing database stack, and throughput needs."
    ],
    "explanation": "Lesson 05 Slide 55-65 compares ChromaDB, Qdrant, and Pgvector architectures.",
    "slideRef": "Lesson 05 Slide 55-65"
  },
  {
    "id": 40,
    "partId": "part2",
    "partTitle": "Part 2: Module 1 — RAG Fundamentals",
    "subtopic": "2.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In ChromaDB Python client, to ensure vectors are saved to a persistent directory on disk rather than discarded when the process exits, you instantiate chromadb.________(path='./chroma_db').",
    "acceptedAnswers": [
      "PersistentClient",
      "PersistentClient()",
      "persistent_client"
    ],
    "placeholder": "e.g., PersistentClient",
    "explanation": "Lesson 05 Slide 56: PersistentClient(path=...) persists ChromaDB collections to disk.",
    "slideRef": "Lesson 05 Slide 56"
  },
  {
    "id": 41,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "Why does Hybrid Retrieval (Sparse BM25 + Dense Semantic Vector) outperform Dense Vector search alone in enterprise search?",
    "options": [
      "Dense vectors cannot process queries longer than 5 words.",
      "BM25 reduces database storage requirements to 0 MB.",
      "BM25 handles exact keyword matches, code identifiers, and acronyms, while dense vectors capture semantic concepts, neutralizing each other's weaknesses.",
      "Dense vectors cannot run on Linux servers."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 06 Slide 12-15: Dense embeddings frequently fail on specific entity codes (e.g. 'CVE-2024-38077' or 'SKU-9921'), while BM25 excels at exact keyword matching but misses semantic synonyms. Hybrid combines both.",
    "slideRef": "Lesson 06 Slide 12-15"
  },
  {
    "id": 42,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In Reciprocal Rank Fusion (RRF), the formula for document scoring is RRF_Score(d) = sum(1 / (k + r(d))), where k is a smoothing constant typically set to 60.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 06 Slide 16 & Exam Formula: RRF fuses ranks across multiple retrieval lists using k=60 to prevent high-ranked outliers from completely dominating the combined score.",
    "slideRef": "Lesson 06 Slide 16"
  },
  {
    "id": 43,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Given two retrieval systems: BM25 ranks Document X at position 1 and Document Y at position 5. Vector search ranks Document Y at position 2 and Document X at position 8. Using Reciprocal Rank Fusion (RRF) with constant k = 60, calculate the RRF score for both documents and determine which document ranks higher.",
    "modelAnswer": "Formula: RRF_Score(d) = sum( 1 / (k + rank(d)) ) with k = 60.\n\n1) For Document X:\n   - BM25 rank = 1 -> 1 / (60 + 1) = 1 / 61 ≈ 0.01639\n   - Vector rank = 8 -> 1 / (60 + 8) = 1 / 68 ≈ 0.01471\n   - Total RRF(X) = 0.01639 + 0.01471 = 0.03110\n\n2) For Document Y:\n   - BM25 rank = 5 -> 1 / (60 + 5) = 1 / 65 ≈ 0.01538\n   - Vector rank = 2 -> 1 / (60 + 2) = 1 / 62 ≈ 0.01613\n   - Total RRF(Y) = 0.01538 + 0.01613 = 0.03151\n\nConclusion: Document Y (0.03151) achieves a higher RRF score than Document X (0.03110) because it performed consistently well in the top 5 of both retrieval lists.",
    "keyPoints": [
      "Correct formula application: 1 / (k + rank).",
      "Calculation for Doc X: 1/61 + 1/68 ≈ 0.03110.",
      "Calculation for Doc Y: 1/65 + 1/62 ≈ 0.03151.",
      "Document Y wins due to consistent balanced performance across both lists."
    ],
    "explanation": "Lesson 06 Slide 16 explains the RRF algorithm and provides sample calculations.",
    "slideRef": "Lesson 06 Slide 16"
  },
  {
    "id": 44,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In the Reciprocal Rank Fusion (RRF) scoring formula `score = 1 / (k + rank)`, the standard smoothing constant `k` recommended in research and slide 16 is ________.",
    "acceptedAnswers": [
      "60",
      "k=60",
      "sixty"
    ],
    "placeholder": "e.g., 60",
    "explanation": "Lesson 06 Slide 16: Constant k=60 is the empirical standard in Cormack et al. and slide 16.",
    "slideRef": "Lesson 06 Slide 16"
  },
  {
    "id": 45,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In Neo4j Cypher script loading, why is the `MERGE` clause strongly preferred over `CREATE` when constructing knowledge graphs from ingested chunks?",
    "options": [
      "CREATE is only compatible with MySQL, not graph databases.",
      "CREATE requires GPU acceleration while MERGE runs on CPU.",
      "MERGE automatically deletes all relationships on every transaction.",
      "MERGE is idempotent: it matches existing nodes/relationships and only creates them if absent, avoiding duplicate entity explosion."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 06 Slide 29 & Exam Highlight: 'Always MERGE, never CREATE. MERGE is idempotent. Running CREATE twice duplicates every node and relationship.'",
    "slideRef": "Lesson 06 Slide 29"
  },
  {
    "id": 46,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In Microsoft GraphRAG, Global Search answers corpus-wide thematic questions by querying pre-generated community summaries, while Local Search focuses on specific entity neighborhoods.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 06 Slide 27: Local Search explores specific entity nodes and 1-2 hop neighbors; Global Search aggregates hierarchical Leiden community summaries across the whole corpus.",
    "slideRef": "Lesson 06 Slide 27"
  },
  {
    "id": 47,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Why does standard chunk-based top-k vector retrieval fail on multi-hop questions like 'Who is the manager of the person who architected the Billing Service?', and how does Graph RAG resolve this?",
    "modelAnswer": "In standard vector RAG, knowledge is split into isolated chunks. Fact 1 ('Alice architected the Billing Service') might reside in Chunk 14, while Fact 2 ('Bob manages Alice') resides in Chunk 840. A vector search for 'Who is the manager of the person who architected Billing?' will likely retrieve Chunk 14 (high semantic match with 'Billing Service') but completely miss Chunk 840 (which mentions Alice and Bob but has zero semantic overlap with 'Billing Service').\n\nGraph RAG resolves this by extracting an entity-relationship graph:\n(Alice)-[:ARCHITECTED]->(Billing) and (Alice)<-[:MANAGES]-(Bob).\nA single Cypher pattern query `MATCH (b:Service {name: 'Billing'})<-[:ARCHITECTED]-(p)-[:MANAGES]-(m) RETURN m.name` or a 2-hop graph walk effortlessly traverses the connected edges, joining the disparate facts into a coherent context regardless of where they were originally written.",
    "keyPoints": [
      "Disparate facts are isolated across disconnected text chunks.",
      "Vector search retrieves only the chunk matching surface query terms, missing the second hop.",
      "Graph RAG extracts nodes (entities) and edges (relationships) into a graph.",
      "Multi-hop queries traverse graph paths to connect facts across disparate sources."
    ],
    "explanation": "Lesson 06 Slide 18-22 details why multi-hop queries fail in Naive RAG and how Graph RAG solves them.",
    "slideRef": "Lesson 06 Slide 18-22"
  },
  {
    "id": 48,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.2 Graph RAG",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In Neo4j Cypher, to safely delete a node along with all its attached incoming and outgoing relationships in one operation, you use the clause ________ DELETE.",
    "acceptedAnswers": [
      "DETACH",
      "detach",
      "DETACH DELETE",
      "detach delete"
    ],
    "placeholder": "e.g., DETACH",
    "explanation": "Lesson 06 Slide 29 & Cypher Cheatsheet: 'DETACH DELETE n' removes the node and severs attached relationships.",
    "slideRef": "Lesson 06 Slide 29"
  },
  {
    "id": 49,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In Corrective RAG (CRAG), what action is triggered if the retrieval evaluator determines that the retrieved internal documents are 'Incorrect' (completely irrelevant)?",
    "options": [
      "The system triggers a web search fallback query to retrieve authoritative external documents before generation.",
      "The system immediately shuts down the database connection.",
      "The system outputs random chunks from the vector database.",
      "The system fine-tunes the LLM weights on the irrelevant chunks."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 06 Slide 35-37: CRAG evaluates retrieval quality as Correct, Ambiguous, or Incorrect. If Incorrect, it falls back to external web search to find relevant context.",
    "slideRef": "Lesson 06 Slide 35-37"
  },
  {
    "id": 50,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In Self-RAG, the model generates reflection tokens such as `[Retrieve]`, `[IsRel]`, `[IsSup]`, and `[IsUse]` to dynamically decide whether retrieval is necessary and whether generated claims are supported.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 06 Slide 32-34: Self-RAG trains reflection tokens to evaluate retrieval need, relevance, factual support, and overall utility.",
    "slideRef": "Lesson 06 Slide 32-34"
  },
  {
    "id": 51,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Explain how an Agentic RAG system differs from a traditional static RAG pipeline when handling an ambiguous or poorly formulated user query.",
    "modelAnswer": "A traditional static RAG pipeline executes a single linear pass: it embeds the ambiguous query as-is, performs top-k retrieval, and forces the LLM to generate an answer—frequently retrieving irrelevant noise and hallucinating.\n\nAn Agentic RAG system introduces dynamic decision loops:\n1) Query Analysis & Rewriting: An agent inspects the user query, detects ambiguity, and rewrites or decomposes it into multiple targeted sub-queries.\n2) Retrieval Evaluation: It inspects retrieved documents (e.g. CRAG evaluation) to determine if they actually answer the question.\n3) Conditional Correction: If retrieved documents are insufficient, the agent can re-query with modified search terms, execute a web search fallback, or clarify with the user.\n4) Hallucination Guardrails: The agent verifies that the final answer is factually supported by the retrieved context before delivering it.",
    "keyPoints": [
      "Static RAG is a rigid one-pass pipeline vulnerable to ambiguous queries.",
      "Agentic RAG uses query rewriting and decomposition.",
      "Evaluates retrieval quality dynamically and retries if chunks are irrelevant.",
      "Implements self-correction and web search fallback before responding."
    ],
    "explanation": "Lesson 06 Slide 30-38 explores Agentic RAG patterns: Self-RAG, CRAG, and iterative routing.",
    "slideRef": "Lesson 06 Slide 30-38"
  },
  {
    "id": 52,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In Corrective RAG (CRAG), the retrieval evaluator classifies retrieved documents into three confidence grades: Correct, Ambiguous, or ________.",
    "acceptedAnswers": [
      "Incorrect",
      "incorrect"
    ],
    "placeholder": "e.g., Incorrect",
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
    "question": "Why is a 2-stage retrieval pipeline (Bi-Encoder first, Cross-Encoder second) standard practice rather than using a Cross-Encoder for the entire database?",
    "options": [
      "Cross-encoders cannot process English text.",
      "Bi-encoders are fast ($O(1)$ index lookup) for filtering 1,000,000 docs down to top 50, while Cross-encoders perform expensive full self-attention across $(query, doc)$ pairs and can only score top candidates.",
      "Cross-encoders only work with SQLite databases.",
      "Bi-encoders have 100% accuracy, so cross-encoders are only for backup."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 06 Slide 40-44: Bi-encoders encode queries and docs independently into vector space (fast ANN search). Cross-encoders concatenate query + doc and compute cross-attention over all tokens (slow, highly accurate). 2-stage gives speed + accuracy.",
    "slideRef": "Lesson 06 Slide 40-44"
  },
  {
    "id": 54,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "A Cross-Encoder computes separate embedding vectors for the query and document independently, then takes their cosine similarity.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 06 Slide 41: That describes a Bi-Encoder. A Cross-Encoder feeds the combined `(query, document)` pair simultaneously into the transformer model, allowing every query token to attend to every document token.",
    "slideRef": "Lesson 06 Slide 41"
  },
  {
    "id": 55,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Describe the step-by-step architecture of a 2-Stage Retrieval system utilizing `bge-small-en-v1.5` and `bge-reranker-large`. Specify candidate counts and performance trade-offs at each stage.",
    "modelAnswer": "Stage 1: Candidate Generation (Bi-Encoder)\n- Model: `bge-small-en-v1.5`.\n- Operation: The query is embedded into a 384-dimensional dense vector. An approximate nearest neighbor (ANN) search scans the vector database (e.g. Qdrant with HNSW index) across 1,000,000 chunks.\n- Output: Fast retrieval of the top 50-100 candidate chunks within 5-15 milliseconds.\n- Trade-off: Extremely fast ($O(1)$ indexed search) with high recall, but lower precision due to independent embedding generation.\n\nStage 2: Precision Reranking (Cross-Encoder)\n- Model: `bge-reranker-large`.\n- Operation: Concatenates `[CLS] query [SEP] candidate_chunk [SEP]` for each of the 50 candidates and executes full bidirectional self-attention across all token pairs to generate a calibrated relevance score (0.0 to 1.0).\n- Output: Reranks the 50 candidates and selects the top 3-5 highest scoring chunks for prompt injection.\n- Trade-off: Higher computational cost (~50-100ms) but provides state-of-the-art semantic precision and eliminates false positives.",
    "keyPoints": [
      "Stage 1: Bi-encoder retrieves broad candidate pool (top 50-100) via fast ANN vector search.",
      "Bi-encoder performance: Low latency (sub-15ms), high recall, moderate precision.",
      "Stage 2: Cross-encoder performs joint self-attention on (query, chunk) pairs.",
      "Stage 3: Selects top 3-5 high-precision chunks; eliminates false positives before LLM generation."
    ],
    "explanation": "Lesson 06 Slide 40-45 illustrates the two-stage retrieval pattern and cross-encoder attention mechanics.",
    "slideRef": "Lesson 06 Slide 40-45"
  },
  {
    "id": 56,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In a 2-stage retrieval pipeline, the fast initial retrieval model that embeds queries and documents into independent vector representations is called a ________-Encoder.",
    "acceptedAnswers": [
      "Bi",
      "bi",
      "Bi-Encoder",
      "bi-encoder"
    ],
    "placeholder": "e.g., Bi",
    "explanation": "Lesson 06 Slide 40: Bi-Encoders map text to separate dense vectors; Cross-Encoders compute joint attention.",
    "slideRef": "Lesson 06 Slide 40"
  },
  {
    "id": 57,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "What is the 'Lost in the Middle' phenomenon discovered by Liu et al. regarding LLM context windows?",
    "options": [
      "LLMs lose internet connectivity when generating more than 1,000 tokens.",
      "Middle layers in transformer neural networks are deleted during quantization.",
      "Models recall information best when placed at the very beginning or end of the prompt context, while information located in the middle suffers from significantly lower retrieval attention.",
      "Vector databases discard the middle 50% of document embeddings."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 06 Slide 50-52: The 'Lost in the Middle' phenomenon proves that transformer attention weights are highest at prompt boundaries (primacy and recency effects), causing facts buried in the middle of long contexts to be overlooked.",
    "slideRef": "Lesson 06 Slide 50-52"
  },
  {
    "id": 58,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "To counter the 'Lost in the Middle' effect, practitioners should re-order retrieved chunks so that the most relevant documents are placed at the beginning and the end of the context window rather than in the center.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 06 Slide 53: Position-aware chunk reordering places highest-ranked chunks at the very start and very end of the prompt to maximize LLM attention retrieval.",
    "slideRef": "Lesson 06 Slide 53"
  },
  {
    "id": 59,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "A team injects 20 retrieved chunks (totaling 12,000 tokens) directly into an LLM's prompt. The model frequently fails to answer questions despite the relevant sentence being present. Explain 3 context management strategies to fix this problem.",
    "modelAnswer": "1) Position-Aware Re-ordering: Counteract the 'Lost in the Middle' bias by ordering the retrieved chunks such that the top 2 highest-scoring chunks are placed at the very beginning and very end of the context, while lower-confidence chunks occupy the middle.\n2) Contextual Compression & Extraction: Use a small, fast model (or LLMLingua) to prune redundant sentences, boilerplate, and irrelevant tokens from the 20 chunks before passing them to the generator model, reducing 12,000 tokens down to 2,000 focused tokens.\n3) Top-K Thresholding & Deduplication: Instead of blindly passing 20 chunks, apply a strict similarity score cutoff and deduplicate semantically overlapping chunks so only the top 3-5 distinct, authoritative chunks are provided.",
    "keyPoints": [
      "Position re-ordering (placing highest relevance at prompt start and end).",
      "Context compression / sentence extraction (pruning irrelevant sentences to save token budget).",
      "Top-K reduction and deduplication (lowering chunk count to top 3-5 to eliminate noise).",
      "Mitigates attention dilution and 'Lost in the Middle' failure."
    ],
    "explanation": "Lesson 06 Slide 50-55 covers context management, compression techniques, and prompt optimization.",
    "slideRef": "Lesson 06 Slide 50-55"
  },
  {
    "id": 60,
    "partId": "part3",
    "partTitle": "Part 3: Module 2 — Advanced RAG Architecture & Evaluation",
    "subtopic": "3.5 Context Management",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "The empirical finding where LLMs fail to retrieve facts located in the middle of long context windows is called the 'Lost in the ________' phenomenon.",
    "acceptedAnswers": [
      "Middle",
      "middle",
      "Lost in the Middle"
    ],
    "placeholder": "e.g., Middle",
    "explanation": "Lesson 06 Slide 50: The 'Lost in the Middle' paper (Liu et al.) highlights attention degradation in middle context.",
    "slideRef": "Lesson 06 Slide 50"
  },
  {
    "id": 61,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "When using local LLMs (e.g. Qwen2.5 or Llama 3.1) with Ollama or vLLM, in what format are tool definitions presented to the model?",
    "options": [
      "As compiled C++ binary executables.",
      "As raw assembly opcodes.",
      "As PNG screenshots of function documentation.",
      "As JSON Schema specifications describing the function name, description, parameters, and required fields."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 07 Slide 14-18: Tool calling relies on JSON Schema definitions injected into the model's chat template, enabling the model to output structured tool invocations.",
    "slideRef": "Lesson 07 Slide 14-18"
  },
  {
    "id": 62,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Local open-weight LLMs like Qwen 2.5 and Llama 3.1 cannot execute tool calls or emit structured JSON function arguments under any configuration.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Modern open-weight models (such as Qwen 2.5 and Llama 3.1/3.2) have native tool-calling training and emit structured OpenAI-compatible tool_calls JSON objects.",
    "slideRef": "Lesson 07 Slide 16"
  },
  {
    "id": 63,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Describe the lifecycle of a Tool Call when a user asks an agent: 'What is the current temperature in Phnom Penh?' Assume the agent has access to a tool named `get_weather(city: str)`.",
    "modelAnswer": "1) User Query: User submits: 'What is the current temperature in Phnom Penh?'\n2) Tool Declaration Injection: The client formats the prompt, passing the JSON schema of `get_weather(city: str)` in the `tools` payload.\n3) Model Generation (Tool Call): The LLM recognizes that it lacks real-time weather knowledge, generates reasoning, and emits a structured `tool_calls` object: `{\"name\": \"get_weather\", \"arguments\": {\"city\": \"Phnom Penh\"}}` with `finish_reason=\"tool_calls\"`.\n4) Client Execution: The client application (harness/runtime) intercepts the tool call, executes the actual Python function `get_weather(\"Phnom Penh\")`, and fetches the result (e.g. `{\"temperature\": \"32°C\", \"condition\": \"Sunny\"}`).\n5) Tool Output Injection: The client appends the tool response as a message with `role: \"tool\"` back into the conversation history.\n6) Final Answer Generation: The LLM receives the updated conversation containing the tool observation and synthesizes the user-facing response: 'The current temperature in Phnom Penh is 32°C and sunny.'",
    "keyPoints": [
      "Prompt sent with tool JSON schema definitions.",
      "LLM generates structured tool_calls invocation instead of direct answer.",
      "Harness intercepts call and executes local function get_weather().",
      "Function result injected as role='tool' message; LLM synthesizes final answer."
    ],
    "explanation": "Lesson 07 Slide 14-22 details the tool execution cycle: Schema -> Tool Call -> Runtime Execution -> Observation -> Final Synthesis.",
    "slideRef": "Lesson 07 Slide 14-22"
  },
  {
    "id": 64,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "When an LLM finishes generating a tool call instead of normal text, the API response object indicates this with the property `finish_reason = '________'`. ",
    "acceptedAnswers": [
      "tool_calls",
      "tool_call",
      "tool_calls'"
    ],
    "placeholder": "e.g., tool_calls",
    "explanation": "Lesson 07 Slide 18: finish_reason='tool_calls' signals the client harness to parse arguments and execute tools.",
    "slideRef": "Lesson 07 Slide 18"
  },
  {
    "id": 65,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What Python library is widely used with LLM clients to enforce strict schema validation, type casting, and automatic retry on JSON parsing failures?",
    "options": [
      "instructor (along with Pydantic)",
      "pygame",
      "matplotlib",
      "celery"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 24-28: The `instructor` library wraps OpenAI/Ollama clients, binding Pydantic models for structured output, schema validation, and automatic retries on validation failure.",
    "slideRef": "Lesson 07 Slide 24-28"
  },
  {
    "id": 66,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Pydantic `Field(ge=0, le=100, description='...')` annotations in tool schemas are discarded by LLM frameworks and have no effect on tool calling precision.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 07 Slide 26: Pydantic Field constraints and descriptions are converted directly into JSON Schema `minimum`, `maximum`, and `description` properties that guide the model's parameter generation.",
    "slideRef": "Lesson 07 Slide 26"
  },
  {
    "id": 67,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Write a Pydantic schema for a tool named `create_user_account` requiring a string `username` (between 3 and 20 characters), an integer `age` (must be at least 18), and an optional string `email`. Explain what happens if the LLM generates `age: 15`.",
    "modelAnswer": "```python\nfrom pydantic import BaseModel, Field\nfrom typing import Optional\n\nclass CreateUserAccount(BaseModel):\n    username: str = Field(..., min_length=3, max_length=20, description=\"Unique account username\")\n    age: int = Field(..., ge=18, description=\"User age, must be at least 18\")\n    email: Optional[str] = Field(None, description=\"Optional email address\")\n```\n\nWhat happens if the LLM generates `age: 15`:\nPydantic will raise a `ValidationError: Input should be greater than or equal to 18`. In an agent runtime with validation retry (e.g. using `instructor`), the harness intercepts the error, feeds the validation error message back to the LLM as a system/user prompt, and prompts the LLM to correct its generated arguments according to the constraint.",
    "keyPoints": [
      "Proper Pydantic schema with Field constraints (min_length, max_length, ge=18).",
      "Pydantic raises ValidationError when constraints are violated.",
      "Runtime catches ValidationError and prompts LLM with error details for automatic self-correction.",
      "Prevents bad data from executing in underlying business systems."
    ],
    "explanation": "Lesson 07 Slide 25-28 covers structured output validation with Pydantic and Instructor.",
    "slideRef": "Lesson 07 Slide 25-28"
  },
  {
    "id": 68,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In Pydantic schemas, the constraint argument used inside `Field(________=18)` to enforce that an integer must be greater than or equal to 18 is called ge.",
    "acceptedAnswers": [
      "ge",
      "ge=18",
      "ge = 18"
    ],
    "placeholder": "e.g., ge",
    "explanation": "Lesson 07 Slide 26: 'ge' stands for Greater than or Equal to in Pydantic validation fields.",
    "slideRef": "Lesson 07 Slide 26"
  },
  {
    "id": 69,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "Why must autonomous agents execute code and OS commands inside bounded sandbox environments (such as ephemeral Docker containers or WASM sandboxes)?",
    "options": [
      "To speed up GPU inference by 10x.",
      "To prevent unbounded destructive actions (e.g. `rm -rf /`, host file exfiltration, or denial-of-service) from harming the host system.",
      "Because Python cannot run directly on Windows or macOS.",
      "To allow LLMs to bypass network firewalls."
    ],
    "correctIndex": 1,
    "explanation": "Lesson 07 Slide 34-38: Agents generating executable commands must be strictly bounded with sandbox execution, resource quotas, and isolated networks to prevent catastrophic system damage.",
    "slideRef": "Lesson 07 Slide 34-38"
  },
  {
    "id": 70,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Giving an autonomous agent unrestricted root access to production database mutation tools without rate limits or read-only boundaries is safe as long as the LLM temperature is set to 0.0.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 07 Slide 36: Temperature 0.0 does NOT prevent hallucinations, prompt injection, or logic flaws. Unbounded root access violates basic security principles.",
    "slideRef": "Lesson 07 Slide 36"
  },
  {
    "id": 71,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Identify 4 essential bounding controls that an engineering team must implement before allowing an LLM agent to execute SQL queries or filesystem tools.",
    "modelAnswer": "1) Privilege Least Authority: The agent's database user must be restricted to `SELECT` permissions on specific views/tables only; `DROP`, `ALTER`, `DELETE`, and `UPDATE` must be revoked unless explicitly gated.\n2) Sandbox Isolation: Filesystem commands must run in an ephemeral container with a read-only root filesystem and restricted scratch directory, without mounting host paths.\n3) Timeout & Resource Quotas: Every query or process execution must have strict timeout limits (e.g. max 5 seconds) and CPU/memory limits (e.g. 512MB RAM) to prevent denial-of-service hangs.\n4) Result Set Clamping (LIMIT): Automatically append `LIMIT 100` to prevent unbounded queries from exhausting memory or flooding the LLM's context window.",
    "keyPoints": [
      "Least privilege (read-only SELECT, revoke DROP/DELETE).",
      "Ephemeral container/sandbox isolation without host filesystem mounts.",
      "Strict timeouts (e.g. 5s) and CPU/RAM resource quotas.",
      "Bounded result sets (mandatory LIMIT clauses to avoid context overflow)."
    ],
    "explanation": "Lesson 07 Slide 35-40 outlines security boundaries and isolation safeguards for agent tools.",
    "slideRef": "Lesson 07 Slide 35-40"
  },
  {
    "id": 72,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The security principle stating that an agent should only be granted the minimal privileges and access permissions strictly necessary to accomplish its task is the Principle of Least ________.",
    "acceptedAnswers": [
      "Privilege",
      "privilege",
      "Least Privilege"
    ],
    "placeholder": "e.g., Privilege",
    "explanation": "Lesson 07 Slide 37: Principle of Least Privilege is the bedrock of agent security.",
    "slideRef": "Lesson 07 Slide 37"
  },
  {
    "id": 73,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What safety mechanism prevents an autonomous agent from entering an infinite loop of failing tool calls and draining API budgets?",
    "options": [
      "Lowering the GPU fan speed.",
      "Increasing the model's context window from 8k to 128k.",
      "A circuit breaker / max step boundary (e.g. `max_steps = 10` or recursion limit).",
      "Deleting the vector database."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 07 Slide 44-46: Hard step limits (`recursion_limit`, `max_iterations = 10`) act as circuit breakers, halting execution and notifying the user when an agent is stuck in repetitive loops.",
    "slideRef": "Lesson 07 Slide 44-46"
  },
  {
    "id": 74,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Indirect prompt injection occurs when an agent retrieves untrusted external data (such as web pages or emails) that contains hidden instructions commanding the agent to hijack execution.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 48: Indirect prompt injection is a critical vulnerability where external untrusted content overrides the agent's core system instructions.",
    "slideRef": "Lesson 07 Slide 48"
  },
  {
    "id": 75,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Explain what an 'Idempotency Key' is and why it is a mandatory failure boundary when designing agent tools that perform financial transactions or external API webhooks.",
    "modelAnswer": "An Idempotency Key is a unique identifier (e.g. a UUID `trans-9941a`) attached to an API request. The receiving server records this key upon executing the action. If the client makes another request with the exact same idempotency key, the server returns the cached result without executing the action a second time.\n\nWhy it is mandatory for agents:\nLLM agents can experience network timeouts, transient JSON parse errors, or non-deterministic retries. If an agent calls `charge_credit_card(amount=500)` and the network drops during the response acknowledgment, a naive agent will retry the tool call. Without an idempotency key, the customer would be charged twice. With an idempotency key, the duplicate call is recognized and safely deduplicated.",
    "keyPoints": [
      "Idempotency key uniquely identifies a specific transaction or action.",
      "Servers execute the action once and return cached results for identical keys.",
      "Agents frequently retry actions after network glitches or JSON parsing retries.",
      "Prevents disastrous duplicate executions (e.g. charging credit cards twice, duplicate database writes)."
    ],
    "explanation": "Lesson 07 Slide 45-47 discusses failure boundaries, retries, and idempotency guarantees in agent execution.",
    "slideRef": "Lesson 07 Slide 45-47"
  },
  {
    "id": 76,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In LangGraph and agent frameworks, the execution guardrail that sets a maximum ceiling on graph step transitions to prevent infinite loops is called the ________ limit.",
    "acceptedAnswers": [
      "recursion",
      "recursion_limit",
      "recursion limit",
      "step"
    ],
    "placeholder": "e.g., recursion",
    "explanation": "Lesson 07 Slide 44: 'recursion_limit' terminates graph execution if steps exceed the defined threshold.",
    "slideRef": "Lesson 07 Slide 44"
  },
  {
    "id": 77,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What are the three alternating phases that define the ReAct agent design pattern?",
    "options": [
      "Read -> Encrypt -> Transmit",
      "Download -> Compile -> Execute",
      "Tokenize -> Vectorize -> Cosine Similarity",
      "Thought (Reasoning) -> Action (Tool Call) -> Observation (Tool Output)"
    ],
    "correctIndex": 3,
    "explanation": "Lesson 07 Slide 52-56: ReAct (Reasoning + Acting) operates in a continuous loop: Thought (internal reasoning), Action (tool selection and invocation), Observation (parsing tool output), repeating until the task is complete.",
    "slideRef": "Lesson 07 Slide 52-56"
  },
  {
    "id": 78,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "The ReAct agent pattern completely eliminates internal model reasoning (Thought), forcing the agent to execute external tool actions blindly without intermediate deliberation.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. ReAct explicitly synergizes Reasoning and Acting: Thought (deliberative planning), Action (tool invocation), and Observation (environment feedback).",
    "slideRef": "Lesson 07 Slide 54"
  },
  {
    "id": 79,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Trace how a ReAct agent answers the user query: 'Who won the most recent FIFA World Cup and what stadium hosted the final?' Present the specific Thought, Action, and Observation sequences.",
    "modelAnswer": "Step 1:\n- Thought: I need to determine who won the most recent FIFA World Cup (2022) and the stadium where the final was held. I will search for the 2022 World Cup winner and final venue.\n- Action: `web_search(query='2022 FIFA World Cup final winner and stadium')`\n- Observation: 'Argentina won the 2022 FIFA World Cup, defeating France on penalties. The final match was played at Lusail Iconic Stadium in Lusail, Qatar on December 18, 2022.'\n\nStep 2:\n- Thought: The observation clearly confirms that Argentina won the tournament and the final was hosted at Lusail Iconic Stadium. I have all the facts needed to formulate the final answer.\n- Action: `Final Answer(response='Argentina won the most recent FIFA World Cup (2022), and the final match was hosted at Lusail Iconic Stadium in Qatar.')`",
    "keyPoints": [
      "Clear Thought formulating search plan for tournament winner and stadium.",
      "Action invoking tool (web_search) with specific parameters.",
      "Observation capturing external tool result.",
      "Final Thought synthesizing observed facts into accurate answer."
    ],
    "explanation": "Lesson 07 Slide 52-58 outlines the ReAct prompt structure and execution trace.",
    "slideRef": "Lesson 07 Slide 52-58"
  },
  {
    "id": 80,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.5 Agent Patterns: ReAct",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The ReAct agent paradigm combines two foundational AI concepts: ________ and Acting.",
    "acceptedAnswers": [
      "Reasoning",
      "reasoning"
    ],
    "placeholder": "e.g., Reasoning",
    "explanation": "Lesson 07 Slide 52: ReAct stands for Reasoning + Acting (Yao et al., 2022).",
    "slideRef": "Lesson 07 Slide 52"
  },
  {
    "id": 81,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "In AI engineering, what is the primary responsibility of an Agent Test Harness?",
    "options": [
      "To provide a controlled, reproducible testbed with mocked tools and telemetry to benchmark agent trajectories, tool accuracy, and task completion rates.",
      "To mine cryptocurrency while the model is idle.",
      "To convert all Python code into JavaScript automatically.",
      "To delete log files after every step to save disk space."
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 62-66: An evaluation harness provides reproducible test environments, mocks network tools, records action trajectories, and tracks benchmark metrics like pass@k and cost per task.",
    "slideRef": "Lesson 07 Slide 62-66"
  },
  {
    "id": 82,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Logging an agent's full trajectory (thought steps, tool names, parameters, execution times, and return values) is unnecessary once the agent passes basic unit tests.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 07 Slide 64: Trajectory logging is vital in production for debugging tool call errors, analyzing latency bottlenecks, detecting hallucinations, and auditing compliance.",
    "slideRef": "Lesson 07 Slide 64"
  },
  {
    "id": 83,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "You are tasked with building a test harness to evaluate an automated software engineering agent (similar to SWE-bench). Describe 3 core requirements that the test harness must provide to ensure rigorous evaluation.",
    "modelAnswer": "1) Isolated Reproducible Environments: Every test task must run in a clean, isolated container (e.g. Docker container with pinned dependencies, git repo checkout, and pre-seeded database) to guarantee no state leaks between test runs.\n2) Mocked External Services & Deterministic Clocks: External APIs (Stripe, GitHub, internet access) must be mocked with deterministic responses so test results do not fluctuate due to network downtime or external rate limits.\n3) Automated Verification & Trajectory Telemetry: The harness must execute objective unit test suites (assert statements) to verify task completion, while logging token consumption, execution latency, step count, and full tool call trajectories for post-mortem analysis.",
    "keyPoints": [
      "Isolated, reproducible environment per test run (containerized sandbox).",
      "Deterministic mocks for external services and network dependencies.",
      "Objective assertion verification (pass/fail unit test criteria).",
      "Comprehensive telemetry logging (token cost, latency, trajectory trace)."
    ],
    "explanation": "Lesson 07 Slide 62-68 covers test harness architecture, evaluation metrics, and deterministic benchmarking.",
    "slideRef": "Lesson 07 Slide 62-68"
  },
  {
    "id": 84,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.6 Harness Design",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The recorded step-by-step sequence of an agent's thoughts, tool invocations, inputs, and observations during a run is called the agent's ________.",
    "acceptedAnswers": [
      "trajectory",
      "Trajectory",
      "trace",
      "run trace"
    ],
    "placeholder": "e.g., trajectory",
    "explanation": "Lesson 07 Slide 64: An agent's trajectory records the full history of decisions and actions taken to solve a task.",
    "slideRef": "Lesson 07 Slide 64"
  },
  {
    "id": 85,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What open standard protocol, introduced by Anthropic, standardizes how AI applications connect to external tools, resources, and prompt templates?",
    "options": [
      "Simple Mail Transfer Protocol (SMTP)",
      "Model Context Protocol (MCP)",
      "Open Database Connectivity (ODBC)",
      "File Transfer Protocol (FTP)"
    ],
    "correctIndex": 1,
    "explanation": "Lesson 07 Slide 72-76 & Exam Highlight: Model Context Protocol (MCP) defines a unified JSON-RPC client-server protocol for exposing tools, prompts, and resources to LLM clients.",
    "slideRef": "Lesson 07 Slide 72-76"
  },
  {
    "id": 86,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In Python FastMCP, exposing a function as an agent tool is done using the `@mcp.tool()` decorator.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 78 & Code Lab: FastMCP uses `@mcp.tool()` to declare tools, `@mcp.resource()` for static data, and `@mcp.prompt()` for prompt templates.",
    "slideRef": "Lesson 07 Slide 78"
  },
  {
    "id": 87,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Explain the three core architectural primitives of the Model Context Protocol (MCP): Tools, Resources, and Prompts. Provide a practical example of each.",
    "modelAnswer": "1) Tools: Executable functions that allow the LLM to take actions or perform side effects in external systems.\n   - Example: `@mcp.tool() def restart_docker_container(container_id: str) -> bool`.\n2) Resources: Read-only data endpoints (similar to GET endpoints or files) that supply context or documents into the LLM conversation.\n   - Example: `@mcp.resource('system://logs/nginx') def get_nginx_logs() -> str`.\n3) Prompts: Pre-defined, reusable prompt templates and workflows parameterized for user interactions.\n   - Example: `@mcp.prompt() def code_review_prompt(language: str) -> str`.",
    "keyPoints": [
      "Tools: Executable functions with side effects (e.g. database query, API POST).",
      "Resources: Read-only contextual data providers (e.g. log files, documentation URIs).",
      "Prompts: Parameterized, standardized prompt templates for common tasks.",
      "Unified architecture decouples data/tools from specific LLM models."
    ],
    "explanation": "Lesson 07 Slide 75-80 details the MCP specification: Tools, Resources, and Prompts.",
    "slideRef": "Lesson 07 Slide 75-80"
  },
  {
    "id": 88,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.7 MCP Server",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In the Model Context Protocol (MCP), the two standard transport layers used for client-server communication are stdio (standard input/output for local processes) and ________ (Server-Sent Events over HTTP for remote servers).",
    "acceptedAnswers": [
      "SSE",
      "sse",
      "Server-Sent Events",
      "HTTP/SSE"
    ],
    "placeholder": "e.g., SSE",
    "explanation": "Lesson 07 Slide 74: MCP uses stdio for local child processes and SSE (Server-Sent Events) over HTTP for remote servers.",
    "slideRef": "Lesson 07 Slide 74"
  },
  {
    "id": 89,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What is the primary architectural advantage of using an MCP Server over hardcoding local Python tool functions directly in your application codebase?",
    "options": [
      "Local Python tools cannot use `for` loops.",
      "MCP Servers do not require an operating system.",
      "MCP Servers are decoupled, language-agnostic, run in isolated processes, and can be reused across any MCP client (Claude Desktop, Cursor, custom agents) without rewriting tool code.",
      "Local Python tools require 100GB of GPU VRAM."
    ],
    "correctIndex": 2,
    "explanation": "Lesson 07 Slide 82-86: MCP decouples tool development from client implementations. One MCP server (e.g. Postgres or GitHub MCP) can be plugged into Cursor, Claude Desktop, or custom Python agents seamlessly.",
    "slideRef": "Lesson 07 Slide 82-86"
  },
  {
    "id": 90,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Direct in-process local tool calling typically provides lower inter-process communication (IPC) latency than calling remote MCP servers over HTTP/SSE.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 84: Local functions run in-memory within the same Python process ($O(0)$ IPC overhead), whereas network MCP servers incur JSON serialization and network transport latency.",
    "slideRef": "Lesson 07 Slide 84"
  },
  {
    "id": 91,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "An engineering manager asks: 'Should our company implement our enterprise tools as local Python functions inside our LangGraph codebase, or as standalone MCP Servers?' Provide an architectural trade-off analysis.",
    "modelAnswer": "Choose Local Python Tools when:\n1) Latency is paramount: In-memory function execution avoids network serialization overhead.\n2) Tight Coupling & Complexity: The tools rely heavily on internal application state or ephemeral in-memory objects.\n3) Simplicity: A simple prototype or internal service does not need process isolation or cross-platform tool sharing.\n\nChoose MCP Server when:\n1) Cross-Platform Interoperability: The tools need to be shared across multiple diverse clients (e.g., developers using Cursor, business analysts using Claude Desktop, and backend LangGraph agents).\n2) Security & Process Isolation: Running tools in a separate process/container prevents rogue tool bugs or memory leaks from crashing the core agent application.\n3) Multi-Language Support: Tools can be written in Go, Rust, or Node.js while being consumed by a Python agent over standard JSON-RPC.",
    "keyPoints": [
      "Local tools: Low latency, in-memory execution, simple codebase, but tightly coupled.",
      "MCP servers: Cross-client reuse (Claude Desktop, Cursor, LangGraph), language agnostic.",
      "MCP provides security isolation (separate process/container boundaries).",
      "Recommendation based on interoperability vs sub-millisecond latency needs."
    ],
    "explanation": "Lesson 07 Slide 82-88 provides comparative evaluation between in-process functions and decoupled MCP architectures.",
    "slideRef": "Lesson 07 Slide 82-88"
  },
  {
    "id": 92,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "Under the Model Context Protocol (MCP) specification, client and server exchange structured messages formatted using the JSON-________ protocol.",
    "acceptedAnswers": [
      "RPC",
      "rpc",
      "RPC 2.0",
      "rpc 2.0",
      "JSON-RPC"
    ],
    "placeholder": "e.g., RPC",
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
    "question": "In LangGraph, which mechanism allows execution to pause immediately before an irreversible action (e.g. executing a financial payment) so a human can inspect and approve it?",
    "options": [
      "`sys.exit(0)`",
      "`time.sleep(86400)`",
      "An infinite while loop (`while True: pass`).",
      "`interrupt_before=['execute_action']` breakpoint configuration during graph compilation."
    ],
    "correctIndex": 3,
    "explanation": "Lesson 07 Slide 92-96 & Exam Highlight: LangGraph provides native `interrupt_before` and `interrupt_after` breakpoints. The graph saves state to the checkpointer and pauses, waiting for an explicit resume signal.",
    "slideRef": "Lesson 07 Slide 92-96"
  },
  {
    "id": 94,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In Human-in-the-Loop workflows, once a human operator edits the draft state or grants approval, execution resumes from the saved checkpoint without re-running prior upstream nodes.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "Lesson 07 Slide 94: Checkpointers preserve intermediate node states, allowing resumption directly from the breakpoint with modified or approved state.",
    "slideRef": "Lesson 07 Slide 94"
  },
  {
    "id": 95,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Design a Human-in-the-Loop (HITL) approval workflow in LangGraph for an automated Database Migration Agent. Explain the roles of breakpoints, state persistence, and human feedback injection.",
    "modelAnswer": "1) Workflow Structure:\n   - Node 1: `generate_migration_sql` - Analyzes schema diffs and writes DDL scripts.\n   - Breakpoint: `interrupt_before=['execute_migration']`.\n   - Node 2: `execute_migration` - Connects to database and executes the DDL.\n2) Breakpoint & State Persistence:\n   When execution reaches `execute_migration`, LangGraph halts. The checkpointer (e.g. PostgresSaver) persists the complete graph state (including proposed SQL) under the session's `thread_id`. The server process can sleep or handle other requests.\n3) Human Inspection & Approval UI:\n   A database administrator (DBA) reviews the proposed SQL in a web dashboard. The DBA has three options:\n   - Approve: The client calls `graph.invoke(Command(resume='approved'), config)` to resume Node 2.\n   - Edit: The DBA modifies the SQL script via `graph.update_state(config, {'sql_script': modified_sql})` and approves.\n   - Reject: The DBA provides critique (e.g. 'Missing index on user_id'), routing execution back to Node 1 for revision.\n4) Benefit: Guarantees zero unreviewed, destructive schema changes in production while preserving automated drafting.",
    "keyPoints": [
      "interrupt_before breakpoint halts execution prior to destructive node.",
      "Checkpointer persists state safely per thread_id during human review.",
      "Human review interface supports Approve, Edit state, or Reject with feedback.",
      "Resumes from breakpoint without re-running upstream generation."
    ],
    "explanation": "Lesson 07 Slide 92-98 outlines Human-in-the-Loop patterns, interrupt breakpoints, and state resumption.",
    "slideRef": "Lesson 07 Slide 92-98"
  },
  {
    "id": 96,
    "partId": "part4",
    "partTitle": "Part 4: Autonomous Agents & Tool Integration",
    "subtopic": "4.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In LangGraph, to modify the saved thread state before resuming a paused workflow, you invoke the method `app.update_________(config, values)`.",
    "acceptedAnswers": [
      "state",
      "State",
      "update_state"
    ],
    "placeholder": "e.g., state",
    "explanation": "Lesson 07 Slide 95: 'update_state' injects modifications into a checkpointed thread state before resumption.",
    "slideRef": "Lesson 07 Slide 95"
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
