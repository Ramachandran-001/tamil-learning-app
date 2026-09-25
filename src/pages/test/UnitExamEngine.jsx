import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MOCK_TAMIL_UNITS,
  MOCK_QUIZ_QUESTIONS,
} from "../../data/mockTamilData";
import { useUserProgress } from "../../context/UserProgressContext";
import { MCQCard } from "../../components/quiz/MCQCard";
import { QuizTimer } from "../../components/quiz/QuizTimer";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Modal } from "../../components/common/Modal";
import {
  FileCheck,
  Award,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Lock,
  Play,
} from "lucide-react";

export const UnitExamEngine = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const {
    recordExamAttempt,
    addXp,
    isUnitUnlocked,
    getUnitPrerequisite,
    progress,
  } = useUserProgress();

  const currentUnit =
    MOCK_TAMIL_UNITS.find((u) => u.id === unitId) || MOCK_TAMIL_UNITS[0];

  const isUnlocked = isUnitUnlocked(currentUnit.id);
  const prerequisite = getUnitPrerequisite(currentUnit.id);

  // Pool questions for this unit or fallback to all questions
  const unitQuestions = MOCK_QUIZ_QUESTIONS.filter(
    (q) => q.unitId === currentUnit.id,
  );
  const examQuestions =
    unitQuestions.length >= 5 ? unitQuestions : MOCK_QUIZ_QUESTIONS;
  const totalQuestions = examQuestions.length;
  const passThresholdMarks = Math.ceil(totalQuestions * 0.7); // 70%

  // Exam States: 'intro' | 'active' | 'result'
  const [examState, setExamState] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [examStartTime, setExamStartTime] = useState(Date.now());
  const [timeTakenSeconds, setTimeTakenSeconds] = useState(0);

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
              Exam Locked • மாதிரித் தேர்வு பூட்டப்பட்டுள்ளது
            </span>
            <h2 className="text-2xl font-black text-white font-serif mt-3">
              {currentUnit.titleTamil}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Finish all lessons in{" "}
              <strong className="text-white">
                {prerequisite.prevUnit.titleTamil}
              </strong>{" "}
              before unlocking the model exam for this unit.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Link to="/curriculum/tamil">
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
              onClick={() => navigate("/curriculum/tamil")}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              Resume Previous Unit
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const startExam = () => {
    setExamState("active");
    setExamStartTime(Date.now());
  };

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleFinishExam = () => {
    const timeSpent = Math.max(
      1,
      Math.round((Date.now() - examStartTime) / 1000),
    );
    setTimeTakenSeconds(timeSpent);
    setShowSubmitModal(false);

    // Calculate score
    let score = 0;
    examQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        score += 1;
      }
    });

    const passed = score >= passThresholdMarks;
    recordExamAttempt(currentUnit.id, score, totalQuestions, timeSpent);

    if (passed) {
      addXp(100, "மாதிரிப் பொதுத்தேர்வு தேர்ச்சி");
    }

    setExamState("result");
  };

  // Result Calculations
  const correctCount = examQuestions.filter(
    (q, idx) => selectedAnswers[idx] === q.correctAnswerIndex,
  ).length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = correctCount >= passThresholdMarks;

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-20">
      {/* 1. INTRO / INSTRUCTIONS SCREEN */}
      {examState === "intro" && (
        <Card variant="default" className="p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-600/20">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                அரசு பொதுத்தேர்வு மாதிரித் தேர்வு (Model Board Exam)
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                {currentUnit.titleTamil}: {currentUnit.themeTamil}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
            <div>
              <span className="text-xl font-black text-slate-900 font-mono block">
                {totalQuestions}
              </span>
              <span className="text-xs text-slate-500">வினாக்கள்</span>
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 font-mono block">
                30
              </span>
              <span className="text-xs text-slate-500">நிமிடங்கள்</span>
            </div>
            <div>
              <span className="text-xl font-black text-emerald-700 font-mono block">
                70%
              </span>
              <span className="text-xs text-slate-500">தேர்ச்சி வரம்பு</span>
            </div>
            <div>
              <span className="text-xl font-black text-amber-600 font-mono block">
                +100
              </span>
              <span className="text-xs text-slate-500">வெற்றி XP</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 font-serif">
              தேர்வு விதிகள் & வழிமுறைகள்:
            </h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>
                இத்தேர்வில் செய்யுள், உரைநடை, விரிவானம் மற்றும் இலக்கணப்
                பகுதிகள் சம அளவில் இடம்பெற்றுள்ளன.
              </li>
              <li>
                30 நிமிட கவுண்டவுன் டைமர் முடிந்ததும் தேர்வு தானாகவே முடிவுக்கு
                வரும்.
              </li>
              <li>
                தேர்வு முடிந்ததும் உடனடி மதிப்பெண் பலகை, தவறான விடைகளுக்கான
                திருத்த விளக்கம் மற்றும் சான்றிதழ் வழங்கப்படும்.
              </li>
            </ul>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Link to="/learning/subjects/tamil">
              <Button variant="ghost" size="md">
                பின்னர் எழுதுகிறேன்
              </Button>
            </Link>

            <Button
              variant="danger"
              size="lg"
              onClick={startExam}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              தேர்வைத் தொடங்கு
            </Button>
          </div>
        </Card>
      )}

      {/* 2. ACTIVE EXAM SCREEN */}
      {examState === "active" && (
        <div className="space-y-6">
          {/* Top Bar with Timer */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm sticky top-16 z-20">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
                இயல் மாதிரித் தேர்வு
              </span>
              <h2 className="text-sm font-bold text-slate-900 font-serif truncate max-w-xs">
                {currentUnit.titleTamil}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <QuizTimer initialSeconds={1800} onTimeUp={handleFinishExam} />

              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowSubmitModal(true)}
              >
                தேர்வை சமர்ப்பி
              </Button>
            </div>
          </div>

          {/* Question Grid Map */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">
                வினாத் தேர்வு பலகை (Question Matrix):
              </span>
              <span className="text-xs font-mono text-slate-500">
                {answeredCount} / {totalQuestions} விடையளிக்கப்பட்டது
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {examQuestions.map((_, idx) => {
                const isSelected = selectedAnswers[idx] !== undefined;
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                      isCurrent
                        ? "bg-rose-600 text-white ring-2 ring-rose-300"
                        : isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Question */}
          <MCQCard
            question={examQuestions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={totalQuestions}
            selectedOption={selectedAnswers[currentIndex] ?? null}
            onSelectOption={handleSelectOption}
            showExplanation={false}
            isSubmitted={false}
          />

          {/* Bottom Nav */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="md"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              முந்தைய வினா
            </Button>

            {currentIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setCurrentIndex((p) => p + 1)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                அடுத்த வினா
              </Button>
            ) : (
              <Button
                variant="danger"
                size="md"
                onClick={() => setShowSubmitModal(true)}
              >
                விடைத்தாளை சமர்ப்பி
              </Button>
            )}
          </div>
        </div>
      )}

      {/* 3. EXAM RESULT & SCORECARD & CERTIFICATE SCREEN */}
      {examState === "result" && (
        <div className="space-y-6">
          {/* Certificate / Scorecard Card */}
          <Card
            variant="default"
            className={`p-6 sm:p-8 text-center space-y-6 border-2 ${
              isPassed
                ? "border-emerald-300 bg-gradient-to-b from-white via-emerald-50/20 to-white"
                : "border-rose-200"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg ${
                isPassed
                  ? "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 shadow-amber-500/20"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {isPassed ? (
                <Award className="w-9 h-9" />
              ) : (
                <AlertTriangle className="w-9 h-9" />
              )}
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                <span>தேர்வு முடிவுகள் (Exam Results)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                {isPassed
                  ? "வாழ்த்துகள்! நீங்கள் தேர்ச்சி பெற்றுள்ளீர்கள்! 🏆"
                  : "மீண்டும் பயிற்சி தேவை! 📚"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                மாணவரே, நீங்கள் {currentUnit.titleTamil}{" "}
                மாதிரிப் பொதுத்தேர்வை முடித்துள்ளீர்கள்.
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div>
                <span className="text-2xl font-black text-slate-900 font-mono block">
                  {correctCount} / {totalQuestions}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  மதிப்பெண்
                </span>
              </div>
              <div>
                <span
                  className={`text-2xl font-black font-mono block ${isPassed ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {scorePercentage}%
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  சதவீதம்
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 font-mono block">
                  {Math.floor(timeTakenSeconds / 60)}:
                  {(timeTakenSeconds % 60).toString().padStart(2, "0")}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  எடுத்துக்கொண்ட நேரம்
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-amber-600 font-mono block">
                  {isPassed ? "+100 XP" : "+20 XP"}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  ஈட்டிய புள்ளிகள்
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedAnswers({});
                  setExamState("intro");
                }}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                மீண்டும் தேர்வு எழுது
              </Button>
              <Link to="/learning/subjects/tamil">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  அடுத்த இயல் கற்க
                </Button>
              </Link>
            </div>
          </Card>

          {/* Detailed Question by Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>விடைத்தாள் விரிவான மறுபார்வை (Answer Sheet Review)</span>
            </h3>

            <div className="space-y-4">
              {examQuestions.map((q, idx) => (
                <MCQCard
                  key={q.id}
                  question={q}
                  questionNumber={idx + 1}
                  totalQuestions={totalQuestions}
                  selectedOption={selectedAnswers[idx] ?? null}
                  onSelectOption={() => {}}
                  showExplanation={true}
                  isSubmitted={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="தேர்வை முடிக்க உறுதிப்படுத்துங்கள்"
        titleTamil="விடைத்தாளை சமர்ப்பிக்கவா?"
        maxWidth="sm"
      >
        <div className="space-y-4 text-left text-xs">
          <p className="text-slate-600 leading-relaxed">
            நீங்கள் <strong className="text-slate-900">{totalQuestions}</strong>{" "}
            வினாக்களில்{" "}
            <strong className="text-emerald-700">{answeredCount}</strong>{" "}
            வினாக்களுக்கு விடையளித்துள்ளீர்கள்.
          </p>

          {answeredCount < totalQuestions && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl">
              இன்னும் {totalQuestions - answeredCount} வினாக்களுக்கு நீங்கள்
              விடையளிக்கவில்லை!
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSubmitModal(false)}
            >
              தேர்வைத் தொடர்
            </Button>
            <Button variant="danger" size="sm" onClick={handleFinishExam}>
              ஆம், சமர்ப்பி
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
