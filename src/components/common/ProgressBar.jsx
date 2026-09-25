import React from "react";

export const ProgressBar = ({
  value,
  max = 100,
  label,
  subLabel,
  size = "md",
  color = "emerald",
  showPercentage = true,
  animated = false,
  className = "",
}) => {
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((value / max) * 100)),
  );

  const sizeStyles = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const colorStyles = {
    emerald:
      "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50",
    blue: "bg-gradient-to-r from-blue-500 to-indigo-400 shadow-sm shadow-indigo-500/50",
    amber:
      "bg-gradient-to-r from-amber-400 to-orange-400 shadow-sm shadow-amber-500/50",
    purple:
      "bg-gradient-to-r from-purple-500 to-indigo-400 shadow-sm shadow-purple-500/50",
    rose: "bg-gradient-to-r from-rose-500 to-pink-400 shadow-sm shadow-rose-500/50",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="font-semibold text-slate-300">{label}</span>
          <div className="flex items-center gap-2">
            {subLabel && (
              <span className="text-slate-500 font-normal">{subLabel}</span>
            )}
            {showPercentage && (
              <span className="font-bold text-white font-mono">
                {percentage}%
              </span>
            )}
          </div>
        </div>
      )}
      <div
        className={`w-full bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800 ${sizeStyles[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles[color]} ${
            animated ? "animate-pulse" : ""
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
