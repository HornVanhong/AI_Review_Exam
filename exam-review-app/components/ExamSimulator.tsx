"use client";

import React, { useState } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "../data/courseData";
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Trophy, PenTool, Sparkles } from "lucide-react";

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
  const [filterType, setFilterType] = useState<string>("all");

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedModule !== "all" && q.moduleId !== selectedModule) return false;
    if (filterType !== "all" && q.type !== filterType) return false;
    return true;
  });

  const calculateScore = (
    updatedSelected = selectedAnswers,
    updatedFillIns = submittedFillIns
  ) => {
    let correct = 0;
    let total = 0;

    // Multiple Choice
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

  const handleReset = () => {
    setSelectedAnswers({});
    setFillInInputs({});
    setSubmittedFillIns({});
    onUpdateScore({ correct: 0, total: 0 });
  };

  const scoreStats = calculateScore();
  const percentage = scoreStats.total > 0 ? Math.round((scoreStats.correct / scoreStats.total) * 100) : 0;

  const fillInCount = QUIZ_QUESTIONS.filter(q => q.type === "fill-in-blank").length;

  return (
    <div className="space-y-6">
      {/* Exam Header Card */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Interactive Exam Simulator ({QUIZ_QUESTIONS.length} Questions)</span>
          </div>
          <h2 className="text-xl font-bold text-white">Monthly Exam Practice Test</h2>
          <p className="text-xs text-slate-400 mt-1">
            Balanced multiple choice options (A, B, C, D) and interactive Fill-in-the-Blank exam questions with instant grading.
          </p>
        </div>

        {/* Score Display */}
        <div className="flex items-center space-x-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Score</span>
            <p className="text-lg font-bold text-blue-400">{scoreStats.correct} / {scoreStats.total}</p>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</span>
            <p className={`text-lg font-bold ${percentage >= 70 ? "text-emerald-400" : "text-amber-400"}`}>
              {percentage}%
            </p>
          </div>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold mr-1">Filter Type:</span>
        <button
          onClick={() => setFilterType("all")}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${
            filterType === "all"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
          }`}
        >
          ALL ({QUIZ_QUESTIONS.length})
        </button>
        <button
          onClick={() => setFilterType("fill-in-blank")}
          className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center space-x-1.5 ${
            filterType === "fill-in-blank"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-slate-800/80 text-purple-400 hover:text-purple-300 border border-purple-500/30"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>FILL-IN-THE-BLANK ({fillInCount})</span>
        </button>
        <button
          onClick={() => setFilterType("concept")}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${
            filterType === "concept"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
          }`}
        >
          CONCEPT
        </button>
        <button
          onClick={() => setFilterType("code")}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${
            filterType === "code"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60"
          }`}
        >
          CODE
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIndex) => {
          const isFillIn = q.type === "fill-in-blank";
          const isAnswered = isFillIn
            ? submittedFillIns[q.id] !== undefined
            : selectedAnswers[q.id] !== undefined;

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

          return (
            <div
              key={q.id}
              className={`bg-slate-900 rounded-2xl border p-6 shadow-sm transition space-y-4 ${
                isAnswered
                  ? isCorrect
                    ? "border-emerald-800/80 bg-slate-900/90"
                    : "border-rose-800/80 bg-slate-900/90"
                  : "border-slate-800"
              }`}
            >
              {/* Question Top Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-bold flex items-center justify-center">
                    {qIndex + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {q.moduleId.toUpperCase()} &bull; {q.type === "fill-in-blank" ? "Fill-in-the-Blank" : q.type}
                  </span>
                  {isFillIn && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/30">
                      Typed Input
                    </span>
                  )}
                </div>

                {isAnswered && (
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
              </div>

              {/* Question Text */}
              <h3 className="text-sm font-semibold text-white leading-relaxed">{q.question}</h3>

              {/* Code Snippet if present */}
              {q.codeSnippet && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono text-emerald-400">
                  <pre><code>{q.codeSnippet}</code></pre>
                </div>
              )}

              {/* Question Interaction: Fill-in-the-Blank vs Multiple Choice */}
              {isFillIn ? (
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
                      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-xs transition flex items-center justify-center space-x-2 shrink-0"
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
                          {isCorrect ? "Great job! Your answer matches." : "Your answer was incorrect."}
                        </span>
                      </div>
                      <div className="font-mono text-[11px] bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700/60 text-slate-200">
                        <span className="text-slate-400 mr-1">Accepted:</span>
                        <strong className="text-cyan-300">{q.acceptedAnswers?.join(" | ")}</strong>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
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

              {/* Feedback and Explanation */}
              {isAnswered && (
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
