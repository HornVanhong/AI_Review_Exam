"use client";

import React from "react";
import { Activity, Layers, ArrowRight, ShieldCheck, Database, Cpu } from "lucide-react";

export const VisualDiagrams: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Activity className="w-4 h-4" />
          <span>System Architectures</span>
        </div>
        <h2 className="text-xl font-bold text-white">Visual System Diagrams</h2>
        <p className="text-xs text-slate-400 mt-1">
          Visual architectures directly based on your course slides. Review these diagrams for structural exam questions!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagram 1: The Two Pipelines of RAG */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>The Two Pipelines of RAG (Lesson 05 Slide 6)</span>
          </h3>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs font-mono space-y-4">
            <div>
              <span className="text-emerald-400 font-bold block mb-1">1. OFFLINE SETUP PIPELINE (Runs Once):</span>
              <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
                <span className="px-2 py-1 bg-slate-800 rounded">Ingest Raw Files</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-1 bg-slate-800 rounded">Chunk Text</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-1 bg-slate-800 rounded">Embed Vectors</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-1 bg-emerald-900/60 text-emerald-300 border border-emerald-600 rounded">Vector DB</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-blue-400 font-bold block mb-1">2. ONLINE QUERY PIPELINE (Runs on Every Question):</span>
              <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
                <span className="px-2 py-1 bg-slate-800 rounded">User Query</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-1 bg-blue-900/60 text-blue-300 rounded">Embed Query</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-1 bg-slate-800 rounded">Retrieve Top-K</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-1 bg-slate-800 rounded">Augment Prompt</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="px-2 py-1 bg-purple-900/60 text-purple-300 rounded">Generate Answer</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            <strong>Key Distinction:</strong> Documents are embedded once offline. Only the incoming user query is embedded live.
          </p>
        </div>

        {/* Diagram 2: Bi-Encoder vs Cross-Encoder */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Bi-Encoder vs Cross-Encoder Architecture (Lesson 06 Slide 46)</span>
          </h3>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs font-mono space-y-4">
            <div className="space-y-1">
              <span className="text-purple-400 font-bold block">BI-ENCODER (Two Towers, Fast Cosine Match):</span>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1 text-slate-300">
                <p>Query  &rarr; [Transformer] &rarr; Vector Q ┐</p>
                <p className="text-blue-400 pl-36">&perp; Cosine Similarity Score</p>
                <p>Doc    &rarr; [Transformer] &rarr; Vector D ┘</p>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">No token-level interaction. Scans millions in milliseconds.</p>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <span className="text-indigo-400 font-bold block">CROSS-ENCODER (Single Tower, Full Cross-Attention):</span>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                <p>[CLS] Query [SEP] Document &rarr; [Transformer] &rarr; Relevance Logit</p>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">Every query token attends to every doc token. High accuracy reranker.</p>
            </div>
          </div>
        </div>

        {/* Diagram 3: Tool Calling Lifecycle */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Agent Tool Calling Lifecycle (Lesson 07 Slide 17)</span>
          </h3>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs font-mono space-y-3">
            <div className="p-2.5 rounded bg-blue-950/40 border border-blue-900/60">
              <span className="text-blue-300 font-bold block mb-1">[INSIDE THE MODEL]</span>
              <p>1. User request is read into context</p>
              <p>2. Model decides an external tool is required</p>
              <p>3. Model emits structured JSON tool call</p>
            </div>

            <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/60">
              <span className="text-rose-300 font-bold block mb-1">[INSIDE THE APPLICATION HOST]</span>
              <p>4. Application intercepts and validates call</p>
              <p>5. Application executes external code/DB</p>
              <p>6. Result returned to model for next decision</p>
            </div>
          </div>
          <p className="text-xs text-rose-400 font-semibold">
            "The model requests the action; the application executes it."
          </p>
        </div>

        {/* Diagram 4: The Harness as an OS Kernel */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>The Harness OS-Kernel Analogy (Lesson 07 Slide 82)</span>
          </h3>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs font-mono space-y-2 text-slate-300">
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-amber-400 font-bold">Untrusted CPU</span>
              <span>&larr;&rarr;</span>
              <span>LLM generates next token</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-amber-400 font-bold">Syscall Boundary</span>
              <span>&larr;&rarr;</span>
              <span>Tool invocation through checked gate</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-amber-400 font-bold">Virtual Memory</span>
              <span>&larr;&rarr;</span>
              <span>Context compaction & history pruning</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-amber-400 font-bold">Scheduler Quantum</span>
              <span>&larr;&rarr;</span>
              <span>MAX_ITERATIONS & timeouts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
