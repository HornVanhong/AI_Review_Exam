"use client";

import React, { useState } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "../data/courseData";
import { CheckCircle2, XCircle, RotateCcw, AlertCircle, HelpCircle, Trophy, BookOpen } from "lucide-react";

interface ExamSimulatorProps {
  selectedModule: string;
  onUpdateScore: (score: { correct: number; total: number }) => void;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  selectedModule,
  onUpdateScore
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [filterType, setFilterType] = useState<string>("all");

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedModule !== "all" && q.moduleId !== selectedModule) return false;
    if (filterType !== "all" && q.type !== filterType) return false;
    return true;
  });

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    const updated = { ...selectedAnswers, [questionId]: optionIdx };
    setSelectedAnswers(updated);

    // Calculate score
    const totalAnswered = Object.keys(updated).length;
    let correct = 0;
    Object.entries(updated).forEach(([qid, ansIdx]) => {
      const q = QUIZ_QUESTIONS.find((item) => item.id === parseInt(qid));
      if (q && q.correctIndex === ansIdx) correct++;
    });
    onUpdateScore({ correct, total: totalAnswered });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    onUpdateScore({ correct: 0, total: 0 });
  };

  // Score stats
  const answeredCount = Object.keys(selectedAnswers).length;
  let correctCount = 0;
  Object.entries(selectedAnswers).forEach(([qid, ansIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === parseInt(qid));
    if (q && q.correctIndex === ansIdx) correctCount++;
  });
  const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Exam Header Card */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Interactive Exam Simulator</span>
          </div>
          <h2 className="text-xl font-bold text-white">Monthly Exam Practice Test</h2>
          <p className="text-xs text-slate-400 mt-1">
            Select an answer to receive instant feedback, score calculation, and slide references.
          </p>
        </div>

        {/* Score Display */}
        <div className="flex items-center space-x-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Score</span>
            <p className="text-lg font-bold text-blue-400">{correctCount} / {answeredCount}</p>
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
      <div className="flex items-center space-x-2 text-xs">
        <span className="text-slate-400 font-semibold">Question Type:</span>
        {["all", "concept", "code"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterType === type
                ? "bg-slate-800 text-white border border-slate-700"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIndex) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctIndex;

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
                    {q.moduleId.toUpperCase()} &bull; {q.type}
                  </span>
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
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-xs font-mono text-slate-200">
                  <pre><code>{q.codeSnippet}</code></pre>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  let optStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-800/50";
                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      optStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/50";
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

              {/* Feedback and Explanation */}
              {isAnswered && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-blue-400 font-bold">
                    <span className="flex items-center space-x-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>Lecture Explanation</span>
                    </span>
                    <span className="text-[11px] text-slate-400">{q.slideRef}</span>
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
