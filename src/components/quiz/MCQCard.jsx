import React from "react";

import { CheckCircle2, XCircle, Sparkles, BookOpen } from "lucide-react";

export const MCQCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  showExplanation = false,
  isSubmitted = false,
}) => {
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctAnswerIndex;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-left">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
          Question {questionNumber} of {totalQuestions}
        </span>
        {question.grammarCategory && (
          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">
            {question.grammarCategory}
          </span>
        )}
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />+{question.points} XP
        </span>
      </div>

      {/* Question Text */}
      <h3 className="text-base font-bold text-slate-900 font-serif leading-relaxed mb-4">
        {question.questionTamil}
      </h3>

      {/* Options List */}
      <div className="space-y-2.5">
        {question.optionsTamil.map((option, idx) => {
          const isThisSelected = selectedOption === idx;
          const isThisCorrect = idx === question.correctAnswerIndex;

          let optionStyle =
            "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-slate-800";

          if (isSubmitted || showExplanation) {
            if (isThisCorrect) {
              optionStyle =
                "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200";
            } else if (isThisSelected && !isThisCorrect) {
              optionStyle =
                "border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-200";
            } else {
              optionStyle = "border-slate-100 opacity-60 text-slate-500";
            }
          } else if (isThisSelected) {
            optionStyle =
              "border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold ring-2 ring-emerald-200";
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isSubmitted || showExplanation}
              onClick={() => onSelectOption(idx)}
              className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isThisSelected
                    ? isSubmitted || showExplanation
                      ? isThisCorrect
                        ? "bg-emerald-600 text-white"
                        : "bg-rose-600 text-white"
                      : "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              <span className="flex-1 font-serif leading-relaxed">
                {option}
              </span>
              {(isSubmitted || showExplanation) && (
                <div className="shrink-0">
                  {isThisCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                  {isThisSelected && !isThisCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {(showExplanation || isSubmitted) && (
        <div
          className={`mt-4 p-4 rounded-xl border animate-in fade-in duration-200 ${
            isCorrect
              ? "bg-emerald-50 border-emerald-200 text-emerald-950"
              : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span className="uppercase tracking-wider">
              Textbook Rule & Explanation:
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-serif">
            {question.explanationTamil}
          </p>
        </div>
      )}
    </div>
  );
};
