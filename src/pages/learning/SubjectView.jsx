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
} from "lucide-react";

export const SubjectView = () => {
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
    <div className="space-y-6 text-left pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
            Curriculum Catalog
          </span>
          <h1 className="text-2xl font-bold text-white font-sans mt-2">
            Class 10 Subject Modules
          </h1>
        </div>
        <Link to="/learning/subjects/tamil">
          <Button
            variant="primary"
            size="sm"
            icon={<BookOpen className="w-4 h-4" />}
          >
            Open Tamil Hub
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECTS_DATA.map((subject) => (
          <div
            key={subject.id}
            className={`bento-card rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1 transition duration-300 ${
              subject.isSpecialModule
                ? "bento-card-emerald ring-2 ring-emerald-500/40 shadow-xl shadow-emerald-950/40"
                : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${
                    subject.isSpecialModule
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {getIcon(subject.iconName)}
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-300">
                  {subject.code}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-serif tracking-tight">
                {subject.nameTamil}
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-3">
                {subject.nameEnglish}
              </p>
              <p className="text-xs text-slate-200 leading-relaxed font-serif mb-4">
                {subject.descriptionTamil}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <Link to={`/learning/subjects/${subject.id}`}>
                <Button
                  variant={subject.id === "tamil" ? "primary" : "secondary"}
                  size="sm"
                  className="w-full justify-between font-bold"
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
