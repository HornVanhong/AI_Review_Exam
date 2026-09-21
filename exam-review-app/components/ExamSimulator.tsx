"use client";

import React, { useState, useRef } from "react";
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
  Check,
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface ExamSimulatorProps {
  selectedModule: string;
  onUpdateScore: (score: { correct: number; total: number }) => void;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  selectedModule,
  onUpdateScore
}) => {
  // Fill-in-the-blank state
  const [fillInInputs, setFillInInputs] = useState<Record<number, string>>({});
  const [fillInStatus, setFillInStatus] = useState<Record<number, "correct" | "incorrect">>({});
  const [fillInAttempts, setFillInAttempts] = useState<Record<number, number>>({});
  const [revealedFillInAnswers, setRevealedFillInAnswers] = useState<Record<number, boolean>>({});

  // Multiple Choice / True-False state (allows retrying wrong choices!)
  const [wrongChoices, setWrongChoices] = useState<Record<number, number[]>>({});
  const [correctChoices, setCorrectChoices] = useState<Record<number, number>>({});
  const [revealedChoiceAnswers, setRevealedChoiceAnswers] = useState<Record<number, boolean>>({});

  // Open Question state
  const [revealedOpenAnswers, setRevealedOpenAnswers] = useState<Record<number, boolean>>({});
  const [openStudentNotes, setOpenStudentNotes] = useState<Record<number, string>>({});
  const [masteredOpenQuestions, setMasteredOpenQuestions] = useState<Record<number, boolean>>({});
  
  // Explanation visibility toggles
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  // Filter state
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPart, setFilterPart] = useState<string>("all");

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedModule !== "all" && q.moduleId !== selectedModule) return false;
    if (filterPart !== "all" && q.partId !== filterPart) return false;
    if (filterType !== "all" && q.type !== filterType) return false;
    return true;
  });

  // Calculate score based on questions answered
  const calculateScore = (
    currentCorrectChoices = correctChoices,
    currentFillInStatus = fillInStatus,
    currentRevealedChoice = revealedChoiceAnswers,
    currentRevealedFillIn = revealedFillInAnswers
  ) => {
    let correct = 0;
    let total = 0;

    // Multiple Choice & True/False
    QUIZ_QUESTIONS.forEach((q) => {
      if (q.type === "qcm" || q.type === "true-false") {
        if (currentCorrectChoices[q.id] !== undefined) {
          correct++;
          total++;
        } else if (currentRevealedChoice[q.id]) {
          total++; // User gave up and revealed
        }
      } else if (q.type === "fill-in-blank") {
        if (currentFillInStatus[q.id] === "correct") {
          correct++;
          total++;
        } else if (currentRevealedFillIn[q.id]) {
          total++; // User gave up and revealed
        }
      }
    });

    return { correct, total };
  };

  // Handle QCM / True-False choice
  const handleSelectOption = (q: QuizQuestion, optIdx: number) => {
    // If already correctly solved or revealed, do nothing
    if (correctChoices[q.id] !== undefined || revealedChoiceAnswers[q.id]) return;

    if (optIdx === q.correctIndex) {
      // Correct answer!
      const updatedCorrect = { ...correctChoices, [q.id]: optIdx };
      setCorrectChoices(updatedCorrect);
      setShowExplanation(prev => ({ ...prev, [q.id]: true }));
      const score = calculateScore(updatedCorrect, fillInStatus, revealedChoiceAnswers, revealedFillInAnswers);
      onUpdateScore(score);
    } else {
      // Wrong choice -> record it and allow user to try other options!
      const existingWrongs = wrongChoices[q.id] || [];
      if (!existingWrongs.includes(optIdx)) {
        setWrongChoices({ ...wrongChoices, [q.id]: [...existingWrongs, optIdx] });
      }
    }
  };

  // Handle Fill-in-the-blank submit
  const handleSubmitFillIn = (q: QuizQuestion) => {
    const raw = (fillInInputs[q.id] || "").trim();
    if (!raw) return;

    const attempts = (fillInAttempts[q.id] || 0) + 1;
    setFillInAttempts({ ...fillInAttempts, [q.id]: attempts });

    const cleaned = raw.toLowerCase();
    const isMatch = Boolean(
      q.acceptedAnswers?.some((ans) => ans.trim().toLowerCase() === cleaned)
    );

    if (isMatch) {
      const updatedStatus = { ...fillInStatus, [q.id]: "correct" as const };
      setFillInStatus(updatedStatus);
      setShowExplanation(prev => ({ ...prev, [q.id]: true }));
      const score = calculateScore(correctChoices, updatedStatus, revealedChoiceAnswers, revealedFillInAnswers);
      onUpdateScore(score);
    } else {
      setFillInStatus({ ...fillInStatus, [q.id]: "incorrect" });
    }
  };

  // Give up and reveal for QCM / True-False
  const handleRevealChoice = (questionId: number) => {
    const updated = { ...revealedChoiceAnswers, [questionId]: true };
    setRevealedChoiceAnswers(updated);
    setShowExplanation(prev => ({ ...prev, [questionId]: true }));
    const score = calculateScore(correctChoices, fillInStatus, updated, revealedFillInAnswers);
    onUpdateScore(score);
  };

  // Give up and reveal for Fill-in-the-blank
  const handleRevealFillIn = (questionId: number) => {
    const updated = { ...revealedFillInAnswers, [questionId]: true };
    setRevealedFillInAnswers(updated);
    setShowExplanation(prev => ({ ...prev, [questionId]: true }));
    const score = calculateScore(correctChoices, fillInStatus, revealedChoiceAnswers, updated);
    onUpdateScore(score);
  };

  const handleToggleRevealOpen = (questionId: number) => {
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
    setFillInInputs({});
    setFillInStatus({});
    setFillInAttempts({});
    setRevealedFillInAnswers({});
    setWrongChoices({});
    setCorrectChoices({});
    setRevealedChoiceAnswers({});
    setRevealedOpenAnswers({});
    setOpenStudentNotes({});
    setMasteredOpenQuestions({});
    setShowExplanation({});
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
            <span>Interactive Exam Simulator ({QUIZ_QUESTIONS.length} Questions)</span>
          </div>
          <h2 className="text-xl font-bold text-white">Try By Yourself Practice Test</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Test your knowledge independently! If you get a question wrong, try again until you master the concept. Answers and explanations are never spoiled in advance.
          </p>
        </div>

        {/* Score & Mastery Display */}
        <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Solved</span>
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
            All Highlights (96)
          </button>
          <button
            onClick={() => setFilterPart("mod1")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "mod1"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-800/80 text-indigo-300 hover:text-white border border-indigo-500/30"
            }`}
          >
            Module 1: RAG Basics (20)
          </button>
          <button
            onClick={() => setFilterPart("mod2")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "mod2"
                ? "bg-cyan-600 text-white shadow-sm"
                : "bg-slate-800/80 text-cyan-300 hover:text-white border border-cyan-500/30"
            }`}
          >
            Module 2: Advanced RAG (40)
          </button>
          <button
            onClick={() => setFilterPart("mod3")}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              filterPart === "mod3"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-800/80 text-purple-300 hover:text-white border border-purple-500/30"
            }`}
          >
            Module 3: Autonomous Agents (36)
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
            QCM (24)
          </button>
          <button
            onClick={() => setFilterType("true-false")}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === "true-false"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-800/80 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30"
            }`}
          >
            TRUE / FALSE (24)
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

          // Choice question state
          const isChoiceCorrect = correctChoices[q.id] !== undefined;
          const isChoiceRevealed = revealedChoiceAnswers[q.id] || false;
          const currentWrongOpts = wrongChoices[q.id] || [];
          const isChoiceFinished = isChoiceCorrect || isChoiceRevealed;

          // Fill-in state
          const fillStatus = fillInStatus[q.id];
          const isFillInCorrect = fillStatus === "correct";
          const isFillInRevealed = revealedFillInAnswers[q.id] || false;
          const isFillInFinished = isFillInCorrect || isFillInRevealed;
          const fillAttempts = fillInAttempts[q.id] || 0;

          // Open question state
          const isOpenRevealed = revealedOpenAnswers[q.id] || false;
          const isMastered = masteredOpenQuestions[q.id] || false;

          return (
            <div
              key={q.id}
              className={`bg-slate-900 rounded-2xl border p-6 shadow-sm transition space-y-4 ${
                isOpen
                  ? isMastered
                    ? "border-purple-600/80 bg-slate-900/95 ring-1 ring-purple-500/20"
                    : "border-slate-800 bg-slate-900"
                  : (isChoiceCorrect || isFillInCorrect)
                    ? "border-emerald-800/80 bg-slate-900/90"
                    : (isChoiceRevealed || isFillInRevealed)
                      ? "border-amber-800/80 bg-slate-900/90"
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
                {(isChoiceCorrect || isFillInCorrect) && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Correct</span>
                  </span>
                )}

                {(isChoiceRevealed || isFillInRevealed) && !isChoiceCorrect && !isFillInCorrect && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Answer Revealed</span>
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

              {/* 1. FILL IN THE BLANK INTERACTION (Try by yourself first!) */}
              {isFillIn && (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={fillInInputs[q.id] || ""}
                      onChange={(e) => {
                        setFillInInputs({ ...fillInInputs, [q.id]: e.target.value });
                        // Clear incorrect notice on typing so user can try again freely
                        if (fillInStatus[q.id] === "incorrect") {
                          setFillInStatus({ ...fillInStatus, [q.id]: undefined as any });
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isFillInFinished) {
                          handleSubmitFillIn(q);
                        }
                      }}
                      disabled={isFillInFinished}
                      placeholder="Type your answer here..."
                      className={`flex-1 bg-slate-950 border rounded-xl px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none transition ${
                        isFillInCorrect
                          ? "border-emerald-500 text-emerald-300 bg-emerald-950/20"
                          : fillStatus === "incorrect"
                            ? "border-rose-500 text-rose-300 bg-rose-950/20"
                            : isFillInRevealed
                              ? "border-amber-500 text-amber-300 bg-amber-950/20"
                              : "border-slate-700 text-slate-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      }`}
                    />
                    {!isFillInFinished ? (
                      <button
                        onClick={() => handleSubmitFillIn(q)}
                        disabled={!fillInInputs[q.id]?.trim()}
                        className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold text-xs transition flex items-center justify-center space-x-2 shrink-0"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Submit Answer</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Allow re-trying even after finishing
                          setFillInStatus({ ...fillInStatus, [q.id]: undefined as any });
                          setRevealedFillInAnswers({ ...revealedFillInAnswers, [q.id]: false });
                        }}
                        className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition flex items-center justify-center space-x-1.5 shrink-0 border border-slate-700"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </button>
                    )}
                  </div>

                  {/* If incorrect, encourage retry WITHOUT revealing the answer */}
                  {fillStatus === "incorrect" && !isFillInRevealed && (
                    <div className="p-3 rounded-xl border border-rose-500/50 bg-rose-950/40 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fadeIn">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Not quite! Try another answer (Attempt {fillAttempts}). Keep thinking!</span>
                      </div>
                      <button
                        onClick={() => handleRevealFillIn(q.id)}
                        className="text-[11px] text-slate-400 hover:text-amber-300 underline font-medium self-end sm:self-auto transition"
                      >
                        Give Up & Show Answer
                      </button>
                    </div>
                  )}

                  {/* If correct, celebrate and confirm */}
                  {isFillInCorrect && (
                    <div className="p-3 rounded-xl border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Great job! Your answer matches accepted terms.</span>
                    </div>
                  )}

                  {/* If revealed after giving up, show accepted answers */}
                  {isFillInRevealed && !isFillInCorrect && (
                    <div className="p-3 rounded-xl border border-amber-500/50 bg-amber-950/40 text-amber-200 text-xs space-y-1.5 animate-fadeIn">
                      <div className="flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Accepted term(s): <strong className="text-white font-mono">{q.acceptedAnswers?.join(" | ")}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. MULTIPLE CHOICE (QCM) INTERACTION (Allow picking other choices on mistake!) */}
              {isQCM && (
                <div className="space-y-2 pt-1">
                  {q.options?.map((opt, optIdx) => {
                    const isPickedWrong = currentWrongOpts.includes(optIdx);
                    const isPickedCorrect = correctChoices[q.id] === optIdx;
                    const isSolutionRevealed = isChoiceRevealed && optIdx === q.correctIndex;

                    let optStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-800/50";
                    
                    if (isPickedCorrect || isSolutionRevealed) {
                      optStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/50";
                    } else if (isPickedWrong) {
                      optStyle = "bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500/30 opacity-70";
                    } else if (isChoiceFinished) {
                      optStyle = "opacity-40 border-slate-800/60 text-slate-500";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isChoiceFinished || isPickedWrong}
                        onClick={() => handleSelectOption(q, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start space-x-3 ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                          {isPickedWrong ? "✕" : (isPickedCorrect || isSolutionRevealed) ? "✓" : String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed flex-1">{opt}</span>
                      </button>
                    );
                  })}

                  {/* Show gentle retry message if user picked a wrong choice, without spoiling correct choice */}
                  {currentWrongOpts.length > 0 && !isChoiceFinished && (
                    <div className="p-2.5 rounded-xl border border-rose-500/40 bg-rose-950/30 text-rose-300 text-xs flex items-center justify-between gap-2 animate-fadeIn">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Not that one! Try another choice above.</span>
                      </div>
                      <button
                        onClick={() => handleRevealChoice(q.id)}
                        className="text-[11px] text-slate-400 hover:text-amber-300 underline font-medium transition"
                      >
                        Give Up & Show Answer
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. TRUE / FALSE INTERACTION (Allow picking other choice on mistake!) */}
              {isTrueFalse && (
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    {["True", "False"].map((tfLabel, optIdx) => {
                      const isPickedWrong = currentWrongOpts.includes(optIdx);
                      const isPickedCorrect = correctChoices[q.id] === optIdx;
                      const isSolutionRevealed = isChoiceRevealed && optIdx === q.correctIndex;

                      let tfStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-emerald-500 hover:bg-slate-800/50";

                      if (isPickedCorrect || isSolutionRevealed) {
                        tfStyle = "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/40";
                      } else if (isPickedWrong) {
                        tfStyle = "bg-rose-950/50 border-rose-500 text-rose-200 font-bold ring-2 ring-rose-500/40 opacity-70";
                      } else if (isChoiceFinished) {
                        tfStyle = "opacity-40 border-slate-800/60 text-slate-500";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isChoiceFinished || isPickedWrong}
                          onClick={() => handleSelectOption(q, optIdx)}
                          className={`py-3 px-4 rounded-xl border text-center font-semibold text-xs sm:text-sm transition flex items-center justify-center space-x-2 ${tfStyle}`}
                        >
                          <span>{tfLabel}</span>
                        </button>
                      );
                    })}
                  </div>

                  {currentWrongOpts.length > 0 && !isChoiceFinished && (
                    <div className="p-2.5 rounded-xl border border-rose-500/40 bg-rose-950/30 text-rose-300 text-xs flex items-center justify-between gap-2 animate-fadeIn">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>Incorrect. You can test the other option!</span>
                      </div>
                      <button
                        onClick={() => handleRevealChoice(q.id)}
                        className="text-[11px] text-slate-400 hover:text-amber-300 underline font-medium transition"
                      >
                        Give Up & Show Answer
                      </button>
                    </div>
                  )}
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
                      onClick={() => handleToggleRevealOpen(q.id)}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-semibold transition"
                    >
                      {isOpenRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span>{isOpenRevealed ? "Hide Model Answer & Rubric" : "Reveal Model Answer & Rubric"}</span>
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">{q.slideRef}</span>
                  </div>

                  {/* Revealed Model Answer & Key Points */}
                  {isOpenRevealed && (
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

              {/* Feedback and Explanation for Auto-Graded (Only shown once solved or revealed) */}
              {!isOpen && (isChoiceFinished || isFillInFinished) && showExplanation[q.id] && (
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
