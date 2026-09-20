"use client";

import React, { useState } from "react";
import { FLASHCARDS } from "../data/courseData";
import { Zap, RotateCw, ArrowLeft, ArrowRight, Shuffle } from "lucide-react";

export const FlashcardDeck: React.FC = () => {
  const [cards, setCards] = useState(FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">Rapid Recall Flashcards</h2>
        </div>
        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <button
            onClick={handleShuffle}
            className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Flippable Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[300px] bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition duration-300 relative group select-none"
      >
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-blue-400">
            {activeCard.category}
          </span>
          <span className="flex items-center space-x-1 text-slate-500 group-hover:text-blue-400 transition">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Click to flip</span>
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center text-center px-4 py-8">
          {isFlipped ? (
            <div className="space-y-3 animate-fadeIn">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Answer / Summary</span>
              <p className="text-sm sm:text-base text-slate-100 font-medium whitespace-pre-line leading-relaxed">
                {activeCard.back}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Concept</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{activeCard.front}</h3>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-slate-500">
          {isFlipped ? "Click to return to question" : "Click to reveal answer"}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center space-x-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition"
        >
          <span>Next Card</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
