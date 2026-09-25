import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserProgress } from "../../context/UserProgressContext";
import { Bell, Flame, Zap, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Modal } from "../common/Modal";

export const Header = () => {
  const { user } = useAuth();
  const { progress } = useUserProgress();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search / Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          to="/learning/subjects/tamil"
          className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-950/60 text-emerald-300 text-xs font-bold border border-emerald-500/30 hover:bg-emerald-900/60 hover:border-emerald-500/50 transition shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span className="font-sans">Grade 10 Tamil Medium</span>
        </Link>
      </div>

      {/* Right Action Widgets */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-md shadow-amber-950/40">
          <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
          <span className="font-mono">{progress.currentStreak}</span>
          <span className="hidden sm:inline font-sans text-[11px] font-medium text-amber-200/80">
            Days
          </span>
        </div>

        {/* XP Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-md shadow-emerald-950/40">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-mono">{progress.totalXp}</span>
          <span className="text-[10px] text-emerald-400">XP</span>
        </div>

        {/* Quick Notifications */}
        <button
          onClick={() => setShowNotifications(true)}
          className="p-2 rounded-2xl text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-slate-800 transition relative cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950 animate-pulse" />
        </button>

        {/* User Avatar */}
        <Link
          to="/profile"
          className="flex items-center gap-2 pl-2 border-l border-slate-800"
        >
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-950/50">
            {user?.fullName?.slice(0, 2) || "ST"}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-200 font-sans leading-tight truncate max-w-[120px]">
              {user?.fullName || "Student"}
            </p>
            <p className="text-[10px] text-slate-500 leading-tight truncate">
              {user?.studentClass || "Grade 10"}
            </p>
          </div>
        </Link>
      </div>

      {/* Notifications Modal */}
      <Modal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="Notifications & Alerts"
        maxWidth="sm"
      >
        <div className="space-y-3 text-left text-xs">
          <div className="p-3.5 bg-emerald-950/50 rounded-2xl border border-emerald-500/30 text-emerald-200">
            <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Unit 1 Lessons Ready!</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Complete Annai Mozhiye and Tamil Sol Valam to unlock the Unit 1
              Model Exam.
            </p>
          </div>

          <div className="p-3.5 bg-amber-950/50 rounded-2xl border border-amber-500/30 text-amber-200">
            <div className="flex items-center gap-2 text-amber-300 font-bold mb-1">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Streak Boost!</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              You have a {progress.currentStreak}-day learning streak! Maintain
              it for 3 more days to unlock the Streak Champion badge.
            </p>
          </div>
        </div>
      </Modal>
    </header>
  );
};
