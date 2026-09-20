"use client";

import React, { useState } from "react";
import { CODE_SNIPPETS, CodeSnippet } from "../data/courseData";
import { Code, AlertTriangle, Check, Copy, Terminal, Play, BookOpen } from "lucide-react";

interface CodeLabProps {
  selectedModule: string;
}

export const CodeLab: React.FC<CodeLabProps> = ({ selectedModule }) => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(CODE_SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);

  const activeSnippet = CODE_SNIPPETS.find((s) => s.id === selectedSnippetId) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSnippets = CODE_SNIPPETS.filter((s) => {
    if (selectedModule !== "all" && s.moduleId !== selectedModule) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 to-slate-900 p-5 rounded-2xl border border-blue-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4" />
            <span>Interactive Code Review</span>
          </div>
          <h2 className="text-xl font-bold text-white">Exam Code Walkthrough & Pitfalls</h2>
          <p className="text-xs text-slate-300 mt-1">
            Review the real code syntax used in your lectures. Pay special attention to the Exam Traps section!
          </p>
        </div>
      </div>

      {/* Snippet Selection Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {filteredSnippets.map((snippet) => (
          <button
            key={snippet.id}
            onClick={() => setSelectedSnippetId(snippet.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-2 ${
              selectedSnippetId === snippet.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{snippet.title.split(":")[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Snippet Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Code View */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Window bar */}
            <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="text-xs font-mono text-slate-400 ml-2">{activeSnippet.title}</span>
              </div>

              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Content */}
            <pre className="p-5 text-xs text-slate-200 font-mono overflow-x-auto leading-relaxed max-h-[500px]">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>

          <p className="text-xs text-slate-400 px-1">{activeSnippet.description}</p>
        </div>

        {/* Right 1 Col: Explanations & Exam Traps */}
        <div className="space-y-4">
          {/* Detailed Explanations */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Line-by-Line Breakdown</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeSnippet.explanation.map((exp, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-slate-800/40 p-2.5 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Traps Callout */}
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-amber-300 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Common Exam Traps!</span>
            </h3>
            <ul className="space-y-2 text-xs text-amber-200/90">
              {activeSnippet.examTraps.map((trap, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{trap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
