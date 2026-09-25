import React from "react";

const LETTERS = ["அ", "ஆ", "இ", "ஈ"];

export const TamilQuestionCard = ({ question, questionNumber, totalQuestions, selectedOption, onSelectOption, reveal = false }) => {
  const correct = selectedOption === question.correctAnswerIndex;
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">வினா {questionNumber} / {totalQuestions}</span>
        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{question.grammarCategory || "தமிழ்ப் பாடம்"}</span>
      </div>
      <h2 className="mb-5 text-lg font-bold leading-8 text-slate-900">{question.questionTamil}</h2>
      <div className="space-y-2.5">
        {question.optionsTamil.map((option, index) => {
          const selected = selectedOption === index;
          const isCorrect = index === question.correctAnswerIndex;
          const style = reveal && isCorrect
            ? "border-emerald-500 bg-emerald-50 text-emerald-950"
            : reveal && selected
              ? "border-rose-400 bg-rose-50 text-rose-950"
              : selected
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-100"
                : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/40";
          return <button key={`${question.id}-${index}`} type="button" disabled={reveal} aria-pressed={selected} onClick={() => onSelectOption(index)} className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left leading-6 transition disabled:cursor-default ${style}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${selected ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700"}`}>{LETTERS[index]}</span><span>{option}</span></button>;
        })}
      </div>
      {reveal && <div className={`mt-4 rounded-xl border p-4 text-sm leading-6 ${correct ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}><strong>{correct ? "சரியான விடை!" : `சரியான விடை: ${question.optionsTamil[question.correctAnswerIndex]}`}</strong>{question.explanationTamil && <p className="mt-1">{question.explanationTamil}</p>}</div>}
    </article>
  );
};
