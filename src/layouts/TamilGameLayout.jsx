import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BookOpen, Flame, Zap } from "lucide-react";
import { useUserProgress } from "../context/UserProgressContext";

export const TamilGameLayout = () => {
  const { progress } = useUserProgress();

  return (
    <div className="study-app tamil-game min-h-screen">
      <header className="tamil-topbar">
        <div className="tamil-topbar-inner">
          <Link to="/" className="tamil-brand" aria-label="தமிழ்ப்பாதை முகப்பு">
            <span className="tamil-brand-mark"><BookOpen size={21} /></span>
            <span><strong>தமிழ்ப்பாதை</strong><small>படி · பயிற்சி · முன்னேறு</small></span>
          </Link>
          <div className="tamil-top-actions">
            <span className="game-chip streak-chip"><Flame size={17} fill="currentColor" /> {progress.currentStreak} நாள் தொடர்</span>
            <span className="game-chip xp-chip"><Zap size={17} fill="currentColor" /> {progress.totalXp} XP</span>
          </div>
        </div>
      </header>
      <main className="tamil-main"><Outlet /></main>
      <footer className="tamil-footer">தமிழை விரும்பிப் படிப்போம் <span>✦</span> ஒவ்வொரு நாளும் கொஞ்சம் முன்னேறுவோம்</footer>
    </div>
  );
};
