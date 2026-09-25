import React from "react";
import { Link } from "react-router-dom";
import { SUBJECTS_DATA } from "../../data/mockData";

import { Button } from "../../components/common/Button";
import {
  BookOpen,
  Languages,
  Calculator,
  Microscope,
  Globe,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const SubjectsPage = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-6 h-6" />;
      case "Languages":
        return <Languages className="w-6 h-6" />;
      case "Calculator":
        return <Calculator className="w-6 h-6" />;
      case "Microscope":
        return <Microscope className="w-6 h-6" />;
      case "Globe":
        return <Globe className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
          10th Standard Curriculum
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-sans">
          Class 10 Subjects Catalog
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Tamil Nadu State Board Class 10 curriculum. The Tamil medium portal is
          fully active with interactive Iyal modules, audio recitation, and
          public board mock exams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS_DATA.map((subject) => (
          <div
            key={subject.id}
            className={`bento-card rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              subject.isSpecialModule
                ? "bento-card-emerald ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-950/40"
                : ""
            }`}
          >
            {subject.isSpecialModule && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-slate-950 text-[10px] font-black px-3.5 py-1 rounded-bl-2xl uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                Active Iyal Portal
              </div>
            )}

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
                    subject.isSpecialModule
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {getIcon(subject.iconName)}
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950/90 text-slate-300 border border-slate-800">
                  {subject.code}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-serif tracking-tight">
                {subject.nameTamil}
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-3">
                {subject.nameEnglish}
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3 mb-5 font-serif">
                {subject.descriptionTamil}
              </p>

              <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-slate-800/80 bg-slate-950/50 rounded-2xl text-center px-2">
                <div>
                  <span className="text-base font-bold text-white font-mono block">
                    {subject.unitsCount}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Units / Iyals
                  </span>
                </div>
                <div>
                  <span className="text-base font-bold text-white font-mono block">
                    {subject.totalLessons}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Lessons
                  </span>
                </div>
                <div>
                  <span className="text-base font-bold text-emerald-400 font-mono block">
                    {subject.totalXpAvailable}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    XP Points
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link to={`/learning/subjects/${subject.id}`}>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-between font-bold py-2.5"
                >
                  <span>Open {subject.nameEnglish.replace("10th Standard ", "")} Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
