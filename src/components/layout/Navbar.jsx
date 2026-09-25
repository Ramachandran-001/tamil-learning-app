import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Sparkles, LogIn } from "lucide-react";
import { Button } from "../common/Button";

export const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Curriculum (Tamil)", path: "/learning/subjects/tamil" },
    { label: "Student Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white font-sans block leading-none">
                StudyPath
              </span>
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider">
                10th Grade Tamil Medium
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                icon={<LogIn className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="primary"
                size="sm"
                icon={<Sparkles className="w-4 h-4" />}
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
