import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, BookOpen, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { LESSON_QUESTION_SETS, COURSE_UNITS, COURSE_LESSONS } from "../../data/assessmentData";
import { useUserProgress } from "../../context/UserProgressContext";
import { TamilQuestionCard } from "../../components/quiz/TamilQuestionCard";
import { playGameSound } from "../../utils/gameSounds";

export const LessonPracticeEngine = () => {
  const { lessonId } = useParams();
  const { progress, isLessonUnlocked, markLessonComplete, recordQuizAttempt } = useUserProgress();
  const lesson = COURSE_LESSONS.find((item) => item.id === lessonId);
  const questions = LESSON_QUESTION_SETS[lessonId] || [];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!lesson || questions.length !== 5) return <Navigate to="/" replace />;
  if (!isLessonUnlocked(lessonId)) return <Navigate to="/" replace />;

  const score = questions.reduce((total, question, questionIndex) => total + (answers[questionIndex] === question.correctAnswerIndex ? 1 : 0), 0);
  const finishPractice = () => {
    if (result) return;
    const passed = score >= 3;
    recordQuizAttempt(lesson.unitId, score, questions.length);
    if (passed) {
      playGameSound("complete");
      markLessonComplete(lesson.id, lesson.unitId);
    }
    setResult({ score, passed });
  };
  const restart = () => { setAnswers({}); setIndex(0); setResult(null); };

  const unit = COURSE_UNITS.find((item) => item.id === lesson.unitId);
  const nextLesson = unit?.lessons.find((item) => item.id !== lesson.id && !progress.completedLessonIds.includes(item.id) && unit.lessons.findIndex((entry) => entry.id === item.id) > unit.lessons.findIndex((entry) => entry.id === lesson.id));
  const unitWillBeComplete = Boolean(unit?.lessons.every((item) => item.id === lesson.id || progress.completedLessonIds.includes(item.id)));
  const nextLessonHref = nextLesson ? `/lesson/tamil/${nextLesson.id}` : null;

  return (
    <main className="mx-auto max-w-3xl space-y-5 px-4 pb-24 pt-7">
      <header className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-amber-50 p-5 sm:p-7">
        <span className="text-xs font-bold text-emerald-800">பாடம் முடிந்தது · இப்போது பயிற்சி</span>
        <h1 className="mt-1 text-2xl font-black text-slate-900">{lesson.titleTamil}</h1>
        <p className="mt-2 text-sm text-slate-600">இந்தப் பாடத்திலிருந்து 5 வினாக்கள். 3 அல்லது அதற்கு மேற்பட்ட சரியான விடைகளுடன் அடுத்த படிக்குச் செல்லலாம்.</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white"><span className="block h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${((index + (answers[index] !== undefined ? 1 : 0)) / questions.length) * 100}%` }} /></div>
      </header>

      {result ? (
        <section className={`rounded-3xl border-2 p-6 text-center shadow-sm sm:p-9 ${result.passed ? "border-emerald-200 bg-emerald-50/50" : "border-amber-200 bg-amber-50/50"}`}>
          <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-white text-amber-700 shadow-sm">{result.passed ? <Trophy size={31} /> : <BookOpen size={30} />}</span>
          <h2 className="text-2xl font-black text-slate-900">{result.passed ? "பாடப் பயிற்சி முடிந்தது!" : "இன்னும் ஒரு முறை முயற்சி செய்யலாம்"}</h2>
          <p className="mt-2 text-slate-600">{result.score} / 5 சரியான விடைகள் · {result.passed ? "பாடம் முன்னேற்றத்தில் சேமிக்கப்பட்டது." : "3 சரியான விடைகள் தேவை. பாடத்தை மீண்டும் பார்த்துவிட்டு முயற்சிக்கவும்."}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {!result.passed ? <button type="button" onClick={restart} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white"><RotateCcw size={17} /> மீண்டும் முயற்சி செய்</button> : unitWillBeComplete ? <Link to={`/unit-quiz/${lesson.unitId}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">10 நிமிட இயல் தேர்வுக்குச் செல் <ArrowRight size={17} /></Link> : nextLessonHref ? <Link to={nextLessonHref} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">அடுத்த பாடம் <ArrowRight size={17} /></Link> : <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">பாடப்பாதைக்குத் திரும்பு <ArrowRight size={17} /></Link>}
            {result.passed && <Link to="/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700">முகப்புக்குச் செல்</Link>}
          </div>
        </section>
      ) : (
        <>
          <TamilQuestionCard question={questions[index]} questionNumber={index + 1} totalQuestions={questions.length} selectedOption={answers[index] ?? null} onSelectOption={(choice) => setAnswers((previous) => ({ ...previous, [index]: choice }))} reveal={answers[index] !== undefined} />
          <div className="flex items-center justify-between gap-3">
            <button type="button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))} className="rounded-lg px-3 py-2 font-semibold text-slate-600 disabled:opacity-40">முந்தைய வினா</button>
            {index < questions.length - 1 ? <button type="button" disabled={answers[index] === undefined} onClick={() => setIndex((value) => value + 1)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white disabled:opacity-40">அடுத்த வினா <ArrowRight size={17} /></button> : <button type="button" disabled={answers[index] === undefined} onClick={finishPractice} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white disabled:opacity-40"><Sparkles size={17} /> பயிற்சியை முடி</button>}
          </div>
        </>
      )}
    </main>
  );
};
