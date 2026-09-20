"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { ModuleReview } from "../components/ModuleReview";
import { CodeLab } from "../components/CodeLab";
import { ExamSimulator } from "../components/ExamSimulator";
import { FlashcardDeck } from "../components/FlashcardDeck";
import { VisualDiagrams } from "../components/VisualDiagrams";
import { CommandsLab } from "../components/CommandsLab";
import { AIChatbot } from "../components/AIChatbot";
import { GraduationCap, ArrowRight, BookOpen, Code, Trophy, Sparkles, Terminal, Bot } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("review");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("all");
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0
  });

  const handleJumpToCode = (modId: string) => {
    setSelectedModule(modId);
    setActiveTab("code");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJumpToQuiz = (modId: string) => {
    setSelectedModule(modId);
    setActiveTab("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        quizScore={quizScore}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Quick Actions if on review tab */}
        {activeTab === "review" && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border border-blue-900/60 p-6 sm:p-8 shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Teacher Highlighted Exam Preparation</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Mastering Local LLM & AI Workflows
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Comprehensive interactive study portal based on course slide decks:
                <strong> 04 (Workflow Engineering)</strong>, <strong>05 (RAG Fundamentals)</strong>, 
                <strong> 06 (Advanced RAG & Eval)</strong>, and <strong>07 (Autonomous Agents)</strong>,
                plus complete <strong>Ollama, Docker, Neo4j Cypher & GraphRAG</strong> coverage.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("chatbot")}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition flex items-center space-x-2 shadow-lg shadow-purple-600/30"
                >
                  <Bot className="w-4 h-4 text-purple-200" />
                  <span>Ask AI Tutor (Qwen 35B)</span>
                </button>
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center space-x-2 shadow-lg shadow-blue-600/30"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Start Practice Exam (37 Questions)</span>
                </button>
                <button
                  onClick={() => setActiveTab("commands")}
                  className="px-4 py-2 rounded-xl bg-cyan-900/40 hover:bg-cyan-900/60 border border-cyan-700/50 text-cyan-300 font-semibold text-xs transition flex items-center space-x-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Review CLI, Docker & Neo4j</span>
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs transition flex items-center space-x-2"
                >
                  <Code className="w-4 h-4" />
                  <span>Explore Code Review Lab</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Tab Contents */}
        {activeTab === "review" && (
          <ModuleReview
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
            onJumpToCode={handleJumpToCode}
            onJumpToQuiz={handleJumpToQuiz}
          />
        )}

        {activeTab === "code" && (
          <CodeLab selectedModule={selectedModule} />
        )}

        {activeTab === "commands" && (
          <CommandsLab />
        )}

        {activeTab === "chatbot" && (
          <AIChatbot />
        )}

        {activeTab === "quiz" && (
          <ExamSimulator
            selectedModule={selectedModule}
            onUpdateScore={setQuizScore}
          />
        )}

        {activeTab === "flashcards" && (
          <FlashcardDeck />
        )}

        {activeTab === "diagrams" && (
          <VisualDiagrams />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            ITE / AX Specialize Program — Mastering Local LLM
          </p>
          <p>Korea Software HRD Center (KSGA / KSHRD) &bull; Prepared for Monthly Exam Review</p>
        </div>
      </footer>
    </div>
  );
}
