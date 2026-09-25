import React from "react";
import { useUserProgress } from "../../context/UserProgressContext";
import { useAuth } from "../../context/AuthContext";
import { MOCK_TAMIL_UNITS } from "../../data/mockTamilData";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { ProgressBar } from "../../components/common/ProgressBar";
import { StatWidget } from "../../components/gamification/StatWidget";
import { XPProgressBar } from "../../components/gamification/XPProgressBar";
import {
  CheckCircle2,
  Award,
  Zap,
  Flame,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export const StudentProgressPage = () => {
  const { progress } = useUserProgress();
  const { user } = useAuth();

  const totalLessons = MOCK_TAMIL_UNITS.reduce(
    (acc, u) => acc + u.lessons.length,
    0,
  );
  const completedLessons = progress.completedLessonIds.length;
  const overallPercentage = Math.round((completedLessons / totalLessons) * 100);

  const totalSolved = progress.quizScores.reduce(
    (acc, q) => acc + q.totalQuestions,
    0,
  );
  const totalCorrect = progress.quizScores.reduce((acc, q) => acc + q.score, 0);
  const overallAccuracy =
    totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 83;

  return (
    <div className="space-y-6 text-left pb-12">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            மாணவர் பகுப்பாய்வு பலகை
          </span>
          <h1 className="text-2xl font-bold text-slate-900 font-serif">
            கற்றல் முன்னேற்றம் & பகுப்பாய்வு
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/learning/subjects/tamil">
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              பாடங்களைக் கற்க
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. STATS OVERVIEW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          titleTamil="முடிக்கப்பட்ட பாடங்கள்"
          titleEnglish="Lessons Completed"
          value={`${completedLessons} / ${totalLessons}`}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="emerald"
        />

        <StatWidget
          titleTamil="தேர்வுத் துல்லியம்"
          titleEnglish="Accuracy Rate"
          value={`${overallAccuracy}%`}
          icon={<Award className="w-5 h-5" />}
          color="purple"
        />

        <StatWidget
          titleTamil="தொடர் கற்றல் நாட்கள்"
          titleEnglish="Daily Streak"
          value={`${progress.currentStreak} நாட்கள்`}
          icon={<Flame className="w-5 h-5" />}
          color="amber"
        />

        <StatWidget
          titleTamil="மொத்த XP புள்ளிகள்"
          titleEnglish="Total Experience"
          value={progress.totalXp}
          icon={<Zap className="w-5 h-5" />}
          color="blue"
        />
      </div>

      <XPProgressBar currentXp={progress.totalXp} />

      {/* 3. IYAL-BY-IYAL PROGRESS BREAKDOWN */}
      <Card variant="default" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              10-ஆம் வகுப்பு இயல்கள் முன்னேற்ற நிலை (Iyal Breakdown)
            </h3>
            <p className="text-xs text-slate-500">
              ஒவ்வொரு இயலிலும் முடிக்கப்பட்ட பாடங்கள் மற்றும் சதவீதங்கள்
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            ஒட்டுமொத்த நிறைவு: {overallPercentage}%
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {MOCK_TAMIL_UNITS.map((unit) => {
            const unitDone = unit.lessons.filter((l) =>
              progress.completedLessonIds.includes(l.id),
            ).length;
            const unitPct = Math.round((unitDone / unit.lessons.length) * 100);

            return (
              <div
                key={unit.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 font-serif">
                      {unit.titleTamil}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ({unit.themeTamil})
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    {unitDone} / {unit.lessons.length} பாடங்கள் ({unitPct}%)
                  </span>
                </div>
                <ProgressBar
                  value={unitPct}
                  color="emerald"
                  size="sm"
                  showPercentage={false}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4. PAST EXAM SCORES & HISTORY */}
      <Card variant="default" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              எழுதிய தேர்வுகள் வரலாறு (Exam History Logs)
            </h3>
            <p className="text-xs text-slate-500">
              மாதிரிப் பொதுத்தேர்வுகளில் நீங்கள் பெற்ற மதிப்பெண்கள்
            </p>
          </div>
        </div>

        {progress.quizScores.length === 0 &&
        progress.examScores.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 space-y-2">
            <FileCheck className="w-8 h-8 text-slate-300 mx-auto" />
            <p>இதுவரை எந்த மாதிரித் தேர்வையும் எழுதவில்லை.</p>
            <Link to="/test/tamil-unit-1">
              <Button variant="outline" size="sm">
                இயல் 1 தேர்வு எழுது
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {progress.quizScores.map((score, idx) => {
              const pct = Math.round(
                (score.score / score.totalQuestions) * 100,
              );
              const passed = pct >= 70;
              const unit = MOCK_TAMIL_UNITS.find((u) => u.id === score.unitId);

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        passed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {pct}%
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-serif">
                        {unit?.titleTamil || "இயல் பயிற்சி வினாடி வினா"}
                      </h4>
                      <p className="text-[10px] text-slate-400">{score.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {score.score} / {score.totalQuestions} மதிப்பெண்
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        passed
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {passed ? "தேர்ச்சி" : "மறுமுயற்சி"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
