"use client";

import React, { useState } from "react";
import { COURSE_MODULES, CourseModule } from "../data/courseData";
import { Star, Search, Check, ChevronDown, ChevronUp, ArrowRight, Lightbulb, Calculator } from "lucide-react";

interface ModuleReviewProps {
  selectedModule: string;
  setSelectedModule: (mod: string) => void;
  onJumpToCode: (modId: string) => void;
  onJumpToQuiz: (modId: string) => void;
}

export const ModuleReview: React.FC<ModuleReviewProps> = ({
  selectedModule,
  setSelectedModule,
  onJumpToCode,
  onJumpToQuiz
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    "m4-1": true,
    "m4-2": true,
    "m5-1": true,
    "m6-1": true,
    "m7-1": true
  });

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredModules = COURSE_MODULES.filter((m) => {
    if (selectedModule !== "all" && m.id !== selectedModule) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Module Selector & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedModule("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedModule === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            All Lessons
          </button>
          {COURSE_MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedModule === m.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {m.number}. {m.title.split(":")[0]}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, formulas, topics..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-10">
        {filteredModules.map((module) => {
          const matchingTopics = module.topics.filter(
            (t) =>
              searchQuery === "" ||
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
          );

          if (matchingTopics.length === 0) return null;

          return (
            <div key={module.id} className="space-y-4">
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 font-extrabold flex items-center justify-center border border-blue-500/30 text-sm">
                    {module.number}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-white">{module.title}</h2>
                    <p className="text-xs text-slate-400">{module.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onJumpToCode(module.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <span>View Code</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onJumpToQuiz(module.id)}
                    className="px-2.5 py-1 rounded-lg bg-blue-900/40 border border-blue-700/50 hover:bg-blue-800/40 text-blue-300 text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <span>Test Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchingTopics.map((topic) => {
                  const isExpanded = !!expandedTopics[topic.id];
                  return (
                    <div
                      key={topic.id}
                      className="bg-slate-900 rounded-xl border border-slate-800/80 p-5 shadow-sm hover:border-slate-700 transition space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                            <span>{topic.title}</span>
                          </h3>
                          {topic.isHighlighted && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>Exam Highlight</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          {topic.summary}
                        </p>

                        {/* Formula Box if any */}
                        {topic.formula && (
                          <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-200 text-xs font-mono flex items-center space-x-2">
                            <Calculator className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                            <span>{topic.formula}</span>
                          </div>
                        )}

                        {/* Expandable Details */}
                        {isExpanded && (
                          <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                            {topic.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                                <span className="leading-relaxed">{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Key Takeaway & Expand Toggle */}
                      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                        {topic.keyTakeaway ? (
                          <div className="flex items-center space-x-1.5 text-[11px] text-amber-400/90 font-medium">
                            <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                            <span className="truncate max-w-[240px] sm:max-w-xs">{topic.keyTakeaway}</span>
                          </div>
                        ) : <div></div>}

                        <button
                          onClick={() => toggleTopic(topic.id)}
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1 font-semibold"
                        >
                          <span>{isExpanded ? "Less" : "More"}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
