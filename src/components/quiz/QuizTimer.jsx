import React, { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";

export const QuizTimer = ({ initialSeconds, onTimeUp, isRunning = true }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, isRunning, onTimeUp]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isLowTime = secondsRemaining <= 300; // Less than 5 mins

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border transition-all ${
        isLowTime
          ? "bg-rose-50 border-rose-300 text-rose-800 animate-pulse font-bold"
          : "bg-white border-slate-200 text-slate-700 shadow-2xs font-semibold"
      }`}
    >
      {isLowTime ? (
        <AlertTriangle className="w-4 h-4 text-rose-600" />
      ) : (
        <Clock className="w-4 h-4 text-emerald-600" />
      )}
      <span className="font-mono text-sm tracking-wider">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
      <span className="text-[11px] text-slate-400 font-normal">மீதம்</span>
    </div>
  );
};
