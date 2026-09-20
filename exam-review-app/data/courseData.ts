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
  moduleId: string;
  type: 'concept' | 'code' | 'scenario';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
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
    id: 1,
    moduleId: "mod04",
    type: "concept",
    question: "What is the primary difference between State and Memory in an AI workflow?",
    options: [
      "State is long-term across all users; Memory is short-term for one function call.",
      "State is short-term execution context for the current run; Memory is long-term context retained across multiple sessions.",
      "State holds model weights; Memory holds document embeddings.",
      "State is stored in a vector DB; Memory is stored in a text file."
    ],
    correctIndex: 1,
    explanation: "According to Lesson 04 (Slide 39), State manages the current execution context (inputs, intermediate variables, step pointer) and is temporary, whereas Memory records long-term user preferences and history across sessions.",
    slideRef: "Lesson 04 Slide 39"
  },
  {
    id: 2,
    moduleId: "mod04",
    type: "code",
    question: "In LangGraph, which component handles short-term memory scoped to a single ongoing conversation thread?",
    codeSnippet: `builder = StateGraph(State)
checkpointer = InMemorySaver()
app = builder.compile(checkpointer=checkpointer)
config = {"configurable": {"thread_id": "conv-1"}}`,
    options: [
      "InMemoryStore scoped by user namespace",
      "InMemorySaver (Checkpointer) scoped by thread_id",
      "TitleExtractor scoped by document id",
      "SentenceSplitter scoped by chunk_size"
    ],
    correctIndex: 1,
    explanation: "Lesson 04 Slide 114 explains that Checkpointer (e.g. InMemorySaver) handles short-term memory scoped to a thread_id, ensuring two calls with the same thread_id share history.",
    slideRef: "Lesson 04 Slide 114"
  },
  {
    id: 3,
    moduleId: "mod04",
    type: "concept",
    question: "In a document ingestion pipeline, why does the pipeline check a cryptographic content hash in the docstore before running transformations?",
    options: [
      "To encrypt the document against unauthorized user viewing.",
      "To avoid expensive chunking and embedding generation if the file has not changed.",
      "To format Markdown headers into JSON tables.",
      "To convert text into audio tokens."
    ],
    correctIndex: 1,
    explanation: "Lesson 04 Slide 51 emphasizes that checking the docstore content hash prevents redundant, expensive chunking and embedding operations for unmodified documents.",
    slideRef: "Lesson 04 Slide 51"
  },
  {
    id: 4,
    moduleId: "mod04",
    type: "code",
    question: "In LangGraph, how does the newer 'Command' primitive simplify conditional routing compared to 'add_conditional_edges'?",
    codeSnippet: `def classify(state: State) -> Command[Literal["billing", "tech"]]:
    if "billing" in state["ticket"]:
        return Command(update={"status": "routed"}, goto="billing")
    return Command(update={"status": "routed"}, goto="tech")`,
    options: [
      "It replaces Python functions with raw shell commands.",
      "It combines returning state updates and selecting the next destination node in a single return statement.",
      "It forces the graph to run synchronously without threading.",
      "It converts LangGraph into a linear LangChain LCEL pipe."
    ],
    correctIndex: 1,
    explanation: "Lesson 04 Slide 107 states that Command lets a node return a state update and the next node to route to in one return value, avoiding a separate routing function.",
    slideRef: "Lesson 04 Slide 107"
  },
  {
    id: 5,
    moduleId: "mod04",
    type: "concept",
    question: "What are the 3 core principles of Modular Workflow Design?",
    options: [
      "High coupling, complex inheritance, raw execution",
      "Single responsibility, standard interfaces, and composability",
      "All-in-one scripts, static prompts, and global variables",
      "Multi-GPU training, fine-tuning, and long context"
    ],
    correctIndex: 1,
    explanation: "Lesson 04 Slide 60 outlines the 3 principles: Single responsibility (each piece has one job), Standard interfaces (swappable without touching adjacent code), and Composability (small pieces easily link together).",
    slideRef: "Lesson 04 Slide 60"
  },
  {
    id: 6,
    moduleId: "mod05",
    type: "concept",
    question: "When should an engineer choose RAG instead of Fine-Tuning?",
    options: [
      "When the goal is to alter the model’s linguistic style, tone, or dialect.",
      "When information changes frequently, private documents are needed, and exact citations are mandatory.",
      "When you have no access to an embedding model or vector database.",
      "When training compute is unlimited and latency must be zero."
    ],
    correctIndex: 1,
    explanation: "Lesson 05 Slide 4 & 5 highlight that RAG is ideal for dynamic knowledge updates, preventing staleness and hallucination, and providing exact source attribution.",
    slideRef: "Lesson 05 Slide 4-5"
  },
  {
    id: 7,
    moduleId: "mod05",
    type: "concept",
    question: "What is the primary purpose of Chunk Overlap in document splitting?",
    options: [
      "To compress the document so it uses fewer total tokens.",
      "To prevent sentences or concepts from being severed at chunk boundaries.",
      "To make vector dimensions smaller for faster cosine search.",
      "To automatically translate English text into Khmer."
    ],
    correctIndex: 1,
    explanation: "Lesson 05 Slide 24 & Lesson 06 Slide 72 explain that chunk overlap repeats 10–20% of tokens across boundaries so sentences split mid-cut remain whole in at least one chunk.",
    slideRef: "Lesson 05 Slide 24"
  },
  {
    id: 8,
    moduleId: "mod05",
    type: "concept",
    question: "If two embedding vectors A and B are unit-normalized (length = 1.0), what is the relationship between their Dot Product and Cosine Similarity?",
    options: [
      "Dot Product is the square of Cosine Similarity.",
      "Dot Product is mathematically identical to Cosine Similarity.",
      "Dot Product is always negative, while Cosine is positive.",
      "Dot Product requires GPU, while Cosine requires CPU."
    ],
    correctIndex: 1,
    explanation: "Because Cosine Similarity = (A · B) / (||A|| * ||B||), when ||A|| = 1 and ||B|| = 1, the denominator is 1, making Dot Product exactly equal to Cosine Similarity!",
    slideRef: "Lesson 05 Slide 34"
  },
  {
    id: 9,
    moduleId: "mod05",
    type: "code",
    question: "In ChromaDB, what does the following query call return?",
    codeSnippet: `results = collection.query(
    query_texts=["quarterly revenue growth"],
    n_results=3,
    where={"dept": "Finance"}
)`,
    options: [
      "All documents in the collection formatted as CSV.",
      "The top-3 most semantically similar chunks belonging to the Finance department.",
      "A fine-tuned LoRA checkpoint for the query.",
      "A BM25 keyword frequency count table."
    ],
    correctIndex: 1,
    explanation: "Lesson 05 Slide 51 demonstrates that collection.query embeds query_texts and retrieves the top n_results closest chunks by similarity, filtered by payload metadata.",
    slideRef: "Lesson 05 Slide 51"
  },
  {
    id: 10,
    moduleId: "mod05",
    type: "concept",
    question: "What does an Approximate Nearest Neighbor (ANN) index like HNSW do differently from a traditional SQL database B-Tree index?",
    options: [
      "It only works with integer primary keys.",
      "It enables sub-linear similarity search across high-dimensional vector spaces instead of exact relational matches.",
      "It encrypts strings into SHA-256 hashes.",
      "It requires retraining on every select query."
    ],
    correctIndex: 1,
    explanation: "Lesson 05 Slide 47 explains that HNSW indexes allow searching millions of high-dimensional vectors in sub-linear time, whereas B-trees only support 1D exact or range matching.",
    slideRef: "Lesson 05 Slide 47"
  },
  {
    id: 11,
    moduleId: "mod06",
    type: "concept",
    question: "What is the main blind spot of pure dense (vector) retrieval that keyword search (BM25) solves?",
    options: [
      "Dense search cannot handle synonyms like 'car' vs 'vehicle'.",
      "Dense search misses exact identifiers, part numbers (SKU-4471), error codes (E-1147), and rare acronyms.",
      "Dense search is too slow on large corpora.",
      "Dense search requires keyword stemming."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 5 emphasizes that dense search compresses text into general semantic meaning, losing tokens that carry identity rather than meaning (exact error codes, SKUs, jargon).",
    slideRef: "Lesson 06 Slide 5"
  },
  {
    id: 12,
    moduleId: "mod06",
    type: "code",
    question: "In Reciprocal Rank Fusion (RRF), what is the formula and standard smoothing constant k?",
    codeSnippet: `fused[doc_id] += 1.0 / (k + rank)`,
    options: [
      "k = 1.5 (from BM25)",
      "k = 60 (standard damping constant)",
      "k = 0.75 (length normalization)",
      "k = 512 (context limit)"
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 10 states that RRF(d) = Σ 1 / (k + rank_i(d)) with k = 60 as the standard constant to damp the gap between rank 1 and rank 2.",
    slideRef: "Lesson 06 Slide 10"
  },
  {
    id: 13,
    moduleId: "mod06",
    type: "concept",
    question: "Why does Graph RAG succeed on multi-hop questions where standard chunk-based top-k retrieval fails?",
    options: [
      "Graph RAG uses larger LLMs with 10M token context windows.",
      "Graph RAG connects facts across separate chunks using typed entity-relationship edges (A -> B -> C).",
      "Graph RAG replaces all text with images.",
      "Graph RAG only uses BM25 keyword matching."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 18–20 explains that multi-hop questions have half the answer in Chunk 14 and half in Chunk 902; knowledge graph edges connect them structurally.",
    slideRef: "Lesson 06 Slide 18-20"
  },
  {
    id: 14,
    moduleId: "mod06",
    type: "concept",
    question: "In Microsoft GraphRAG, what is the key difference between Local Search and Global Search?",
    options: [
      "Local search runs on localhost; Global runs in cloud.",
      "Local search is entity-focused (traversing 1-2 hops); Global search is theme-focused (map-reducing over community summaries).",
      "Local search uses BM25; Global search uses ChromaDB.",
      "Local search requires GPU; Global search requires CPU."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 27: Local search focuses on specific entities and walks outward; Global search queries community summary reports to answer corpus-wide thematic questions.",
    slideRef: "Lesson 06 Slide 27"
  },
  {
    id: 15,
    moduleId: "mod06",
    type: "concept",
    question: "What is the architectural difference between a Bi-Encoder and a Cross-Encoder?",
    options: [
      "Bi-Encoder uses two GPUs; Cross-Encoder uses one GPU.",
      "Bi-Encoder encodes query and doc separately (two towers); Cross-Encoder passes query and doc concatenated into one transformer with full cross-attention.",
      "Bi-Encoder is only for images; Cross-Encoder is for text.",
      "Bi-Encoder is slower than Cross-Encoder."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 45 & 46: Bi-encoders encode independently so comparisons happen in vector space; Cross-encoders concatenate [CLS] query [SEP] doc with full token-to-token cross-attention.",
    slideRef: "Lesson 06 Slide 45"
  },
  {
    id: 16,
    moduleId: "mod06",
    type: "code",
    question: "How does context reordering mitigate the 'Lost in the Middle' phenomenon?",
    codeSnippet: `head, tail = [], []
for i, c in enumerate(picked):
    (head if i % 2 == 0 else tail).append(c)
ordered = head + tail[::-1]`,
    options: [
      "It reverses all words in the document.",
      "It places Rank 1 at the beginning, Rank 2 at the very end, and buries weaker chunks in the middle.",
      "It removes all punctuation.",
      "It duplicates every chunk twice."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 55 & 60: LLMs attend best to the start and end of prompt context; the even/odd split places strongest chunks at the extremes and buries lower-ranked chunks in the middle.",
    slideRef: "Lesson 06 Slide 55, 60"
  },
  {
    id: 17,
    moduleId: "mod06",
    type: "concept",
    question: "What are the three verification checks performed in Self-Reflective RAG?",
    options: [
      "Token count, syntax check, spell check",
      "1. Is chunk relevant? 2. Is draft answer grounded? 3. Does it answer the question?",
      "Latency check, GPU temperature, API credit",
      "HTML validation, CSS styling, responsive layout"
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 39: Self-Reflective RAG checks: 1. Relevant chunks before generation, 2. Groundedness against context after draft, 3. Relevance to user question.",
    slideRef: "Lesson 06 Slide 39"
  },
  {
    id: 18,
    moduleId: "mod07",
    type: "concept",
    question: "What is the fundamental rule of Tool Calling architecture in autonomous agents?",
    options: [
      "The model directly opens sockets and runs SQL queries.",
      "The model requests the action; the application executes it.",
      "The tool writes prompts; the model reads files.",
      "Local models cannot request tools."
    ],
    correctIndex: 1,
    explanation: "Lesson 07 Slide 16 & 48 emphasizes: 'The model requests the action; the application executes it.' LLMs propose structured calls; the application host validates and runs them.",
    slideRef: "Lesson 07 Slide 16"
  },
  {
    id: 19,
    moduleId: "mod07",
    type: "concept",
    question: "Which of the following is an example of Business Validation rather than Schema Validation?",
    options: [
      "Checking if `order_id` is an integer.",
      "Checking if `product_id` is present in required fields.",
      "Checking whether product ID 101 currently has sufficient stock in the inventory database.",
      "Checking if `user_email` matches a string type."
    ],
    correctIndex: 2,
    explanation: "Lesson 07 Slide 28 explains that Schema validation checks types and shapes, whereas Business validation checks domain rules and database reality (e.g. is item in stock? does user have permission?).",
    slideRef: "Lesson 07 Slide 28"
  },
  {
    id: 20,
    moduleId: "mod07",
    type: "concept",
    question: "What is the principle of 'Bounded Actions' and 'Least Privilege' in agent security?",
    options: [
      "Giving the agent root shell access so it can fix bugs automatically.",
      "Giving agents capabilities through narrow allowlisted tools, avoiding raw exec() or arbitrary SQL strings.",
      "Allowing the agent to retry failing tools infinitely.",
      "Removing all timeouts from the execution harness."
    ],
    correctIndex: 1,
    explanation: "Lesson 07 Slide 36–40: Give agents capabilities, not unlimited power. Use allowlists of narrow parameterized tools and never hand over raw interpreters.",
    slideRef: "Lesson 07 Slide 36-40"
  },
  {
    id: 21,
    moduleId: "mod07",
    type: "concept",
    question: "In the OS-Kernel analogy for Agent Harness design, what corresponds to the Kernel and the CPU?",
    options: [
      "The Model is the Kernel; the Database is the CPU.",
      "The Harness is the Kernel (controls syscalls, safety, memory); the Model is an untrusted CPU (generates next tokens).",
      "The Python interpreter is the CPU; Ollama is the Kernel.",
      "The Tool is the Kernel; the Prompt is the CPU."
    ],
    correctIndex: 1,
    explanation: "Lesson 07 Slide 82: The model is an untrusted CPU (instruction generator); the harness is the operating system kernel (enforces permissions, sandbox, memory, and budgets).",
    slideRef: "Lesson 07 Slide 82"
  },
  {
    id: 22,
    moduleId: "mod07",
    type: "concept",
    question: "What problem does the Model Context Protocol (MCP) solve?",
    options: [
      "It replaces Python with Rust for faster execution.",
      "It solves the M x N integration problem between AI applications (hosts) and external tools/servers.",
      "It eliminates the need for vector databases.",
      "It increases GPU VRAM size."
    ],
    correctIndex: 1,
    explanation: "Lesson 07 Slide 91 & 92 explains that MCP establishes a standard protocol so M clients connecting to N tools require only M+N integrations instead of M x N bespoke code.",
    slideRef: "Lesson 07 Slide 91-92"
  },
  {
    id: 23,
    moduleId: "mod07",
    type: "concept",
    question: "Which of the following distinguishes Human-IN-the-loop (HITL) from Human-ON-the-loop (HOTL)?",
    options: [
      "HITL suspends execution and blocks until approved; HOTL executes immediately while streaming to an audit feed where humans can abort.",
      "HITL is only for images; HOTL is for databases.",
      "HOTL is always slower than HITL.",
      "HITL never requires human review."
    ],
    correctIndex: 0,
    explanation: "Lesson 07 Slide 118: In-the-loop halts execution until approved (highest safety); On-the-loop executes immediately with real-time human oversight and rollback.",
    slideRef: "Lesson 07 Slide 118"
  },
  {
    id: 24,
    moduleId: "mod07",
    type: "code",
    question: "In FastMCP, which decorator is used to expose an executable action that an AI model can invoke with arguments?",
    codeSnippet: `@mcp.???()
def check_inventory(sku: str) -> dict:
    """Check stock for SKU."""
    return {"sku": sku, "in_stock": True}`,
    options: [
      "@mcp.resource()",
      "@mcp.tool()",
      "@mcp.prompt()",
      "@mcp.agent()"
    ],
    correctIndex: 1,
    explanation: "Lesson 07 Slide 101: @mcp.tool() exposes callable functions with model-constructed arguments; @mcp.resource() exposes readable data attachments.",
    slideRef: "Lesson 07 Slide 101"
  },
  {
    id: 25,
    moduleId: "mod07",
    type: "concept",
    question: "In the ReAct agent design pattern, what does ReAct stand for?",
    options: [
      "Reactive Action",
      "Reason + Act (Thought -> Action -> Observation loop)",
      "Recursive Activation",
      "Real-time Authentication"
    ],
    correctIndex: 1,
    explanation: "Lesson 07 Slide 57 & 58: ReAct stands for Reason + Act, alternating between model thoughts, tool actions, and observation checks.",
    slideRef: "Lesson 07 Slide 57"
  },
  {
    id: 26,
    moduleId: "mod02",
    type: "concept",
    question: "Which Ollama command displays models that are actively loaded into GPU/system memory right now?",
    options: [
      "ollama list",
      "ollama ps",
      "ollama show --active",
      "ollama memory"
    ],
    correctIndex: 1,
    explanation: "Lesson 02 Slide 11: 'ollama ps' shows models currently loaded in memory, processor allocation (100% GPU / CPU), and expiry timer, whereas 'ollama list' shows downloaded models stored on disk.",
    slideRef: "Lesson 02 Slide 11"
  },
  {
    id: 27,
    moduleId: "mod02",
    type: "code",
    question: "In an Ollama Modelfile, which directive configures the context window token budget?",
    codeSnippet: `FROM llama3.2:1b
PARAMETER num_ctx 8192
SYSTEM """You are a patient CS tutor."""`,
    options: [
      "PARAMETER max_tokens 8192",
      "PARAMETER num_ctx 8192",
      "SET context_length 8192",
      "CONTEXT_WINDOW 8192"
    ],
    correctIndex: 1,
    explanation: "Lesson 02 Slide 14 & Lesson 03 Slide 24, 27: Ollama's native parameter for context window size is 'num_ctx' (whereas in vLLM CLI it is '--max-model-len' and in generation requests it is 'max_tokens').",
    slideRef: "Lesson 02 Slide 14"
  },
  {
    id: 28,
    moduleId: "mod06",
    type: "concept",
    question: "When launching the Neo4j container with 'docker run -d -p 7474:7474 -p 7687:7687 ...', what is port 7687 specifically used for?",
    options: [
      "The Neo4j Web Browser visual graph explorer UI",
      "The Bolt binary protocol used by Python drivers and LangChain GraphCypherQAChain",
      "The Prometheus metrics scraping daemon",
      "SSH shell container administration"
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 30: Port 7474 is the HTTP Web Browser UI; port 7687 is the Bolt binary protocol used by LangChain, Neo4j Python driver, and Cypher query execution.",
    slideRef: "Lesson 06 Slide 30"
  },
  {
    id: 29,
    moduleId: "mod02",
    type: "concept",
    question: "Why is the '--ipc=host' flag essential when running high-performance vLLM inference containers in Docker?",
    codeSnippet: `docker run -d --rm --gpus '"device=0"' \\
  -p 9040:9040 \\
  --ipc=host \\
  vllm/vllm-openai:latest ...`,
    options: [
      "It allows the container to bypass host firewall rules.",
      "It shares host IPC memory so PyTorch multi-process workers can exchange tensor buffers without hitting Docker's small default shared memory limit.",
      "It enables Docker to forward audio and video devices.",
      "It automatically downloads CUDA drivers into the container."
    ],
    correctIndex: 1,
    explanation: "Lesson 02 Slide 38: PyTorch and CUDA multi-worker processes need large shared memory for tensor exchange. Docker's default 64MB IPC memory will cause crashes without '--ipc=host'.",
    slideRef: "Lesson 02 Slide 38"
  },
  {
    id: 30,
    moduleId: "mod06",
    type: "concept",
    question: "In Microsoft GraphRAG, which query command and method should be executed to synthesize overarching themes across the entire knowledge repository?",
    options: [
      "graphrag query --root ./rag-graph --method local --query \"...\"",
      "graphrag query --root ./rag-graph --method global --query \"...\"",
      "graphrag search --all --query \"...\"",
      "graphrag extract --summary --query \"...\""
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 30: Microsoft GraphRAG '--method global' performs map-reduce over pre-computed hierarchical Leiden community summaries for corpus-level themes, while '--method local' traverses specific entity subgraphs.",
    slideRef: "Lesson 06 Slide 30"
  },
  {
    id: 31,
    moduleId: "mod01",
    type: "code",
    question: "Which command provides end-to-end smoke test validation that the Docker daemon can successfully expose NVIDIA GPUs to containers?",
    options: [
      "docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi",
      "docker system info --gpu",
      "docker run --device /dev/nvidia0 ubuntu bash",
      "nvidia-container-cli status"
    ],
    correctIndex: 0,
    explanation: "Lesson 01 Slide 39: Running 'nvidia-smi' inside an official NVIDIA CUDA base container with '--gpus all' is the standard end-to-end verification of GPU container passthrough.",
    slideRef: "Lesson 01 Slide 39"
  },
  {
    id: 32,
    moduleId: "mod01",
    type: "concept",
    question: "In the nvidia-smi output breakdown, what do Performance States (Perf) P0 and P8 represent?",
    options: [
      "P0 means GPU is powered off; P8 means GPU is running at 100% capacity.",
      "P0 is the highest performance state under heavy workload; P8 is the lowest power idle state.",
      "P0 is PCIe Gen 0; P8 is PCIe Gen 8.",
      "P0 indicates overheating; P8 indicates normal operating temperature."
    ],
    correctIndex: 1,
    explanation: "Lesson 01 Slide 33: Performance states range from P0 (highest performance under compute workload) to P8 (lowest power state during idle).",
    slideRef: "Lesson 01 Slide 33"
  },
  {
    id: 33,
    moduleId: "mod03",
    type: "concept",
    question: "Why should developers configure 'OLLAMA_HOST=127.0.0.1:11434 ollama serve' instead of binding to 0.0.0.0 in an office network?",
    options: [
      "Ollama fails to boot if bound to any address other than localhost.",
      "Local model servers default to unauthenticated HTTP; binding to 0.0.0.0 allows any network device to send prompts and exhaust local GPU compute.",
      "Binding to 127.0.0.1 enables GPU memory compression.",
      "Ollama only supports encrypted HTTPS when bound to 127.0.0.1."
    ],
    correctIndex: 1,
    explanation: "Lesson 03 Slide 63-64: Local model servers commonly have no authentication by default. Binding to 0.0.0.0 exposes the server to anyone on the network. A reverse proxy (Nginx) is required if remote access is needed.",
    slideRef: "Lesson 03 Slide 63-64"
  },
  {
    id: 34,
    moduleId: "mod06",
    type: "code",
    question: "In Neo4j Cypher, what happens if you execute this script multiple times?",
    codeSnippet: `CREATE (a:Entity {name: "Sokha"})-[r:WORKS_ON]->(b:Entity {name: "Invoicing Service"})
RETURN a, r, b;`,
    options: [
      "It updates the existing Sokha node without creating duplicates.",
      "It creates duplicate nodes and relationships on every run. To ensure idempotency, MERGE should be used instead of CREATE.",
      "It throws a uniqueness constraint violation error.",
      "It overwrites the graph and deletes all prior data."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 29: CREATE is not idempotent; re-running your loader with CREATE gives you the same graph twice. Always use MERGE to find or create nodes and relationships safely.",
    slideRef: "Lesson 06 Slide 29"
  },
  {
    id: 35,
    moduleId: "mod06",
    type: "code",
    question: "Why does the query 'MATCH (n:Entity {name: \"Sokha\"}) DELETE n;' fail if Sokha is connected to 'Invoicing Service'?",
    codeSnippet: `MATCH (n:Entity {name: "Sokha"})
DELETE n;`,
    options: [
      "Cypher syntax does not allow filtering by property in MATCH.",
      "A node cannot be deleted while relationships are still attached to it; you must use 'DETACH DELETE n' to cascade and remove connected edges.",
      "You must drop the database index before deleting any node.",
      "Nodes named Sokha are reserved by the schema."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 29: Neo4j prevents deleting nodes that have active incoming or outgoing relationships to protect referential integrity. DETACH DELETE removes all connected relationships first.",
    slideRef: "Lesson 06 Slide 29"
  },
  {
    id: 36,
    moduleId: "mod06",
    type: "code",
    question: "Which Cypher query correctly performs a multi-hop graph traversal to discover who owns a service that replaced 'LegacyPay'?",
    codeSnippet: `// Multi-hop relationship traversal`,
    options: [
      "MATCH (p:Person)-[:OWNS]->(s:Service)-[:REPLACED]->(old:Service {name: \"LegacyPay\"}) RETURN p.name, s.name",
      "SELECT Person.name, Service.name WHERE Service.replaced == 'LegacyPay'",
      "SEARCH GRAPH FOR Person WITH Service == LegacyPay",
      "MATCH (p:Person)->(s:Service)->(old:Service) WHERE old = LegacyPay"
    ],
    correctIndex: 0,
    explanation: "Lesson 06 Slide 29: Cypher queries are drawings of the pattern you want to match: (p:Person)-[:OWNS]->(s:Service)-[:REPLACED]->(old:Service {name: 'LegacyPay'}) matches the two-hop path in one line.",
    slideRef: "Lesson 06 Slide 29"
  },
  {
    id: 37,
    moduleId: "mod06",
    type: "concept",
    question: "Why is variable-length path traversal written with bounds like '[*1..3]' instead of an unbounded '[*]'?",
    codeSnippet: `MATCH path = (a:Entity {name: "LegacyPay"})-[*1..3]-(b)
RETURN path
LIMIT 25;`,
    options: [
      "Cypher throws a compilation error if asterisks are used alone.",
      "An unbounded '[*]' on a cyclic or dense graph can lead to exponential path explosion, exhausting memory and hanging the server.",
      "`[*1..3]` disables GPU acceleration.",
      "`[*1..3]` limits the query strictly to 3 characters of text."
    ],
    correctIndex: 1,
    explanation: "Lesson 06 Slide 29 explicitly warns: 'Bound your traversals. An unbounded [*] on a real graph will hang. Cap the hops, always.'",
    slideRef: "Lesson 06 Slide 29"
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
