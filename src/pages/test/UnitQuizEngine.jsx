import React, { useCallback, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, RotateCcw, Trophy } from "lucide-react";
import { COURSE_UNITS, UNIT_QUESTION_SETS } from "../../data/assessmentData";
import { useUserProgress } from "../../context/UserProgressContext";
import { TamilQuestionCard } from "../../components/quiz/TamilQuestionCard";
import { QuizTimer } from "../../components/quiz/QuizTimer";
import { playGameSound } from "../../utils/gameSounds";

export const UnitQuizEngine = () => {
  const { unitId } = useParams();
  const { isUnitUnlocked, isUnitCompleted, areUnitLessonsComplete, recordUnitQuizAttempt } = useUserProgress();
  const unit = COURSE_UNITS.find((item) => item.id === unitId);
  const questions = UNIT_QUESTION_SETS[unitId] || [];
  const [stage, setStage] = useState("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [startedAt, setStartedAt] = useState(0);
  const submittedRef = useRef(false);

  const finishQuiz = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const score = questions.reduce((total, question, questionIndex) => total + (answers[questionIndex] === question.correctAnswerIndex ? 1 : 0), 0);
    const elapsed = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
    const passed = Math.round((score / questions.length) * 100) >= 70;
    recordUnitQuizAttempt(unitId, score, questions.length, elapsed);
    setResult({ score, total: questions.length, passed, elapsed });
    if (passed) playGameSound("complete");
    setStage("result");
  }, [answers, questions, recordUnitQuizAttempt, startedAt, unitId]);

  if (!unit || !questions.length) return <Navigate to="/" replace />;
  if (!isUnitUnlocked(unitId)) return <Navigate to="/" replace />;
  if (!areUnitLessonsComplete(unitId)) return <Navigate to="/" replace />;
  if (isUnitCompleted(unitId) && stage !== "result") return <Navigate to="/" replace />;

  const retry = () => {
    submittedRef.current = false;
    setAnswers({}); setIndex(0); setResult(null); setStartedAt(0); setStage("intro");
  };
  const currentQuestion = questions[index];

  return (
    <main className="mx-auto max-w-4xl space-y-5 px-3 pb-24 pt-6 sm:px-5">
      {stage === "intro" && <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-9">
        <div className="mb-5 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800"><Clock3 size={24} /></span><div><span className="text-xs font-bold text-emerald-700">பாடங்களுக்குப் பிந்தைய இயல் தேர்வு</span><h1 className="text-2xl font-black text-slate-900">{unit.titleTamil}</h1></div></div>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-emerald-50 p-4 text-center"><div><strong className="block text-xl font-black text-emerald-800">{questions.length}</strong><span className="text-xs text-slate-600">வினாக்கள்</span></div><div><strong className="block text-xl font-black text-emerald-800">10:00</strong><span className="text-xs text-slate-600">நிமிடங்கள்</span></div><div><strong className="block text-xl font-black text-emerald-800">70%</strong><span className="text-xs text-slate-600">தேர்ச்சி வரம்பு</span></div></div>
        <p className="my-5 leading-7 text-slate-700">இந்த இயலின் ஒவ்வொரு பாடத்திற்கான 5 பயிற்சி வினாக்களும் இங்கே மீண்டும் கேட்கப்படும். 10 நிமிடத்தில் முடித்து அடுத்த இயலைத் திறக்கவும்.</p>
        <div className="flex flex-wrap gap-3"><button type="button" onClick={() => { submittedRef.current = false; setStartedAt(Date.now()); setStage("active"); }} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">10 நிமிடத் தேர்வைத் தொடங்கு <ArrowRight size={17} className="ml-1 inline" /></button><Link to="/" className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700">பாடப்பாதைக்குத் திரும்பு</Link></div>
      </section>}

      {stage === "active" && <section className="space-y-4">
        <header className="sticky top-[68px] z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur"><div className="flex items-center justify-between gap-2"><div><span className="block text-xs font-bold text-emerald-700">{unit.titleTamil}</span><strong className="text-sm text-slate-800">வினா {index + 1} / {questions.length}</strong></div><div className="flex items-center gap-2"><QuizTimer key={`${unitId}-${stage}`} initialSeconds={600} onTimeUp={finishQuiz} /><button type="button" onClick={finishQuiz} className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white">சமர்ப்பி</button></div></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100"><span className="block h-full rounded-full bg-emerald-600" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div><div className="mt-2 flex max-h-16 flex-wrap gap-1 overflow-y-auto">{questions.map((_, questionIndex) => <button key={questionIndex} type="button" aria-label={`வினா ${questionIndex + 1}`} onClick={() => setIndex(questionIndex)} className={`h-6 min-w-6 rounded px-1 text-[10px] font-bold ${index === questionIndex ? "bg-emerald-700 text-white" : answers[questionIndex] !== undefined ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-500"}`}>{questionIndex + 1}</button>)}</div></header>
        <TamilQuestionCard question={currentQuestion} questionNumber={index + 1} totalQuestions={questions.length} selectedOption={answers[index] ?? null} onSelectOption={(choice) => setAnswers((previous) => ({ ...previous, [index]: choice }))} />
        <div className="flex justify-between"><button type="button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-600 disabled:opacity-40"><ArrowLeft size={17} /> முந்தைய வினா</button>{index < questions.length - 1 ? <button type="button" onClick={() => setIndex((value) => value + 1)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 font-semibold text-white">அடுத்த வினா <ArrowRight size={17} /></button> : <button type="button" onClick={finishQuiz} className="rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white">தேர்வை முடிக்கவும்</button>}</div>
      </section>}

      {stage === "result" && result && <section className={`mx-auto max-w-xl rounded-3xl border-2 p-7 text-center shadow-sm ${result.passed ? "border-emerald-200 bg-emerald-50/50" : "border-amber-200 bg-amber-50/50"}`}><span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-white text-amber-700 shadow-sm">{result.passed ? <Trophy size={32} /> : <CheckCircle2 size={30} />}</span><h1 className="text-2xl font-black text-slate-900">{result.passed ? "இயல் தேர்ச்சி!" : "மீண்டும் முயற்சி செய்யலாம்"}</h1><p className="mt-2 text-slate-600">{result.score} / {result.total} · {Math.round((result.score / result.total) * 100)}% · 10 நிமிடத் தேர்வு</p><p className="mt-2 text-sm text-slate-600">{result.passed ? "அடுத்த இயல் திறக்கப்பட்டது. முந்தைய பாடங்களும் மீள்பார்வைக்கு திறந்திருக்கும்." : "அடுத்த இயலைத் திறக்க 70% மதிப்பெண் தேவை."}</p><div className="mt-6 flex flex-wrap justify-center gap-3">{result.passed ? <Link to="/" className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">பாடப்பாதைக்குச் செல் <ArrowRight size={17} className="ml-1 inline" /></Link> : <button type="button" onClick={retry} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white"><RotateCcw size={17} /> மீண்டும் தேர்வு எழுது</button>}<Link to="/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700">பாடங்களை மீண்டும் படி</Link></div></section>}
    </main>
  );
};
