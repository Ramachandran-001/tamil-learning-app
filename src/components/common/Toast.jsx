import React, { useEffect } from "react";
import { Award, Zap, Sparkles, X, CheckCircle, Info } from "lucide-react";

export const Toast = ({
  title,
  message,
  type = "info",
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeConfig = {
    xp: {
      bg: "bg-emerald-900/95 text-white border-emerald-500/40",
      icon: <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />,
    },
    badge: {
      bg: "bg-amber-950/95 text-white border-amber-500/40",
      icon: <Award className="w-5 h-5 text-amber-300" />,
    },
    success: {
      bg: "bg-teal-900/95 text-white border-teal-500/40",
      icon: <CheckCircle className="w-5 h-5 text-teal-300" />,
    },
    info: {
      bg: "bg-slate-900/95 text-white border-slate-700",
      icon: <Info className="w-5 h-5 text-sky-400" />,
    },
  };

  const config = typeConfig[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-2xl ${config.bg}`}
      >
        <div className="p-2 rounded-xl bg-white/10 shrink-0">{config.icon}</div>
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
            {title}
            {type === "badge" && (
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            )}
          </h4>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
