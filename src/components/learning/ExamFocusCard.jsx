import React from "react";

import { Award, AlertCircle, Bookmark, CheckCircle2 } from "lucide-react";

export const ExamFocusCard = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  const badgeConfig = {
    repeated: {
      label: "அடிக்கடி கேட்கப்படும் வினா",
      bg: "bg-rose-50 border-rose-200 text-rose-800",
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
    },
    expected: {
      label: "முக்கிய எதிர்பார்ப்பு வினா",
      bg: "bg-amber-50 border-amber-200 text-amber-900",
      icon: <Award className="w-3.5 h-3.5 text-amber-600" />,
    },
    author: {
      label: "ஆசிரியர் மற்றும் இலக்கியக் குறிப்பு",
      bg: "bg-indigo-50 border-indigo-200 text-indigo-800",
      icon: <Bookmark className="w-3.5 h-3.5 text-indigo-600" />,
    },
    grammar_rule: {
      label: "இலக்கண விதி",
      bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
        <h4 className="text-sm font-bold text-slate-900 font-sans">
          பொதுத்தேர்வு கவனிக்க வேண்டியவை
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {highlights.map((item) => {
          const config = badgeConfig[item.badge] || badgeConfig.expected;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border ${config.bg} shadow-xs relative flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-current shadow-2xs">
                    {config.icon}
                    {config.label}
                  </span>
                  {item.marksWeightage && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono">
                      {item.marksWeightage} மதிப்பெண்கள்
                    </span>
                  )}
                </div>
                <h5 className="text-sm font-bold text-slate-950 mb-1 font-serif">
                  {item.title}
                </h5>
                <p className="text-xs sm:text-sm text-slate-950 font-medium leading-relaxed font-serif">
                  {item.content}
                </p>
              </div>

              {item.pastExamYears && item.pastExamYears.length > 0 && (
                <div className="mt-3 pt-2 border-t border-black/10 flex items-center gap-1.5 text-xs text-slate-800 font-medium">
                  <span className="font-bold">முந்தைய பொதுத்தேர்வு ஆண்டுகள்:</span>
                  <span className="bg-white/80 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900 border border-slate-200/60">
                    {item.pastExamYears.join(", ")}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
