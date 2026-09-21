"use client";

import React from "react";
import { GraduationCap, BookOpen, Code, CheckCircle, Zap, Activity, Terminal, Bot } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  quizScore: { correct: number; total: number };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  quizScore,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 text-white border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  Local AI & LLM Exam Portal
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  Monthly Review
                </span>
              </div>
              <p className="text-xs text-slate-400">KSGA — Korea Software HRD Center (KSHRD)</p>
            </div>
          </div>

          {/* Quick Score & Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs">
              <div className="flex items-center space-x-1.5 text-blue-400 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Practice Score:</span>
                <span className="text-white font-bold">{quizScore.correct} / {quizScore.total}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("chatbot")}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow-md ${
                activeTab === "chatbot"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-600/30 ring-2 ring-purple-400/50"
                  : "bg-purple-900/40 hover:bg-purple-900/70 text-purple-200 border border-purple-700/50"
              }`}
            >
              <Bot className="w-4 h-4 text-purple-300" />
              <span>Qwen 35B Tutor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition flex items-center space-x-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Start Exam Test</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-800/80 overflow-x-auto text-xs sm:text-sm py-2">
          <button
            onClick={() => setActiveTab("review")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === "review"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Theory & Highlights</span>
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === "code"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code Review Lab</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Exam Code
            </span>
          </button>

          <button
            onClick={() => setActiveTab("commands")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === "commands"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>CLI & Commands</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Ollama / Docker / Neo4j
            </span>
          </button>

          <button
            onClick={() => setActiveTab("chatbot")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === "chatbot"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Bot className="w-4 h-4 text-purple-400" />
            <span>AI Tutor (Qwen 35B)</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Local LLM
            </span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === "quiz"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Interactive Simulator</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              50 Qs
            </span>
          </button>

          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === "flashcards"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab("diagrams")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === "diagrams"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Visual Architectures</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
