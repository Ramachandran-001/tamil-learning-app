import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MOCK_TAMIL_UNITS,
  MOCK_QUIZ_QUESTIONS as TAMIL_QUIZ,
} from "../../data/mockTamilData";
import { useUserProgress } from "../../context/UserProgressContext";
import { playGameSound } from "../../utils/gameSounds";
import { MCQCard } from "../../components/quiz/MCQCard";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { ProgressBar } from "../../components/common/ProgressBar";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Zap,
  Lock,
  Play,
} from "lucide-react";

export const PracticeQuizEngine = () => {
  const { subjectId, unitId } = useParams();
  const navigate = useNavigate();
  const {
    addXp,
    recordQuizAttempt,
    isUnitUnlocked,
    getUnitPrerequisite,
    progress,
  } = useUserProgress();

  const UNITS_DATA = MOCK_TAMIL_UNITS;
  const QUIZ_DATA = TAMIL_QUIZ;

  const currentUnit =
    UNITS_DATA.find((u) => u.id === unitId) || UNITS_DATA[0];

  const isUnlocked = isUnitUnlocked(currentUnit.id);
  const prerequisite = getUnitPrerequisite(currentUnit.id);

  // Get questions for this unit or fallback to general pool
  const unitQuestions = QUIZ_DATA.filter(
    (q) => q.unitId === currentUnit.id,
  );
  const questions =
    unitQuestions.length > 0 ? unitQuestions : QUIZ_DATA.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredMap, setAnsweredMap] = useState({});
  const [earnedXp, setEarnedXp] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // If unit is locked, show locked guard
  if (!isUnlocked && prerequisite) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bento-card bento-card-rose rounded-3xl p-8 space-y-6 shadow-2xl border-2 border-rose-500/40">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center mx-auto shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-500/40 px-3 py-1 rounded-full">
              Quiz Locked • வினாடி வினா பூட்டப்பட்டுள்ளது
            </span>
            <h2 className="text-2xl font-black text-white font-serif mt-3">
              {currentUnit.titleTamil}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Finish all lessons in{" "}
              <strong className="text-white">
                {prerequisite.prevUnit.titleTamil}
              </strong>{" "}
              before unlocking quizzes in this unit.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Link to={`/learning/subjects/${subjectId}`}>
              <Button
                variant="outline"
                size="md"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Curriculum Hub
              </Button>
            </Link>
            <Button
              variant="accent"
              size="md"
              onClick={() => navigate(`/learning/subjects/${subjectId}`)}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              Resume Previous Unit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentSelected = selectedAnswers[currentIndex] ?? null;
  const isCurrentAnswered = answeredMap[currentIndex] || false;

  const handleSelectOption = (optIndex) => {
    if (isCurrentAnswered) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
    setAnsweredMap((prev) => ({ ...prev, [currentIndex]: true }));

    if (optIndex === currentQuestion.correctAnswerIndex) {
      playGameSound("correct");
      addXp(currentQuestion.points || 10, "பயிற்சி வினாடி விடை");
      setEarnedXp((prev) => prev + (currentQuestion.points || 10));
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const correct = Object.entries(selectedAnswers).filter(
        ([idx, opt]) => opt === questions[Number(idx)].correctAnswerIndex,
      ).length;
      recordQuizAttempt(currentUnit.id, correct, totalQuestions);
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setAnsweredMap({});
    setEarnedXp(0);
    setIsCompleted(false);
  };

  const totalAnsweredCount = Object.keys(answeredMap).length;
  const correctCount = Object.entries(selectedAnswers).filter(
    ([idx, opt]) => opt === questions[Number(idx)].correctAnswerIndex,
  ).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left pb-16">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to={`/learning/subjects/${subjectId}`}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            title="பாட வரைபடத்திற்குத் திரும்பு"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
              {currentUnit.titleTamil}
            </span>
            <h1 className="text-xl font-bold text-slate-900 font-serif">
              இலக்கண & பாடப் பயிற்சி வினாடி வினா
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>+{earnedXp} XP ஈட்டப்பட்டது</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <ProgressBar
            value={Math.round((totalAnsweredCount / totalQuestions) * 100)}
            label={`பயிற்சி முன்னேற்றம்: ${totalAnsweredCount} / ${totalQuestions} வினாக்கள் முடிந்தது`}
            color="emerald"
            size="sm"
          />

          {/* Active Question Card */}
          <MCQCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            selectedOption={currentSelected}
            onSelectOption={handleSelectOption}
            showExplanation={isCurrentAnswered}
            isSubmitted={isCurrentAnswered}
          />

          {/* Action Navigation Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              variant="ghost"
              size="md"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              முந்தைய வினா
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              {currentIndex < totalQuestions - 1
                ? "அடுத்த வினா"
                : "பயிற்சியை முடிக்க"}
            </Button>
          </div>
        </div>
      ) : (
        /* Summary & Results View */
        <Card variant="default" className="p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 font-serif">
              பயிற்சி வினாடி வினா நிறைவடைந்தது! 🎉
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {currentUnit.titleTamil} பாடப்பகுதிக்கான பயிற்சிகளை வெற்றிகரமாக
              முடித்துள்ளீர்கள்.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-4 border-y border-slate-100">
            <div>
              <span className="text-2xl font-black text-slate-900 font-mono block">
                {correctCount} / {totalQuestions}
              </span>
              <span className="text-[11px] text-slate-400">சரியான விடைகள்</span>
            </div>
            <div>
              <span className="text-2xl font-black text-emerald-700 font-mono block">
                {Math.round((correctCount / totalQuestions) * 100)}%
              </span>
              <span className="text-[11px] text-slate-400">
                துல்லிய விகிதம்
              </span>
            </div>
            <div>
              <span className="text-2xl font-black text-amber-600 font-mono block">
                +{earnedXp}
              </span>
              <span className="text-[11px] text-slate-400">ஈட்டிய XP</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={handleReset}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              மீண்டும் பயிற்சி செய்க
            </Button>

            <Link to={`/test/${currentUnit.id}`}>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                மாதிரி பொதுத்தேர்வு எழுது
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};
