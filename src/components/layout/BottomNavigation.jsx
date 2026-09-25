import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  User,
  Award,
} from "lucide-react";

export const BottomNavigation = () => {
  const { pathname } = useLocation();
  const subjectId = pathname.match(/^\/(?:learning\/subjects|lesson|practice)\/([^/]+)/)?.[1] || "tamil";
  const subjectLabels = { tamil: "தமிழ்", english: "ஆங்கிலம்", maths: "கணிதம்", science: "அறிவியல்", social: "சமூகம்" };
  const practiceUnits = { tamil: "tamil-unit-1", english: "english-unit-1", maths: "maths-unit-1", science: "science-unit-1", social: "social-unit-1" };
  const items = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: subjectLabels[subjectId] || "பாடங்கள்",
      path: `/learning/subjects/${subjectId}`,
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "Practice",
      path: `/practice/${subjectId}/${practiceUnits[subjectId] || practiceUnits.tamil}`,
      icon: <HelpCircle className="w-5 h-5" />,
    },
    { label: "Badges", path: "/badges", icon: <Award className="w-5 h-5" /> },
    { label: "Profile", path: "/profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] mt-0.5 font-sans font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
