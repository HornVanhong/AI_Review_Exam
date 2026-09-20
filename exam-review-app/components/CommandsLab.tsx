"use client";

import React, { useState } from "react";
import { COMMANDS_DATA, CLICommand } from "../data/courseData";
import {
  Terminal,
  Copy,
  Check,
  Search,
  AlertTriangle,
  BookOpen,
  LayoutGrid,
  Table as TableIcon,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export const CommandsLab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedOutputs, setExpandedOutputs] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const categories = [
    { id: "all", label: "All Commands", count: COMMANDS_DATA.length },
    { id: "cypher", label: "Neo4j & Cypher Scripts", count: COMMANDS_DATA.filter((c) => c.category === "cypher").length },
    { id: "ollama", label: "Ollama & Modelfile", count: COMMANDS_DATA.filter((c) => c.category === "ollama").length },
    { id: "docker", label: "Docker & Containers", count: COMMANDS_DATA.filter((c) => c.category === "docker").length },
    { id: "graphrag", label: "Microsoft GraphRAG", count: COMMANDS_DATA.filter((c) => c.category === "graphrag").length },
    { id: "vllm", label: "vLLM Inference", count: COMMANDS_DATA.filter((c) => c.category === "vllm").length },
    { id: "validation", label: "GPU & System", count: COMMANDS_DATA.filter((c) => c.category === "validation").length },
    { id: "curl", label: "cURL & REST APIs", count: COMMANDS_DATA.filter((c) => c.category === "curl").length },
    { id: "pip", label: "Pip Packages", count: COMMANDS_DATA.filter((c) => c.category === "pip").length },
  ];

  const filteredCommands = COMMANDS_DATA.filter((cmd) => {
    if (activeCategory !== "all" && cmd.category !== activeCategory) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchCommand = cmd.command.toLowerCase().includes(q);
      const matchDesc = cmd.description.toLowerCase().includes(q);
      const matchWarning = cmd.examWarning.toLowerCase().includes(q);
      const matchFlags = cmd.flags?.some(
        (f) => f.flag.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
      );
      if (!matchTitle && !matchCommand && !matchDesc && !matchWarning && !matchFlags) {
        return false;
      }
    }
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleOutput = (id: string) => {
    setExpandedOutputs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Terminal className="w-4 h-4" />
              <span>Exam CLI & Terminal Lab</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Ollama, Docker, GraphRAG & Serving Commands
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              Complete command cheat sheet with flags, real terminal outputs, port mappings, and exact exam trap explanations based on course presentation slides.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === "cards"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards View</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Cheat Sheet Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search command, port, flag, or trap..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cards View */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCommands.map((cmd) => {
            const isCopied = copiedId === cmd.id;
            const isOutputOpen = expandedOutputs[cmd.id] ?? false;

            return (
              <div
                key={cmd.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700 transition shadow-lg flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                          {cmd.categoryLabel}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                          <BookOpen className="w-3 h-3 text-slate-500" />
                          <span>{cmd.slideRef}</span>
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        {cmd.title}
                      </h3>
                    </div>
                  </div>

                  {/* Command Box */}
                  <div className="relative group">
                    <pre className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 text-xs text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap selection:bg-emerald-900 selection:text-white">
                      {cmd.command}
                    </pre>
                    <button
                      onClick={() => handleCopy(cmd.id, cmd.command)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition flex items-center space-x-1 text-[11px]"
                      title="Copy command to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cmd.description}
                  </p>

                  {/* Flags Breakdown */}
                  {cmd.flags && cmd.flags.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Flags & Parameters
                      </div>
                      <div className="bg-slate-950/60 rounded-xl border border-slate-800/80 divide-y divide-slate-800/60 text-xs">
                        {cmd.flags.map((f, idx) => (
                          <div key={idx} className="p-2 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                            <span className="font-mono text-cyan-400 text-[11px] font-bold shrink-0">
                              {f.flag}
                            </span>
                            <span className="text-slate-300 text-[11px] leading-tight">
                              {f.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collapsible Example Output */}
                  {cmd.exampleOutput && (
                    <div className="pt-1">
                      <button
                        onClick={() => toggleOutput(cmd.id)}
                        className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition font-medium"
                      >
                        {isOutputOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
                        )}
                        <span>{isOutputOpen ? "Hide Terminal Output" : "View Terminal Output"}</span>
                      </button>
                      {isOutputOpen && (
                        <div className="mt-2 bg-black/70 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre">
                          {cmd.exampleOutput}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Exam Warning Footer */}
                <div className="bg-amber-950/20 border-t border-amber-900/30 p-3.5 flex items-start space-x-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200/90 leading-tight">
                    <strong>Exam Trap:</strong> {cmd.examWarning}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cheat Sheet Table View */}
      {viewMode === "table" && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Command / Directive</th>
                  <th className="py-3 px-4">Purpose & Key Flags</th>
                  <th className="py-3 px-4">Exam Alert</th>
                  <th className="py-3 px-4">Ref</th>
                  <th className="py-3 px-4 text-center">Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCommands.map((cmd) => {
                  const isCopied = copiedId === cmd.id;
                  return (
                    <tr key={cmd.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-semibold text-cyan-400 whitespace-nowrap align-top">
                        {cmd.categoryLabel}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 align-top max-w-xs break-words">
                        {cmd.command}
                      </td>
                      <td className="py-3.5 px-4 align-top max-w-sm space-y-1">
                        <div className="font-semibold text-white">{cmd.title}</div>
                        <div className="text-slate-400 text-[11px]">{cmd.description}</div>
                        {cmd.flags && (
                          <div className="text-[10px] text-slate-500 pt-0.5">
                            {cmd.flags.map((f) => `${f.flag}: ${f.description}`).join(" | ")}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-amber-300 text-[11px] align-top max-w-xs">
                        {cmd.examWarning}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-[11px] align-top">
                        {cmd.slideRef}
                      </td>
                      <td className="py-3.5 px-4 text-center align-top">
                        <button
                          onClick={() => handleCopy(cmd.id, cmd.command)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
                          title="Copy command"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
