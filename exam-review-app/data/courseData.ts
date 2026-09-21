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
  partId: 'mod1' | 'mod2' | 'mod3' | 'part1' | 'part2' | 'part3' | 'part4';
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
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "Why do we build RAG systems instead of just relying on the AI model's built-in knowledge?",
    "options": [
      "Base AI models have frozen training data, cannot see private company files, and can make up fake answers (hallucinate).",
      "AI models only run for 5 minutes before shutting down.",
      "RAG completely replaces the need for an LLM model.",
      "Computer CPUs cannot read text files without RAG."
    ],
    "correctIndex": 0,
    "explanation": "Teacher Highlight: Pure LLM knowledge suffers from staleness, hallucinations, and lack of access to private data.",
    "slideRef": "Teacher Review Doc: Module 1 Item 1"
  },
  {
    "id": 2,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "In the RAG pipeline, the step where retrieved document text is inserted into the prompt for the AI to read is called the Augmentation step.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. The 5 steps are: Ingestion -> Indexing -> Retrieval -> Augmentation -> Generation.",
    "slideRef": "Teacher Review Doc: Module 1 Item 1"
  },
  {
    "id": 3,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "In simple words, explain the difference between RAG and Fine-Tuning. When should you choose RAG?",
    "modelAnswer": "RAG is like giving the AI an open reference book: it looks up relevant pages right when you ask a question. You can add or update private documents instantly with zero training costs and source citations.\nFine-Tuning is like sending the AI to school: it updates the model's internal weights. It is expensive, slow, and cannot easily update new daily documents.\nChoose RAG when you have private, dynamic company documents that change frequently.",
    "keyPoints": [
      "RAG retrieves external documents at query time without re-training.",
      "Fine-tuning updates model weights and is costly/slow to update.",
      "RAG provides source citations and prevents hallucinations on private data.",
      "Choose RAG for dynamic, frequently updated company documents."
    ],
    "explanation": "Teacher Highlight: RAG vs fine-tuning vs long-context prompting — when to use which.",
    "slideRef": "Teacher Review Doc: Module 1 Item 1"
  },
  {
    "id": 4,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.1 RAG Architecture Overview",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "The 5 main steps of the standard RAG pipeline in order are: Ingestion, Indexing, Retrieval, ________, and Generation.",
    "acceptedAnswers": [
      "Augmentation",
      "augmentation",
      "Prompt Augmentation"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: RAG pipeline: Ingestion -> Indexing -> Retrieval -> Augmentation -> Generation.",
    "slideRef": "Teacher Review Doc: Module 1 Item 1"
  },
  {
    "id": 5,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What is an 'embedding' in simple words?",
    "options": [
      "A photo taken of your computer screen.",
      "A list of numbers (vector) that captures the meaning of a text so similar ideas are close together.",
      "A password used to unlock your database.",
      "A command that shuts down the server."
    ],
    "correctIndex": 1,
    "explanation": "Teacher Highlight: What an embedding is: a vector representation of meaning.",
    "slideRef": "Teacher Review Doc: Module 1 Item 2"
  },
  {
    "id": 6,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "Cosine similarity measures the geometric length of vectors while completely ignoring the angle between them.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Cosine similarity measures the angle (direction) between two vectors, completely independent of their length.",
    "slideRef": "Teacher Review Doc: Module 1 Item 2"
  },
  {
    "id": 7,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "What does 'Top-K Retrieval' mean in a RAG system, and what happens if K is set too small or too large?",
    "modelAnswer": "Top-K means retrieving the top 'K' most similar document chunks from the vector database (for example, K = 3).\n- If K is too small (e.g. K=1): You might miss important context needed to answer the question.\n- If K is too large (e.g. K=50): You flood the prompt with irrelevant text, wasting tokens and confusing the AI model.",
    "keyPoints": [
      "Top-K specifies how many best-matching chunks to retrieve.",
      "K too small causes missing information (recall failure).",
      "K too large adds noise, wastes tokens, and causes attention dilution.",
      "Typical sweet spot is usually K = 3 to 5 chunks."
    ],
    "explanation": "Teacher Highlight: Top-k retrieval and similarity thresholds.",
    "slideRef": "Teacher Review Doc: Module 1 Item 2"
  },
  {
    "id": 8,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.2 Ingestion, Chunking, Embeddings, Retrieval, Generation",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "The similarity search metric that measures the angle between two vectors (ignoring length) is called ________ Similarity.",
    "acceptedAnswers": [
      "Cosine",
      "cosine",
      "Cosine Similarity"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Similarity search: cosine similarity, dot product, Euclidean distance.",
    "slideRef": "Teacher Review Doc: Module 1 Item 2"
  },
  {
    "id": 9,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "Why does 'chunk overlap' help when splitting a long document into chunks?",
    "options": [
      "It makes the PDF file smaller on disk.",
      "It deletes all spelling mistakes.",
      "It stops sentences and key thoughts from being accidentally cut in half at the split point.",
      "It allows the AI to run without a GPU."
    ],
    "correctIndex": 2,
    "explanation": "Teacher Highlight: Chunk overlap — what it is and why it helps.",
    "slideRef": "Teacher Review Doc: Module 1 Item 3"
  },
  {
    "id": 10,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "Local embedding models (like BAAI/bge-small-en-v1.5 and all-MiniLM-L6-v2) require an active internet connection to cloud APIs to generate vectors.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Local embedding models run 100% offline on your computer CPU or GPU with zero internet costs or privacy leaks.",
    "slideRef": "Teacher Review Doc: Module 1 Item 3"
  },
  {
    "id": 11,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "Why is Recursive Character Splitting better than naive Fixed-Size chunking?",
    "modelAnswer": "Fixed-size chunking cuts text blindly at exact character counts (e.g. every 500 characters), splitting sentences and words in half.\nRecursive Character Splitting is smarter: it tries to split at paragraph breaks (`\\n\\n`) first, then single line breaks (`\\n`), and then spaces (` `). This keeps complete paragraphs and sentences together as meaningful units.",
    "keyPoints": [
      "Fixed chunking blindly cuts sentences and paragraphs in half.",
      "Recursive splitting uses a hierarchy of natural boundaries (\\n\\n, \\n, space).",
      "Keeps semantic paragraphs and complete thoughts intact.",
      "Produces higher quality chunks for embedding search."
    ],
    "explanation": "Teacher Highlight: Fixed-size chunking vs recursive character splitting.",
    "slideRef": "Teacher Review Doc: Module 1 Item 3"
  },
  {
    "id": 12,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.3 Text Splitting Strategies & Local Embedding Models",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In LangChain, the recommended text splitter that splits at paragraphs, then lines, then words is called ________CharacterTextSplitter.",
    "acceptedAnswers": [
      "Recursive",
      "recursive",
      "RecursiveCharacterTextSplitter"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Recursive character splitting.",
    "slideRef": "Teacher Review Doc: Module 1 Item 3"
  },
  {
    "id": 13,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What are the default network ports used by Qdrant for its REST API and gRPC API?",
    "options": [
      "REST: 80, gRPC: 443",
      "REST: 3000, gRPC: 8080",
      "REST: 5432, gRPC: 11434",
      "REST: 6333, gRPC: 6334"
    ],
    "correctIndex": 3,
    "explanation": "Teacher Highlight: Qdrant setup, collections, filtering with payloads (ports 6333 and 6334).",
    "slideRef": "Teacher Review Doc: Module 1 Item 4"
  },
  {
    "id": 14,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "In PostgreSQL, vector search works out-of-the-box on text columns without installing the pgvector extension.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. PostgreSQL requires running `CREATE EXTENSION vector;` to enable vector data types and similarity indexes.",
    "slideRef": "Teacher Review Doc: Module 1 Item 4"
  },
  {
    "id": 15,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "In simple words, compare ChromaDB and Pgvector. When should you pick each one?",
    "modelAnswer": "Pick ChromaDB when you need a simple, lightweight local database for fast prototypes or Python desktop apps with zero complicated setup.\nPick Pgvector when your project already uses PostgreSQL for regular tables (users, orders) and you want to store vectors directly in the same database using standard SQL.",
    "keyPoints": [
      "ChromaDB: Simple, lightweight, zero configuration, great for local prototypes.",
      "Pgvector: Extends PostgreSQL with vector search, ACID compliance.",
      "Unifies regular relational data with vector embeddings in one place.",
      "Qdrant: Dedicated high-speed Rust vector database for large scale."
    ],
    "explanation": "Teacher Highlight: Choosing a vector DB: embedded/local vs client-server vs managed cloud.",
    "slideRef": "Teacher Review Doc: Module 1 Item 4"
  },
  {
    "id": 16,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.4 Vector Database Setup (ChromaDB, Qdrant, Pgvector)",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In ChromaDB Python client, to save collections permanently to a folder on disk instead of losing them on exit, you use chromadb.________(path='...').",
    "acceptedAnswers": [
      "PersistentClient",
      "persistent_client",
      "PersistentClient()"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: ChromaDB setup, collections, basic CRUD operations.",
    "slideRef": "Teacher Review Doc: Module 1 Item 4"
  },
  {
    "id": 17,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.5 Baseline 'Chat with Documents' Application",
    "moduleId": "mod05",
    "type": "qcm",
    "question": "What are the two core phases of a baseline 'Chat with Documents' RAG app?",
    "options": [
      "Phase 1: Ingestion (Load, Chunk, Embed, Store). Phase 2: Query (Retrieve top chunks, Augment prompt, Generate answer).",
      "Phase 1: Buy more RAM. Phase 2: Turn off the screen.",
      "Phase 1: Format hard drive. Phase 2: Install Windows.",
      "Phase 1: Encrypt the files. Phase 2: Send spam emails."
    ],
    "correctIndex": 0,
    "explanation": "Teacher Highlight: End-to-end architecture of a minimal RAG app: Loading & indexing + retrieval & augmentation loop.",
    "slideRef": "Teacher Review Doc: Module 1 Item 5"
  },
  {
    "id": 18,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.5 Baseline 'Chat with Documents' Application",
    "moduleId": "mod05",
    "type": "true-false",
    "question": "In a baseline RAG application, you can connect either a local model (via Ollama) or a cloud model API for the generation step.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. RAG is model-agnostic: you can use local Ollama models (like Qwen) or cloud APIs (like Gemini).",
    "slideRef": "Teacher Review Doc: Module 1 Item 5"
  },
  {
    "id": 19,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.5 Baseline 'Chat with Documents' Application",
    "moduleId": "mod05",
    "type": "open-question",
    "question": "Walk through the steps of testing a newly built RAG app with a sample question to verify its quality.",
    "modelAnswer": "1. Pick a specific test question where you already know the exact ground truth fact.\n2. Check the retrieval step: Did the vector search successfully retrieve the exact chunk containing the answer?\n3. Check the prompt augmentation: Is the retrieved chunk cleanly formatted inside the system prompt?\n4. Check the generation: Did the LLM answer truthfully based only on the chunk, or did it invent outside information (hallucinate)?",
    "keyPoints": [
      "Test with questions that have known factual answers.",
      "Inspect retrieved chunks to verify search accuracy.",
      "Check prompt assembly to ensure context is included.",
      "Verify LLM answer faithfulness to ensure no hallucinations."
    ],
    "explanation": "Teacher Highlight: Testing the app with sample questions and evaluating basic quality.",
    "slideRef": "Teacher Review Doc: Module 1 Item 5"
  },
  {
    "id": 20,
    "partId": "mod1",
    "partTitle": "Module 1: RAG Fundamentals",
    "subtopic": "1.5 Baseline 'Chat with Documents' Application",
    "moduleId": "mod05",
    "type": "fill-in-blank",
    "question": "In a minimal RAG app, the loop that takes a user query, finds matching chunks, and builds the LLM prompt is called the retrieval + prompt-________ loop.",
    "acceptedAnswers": [
      "augmentation",
      "Augmentation"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Building the retrieval + prompt-augmentation loop.",
    "slideRef": "Teacher Review Doc: Module 1 Item 5"
  },
  {
    "id": 21,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "Why does Hybrid Retrieval combine Keyword search (BM25) with Vector search?",
    "options": [
      "Because Vector search cannot be used on laptops.",
      "Because BM25 catches exact words, IDs, and error codes, while Vector search catches semantic meaning and concepts.",
      "Because BM25 deletes all punctuation marks.",
      "Because combining them doubles your computer monitor size."
    ],
    "correctIndex": 1,
    "explanation": "Teacher Highlight: Limitations of dense search (misses exact terms) + limitations of BM25 (misses semantic meaning).",
    "slideRef": "Teacher Review Doc: Module 2 Item 1"
  },
  {
    "id": 22,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "Reciprocal Rank Fusion (RRF) requires both BM25 and vector search to output identical normalized probability scores between 0.0 and 1.0.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. RRF relies strictly on rank order positions (1st, 2nd, 3rd), completely avoiding the need to normalize raw score scales.",
    "slideRef": "Teacher Review Doc: Module 2 Item 1"
  },
  {
    "id": 23,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "How does Reciprocal Rank Fusion (RRF) combine results from BM25 and Vector search without needing to normalize scores?",
    "modelAnswer": "RRF doesn't care about the raw score numbers (which can be very different between BM25 and vector cosine similarity). Instead, it looks only at the position rank of each document:\nFormula: `Score = sum( 1 / (60 + rank) )`.\nDocuments that rank near the top in both search lists get the highest combined score, ensuring fair and balanced ranking.",
    "keyPoints": [
      "RRF uses document rank positions instead of raw scores.",
      "Uses formula 1 / (k + rank) with k = 60.",
      "Avoids score calibration issues between different search engines.",
      "Documents appearing in the top of both lists receive top priority."
    ],
    "explanation": "Teacher Highlight: Combining scores: Reciprocal Rank Fusion (RRF).",
    "slideRef": "Teacher Review Doc: Module 2 Item 1"
  },
  {
    "id": 24,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.1 Hybrid Retrieval: Keyword + Vector Search",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In the Reciprocal Rank Fusion (RRF) formula `1 / (k + rank)`, the standard number for `k` is ________.",
    "acceptedAnswers": [
      "60",
      "k=60",
      "sixty"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Reciprocal Rank Fusion (RRF) formula.",
    "slideRef": "Teacher Review Doc: Module 2 Item 1"
  },
  {
    "id": 25,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.2 Graph RAG",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In Neo4j Cypher, why should you use `MERGE` instead of `CREATE` when importing graph data?",
    "options": [
      "`CREATE` deletes the graph database.",
      "`MERGE` only works on numbers, not text.",
      "`MERGE` matches existing nodes and only creates them if missing, stopping duplicate entities from exploding.",
      "`CREATE` requires 100GB of GPU VRAM."
    ],
    "correctIndex": 2,
    "explanation": "Teacher Highlight: Graph databases: Neo4j basics — MERGE is idempotent, CREATE duplicates nodes.",
    "slideRef": "Teacher Review Doc: Module 2 Item 2"
  },
  {
    "id": 26,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.2 Graph RAG",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "Running the Cypher clause `CREATE` repeatedly on the same data is safe because Neo4j automatically merges duplicate entities.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. `CREATE` blindly creates duplicate nodes and relationships every time it runs. You must use `MERGE` for idempotent loading.",
    "slideRef": "Teacher Review Doc: Module 2 Item 2"
  },
  {
    "id": 27,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.2 Graph RAG",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Why does standard chunk-based retrieval fail on multi-hop questions, and how does Graph RAG fix this?",
    "modelAnswer": "Multi-hop questions need two facts connected together. For example: 'Who is the manager of the person who created the Payment Service?'\nFact 1 ('Sokha created Payment Service') is in Chunk 12. Fact 2 ('Dara is Sokha's manager') is in Chunk 400.\nA vector search for 'manager of Payment Service' will find Chunk 12, but miss Chunk 400 completely.\nGraph RAG connects them as nodes and edges: `(Dara)-[:MANAGES]->(Sokha)-[:CREATED]->(Payment)`. Traversing the graph easily finds Dara.",
    "keyPoints": [
      "Facts are separated across distant, disconnected chunks.",
      "Vector search only retrieves chunks with similar surface words.",
      "Graph RAG extracts entities and relationships into a connected graph.",
      "Can traverse relationship edges across multiple hops to find the complete answer."
    ],
    "explanation": "Teacher Highlight: Limitations of chunk-based retrieval for multi-hop or relational questions.",
    "slideRef": "Teacher Review Doc: Module 2 Item 2"
  },
  {
    "id": 28,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.2 Graph RAG",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In Neo4j Cypher, to safely delete a node and all of its connected relationship lines in one command, you use ________ DELETE.",
    "acceptedAnswers": [
      "DETACH",
      "detach",
      "DETACH DELETE"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Neo4j basics (DETACH DELETE).",
    "slideRef": "Teacher Review Doc: Module 2 Item 2"
  },
  {
    "id": 29,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In Corrective RAG (CRAG), what action happens if the retrieved internal documents are graded as 'Incorrect'?",
    "options": [
      "The system crashes.",
      "The system makes up a random answer.",
      "The system turns off the database.",
      "The system falls back to an external web search to find real information online."
    ],
    "correctIndex": 3,
    "explanation": "Teacher Highlight: Agentic RAG — Corrective RAG (CRAG) fallback to web search when retrieval is incorrect.",
    "slideRef": "Teacher Review Doc: Module 2 Item 3"
  },
  {
    "id": 30,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In Self-Reflective RAG, the model can critique its own retrieved context and rewrite the query if the first search was poor.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Self-reflective RAG uses evaluation tokens/checks to critique retrieved context and trigger query rewrites.",
    "slideRef": "Teacher Review Doc: Module 2 Item 3"
  },
  {
    "id": 31,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "What is 'Query Decomposition' in Agentic RAG, and why is it useful?",
    "modelAnswer": "Query Decomposition means taking one big, complicated question and breaking it down into smaller, simpler sub-questions.\nFor example, if the user asks: 'Compare the battery life and price of iPhone 16 and Galaxy S25', the agent breaks this into:\n1. 'What is the battery life and price of iPhone 16?'\n2. 'What is the battery life and price of Galaxy S25?'\nIt searches for each sub-question cleanly, then combines both answers into a clear comparison.",
    "keyPoints": [
      "Breaks complex questions into focused sub-queries.",
      "Performs targeted search for each sub-question independently.",
      "Prevents confusing the vector search with too many mixed concepts.",
      "Synthesizes the individual answers into one coherent final response."
    ],
    "explanation": "Teacher Highlight: Query planning and decomposition (breaking complex questions into sub-queries).",
    "slideRef": "Teacher Review Doc: Module 2 Item 3"
  },
  {
    "id": 32,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.3 Agentic RAG",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In Corrective RAG (CRAG), the evaluator classifies retrieved documents into three grades: Correct, Ambiguous, or ________.",
    "acceptedAnswers": [
      "Incorrect",
      "incorrect"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: CRAG grading: Correct, Ambiguous, or Incorrect.",
    "slideRef": "Teacher Review Doc: Module 2 Item 3"
  },
  {
    "id": 33,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "Why do we use a Bi-Encoder first and a Cross-Encoder second in a 2-stage retrieval pipeline?",
    "options": [
      "Because Bi-Encoders are super fast to grab the top 50 matches from 1 million files, and Cross-Encoders are super accurate to pick the best 5.",
      "Because Cross-Encoders cannot read English.",
      "Because Bi-Encoders only work with numbers under 10.",
      "Because doing two steps makes the search completely random."
    ],
    "correctIndex": 0,
    "explanation": "Teacher Highlight: Two-stage retrieval pipeline: retrieve broad (top-50) -> rerank to top-5.",
    "slideRef": "Teacher Review Doc: Module 2 Item 4"
  },
  {
    "id": 34,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "A Bi-Encoder computes full cross-attention between every query word and every document word simultaneously.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Bi-encoders encode queries and documents into separate vectors. Cross-encoders are the ones that compute joint cross-attention.",
    "slideRef": "Teacher Review Doc: Module 2 Item 4"
  },
  {
    "id": 35,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "What is the main latency/cost trade-off of using a Cross-Encoder reranker?",
    "modelAnswer": "Cross-Encoders are much slower and more computationally heavy than Bi-Encoders because they must run full neural network self-attention on every combined (query + document) candidate.\nThat is why you cannot run a Cross-Encoder across 1 million documents directly. You must first use a fast Bi-Encoder to filter down to 50 candidates, then let the Cross-Encoder score those 50.",
    "keyPoints": [
      "Cross-encoders compute full cross-attention for every pair (slow, O(N) model passes).",
      "Bi-encoders use pre-computed vector indexes (fast, sub-10ms lookup).",
      "Two-stage pipeline balances speed and accuracy.",
      "Bi-encoder gets top 50; Cross-encoder reranks down to top 3-5."
    ],
    "explanation": "Teacher Highlight: Latency/cost trade-offs of reranking.",
    "slideRef": "Teacher Review Doc: Module 2 Item 4"
  },
  {
    "id": 36,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.4 Reranking with Cross-Encoders",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "In a 2-stage retrieval pipeline, the fast initial model that turns text into separate vector points is called a ________-Encoder.",
    "acceptedAnswers": [
      "Bi",
      "bi",
      "Bi-Encoder",
      "bi-encoder"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Bi-encoders vs cross-encoders — architectural difference.",
    "slideRef": "Teacher Review Doc: Module 2 Item 4"
  },
  {
    "id": 37,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.5 Context Management",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "What is the 'Lost in the Middle' problem in LLM context windows?",
    "options": [
      "The computer loses internet in the middle of a search.",
      "The AI pays the most attention to text placed at the very start and very end of a prompt, often overlooking facts in the middle.",
      "The vector database deletes the middle 10 rows.",
      "The monitor turns off after 5 minutes."
    ],
    "correctIndex": 1,
    "explanation": "Teacher Highlight: Ordering/placement effects ('lost in the middle' phenomenon).",
    "slideRef": "Teacher Review Doc: Module 2 Item 5"
  },
  {
    "id": 38,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.5 Context Management",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "Research proves that LLMs have uniform 100% recall across long contexts, completely disproving the 'Lost in the Middle' phenomenon.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. The 'Lost in the Middle' phenomenon proves that model attention degrades significantly for information located in the center of long prompts.",
    "slideRef": "Teacher Review Doc: Module 2 Item 5"
  },
  {
    "id": 39,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.5 Context Management",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Why is chunk deduplication important before passing retrieved context into an LLM prompt?",
    "modelAnswer": "Often, multiple retrieved chunks say almost the exact same thing (for example, from overlapping chunks or repeated sections in documentation).\nPassing duplicate text wastes precious context window tokens, increases API costs and latency, and dilutes the AI's attention. Deduplicating ensures every chunk provides unique, valuable information.",
    "keyPoints": [
      "Overlapping or repeated chunks waste context window token budgets.",
      "Increases generation latency and API cost without adding new facts.",
      "Deduplication ensures each chunk provides distinct information.",
      "Reduces attention dilution and improves answer clarity."
    ],
    "explanation": "Teacher Highlight: Deduplication of overlapping or redundant chunks.",
    "slideRef": "Teacher Review Doc: Module 2 Item 5"
  },
  {
    "id": 40,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.5 Context Management",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "The phenomenon where an AI fails to recall facts placed in the center of a long prompt is called 'Lost in the ________'.",
    "acceptedAnswers": [
      "Middle",
      "middle",
      "Lost in the Middle"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: 'lost in the middle' phenomenon.",
    "slideRef": "Teacher Review Doc: Module 2 Item 5"
  },
  {
    "id": 41,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.6 Prompt Compression",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "What is the main difference between Extractive Compression and Abstractive Compression?",
    "options": [
      "Extractive only works on paper; Abstractive works on computers.",
      "Extractive deletes all nouns; Abstractive deletes all verbs.",
      "Extractive keeps only the most important original sentences; Abstractive uses an LLM to write a new summary.",
      "There is no difference between them."
    ],
    "correctIndex": 2,
    "explanation": "Teacher Highlight: Extractive compression (keeping only key sentences) vs Abstractive compression (LLM-generated summaries).",
    "slideRef": "Teacher Review Doc: Module 2 Item 6"
  },
  {
    "id": 42,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.6 Prompt Compression",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "Prompt compression tools like LLMLingua can remove unnecessary words and sentences to save tokens while keeping key information.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. LLMLingua prunes non-essential tokens to compress prompts without losing core meaning.",
    "slideRef": "Teacher Review Doc: Module 2 Item 6"
  },
  {
    "id": 43,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.6 Prompt Compression",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "What is the main trade-off when compressing prompts in a RAG pipeline?",
    "modelAnswer": "The trade-off is Compression Ratio vs Information Loss.\nIf you compress too aggressively (e.g. cutting 80% of tokens), you save money and speed up latency, but you risk deleting subtle details, numbers, or conditions needed to answer the question accurately.",
    "keyPoints": [
      "Trade-off between compression ratio and information loss.",
      "Higher compression saves tokens, cost, and latency.",
      "Over-compression can drop crucial numbers, conditions, or facts.",
      "Must find the balance where core context remains intact."
    ],
    "explanation": "Teacher Highlight: Trade-offs: compression ratio vs information loss.",
    "slideRef": "Teacher Review Doc: Module 2 Item 6"
  },
  {
    "id": 44,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.6 Prompt Compression",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "The popular prompt compression library that prunes redundant tokens using small language models is called ________.",
    "acceptedAnswers": [
      "LLMLingua",
      "llmlingua"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Tools: LLMLingua and similar approaches.",
    "slideRef": "Teacher Review Doc: Module 2 Item 6"
  },
  {
    "id": 45,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.7 Debugging Common RAG Failure Modes",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "If the correct answer to a user's question was NEVER retrieved from the database, what kind of failure happened?",
    "options": [
      "A sound card error.",
      "A computer monitor failure.",
      "A keyboard driver failure.",
      "A Retrieval / Recall failure (Missing Context)."
    ],
    "correctIndex": 3,
    "explanation": "Teacher Highlight: Missing context (relevant chunk not retrieved — recall failure).",
    "slideRef": "Teacher Review Doc: Module 2 Item 7"
  },
  {
    "id": 46,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.7 Debugging Common RAG Failure Modes",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "If an AI hallucinates a completely made-up answer while the exact correct fact was present in the prompt, this is classified as a database network timeout.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. This is classified as 'Hallucination despite retrieval' (the model ignored or contradicted the provided context).",
    "slideRef": "Teacher Review Doc: Module 2 Item 7"
  },
  {
    "id": 47,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.7 Debugging Common RAG Failure Modes",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "Name 3 common RAG failure modes and give a simple fix for each.",
    "modelAnswer": "1. Missing Context (Recall failure): The right chunk wasn't retrieved. -> Fix: Use hybrid search (BM25 + vector) and increase top-k.\n2. Chunking Boundary Failure: A sentence was cut in half. -> Fix: Add 10-20% chunk overlap.\n3. Model Hallucination: The model ignores the context. -> Fix: Strengthen the system prompt: 'Answer ONLY using the provided text. If unsure, say you do not know.'",
    "keyPoints": [
      "Missing context / recall failure (fix: hybrid search, increase top-k).",
      "Chunking boundary failure (fix: add chunk overlap).",
      "Hallucination despite retrieval (fix: strict grounding prompt, lower temperature).",
      "Query ambiguity (fix: query rewriting / expansion)."
    ],
    "explanation": "Teacher Highlight: Hallucination despite retrieval, missing context, chunking failures, query rewriting.",
    "slideRef": "Teacher Review Doc: Module 2 Item 7"
  },
  {
    "id": 48,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.7 Debugging Common RAG Failure Modes",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "When a user asks a vague query, an agent can fix the search by applying query ________ to clarify and rephrase the search words.",
    "acceptedAnswers": [
      "rewriting",
      "expansion",
      "Rewriting"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Query ambiguity and query rewriting/expansion as a fix.",
    "slideRef": "Teacher Review Doc: Module 2 Item 7"
  },
  {
    "id": 49,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.8 Guardrails for RAG Systems",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "What is the job of an Output Guardrail in a RAG system?",
    "options": [
      "To check the AI's answer and make sure it is factually grounded in the retrieved text before showing it to the user.",
      "To delete the user's internet browser history.",
      "To change the font color to green.",
      "To print the answer on physical paper."
    ],
    "correctIndex": 0,
    "explanation": "Teacher Highlight: Output guardrails: fact-checking generated answers against retrieved context.",
    "slideRef": "Teacher Review Doc: Module 2 Item 8"
  },
  {
    "id": 50,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.8 Guardrails for RAG Systems",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "Output guardrails run before the user query reaches the database to detect SQL injection.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. That describes an Input guardrail. Output guardrails inspect the generated answer after the LLM responds.",
    "slideRef": "Teacher Review Doc: Module 2 Item 8"
  },
  {
    "id": 51,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.8 Guardrails for RAG Systems",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "What is the difference between Input Guardrails and Output Guardrails in a RAG system?",
    "modelAnswer": "Input Guardrails check the user's question BEFORE it reaches the database or AI. They detect prompt injection attacks, block harmful questions, and filter sensitive words.\nOutput Guardrails check the AI's answer AFTER generation. They verify that every claim is supported by the retrieved documents (fact-checking), enforce source citations, and ensure no private data is leaked.",
    "keyPoints": [
      "Input guardrails inspect incoming user queries (detect prompt injection, jailbreaks).",
      "Output guardrails inspect generated answers before delivery to the user.",
      "Output guardrails verify faithfulness against context and enforce source citations.",
      "Refusal handling safely handles queries with zero relevant context."
    ],
    "explanation": "Teacher Highlight: Input guardrails vs output guardrails, citation enforcement, refusal handling.",
    "slideRef": "Teacher Review Doc: Module 2 Item 8"
  },
  {
    "id": 52,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.8 Guardrails for RAG Systems",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "NVIDIA's open-source guardrail framework used to control LLM inputs and outputs using Colang rules is called ________ Guardrails.",
    "acceptedAnswers": [
      "NeMo",
      "nemo",
      "NeMo Guardrails"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Tools: Guardrails AI, NeMo Guardrails.",
    "slideRef": "Teacher Review Doc: Module 2 Item 8"
  },
  {
    "id": 53,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.9 RAG Evaluation: Retrieval Metrics",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In RAG search evaluation, what does 'Recall@K' measure?",
    "options": [
      "The computer's remaining battery percentage.",
      "What fraction of all relevant documents were successfully retrieved inside the top K results.",
      "How many words per second the AI types.",
      "How many users logged into the website today."
    ],
    "correctIndex": 1,
    "explanation": "Teacher Highlight: Retrieval metrics: precision@k, recall@k, MRR (Mean Reciprocal Rank).",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 54,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.9 RAG Evaluation: Retrieval Metrics",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In RAG search evaluation, Recall@K measures how many milliseconds the database took to answer.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Recall@K measures what proportion of all relevant documents were successfully captured in the top K retrieved results.",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 55,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.9 RAG Evaluation: Retrieval Metrics",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "What is the difference between Precision@K and Recall@K in RAG evaluation?",
    "modelAnswer": "Precision@K measures quality: Of the K documents you retrieved, what percentage are actually relevant? (High precision means less junk/noise in the prompt).\nRecall@K measures completeness: Of all the relevant documents that exist in your database, what percentage did you successfully retrieve in top K? (High recall means you didn't miss important facts).",
    "keyPoints": [
      "Precision@K: Proportion of retrieved documents that are relevant (quality).",
      "Recall@K: Proportion of all relevant documents that were retrieved (completeness).",
      "High precision reduces irrelevant prompt noise.",
      "High recall ensures no critical facts are missed."
    ],
    "explanation": "Teacher Highlight: Retrieval metrics: precision@k, recall@k, MRR.",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 56,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.9 RAG Evaluation: Retrieval Metrics",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "The retrieval metric that calculates `1 / rank` for the first correct document found is called MRR, which stands for Mean ________ Rank.",
    "acceptedAnswers": [
      "Reciprocal",
      "reciprocal"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: MRR (Mean Reciprocal Rank).",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 57,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.10 RAG Evaluation: Generation & Frameworks",
    "moduleId": "mod06",
    "type": "qcm",
    "question": "In RAG evaluation frameworks (like RAGAS), what does the 'Faithfulness' metric check?",
    "options": [
      "Whether the user paid their monthly subscription.",
      "Whether the AI used proper punctuation in every sentence.",
      "Whether the AI's generated claims can be proven directly from the retrieved context without hallucinating.",
      "How fast the internet connection is."
    ],
    "correctIndex": 2,
    "explanation": "Teacher Highlight: Generation metrics: faithfulness/groundedness, answer relevance.",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 58,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.10 RAG Evaluation: Generation & Frameworks",
    "moduleId": "mod06",
    "type": "true-false",
    "question": "In automated RAG evaluation, 'LLM-as-a-Judge' means using an advanced model (like GPT-4 or Gemini Pro) to grade answers against ground-truth datasets.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. LLM-as-a-judge uses a capable model to evaluate groundedness and relevance at scale.",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 59,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.10 RAG Evaluation: Generation & Frameworks",
    "moduleId": "mod06",
    "type": "open-question",
    "question": "What is a 'Golden Dataset' in RAG evaluation, and why is it essential?",
    "modelAnswer": "A Golden Dataset is a verified collection of realistic test questions, their correct ground-truth answers, and the exact source documents that support them.\nIt is essential because it gives you an objective benchmark: whenever you change your embedding model, chunk size, or prompt, you can run the Golden Dataset to see if your accuracy improved or got worse.",
    "keyPoints": [
      "A benchmark dataset with curated questions, ground-truth answers, and source citations.",
      "Enables automated, reproducible regression testing.",
      "Allows comparing different chunk sizes, embedding models, and prompts objectively.",
      "Used by frameworks like RAGAS and TruLens."
    ],
    "explanation": "Teacher Highlight: Building a golden dataset (Q&A pairs with known correct answers/sources).",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 60,
    "partId": "mod2",
    "partTitle": "Module 2: Advanced RAG Architecture & Evaluation",
    "subtopic": "2.10 RAG Evaluation: Generation & Frameworks",
    "moduleId": "mod06",
    "type": "fill-in-blank",
    "question": "The popular open-source automated RAG evaluation framework that measures faithfulness, answer relevance, and context recall is called ________.",
    "acceptedAnswers": [
      "RAGAS",
      "ragas"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Frameworks: RAGAS, TruLens, DeepEval.",
    "slideRef": "Teacher Review Doc: Module 2 Item 9"
  },
  {
    "id": 61,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "In tool calling, what is the crucial difference between the AI model and your application code?",
    "options": [
      "The model turns off your computer when using tools.",
      "The model executes Python code directly in its neural weights without an operating system.",
      "There is no difference; the model and application are the same thing.",
      "The model only REQUESTS an action by outputting JSON; your application is what ACTUALLY executes the real function."
    ],
    "correctIndex": 3,
    "explanation": "Teacher Highlight: Difference between the model requesting an action and the application actually executing it.",
    "slideRef": "Teacher Review Doc: Agents Item 1"
  },
  {
    "id": 62,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Local open models (like Qwen 2.5 and Llama 3.1) can emit structured `tool_calls` in an OpenAI-compatible format.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Modern open models are fine-tuned for tool calling and emit standard tool_calls JSON.",
    "slideRef": "Teacher Review Doc: Agents Item 1"
  },
  {
    "id": 63,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Walk through the complete lifecycle of a tool call in simple steps.",
    "modelAnswer": "1. User asks a question (e.g. 'What is the price of Bitcoin?').\n2. Model decides it needs live data, so it outputs a structured tool call: `get_price(ticker='BTC')`.\n3. Application intercepts the tool call and executes the real API function.\n4. Tool returns the result (e.g. '$65,000').\n5. Application sends the tool result back to the model.\n6. Model reads the result and writes the final answer to the user.",
    "keyPoints": [
      "User request -> Model decision to call a tool.",
      "Structured tool call output (JSON schema).",
      "Application executes the actual function.",
      "Tool result returned to model -> Model generates final response."
    ],
    "explanation": "Teacher Highlight: Tool lifecycle: user request -> model decision -> tool call -> execution -> tool result -> next decision.",
    "slideRef": "Teacher Review Doc: Agents Item 1"
  },
  {
    "id": 64,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.1 Tool Calling with Local Models",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "When an LLM finishes generating a tool invocation instead of plain text, the API response sets finish_reason = '________'.",
    "acceptedAnswers": [
      "tool_calls",
      "tool_call",
      "tool_calls'"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Structured tool call format and finish reasons.",
    "slideRef": "Teacher Review Doc: Agents Item 1"
  },
  {
    "id": 65,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "Why are structured arguments (using JSON schemas and Pydantic) better than asking an AI for free-form text commands?",
    "options": [
      "Because structured arguments enforce exact parameter types, required fields, and rules, preventing code crashes.",
      "Because free-form text makes computer CPUs run too hot.",
      "Because JSON schemas make the internet connection faster.",
      "Because structured arguments only use the letter A."
    ],
    "correctIndex": 0,
    "explanation": "Teacher Highlight: Why structured arguments are better than asking a model to produce free-form text commands.",
    "slideRef": "Teacher Review Doc: Agents Item 2"
  },
  {
    "id": 66,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "When an agent calls a function, asking the model for unstructured free-form text is safer than enforcing a strict JSON schema.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. Free-form text leads to missing parameters, typos, and syntax errors. Strict schemas with Pydantic validation ensure type safety.",
    "slideRef": "Teacher Review Doc: Agents Item 2"
  },
  {
    "id": 67,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "What is the difference between Schema Validation and Business Validation in tool calling?",
    "modelAnswer": "Schema Validation checks data formats and types (e.g. Is `age` an integer? Is `email` a valid string? Is `amount` present?). Pydantic handles this automatically.\nBusiness Validation checks real-world business logic (e.g. Does the user have enough money in their bank account? Is the product currently in stock? Does this user have permission to delete this project?). Your database and application logic handle this.",
    "keyPoints": [
      "Schema validation verifies data types, presence, and formats (Pydantic).",
      "Business validation checks real-world rules, account balances, and permissions.",
      "Schema validation runs first; business validation runs inside the tool logic.",
      "Both are needed to keep agent actions safe."
    ],
    "explanation": "Teacher Highlight: Schema validation vs business validation.",
    "slideRef": "Teacher Review Doc: Agents Item 2"
  },
  {
    "id": 68,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.2 Structured Function Invocation",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In Pydantic schemas, to specify that a parameter is required and must be an integer greater than or equal to 0, we write `Field(ge=________)`.",
    "acceptedAnswers": [
      "0",
      "0.0",
      "zero"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Schema parameters, types, and required fields.",
    "slideRef": "Teacher Review Doc: Agents Item 2"
  },
  {
    "id": 69,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What does a 'Bounded Action' mean in an autonomous agent system?",
    "options": [
      "Giving the agent unlimited root access to the entire operating system.",
      "Restricting the agent's actions with strict boundaries: safe environments (sandboxes), read-only limits, and timeouts.",
      "Allowing the agent to delete any file it wants.",
      "Making the agent run without any computer memory."
    ],
    "correctIndex": 1,
    "explanation": "Teacher Highlight: What 'bounded action' means in an agent system.",
    "slideRef": "Teacher Review Doc: Agents Item 3"
  },
  {
    "id": 70,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Under the Principle of Least Privilege, an agent should only be given the minimal capabilities and permissions it strictly needs.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Never grant admin or write access when read-only access is sufficient.",
    "slideRef": "Teacher Review Doc: Agents Item 3"
  },
  {
    "id": 71,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Why is letting an AI execute raw SQL or arbitrary shell code directly on your production server dangerous? How do you make it safe?",
    "modelAnswer": "It is dangerous because an AI hallucination, error, or prompt injection could run `DROP TABLE users;` or `rm -rf /`, wiping out your entire company database or leaking private customer data.\nTo make it safe:\n1. Use read-only database credentials (`SELECT` only, no `DROP`/`DELETE`).\n2. Run commands inside an ephemeral, isolated Docker sandbox with no host file access.\n3. Add strict timeouts and query row limits (LIMIT 100).",
    "keyPoints": [
      "Unrestricted execution can wipe data, crash servers, or leak customer records.",
      "Restrict database tools to read-only SELECT permissions.",
      "Execute code only inside isolated containers (Docker/sandboxes).",
      "Enforce strict timeouts and resource limits."
    ],
    "explanation": "Teacher Highlight: Controlled tools vs powerful tools such as raw SQL or arbitrary code execution.",
    "slideRef": "Teacher Review Doc: Agents Item 3"
  },
  {
    "id": 72,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.3 Executing Bounded Actions",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The core security principle stating that an agent should only receive the minimum permissions needed to do its job is the Principle of Least ________.",
    "acceptedAnswers": [
      "Privilege",
      "privilege",
      "Least Privilege"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Why least privilege matters.",
    "slideRef": "Teacher Review Doc: Agents Item 3"
  },
  {
    "id": 73,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What is a 'Failure Boundary' in an agent system?",
    "options": [
      "A line on the computer screen that you cannot cross.",
      "A rule that deletes the database if any error happens.",
      "A safety barrier that stops an error in one tool from crashing the entire application.",
      "A cable connecting two servers together."
    ],
    "correctIndex": 2,
    "explanation": "Teacher Highlight: What a failure boundary is and how it prevents one tool failure from crashing the whole system.",
    "slideRef": "Teacher Review Doc: Agents Item 4"
  },
  {
    "id": 74,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Setting an execution limit (like a maximum of 10 steps) acts as a circuit breaker to stop an agent from looping forever.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Maximum iterations or recursion limits prevent infinite runaway loops and API budget exhaustion.",
    "slideRef": "Teacher Review Doc: Agents Item 4"
  },
  {
    "id": 75,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "How does an agent recover when a tool returns an error instead of crashing the system?",
    "modelAnswer": "When a tool fails (e.g. 'City not found' or 'Database connection timeout'), the failure boundary catches the error and returns it as a clean text message to the agent: `Tool error: Unable to find city 'PhnomPehn'. Check spelling.`\nThe agent reads this observation in its next thought step and self-corrects: 'I misspelled Phnom Penh. Let me try again with the correct spelling: `get_weather(city='Phnom Penh')`.'",
    "keyPoints": [
      "Application catches tool exceptions gracefully.",
      "Returns controlled, informative error message to the agent as an observation.",
      "Agent observes the error and reasons about how to recover.",
      "Tries an alternative tool, corrects parameters, or asks the user for help."
    ],
    "explanation": "Teacher Highlight: Recovery: how an agent can observe an error and choose a next action.",
    "slideRef": "Teacher Review Doc: Agents Item 4"
  },
  {
    "id": 76,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.4 Workflow Safety & Failure Boundaries",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In LangGraph, the setting that places a maximum limit on graph step transitions to stop infinite loops is called the ________ limit.",
    "acceptedAnswers": [
      "recursion",
      "recursion_limit",
      "recursion limit"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Execution limits: maximum iterations, tool-call limits, timeouts.",
    "slideRef": "Teacher Review Doc: Agents Item 4"
  },
  {
    "id": 77,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.5 Introduction to Agent Patterns",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What are the 3 repeating steps in the ReAct agent design pattern?",
    "options": [
      "Download -> Compile -> Install",
      "Open -> Edit -> Close",
      "Select -> Copy -> Paste",
      "Thought (Think) -> Action (Call tool) -> Observation (Read tool result)"
    ],
    "correctIndex": 3,
    "explanation": "Teacher Highlight: ReAct / reasoning-and-action style loops: think/act/observe conceptually.",
    "slideRef": "Teacher Review Doc: Agents Item 5"
  },
  {
    "id": 78,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.5 Introduction to Agent Patterns",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In the Planner-Executor pattern, the agent plans out all steps first before executing them one by one.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Planner-Executor separates high-level planning from individual tool execution steps.",
    "slideRef": "Teacher Review Doc: Agents Item 5"
  },
  {
    "id": 79,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.5 Introduction to Agent Patterns",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Briefly explain the difference between the Router Pattern and the Multi-Agent System pattern.",
    "modelAnswer": "Router Pattern: A single classifier node that looks at a request and directs it to the right tool or specialized chain (e.g. sending billing questions to billing, technical questions to tech support).\nMulti-Agent System: Multiple independent AI agents (each with their own role, prompt, and tools) collaborating together—for example, a Researcher agent finds data, a Coder agent writes code, and a Reviewer agent tests it.",
    "keyPoints": [
      "Router pattern: Single decision point routing traffic to specialized paths.",
      "Multi-agent system: Multiple distinct autonomous agents collaborating.",
      "Each agent has specialized roles, system prompts, and toolsets.",
      "Multi-agent handles complex workflows but adds orchestration overhead."
    ],
    "explanation": "Teacher Highlight: Router pattern vs Planner-Executor vs Multi-Agent Systems.",
    "slideRef": "Teacher Review Doc: Agents Item 5"
  },
  {
    "id": 80,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.5 Introduction to Agent Patterns",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The agent pattern where an AI generates content, reviews its own output for mistakes, and refines it is called the ________ pattern.",
    "acceptedAnswers": [
      "Reflection",
      "reflection"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Reflection pattern.",
    "slideRef": "Teacher Review Doc: Agents Item 5"
  },
  {
    "id": 81,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.6 Harness Design for Agents",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What is an 'Agent Harness' in AI engineering?",
    "options": [
      "The surrounding application and control layer that manages the agent's tools, state, safety limits, and logging.",
      "A physical strap used to carry computers.",
      "A graphics card designed for video games.",
      "A replacement for the Python interpreter."
    ],
    "correctIndex": 0,
    "explanation": "Teacher Highlight: What an agent harness is: the surrounding application/control layer that manages the agent.",
    "slideRef": "Teacher Review Doc: Agents Item 6"
  },
  {
    "id": 82,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.6 Harness Design for Agents",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "Critical production systems should be controlled directly by raw LLM outputs with zero harness safety checks.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 1,
    "explanation": "False. LLMs must never directly control critical systems without a harness enforcing validation, limits, and human approval.",
    "slideRef": "Teacher Review Doc: Agents Item 6"
  },
  {
    "id": 83,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.6 Harness Design for Agents",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Name 4 core responsibilities of an Agent Harness application.",
    "modelAnswer": "1. Tool Management: Declares tool schemas and executes real Python functions.\n2. State & Context Handling: Manages message history and passes relevant context to the model.\n3. Safety Controls: Enforces timeouts, step limits, and sandbox isolation.\n4. Logging & Telemetry: Records the agent's trajectory (thoughts, tools, errors) for debugging and auditing.",
    "keyPoints": [
      "Tool management and argument validation.",
      "State and context persistence across turns.",
      "Safety guardrails, limits, and timeouts.",
      "Telemetry and trajectory logging for auditing and debugging."
    ],
    "explanation": "Teacher Highlight: Responsibilities such as tool management, state/context handling, execution control, logging, safety, and monitoring.",
    "slideRef": "Teacher Review Doc: Agents Item 6"
  },
  {
    "id": 84,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.6 Harness Design for Agents",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The step-by-step record of an agent's thoughts, tools called, inputs, and observations stored by the harness is called the agent's ________.",
    "acceptedAnswers": [
      "trajectory",
      "Trajectory",
      "trace"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Logging, monitoring, and agent trajectory tracking.",
    "slideRef": "Teacher Review Doc: Agents Item 6"
  },
  {
    "id": 85,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.7 MCP Server",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "What are the 3 things an MCP (Model Context Protocol) server can expose to an AI client?",
    "options": [
      "Photos, Videos, and Music.",
      "Tools (actions), Resources (read-only data/files), and Prompts (reusable templates).",
      "RAM, CPU, and Hard drives.",
      "Keyboards, Mice, and Monitors."
    ],
    "correctIndex": 1,
    "explanation": "Teacher Highlight: What an MCP server can expose: Tools, Resources, and Prompts.",
    "slideRef": "Teacher Review Doc: Agents Item 7"
  },
  {
    "id": 86,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.7 MCP Server",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In Python FastMCP, you turn a function into an AI tool by adding the `@mcp.tool()` decorator above it.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. FastMCP uses `@mcp.tool()` to expose callable tools.",
    "slideRef": "Teacher Review Doc: Agents Item 7"
  },
  {
    "id": 87,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.7 MCP Server",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "In simple terms, what problem does Anthropic's Model Context Protocol (MCP) solve?",
    "modelAnswer": "Before MCP, every AI app (Claude Desktop, Cursor, LangChain) used different custom ways to call tools. If you built a tool for PostgreSQL, you had to rewrite it for every app.\nMCP creates one standard open protocol (like USB for AI). You write an MCP server once, and it instantly works with Claude Desktop, Cursor, or any custom Python agent without rewriting tool code.",
    "keyPoints": [
      "Solves the fragmented, proprietary tool-integration problem.",
      "Acts like a universal standard (USB for AI).",
      "Build a tool server once and connect it to any MCP client (Claude, Cursor, IDEs).",
      "Standardizes discovery of Tools, Resources, and Prompts."
    ],
    "explanation": "Teacher Highlight: What Model Context Protocol (MCP) is and the problem it tries to solve.",
    "slideRef": "Teacher Review Doc: Agents Item 7"
  },
  {
    "id": 88,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.7 MCP Server",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In Python FastMCP, the decorator used to expose an executable action to the AI client is @mcp.________().",
    "acceptedAnswers": [
      "tool",
      "tool()",
      "@mcp.tool"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: FastMCP tool declaration (@mcp.tool()).",
    "slideRef": "Teacher Review Doc: Agents Item 7"
  },
  {
    "id": 89,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "When is building an MCP Server better than hardcoding local Python functions in your bot script?",
    "options": [
      "When you want code to run without electricity.",
      "When your computer doesn't have an operating system.",
      "When you want your tools to be reusable across multiple different apps (like Claude Desktop, Cursor, and web apps) without rewriting code.",
      "When you only want to add two numbers together once."
    ],
    "correctIndex": 2,
    "explanation": "Teacher Highlight: When MCP becomes useful for reusable/shared integrations.",
    "slideRef": "Teacher Review Doc: Agents Item 8"
  },
  {
    "id": 90,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In-memory local Python tools have lower communication latency than calling an MCP server over a network connection.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. Local tools run in the same process with zero network serialization overhead.",
    "slideRef": "Teacher Review Doc: Agents Item 8"
  },
  {
    "id": 91,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "What are the main trade-offs between Local Python Tools and MCP Servers?",
    "modelAnswer": "Local Python Tools:\n- Pros: Fastest speed (zero network delay), simplest code, easy for quick prototypes.\n- Cons: Hardcoded to one script; cannot be shared with Claude Desktop or Cursor.\n\nMCP Servers:\n- Pros: Highly reusable across different clients (Claude, Cursor, web), runs in a safe separate process, language agnostic.\n- Cons: Incurs slight JSON-RPC network latency and requires running a separate server process.",
    "keyPoints": [
      "Local tools: Low latency, simple setup, in-process, but tightly coupled.",
      "MCP servers: Cross-client reuse (Claude Desktop, Cursor, LangGraph), language agnostic.",
      "MCP provides process isolation boundaries.",
      "Trade-off between sub-millisecond local speed vs cross-app reusability."
    ],
    "explanation": "Teacher Highlight: Advantages and limitations of each approach. When local tools are simpler; when MCP is useful.",
    "slideRef": "Teacher Review Doc: Agents Item 8"
  },
  {
    "id": 92,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.8 Local Tools vs MCP Server",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "The Model Context Protocol (MCP) exchanges messages using the standardized JSON-________ protocol.",
    "acceptedAnswers": [
      "RPC",
      "rpc",
      "RPC 2.0",
      "JSON-RPC"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: MCP communication architecture.",
    "slideRef": "Teacher Review Doc: Agents Item 8"
  },
  {
    "id": 93,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "qcm",
    "question": "Why are some agent actions required to have Human-in-the-Loop approval?",
    "options": [
      "Because computer monitors turn off without human clicks.",
      "Because AI models do not know what the color blue is.",
      "Because human approval makes the internet run faster.",
      "Because high-stakes actions (like charging credit cards, deleting databases, or sending emails) cannot be undone if the AI makes a mistake."
    ],
    "correctIndex": 3,
    "explanation": "Teacher Highlight: Why some agent actions need human approval: destructive changes, financial actions, sensitive operations.",
    "slideRef": "Teacher Review Doc: Agents Item 9"
  },
  {
    "id": 94,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "true-false",
    "question": "In LangGraph, you can pause execution right before a sensitive step using the `interrupt_before` setting.",
    "options": [
      "True",
      "False"
    ],
    "correctIndex": 0,
    "explanation": "True. `interrupt_before=['step_name']` pauses graph execution and saves state to checkpointer until a human approves.",
    "slideRef": "Teacher Review Doc: Agents Item 9"
  },
  {
    "id": 95,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "open-question",
    "question": "Explain the difference between Human-IN-the-loop, Human-ON-the-loop, and Human-OUT-of-the-loop.",
    "modelAnswer": "1. Human-IN-the-loop: The AI CANNOT act until a human explicitly inspects and clicks 'Approve' (e.g. approving a $10,000 bank transfer).\n2. Human-ON-the-loop: The AI acts autonomously, but a human monitors the system and can press a pause/emergency stop button if something goes wrong.\n3. Human-OUT-of-the-loop: The AI acts completely autonomously with zero human supervision or intervention.",
    "keyPoints": [
      "Human-IN-the-loop: Human approval is mandatory before the action executes.",
      "Human-ON-the-loop: Agent acts autonomously while a human monitors with override control.",
      "Human-OUT-of-the-loop: Fully autonomous execution without human involvement.",
      "Trade-off between autonomy, safety, speed, and user experience."
    ],
    "explanation": "Teacher Highlight: Human-IN-the-loop, Human-ON-the-loop, and Human-OUT-of-the-loop.",
    "slideRef": "Teacher Review Doc: Agents Item 9"
  },
  {
    "id": 96,
    "partId": "mod3",
    "partTitle": "Module 3: Autonomous Agents & Tool Integration",
    "subtopic": "3.9 Human-in-the-Loop Design",
    "moduleId": "mod07",
    "type": "fill-in-blank",
    "question": "In LangGraph, to pause execution immediately before a sensitive action runs, you configure interrupt_________.",
    "acceptedAnswers": [
      "before",
      "Before",
      "interrupt_before"
    ],
    "placeholder": "Type your answer here...",
    "explanation": "Teacher Highlight: Approval/review workflow: agent proposes -> human reviews -> execute.",
    "slideRef": "Teacher Review Doc: Agents Item 9"
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
