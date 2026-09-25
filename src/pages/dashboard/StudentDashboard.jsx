import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUserProgress } from "../../context/UserProgressContext";
import { MOCK_TAMIL_UNITS } from "../../data/mockTamilData";

import { Button } from "../../components/common/Button";
import { ProgressBar } from "../../components/common/ProgressBar";
import { StatWidget } from "../../components/gamification/StatWidget";
import { BadgeCard } from "../../components/gamification/BadgeCard";
import { XPProgressBar } from "../../components/gamification/XPProgressBar";
import {
  Sparkles,
  BookOpen,
  Play,
  ArrowRight,
  HelpCircle,
  Award,
  CheckCircle2,
  FileCheck,
  Zap,
} from "lucide-react";

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { progress, badges, isUnitUnlocked, isUnitCompleted } =
    useUserProgress();

  // Find current active lesson to resume
  const unit1 = MOCK_TAMIL_UNITS[0];
  const activeLesson =
    unit1.lessons.find((l) => !progress.completedLessonIds.includes(l.id)) ||
    unit1.lessons[0];

  const totalLessonsInUnit1 = unit1.lessons.length;
  const completedInUnit1 = unit1.lessons.filter((l) =>
    progress.completedLessonIds.includes(l.id),
  ).length;
  const overallPercentage = Math.round(
    (completedInUnit1 / totalLessonsInUnit1) * 100,
  );

  const totalSolved = progress.quizScores.reduce(
    (acc, q) => acc + q.totalQuestions,
    0,
  );
  const totalCorrect = progress.quizScores.reduce((acc, q) => acc + q.score, 0);
  const overallAccuracy =
    totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 83;

  return (
    <div className="space-y-6 text-left pb-12">
      {/* 1. BENTO GRID TOP MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* HERO / ACTIVE LESSON TILE (Col span 8) */}
        <div className="md:col-span-8 bento-card bento-card-emerald rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                <span>Today's Learning Goal</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-slate-900/80 px-2.5 py-1 rounded-xl border border-emerald-500/30">
                ⏱ {activeLesson.estimatedMinutes} mins
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white mb-2">
              Welcome back, {user?.fullName || "Student"}! 🌟
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
              Keep progressing through Grade 10 Tamil curriculum. Next lesson:{" "}
              <strong className="text-emerald-300 font-serif">
                {activeLesson.unitNameTamil} — {activeLesson.titleTamil}
              </strong>
            </p>

            {/* In-hero mini lesson progress */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-emerald-500/20 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-medium">
                <span>Unit 1 Progress</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {completedInUnit1} / {totalLessonsInUnit1} Lessons Completed
                </span>
              </div>
              <ProgressBar
                value={overallPercentage}
                color="emerald"
                size="sm"
                showPercentage={false}
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400 font-medium">
              Category: {activeLesson.categoryNameTamil} • Author:{" "}
              {activeLesson.author}
            </span>
            <Link to={`/lesson/tamil/${activeLesson.id}`}>
              <Button
                size="md"
                variant="accent"
                icon={<Play className="w-4 h-4 fill-current" />}
              >
                Resume Lesson
              </Button>
            </Link>
          </div>
        </div>

        {/* MODEL EXAM QUICK TILE (Col span 4) */}
        <div className="md:col-span-4 bento-card bento-card-rose rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center shadow-lg shadow-rose-950/50">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-500/40">
                Model Board Exam
              </span>
            </div>

            <h3 className="text-lg font-bold text-white font-sans mb-1">
              Unit 1 Model Board Exam
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              20 questions, 30-min countdown timer, instant score breakdown, and
              certificate.
            </p>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-950/50 p-3.5 rounded-2xl border border-rose-500/20">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pass Threshold:</span>
                <span className="font-mono font-bold text-emerald-400">
                  70% (14/20)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Reward:</span>
                <span className="font-mono font-bold text-amber-400">
                  +100 XP
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-500/20">
            <Link to="/test/tamil-unit-1" className="block w-full">
              <Button
                size="md"
                variant="danger"
                className="w-full justify-center"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Start Model Exam
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. XP PROGRESS BENTO BAR */}
      <XPProgressBar currentXp={progress.totalXp} />

      {/* 3. FOUR BENTO STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          titleEnglish="Questions Solved"
          value={totalSolved || 42}
          icon={<HelpCircle className="w-5 h-5" />}
          color="blue"
          trend="+12 this week"
        />

        <StatWidget
          titleEnglish="Correct Answers"
          value={totalCorrect || 35}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="emerald"
          trend="Great accuracy"
        />

        <StatWidget
          titleEnglish="Accuracy Rate"
          value={`${overallAccuracy}%`}
          icon={<Award className="w-5 h-5" />}
          color="purple"
          trend="80%+ passing benchmark"
        />

        <StatWidget
          titleEnglish="Total XP Points"
          value={progress.totalXp}
          icon={<Zap className="w-5 h-5" />}
          color="amber"
          trend="Level 5 approaching"
        />
      </div>

      {/* 4. BENTO ROW: ACHIEVEMENTS & CURRICULUM IYAL MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ACHIEVEMENT BADGES TILE (Col span 5) */}
        <div className="lg:col-span-5 bento-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-sans">
                  Achievement Badges
                </h3>
              </div>
              <Link
                to="/badges"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.slice(0, 2).map((badge) => (
                <BadgeCard
                  key={badge.id}
                  badge={badge}
                  isUnlocked={progress.unlockedBadgeIds.includes(badge.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
            <Link
              to="/badges"
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Learn more lessons to unlock {badges.length - 2} remaining badges
            </Link>
          </div>
        </div>

        {/* 10TH TAMIL IYAL MAP TILES (Col span 7) */}
        <div className="lg:col-span-7 bento-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-sans">
                  Grade 10 Tamil Units (Iyals)
                </h3>
              </div>
              <Link
                to="/learning/subjects/tamil"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Full Curriculum Map →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {MOCK_TAMIL_UNITS.slice(0, 2).map((unit) => {
                const completedCount = unit.lessons.filter((l) =>
                  progress.completedLessonIds.includes(l.id),
                ).length;
                const pct = Math.round(
                  (completedCount / unit.lessons.length) * 100,
                );
                const isUnlocked = isUnitUnlocked(unit.id);
                const isDone = isUnitCompleted(unit.id);

                return (
                  <div
                    key={unit.id}
                    className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between group ${
                      isUnlocked
                        ? "bg-slate-950/70 border-slate-800 hover:border-emerald-500/40"
                        : "bg-slate-950/40 border-slate-800/60 opacity-80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {unit.themeTamil}
                        </span>
                        {isDone ? (
                          <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 100%
                          </span>
                        ) : isUnlocked ? (
                          <span className="text-xs font-bold font-mono text-slate-300">
                            {pct}%
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full">
                            🔒 Locked
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white font-serif">
                        {unit.titleTamil}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {isUnlocked
                          ? unit.summary
                          : "Complete previous Iyal lessons to unlock this unit."}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {isUnlocked
                          ? `${unit.lessons.length} Lesson Modules`
                          : "Requires Iyal 1"}
                      </span>
                      <Link to="/learning/subjects/tamil">
                        <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          {isUnlocked ? "Explore" : "View Gate"}{" "}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Total 9 Units & 45 Lesson Modules</span>
            <Link
              to="/learning/subjects/tamil"
              className="text-emerald-400 font-semibold hover:underline"
            >
              View All Units
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
