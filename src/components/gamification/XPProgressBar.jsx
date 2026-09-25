import React from "react";
import { Zap } from "lucide-react";

export const XPProgressBar = ({ currentXp }) => {
  // Calculate Level based on XP: 100 XP per level
  const currentLevel = Math.floor(currentXp / 100) + 1;
  const xpInCurrentLevel = currentXp % 100;
  const xpToNextLevel = 100 - xpInCurrentLevel;

  return (
    <div className="bento-card bento-card-amber rounded-3xl p-5 shadow-xl text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-base shadow-lg shadow-amber-500/30 shrink-0">
            {currentLevel}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-sans">
                Level {currentLevel} Scholar
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                Master
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Need{" "}
              <strong className="text-amber-300 font-mono">
                {xpToNextLevel} XP
              </strong>{" "}
              to reach next level
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/90 rounded-2xl border border-amber-500/30 shadow-md self-start sm:self-auto">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-base font-black text-white font-mono">
            {currentXp}
          </span>
          <span className="text-xs font-bold text-amber-400">XP</span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-slate-950/80 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 transition-all duration-700 ease-out shadow-sm shadow-amber-500/50"
          style={{ width: `${xpInCurrentLevel}%` }}
        />
      </div>
    </div>
  );
};
