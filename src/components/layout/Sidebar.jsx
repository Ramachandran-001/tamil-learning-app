import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  FileCheck,
  Award,
  BarChart3,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useUserProgress } from "../../context/UserProgressContext";

export const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { logout } = useAuth();
  const { progress } = useUserProgress();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Tamil Lessons",
      path: "/learning/subjects/tamil",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "Practice Quiz",
      path: "/practice/tamil/tamil-unit-1",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      label: "Model Exams",
      path: "/test/tamil-unit-1",
      icon: <FileCheck className="w-5 h-5" />,
    },
    {
      label: "Badges & Rewards",
      path: "/badges",
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "Progress Analytics",
      path: "/progress",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Student Profile",
      path: "/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-all duration-300 z-30 select-none text-slate-200 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0 font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="truncate text-left">
              <span className="text-base font-black tracking-tight text-white font-serif block leading-none">
                StudyPath
              </span>
              <span className="text-[10px] font-bold text-emerald-400">
                Grade 10 Tamil
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Nav Menu Items */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-950/50"
                  : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-100 hover:border-slate-800 border border-transparent"
              }`
            }
            title={isCollapsed ? item.label : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Bottom XP widget / Logout */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        {!isCollapsed && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/20 text-left">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-amber-200 font-serif">
                Earned Experience
              </span>
              <span className="font-mono font-bold text-amber-400">
                {progress.totalXp} XP
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, progress.totalXp % 100)}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="Logout"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
