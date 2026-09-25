import React from "react";

export const StatWidget = ({
  titleTamil,
  titleEnglish,
  value,
  subValue,
  icon,
  color = "emerald",
  trend,
}) => {
  const colorStyles = {
    emerald: {
      card: "bento-card bento-card-emerald",
      titleEnglish: "text-emerald-400/80",
      titleTamil: "text-emerald-200",
      valueText: "text-white",
      iconBg:
        "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-950/50",
    },
    amber: {
      card: "bento-card bento-card-amber",
      titleEnglish: "text-amber-400/80",
      titleTamil: "text-amber-200",
      valueText: "text-white",
      iconBg:
        "bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-lg shadow-amber-950/50",
    },
    blue: {
      card: "bento-card bento-card-indigo",
      titleEnglish: "text-indigo-400/80",
      titleTamil: "text-indigo-200",
      valueText: "text-white",
      iconBg:
        "bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 shadow-lg shadow-indigo-950/50",
    },
    purple: {
      card: "bento-card bento-card-indigo",
      titleEnglish: "text-purple-400/80",
      titleTamil: "text-purple-200",
      valueText: "text-white",
      iconBg:
        "bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-lg shadow-purple-950/50",
    },
    rose: {
      card: "bento-card bento-card-rose",
      titleEnglish: "text-rose-400/80",
      titleTamil: "text-rose-200",
      valueText: "text-white",
      iconBg:
        "bg-rose-500/20 border border-rose-500/40 text-rose-300 shadow-lg shadow-rose-950/50",
    },
  };

  const currentTheme = colorStyles[color];

  return (
    <div
      className={`p-5 rounded-3xl ${currentTheme.card} text-left flex items-start justify-between gap-3 group`}
    >
      <div>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${currentTheme.titleEnglish} block`}
        >
          {titleEnglish}
        </span>
        <h4
          className={`text-xs font-bold ${currentTheme.titleTamil} font-serif mt-0.5`}
        >
          {titleTamil}
        </h4>
        <div className="flex items-baseline gap-2 mt-2">
          <span
            className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${currentTheme.valueText}`}
          >
            {value}
          </span>
          {subValue && (
            <span className="text-xs text-slate-400 font-medium">
              {subValue}
            </span>
          )}
        </div>
        {trend && (
          <span className="text-[10px] text-emerald-400 font-semibold mt-1.5 block">
            {trend}
          </span>
        )}
      </div>

      <div
        className={`w-11 h-11 rounded-2xl ${currentTheme.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
    </div>
  );
};
