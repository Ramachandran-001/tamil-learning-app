import React from "react";

import { Award, Flame, Sparkles, Crown, Medal, Zap, Lock } from "lucide-react";

export const BadgeCard = ({ badge, isUnlocked, onClick }) => {
  const iconMap = {
    Flame: <Flame className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    Award: <Award className="w-6 h-6" />,
    Crown: <Crown className="w-6 h-6" />,
    Medal: <Medal className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
  };

  const icon = iconMap[badge.iconName] || <Award className="w-6 h-6" />;

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-3xl transition-all duration-300 text-left flex flex-col justify-between ${
        isUnlocked
          ? "bento-card bento-card-amber hover:-translate-y-1 cursor-pointer group"
          : "bg-slate-900/40 border border-slate-800/50 opacity-60 hover:opacity-80"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
              isUnlocked
                ? "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 group-hover:scale-110"
                : "bg-slate-800 border border-slate-700 text-slate-500"
            }`}
          >
            {isUnlocked ? icon : <Lock className="w-5 h-5" />}
          </div>
          {isUnlocked ? (
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40">
              Unlocked
            </span>
          ) : (
            <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
              Locked
            </span>
          )}
        </div>

        <h4 className="text-sm font-bold text-white font-serif leading-snug">
          {badge.titleTamil}
        </h4>
        <p className="text-[11px] text-slate-400 font-medium">
          {badge.titleEnglish}
        </p>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">
          {badge.descriptionTamil}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="capitalize">{badge.category}</span>
        {isUnlocked && (
          <span className="font-semibold text-emerald-400">✓ Earned</span>
        )}
      </div>
    </div>
  );
};
