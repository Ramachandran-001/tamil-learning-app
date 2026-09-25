import React from "react";
import { BookOpen } from "lucide-react";

export const Loading = ({
  messageTamil = "பாடத் தரவுகள் ஏற்றப்படுகின்றன...",
  messageEnglish = "Loading curriculum resources...",
  size = "md",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[220px]">
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center animate-bounce">
          <BookOpen className="w-7 h-7 text-emerald-600" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center animate-ping" />
      </div>
      <p className="text-sm font-semibold text-slate-800 font-serif">
        {messageTamil}
      </p>
      <p className="text-xs text-slate-500 mt-1">{messageEnglish}</p>
    </div>
  );
};
