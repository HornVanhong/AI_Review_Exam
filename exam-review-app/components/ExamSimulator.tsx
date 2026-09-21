"use client";

import React, { useState } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "../data/courseData";
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Trophy, 
  PenTool, 
  Sparkles,
  BookOpen,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Layers,
  Filter,
  Check
} from "lucide-react";

interface ExamSimulatorProps {
  selectedModule: string;
  onUpdateScore: (score: { correct: number; total: number }) => void;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  selectedModule,
  onUpdateScore
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [fillInInputs, setFillInInputs] = useState<Record<number, string>>({});
  const [submittedFillIns, setSubmittedFillIns] = useState<Record<number, string>>({});
  const [revealedOpenAnswers, setRevealedOpenAnswers] = useState<Record<number, boolean>>({});
  const [openStudentNotes, setOpenStudentNotes] = useState<Record<number, string>>({});
  const [masteredOpenQuestions, setMasteredOpenQuestions] = useState<Record<number, boolean>>({});
  
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPart, setFilterPart] = useState<string>("all");

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedModule !== "all" && q.moduleId !== selectedModule) return false;
    if (filterPart !== "all" && q.partId !== filterPart) return false;
    if (filterType !== "all" && q.type !== filterType) return false;
    return true;
  });

  const calculateScore = (
    updatedSelected = selectedAnswers,
    updatedFillIns = submittedFillIns
  ) => {
    let correct = 0;
    let total = 0;

    // Multiple Choice & True/False
    Object.entries(updatedSelected).forEach(([qid, ansIdx]) => {
      total++;
      const q = QUIZ_QUESTIONS.find((item) => item.id === parseInt(qid));
      if (q && q.correctIndex === ansIdx) correct++;
    });

    // Fill in the blank
    Object.entries(updatedFillIns).forEach(([qid, userText]) => {
      total++;
      const q = QUIZ_QUESTIONS.find((item) => item.id === parseInt(qid));
      if (q && q.acceptedAnswers) {
        const cleaned = userText.trim().toLowerCase();
        const isMatch = q.acceptedAnswers.some(
          (ans) => ans.trim().toLowerCase() === cleaned
        );
        if (isMatch) correct++;
      }
    });

    return { correct, total };
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    const updated = { ...selectedAnswers, [questionId]: optionIdx };
    setSelectedAnswers(updated);
    const score = calculateScore(updated, submittedFillIns);
    onUpdateScore(score);
  };

  const handleSubmitFillIn = (questionId: number) => {
    const raw = (fillInInputs[questionId] || "").trim();
    if (!raw) return;
    const updated = { ...submittedFillIns, [questionId]: raw };
    setSubmittedFillIns(updated);
    const score = calculateScore(selectedAnswers, updated);
    onUpdateScore(score);
  };

  const handleToggleReveal = (questionId: number) => {
    setRevealedOpenAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleToggleMastered = (questionId: number) => {
    setMasteredOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setFillInInputs({});
    setSubmittedFillIns({});
    setRevealedOpenAnswers({});
    setOpenStudentNotes({});
    setMasteredOpenQuestions({});
    onUpdateScore({ correct: 0, total: 0 });
  };

  const scoreStats = calculateScore();
  const percentage = scoreStats.total > 0 ? Math.round((scoreStats.correct / scoreStats.total) * 100) : 0;

  const qcmCount = QUIZ_QUESTIONS.filter(q => q.type === "qcm").length;
  const tfCount = QUIZ_QUESTIONS.filter(q => q.type === "true-false").length;
  const fillInCount = QUIZ_QUESTIONS.filter(q => q.type === "fill-in-blank").length;
  const openCount = QUIZ_QUESTIONS.filter(q => q.type === "open-question").length;
  const masteredCount = Object.values(masteredOpenQuestions).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Exam Header Card */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Comprehensive Exam Simulator ({QUIZ_QUESTIONS.length} Questions)</span>
          </div>
          <h2 className="text-xl font-bold text-white">Full Course Monthly Exam Practice</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Covers all 24 subtopics across Workflow Engineering, RAG Fundamentals, Advanced RAG & Evaluation, and Autonomous Agents across 4 formats: QCM, True/False, Fill-in-the-Blank, and Open Questions.
          </p>
        </div>

        {/* Score & Mastery Display */}
        <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Auto Score</span>
            <p className="text-lg font-bold text-blue-400">{scoreStats.correct} / {scoreStats.total}</p>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</span>
            <p className={`text-lg font-bold ${percentage >= 70 ? "text-emerald-400" : "text-amber-400"}`}>
              {percentage}%
            </p>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="text-center px-2">
            <span className="text-[10px] text-purple-400 uppercase font-semibold">Mastered</span>
            <p className="text-lg font-bold text-purple-400">{masteredCount} / {openCount}</p>
          </div>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title="Reset All Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bars */}
      <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
        {/* Part Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center space-x-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Syllabus Part:</span>
          </span>
          <button
            onClick={() => setFilterPart("all")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
            }`}
          >
            All Parts (96)
          </button>
          <button
            onClick={() => setFilterPart("part1")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "part1"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-800/80 text-indigo-300 hover:text-white border border-indigo-500/30"
            }`}
          >
            Part 1: Workflow (24)
          </button>
          <button
            onClick={() => setFilterPart("part2")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "part2"
                ? "bg-cyan-600 text-white shadow-sm"
                : "bg-slate-800/80 text-cyan-300 hover:text-white border border-cyan-500/30"
            }`}
          >
            Part 2: RAG Basics (16)
          </button>
          <button
            onClick={() => setFilterPart("part3")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "part3"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-800/80 text-emerald-300 hover:text-white border border-emerald-500/30"
            }`}
          >
            Part 3: Adv RAG (20)
          </button>
          <button
            onClick={() => setFilterPart("part4")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "part4"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-800/80 text-purple-300 hover:text-white border border-purple-500/30"
            }`}
          >
            Part 4: Agents (36)
          </button>
        </div>

        {/* Format Type Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-slate-800/60">
          <span className="text-slate-400 font-semibold mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>Format:</span>
          </span>
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
            }`}
          >
            ALL FORMATS ({filteredQuestions.length})
          </button>
          <button
            onClick={() => setFilterType("qcm")}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === "qcm"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-800/80 text-blue-300 hover:text-blue-200 border border-blue-500/30"
            }`}
          >
            QCM (A/B/C/D) ({qcmCount})
          </button>
          <button
            onClick={() => setFilterType("true-false")}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === "true-false"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-800/80 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30"
            }`}
          >
            TRUE / FALSE ({tfCount})
          </button>
          <button
            onClick={() => setFilterType("fill-in-blank")}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center space-x-1.5 ${
              filterType === "fill-in-blank"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-slate-800/80 text-amber-300 hover:text-amber-200 border border-amber-500/30"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>FILL IN BLANK ({fillInCount})</span>
          </button>
          <button
            onClick={() => setFilterType("open-question")}
            className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center space-x-1.5 ${
              filterType === "open-question"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-800/80 text-purple-300 hover:text-purple-200 border border-purple-500/30"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>OPEN QUESTIONS ({openCount})</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIndex) => {
          const isFillIn = q.type === "fill-in-blank";
          const isOpen = q.type === "open-question";
          const isTrueFalse = q.type === "true-false";
          const isQCM = q.type === "qcm";

          const isAnswered = isFillIn
            ? submittedFillIns[q.id] !== undefined
            : !isOpen && selectedAnswers[q.id] !== undefined;

          let isCorrect = false;
          if (isAnswered) {
            if (isFillIn) {
              const userVal = (submittedFillIns[q.id] || "").trim().toLowerCase();
              isCorrect = Boolean(
                q.acceptedAnswers?.some((ans) => ans.trim().toLowerCase() === userVal)
              );
            } else {
              isCorrect = selectedAnswers[q.id] === q.correctIndex;
            }
          }

          const userChoice = selectedAnswers[q.id];
          const isRevealed = revealedOpenAnswers[q.id] || false;
          const isMastered = masteredOpenQuestions[q.id] || false;

          return (
            <div
              key={q.id}
              className={`bg-slate-900 rounded-2xl border p-6 shadow-sm transition space-y-4 ${
                isOpen
                  ? isMastered
                    ? "border-purple-600/80 bg-slate-900/95 ring-1 ring-purple-500/20"
                    : "border-slate-800 bg-slate-900"
                  : isAnswered
                    ? isCorrect
                      ? "border-emerald-800/80 bg-slate-900/90"
                      : "border-rose-800/80 bg-slate-900/90"
                    : "border-slate-800"
              }`}
            >
              {/* Question Top Info */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center">
                    {qIndex + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700">
                    {q.subtopic}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    isQCM ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
                    isTrueFalse ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" :
                    isFillIn ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                    "bg-purple-500/20 text-purple-300 border-purple-500/30"
                  }`}>
                    {isQCM ? "Multiple Choice" :
                     isTrueFalse ? "True / False" :
                     isFillIn ? "Fill in the Blank" :
                     "Open Question & Rubric"}
                  </span>
                </div>

                {/* Status Badges */}
                {!isOpen && isAnswered && (
                  <span
                    className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isCorrect ? "Correct" : "Incorrect"}</span>
                  </span>
                )}

                {isOpen && (
                  <button
                    onClick={() => handleToggleMastered(q.id)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                      isMastered
                        ? "bg-purple-600 text-white border-purple-500 shadow-sm"
                        : "bg-slate-800 text-slate-400 hover:text-white border-slate-700"
                    }`}
                  >
                    {isMastered ? <CheckSquare className="w-3.5 h-3.5 text-white" /> : <Square className="w-3.5 h-3.5" />}
                    <span>{isMastered ? "Mastered" : "Mark as Mastered"}</span>
                  </button>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">{q.question}</h3>

              {/* Code Snippet if present */}
              {q.codeSnippet && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono text-emerald-400">
                  <pre><code>{q.codeSnippet}</code></pre>
                </div>
              )}

              {/* 1. FILL IN THE BLANK INTERACTION */}
              {isFillIn && (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={fillInInputs[q.id] || ""}
                      onChange={(e) =>
                        setFillInInputs({ ...fillInInputs, [q.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isAnswered) {
                          handleSubmitFillIn(q.id);
                        }
                      }}
                      disabled={isAnswered}
                      placeholder={q.placeholder || "Type your answer here..."}
                      className={`flex-1 bg-slate-950 border rounded-xl px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none transition ${
                        isAnswered
                          ? isCorrect
                            ? "border-emerald-500 text-emerald-300 bg-emerald-950/20"
                            : "border-rose-500 text-rose-300 bg-rose-950/20"
                          : "border-slate-700 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      }`}
                    />
                    <button
                      onClick={() => handleSubmitFillIn(q.id)}
                      disabled={isAnswered || !fillInInputs[q.id]?.trim()}
                      className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-xs transition flex items-center justify-center space-x-2 shrink-0"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Submit Answer</span>
                    </button>
                  </div>

                  {isAnswered && (
                    <div
                      className={`p-3 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 ${
                        isCorrect
                          ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                          : "bg-rose-950/40 border-rose-500/50 text-rose-300"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                        <span>
                          {isCorrect ? "Great job! Your answer matches accepted terms." : "Your answer was incorrect."}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700/60 text-slate-200">
                        <span className="text-slate-400 mr-1">Accepted:</span>
                        <strong className="text-amber-300">{q.acceptedAnswers?.join(" | ")}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. MULTIPLE CHOICE (QCM) INTERACTION */}
              {isQCM && (
                <div className="space-y-2 pt-1">
                  {q.options?.map((opt, optIdx) => {
                    let optStyle =
                      "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-800/50";
                    if (isAnswered) {
                      if (optIdx === q.correctIndex) {
                        optStyle =
                          "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/50";
                      } else if (optIdx === userChoice) {
                        optStyle = "bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50";
                      } else {
                        optStyle = "opacity-40 border-slate-800/60 text-slate-500";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start space-x-3 ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 3. TRUE / FALSE INTERACTION */}
              {isTrueFalse && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {["True", "False"].map((tfLabel, optIdx) => {
                    const isOptionSelected = userChoice === optIdx;
                    let tfStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-emerald-500 hover:bg-slate-800/50";

                    if (isAnswered) {
                      if (optIdx === q.correctIndex) {
                        tfStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/40";
                      } else if (isOptionSelected) {
                        tfStyle = "bg-rose-950/50 border-rose-500 text-rose-200 ring-2 ring-rose-500/40";
                      } else {
                        tfStyle = "opacity-40 border-slate-800/60 text-slate-500";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`py-3 px-4 rounded-xl border text-center font-semibold text-xs sm:text-sm transition flex items-center justify-center space-x-2 ${tfStyle}`}
                      >
                        <span>{tfLabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 4. OPEN QUESTION & RUBRIC INTERACTION */}
              {isOpen && (
                <div className="space-y-4 pt-1">
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1.5">
                      Your Analysis / Answer Draft (Practice your explanation):
                    </label>
                    <textarea
                      rows={3}
                      value={openStudentNotes[q.id] || ""}
                      onChange={(e) => setOpenStudentNotes({ ...openStudentNotes, [q.id]: e.target.value })}
                      placeholder="Write your explanation, bullet points, or solution here before checking the model answer..."
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleToggleReveal(q.id)}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-semibold transition"
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{isRevealed ? "Hide Model Answer & Rubric" : "Reveal Model Answer & Rubric"}</span>
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">{q.slideRef}</span>
                  </div>

                  {/* Revealed Model Answer & Key Points */}
                  {isRevealed && (
                    <div className="space-y-4 p-5 rounded-xl bg-slate-950/90 border border-purple-500/30 animate-fadeIn text-xs sm:text-sm">
                      <div>
                        <div className="flex items-center space-x-2 text-purple-400 font-bold mb-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Standard Model Answer (Exam Level):</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                          {q.modelAnswer}
                        </p>
                      </div>

                      {q.keyPoints && q.keyPoints.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 text-amber-400 font-bold mb-2">
                            <CheckSquare className="w-4 h-4" />
                            <span>Grading Rubric & Essential Points Checklist:</span>
                          </div>
                          <ul className="space-y-1.5 pl-2">
                            {q.keyPoints.map((point, ptIdx) => (
                              <li key={ptIdx} className="flex items-start space-x-2 text-slate-300 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Did your answer cover the key grading points?</span>
                        <button
                          onClick={() => handleToggleMastered(q.id)}
                          className={`px-3 py-1 rounded-lg font-semibold transition flex items-center space-x-1.5 ${
                            isMastered
                              ? "bg-purple-600 text-white"
                              : "bg-slate-800 text-purple-300 hover:bg-slate-700"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isMastered ? "Mastered!" : "Mark Understood"}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Feedback and Explanation for Auto-Graded (QCM, T/F, Fill) */}
              {!isOpen && isAnswered && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-blue-400 font-bold">
                    <span className="flex items-center space-x-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>Lecture Explanation</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{q.slideRef}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
