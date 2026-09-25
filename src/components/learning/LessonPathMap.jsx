import React from "react";

import { useUserProgress } from "../../context/UserProgressContext";
import { CheckCircle2, Lock, Play, HelpCircle, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const LessonPathMap = ({ unit, subjectId = "tamil" }) => {
  const { progress } = useUserProgress();

  const getLessonStatus = (lessonId, index) => {
    const isCompleted = progress.completedLessonIds.includes(lessonId);
    if (isCompleted) return "completed";

    // First uncompleted lesson is active, rest are locked
    const prevLessonsCompleted = unit.lessons
      .slice(0, index)
      .every((l) => progress.completedLessonIds.includes(l.id));

    if (prevLessonsCompleted) return "active";
    return "locked";
  };

  const isPracticeUnlocked = unit.lessons
    .slice(0, 2)
    .some((l) => progress.completedLessonIds.includes(l.id));
  const isExamUnlocked = unit.lessons.every((l) =>
    progress.completedLessonIds.includes(l.id),
  );

  return (
    <div className="bento-card rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Step-by-Step Learning Path
          </span>
          <h3 className="text-sm font-bold text-white font-sans">
            Unit Progression Flow
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {
            unit.lessons.filter((l) =>
              progress.completedLessonIds.includes(l.id),
            ).length
          }{" "}
          / {unit.lessons.length} Completed
        </span>
      </div>

      {/* Visual Progression Nodes */}
      <div className="relative">
        {/* Horizontal connector line for large screens */}
        <div className="hidden lg:block absolute top-7 left-8 right-8 h-1 bg-slate-800 -z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3.5 relative z-10">
          {unit.lessons.map((lesson, idx) => {
            const status = getLessonStatus(lesson.id, idx);

            return (
              <div
                key={lesson.id}
                className="flex flex-col items-center text-center"
              >
                {status === "completed" ? (
                  <Link
                    to={`/lesson/${subjectId}/${lesson.id}`}
                    className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:scale-105 hover:bg-emerald-400 transition group cursor-pointer"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </Link>
                ) : status === "active" ? (
                  <Link
                    to={`/lesson/${subjectId}/${lesson.id}`}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 ring-4 ring-amber-500/30 animate-pulse hover:scale-105 transition cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </Link>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-slate-950/80 text-slate-600 border border-slate-800 flex items-center justify-center cursor-not-allowed">
                    <Lock className="w-5 h-5" />
                  </div>
                )}

                <div className="mt-2.5 px-1">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block ${
                      status === "completed"
                        ? "text-emerald-400"
                        : status === "active"
                          ? "text-amber-400 font-extrabold"
                          : "text-slate-500"
                    }`}
                  >
                    {status === "completed"
                      ? "Done"
                      : status === "active"
                        ? "Active"
                        : "Locked"}
                  </span>
                  <p className="text-xs font-bold text-slate-200 line-clamp-1 font-serif mt-0.5">
                    {lesson.titleTamil}
                  </p>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {lesson.categoryNameTamil.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Practice Module Node */}
          <div className="flex flex-col items-center text-center">
            {isPracticeUnlocked ? (
              <Link
                to={`/practice/${subjectId}/${unit.id}`}
                className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:scale-105 hover:bg-indigo-500 transition cursor-pointer"
              >
                <HelpCircle className="w-6 h-6" />
              </Link>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-slate-950/80 text-slate-600 border border-slate-800 flex items-center justify-center cursor-not-allowed">
                <Lock className="w-5 h-5" />
              </div>
            )}
            <div className="mt-2.5 px-1">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${isPracticeUnlocked ? "text-indigo-400" : "text-slate-500"}`}
              >
                Practice
              </span>
              <p className="text-xs font-bold text-slate-200 font-sans mt-0.5">
                Practice Quiz
              </p>
              <span className="text-[10px] text-slate-400 block">
                +10 XP / Q
              </span>
            </div>
          </div>

          {/* Unit Exam Test Node */}
          <div className="flex flex-col items-center text-center">
            <Link
              to={`/test/${unit.id}`}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition cursor-pointer ${
                isExamUnlocked
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 hover:scale-105 hover:bg-rose-600"
                  : "bg-rose-950/60 text-rose-300 border border-rose-500/30 hover:bg-rose-900/60"
              }`}
            >
              <FileCheck className="w-6 h-6" />
            </Link>
            <div className="mt-2.5 px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                Model Exam
              </span>
              <p className="text-xs font-bold text-slate-200 font-sans mt-0.5">
                Unit Board Test
              </p>
              <span className="text-[10px] text-slate-400 block">
                20 Qs | 30 Mins
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
