import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck, LockKeyhole, Send, Sparkles } from "lucide-react";
import { COURSE_UNITS, FINAL_TAMIL_QUESTIONS, IMPORTANT_WRITTEN_QUESTIONS } from "../../data/assessmentData";
import { useUserProgress } from "../../context/UserProgressContext";
import { playGameSound } from "../../utils/gameSounds";

const LETTERS = ["அ", "ஆ", "இ", "ஈ"];

export const FinalTamilExam = () => {
  const navigate = useNavigate();
  const { progress, isUnitCompleted, recordFinalExamAttempt } = useUserProgress();
  const courseIsComplete = COURSE_UNITS.every((unit) => isUnitCompleted(unit.id));
  const [page, setPage] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const currentQuestion = FINAL_TAMIL_QUESTIONS[currentIndex];
  const reviewByMarks = useMemo(() => ({
    2: IMPORTANT_WRITTEN_QUESTIONS.filter((item) => item.marksWeightage === 2),
    3: IMPORTANT_WRITTEN_QUESTIONS.filter((item) => item.marksWeightage === 3),
  }), []);

  if (!courseIsComplete) return <Navigate to="/" replace />;
  if (progress.finalExamPassed && page !== "success") return <Navigate to="/achievement/tamil" replace />;

  const startExam = () => {
    setStartedAt(Date.now());
    setPage("active");
  };

  const finishExam = () => {
    const score = FINAL_TAMIL_QUESTIONS.reduce(
      (sum, question, index) => sum + (answers[index] === question.correctAnswerIndex ? 1 : 0),
      0,
    );
    const timeTakenSeconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
    const passed = score >= Math.ceil(FINAL_TAMIL_QUESTIONS.length * 0.7);
    recordFinalExamAttempt(score, FINAL_TAMIL_QUESTIONS.length, timeTakenSeconds);
    setResult({ score, percentage: Math.round((score / FINAL_TAMIL_QUESTIONS.length) * 100), timeTakenSeconds, passed });
    if (passed) {
      playGameSound("complete");
      navigate("/achievement/tamil", { state: { score, total: FINAL_TAMIL_QUESTIONS.length, timeTakenSeconds, passed: true } });
    } else {
      setPage("result");
    }
  };

  const restartExam = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setStartedAt(null);
    setPage("intro");
  };

  return (
    <main className="mx-auto max-w-6xl space-y-5 px-3 pb-24 pt-5 sm:px-5">
      {page === "intro" && (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_350px]">
          <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-9">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800"><FileCheck size={25} /></span>
              <div><span className="text-xs font-bold text-emerald-700">{COURSE_UNITS.length} இயல்களுக்கான இறுதித் தேர்வு</span><h1 className="text-2xl font-black text-slate-900">தமிழ் முழுமைச் சவால்</h1></div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-emerald-50 p-4 text-center">
              <div><strong className="block text-2xl font-black text-emerald-800">200</strong><span className="text-xs text-slate-600">ஒரு மதிப்பெண் வினாக்கள்</span></div>
              <div><strong className="block text-2xl font-black text-emerald-800">140</strong><span className="text-xs text-slate-600">தேர்ச்சிக்கு (70%)</span></div>
              <div><strong className="block text-2xl font-black text-emerald-800">{COURSE_UNITS.length}</strong><span className="text-xs text-slate-600">இயல்கள்</span></div>
            </div>
            <p className="my-5 leading-7 text-slate-700">ஒவ்வொரு இயலிலும் படித்த பாடங்கள், சொற்பொருள், இலக்கணம் மற்றும் தேர்வுக் குறிப்புகளிலிருந்து வினாக்கள் இடம்பெறும். நேர வரம்பில்லை; 200 வினாக்களுக்கும் பதிலளித்து முடித்ததும் மதிப்பெண் தெரியும்.</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={startExam} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-sm hover:bg-emerald-800"><Sparkles size={18} /> இறுதித் தேர்வைத் தொடங்கு <ArrowRight size={17} /></button>
              <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700"><ArrowLeft size={17} /> பாடப்பாதைக்குத் திரும்பு</Link>
            </div>
          </section>
          <ImportantQuestions reviewByMarks={reviewByMarks} />
        </div>
      )}

      {page === "active" && (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-4">
            <header className="sticky top-[68px] z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center justify-between gap-3"><div><span className="text-xs font-bold text-emerald-700">இறுதித் தேர்வு</span><strong className="ml-2 text-sm text-slate-800">வினா {currentIndex + 1} / 200</strong></div><button type="button" onClick={finishExam} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-bold text-white sm:px-4 sm:text-sm"><Send size={15} /> விடைத்தாளை முடிக்கவும்</button></div>
              <div className="h-2 overflow-hidden rounded-full bg-emerald-100"><span className="block h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${((currentIndex + 1) / FINAL_TAMIL_QUESTIONS.length) * 100}%` }} /></div>
              <div className="mt-2 flex max-h-20 flex-wrap gap-1.5 overflow-y-auto" aria-label="வினா எண்கள்">
                {FINAL_TAMIL_QUESTIONS.map((_, index) => <button key={index} type="button" aria-label={`வினா ${index + 1}`} aria-current={index === currentIndex ? "step" : undefined} onClick={() => setCurrentIndex(index)} className={`h-7 min-w-7 rounded-md px-1 text-[10px] font-bold ${index === currentIndex ? "bg-emerald-700 text-white" : answers[index] !== undefined ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-500"}`}>{index + 1}</button>)}
              </div>
            </header>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">{currentQuestion.grammarCategory || "தமிழ்ப் பாடம்"}</span><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">1 மதிப்பெண்</span></div>
              <h2 className="mb-5 text-lg font-bold leading-8 text-slate-900">{currentQuestion.questionTamil}</h2>
              <div className="space-y-2.5">
                {currentQuestion.optionsTamil.map((option, optionIndex) => <button key={`${currentQuestion.id}-${optionIndex}`} type="button" aria-pressed={answers[currentIndex] === optionIndex} onClick={() => setAnswers((previous) => ({ ...previous, [currentIndex]: optionIndex }))} className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left leading-6 transition ${answers[currentIndex] === optionIndex ? "border-emerald-500 bg-emerald-50 font-semibold text-emerald-950 ring-2 ring-emerald-100" : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/40"}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black ${answers[currentIndex] === optionIndex ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700"}`}>{LETTERS[optionIndex]}</span><span>{option}</span></button>)}
              </div>
              <div className="mt-5 flex justify-between gap-3 border-t border-slate-100 pt-4"><button type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-600 disabled:opacity-40"><ArrowLeft size={17} /> முந்தைய வினா</button>{currentIndex < FINAL_TAMIL_QUESTIONS.length - 1 ? <button type="button" onClick={() => setCurrentIndex((index) => index + 1)} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white">அடுத்த வினா <ArrowRight size={17} /></button> : <button type="button" onClick={finishExam} className="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white">விடைத்தாளை முடிக்கவும்</button>}</div>
            </article>
          </section>
          <ImportantQuestions reviewByMarks={reviewByMarks} />
        </div>
      )}

      {page === "result" && result && (
        <section className="mx-auto max-w-2xl rounded-3xl border-2 border-amber-200 bg-gradient-to-b from-white to-amber-50 p-7 text-center shadow-sm sm:p-10">
          <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-amber-100 text-amber-800"><LockKeyhole size={32} /></span>
          <h1 className="text-2xl font-black text-slate-900">இன்னும் கொஞ்சம் பயிற்சி தேவை</h1>
          <p className="mt-2 text-slate-600">தேர்ச்சிக்கு 140 மதிப்பெண்கள் தேவை. பாடங்களை மீண்டும் படித்து இறுதித் தேர்வை மீண்டும் எழுதலாம்.</p>
          <div className="my-6 rounded-2xl bg-white p-5"><strong className="text-4xl font-black text-emerald-800">{result.score} / 200</strong><p className="mt-1 text-sm text-slate-500">{result.percentage}%</p></div>
          <div className="flex flex-wrap justify-center gap-3"><button type="button" onClick={restartExam} className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white">மீண்டும் தேர்வு எழுது</button><Link to="/" className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700">பாடங்களை மீண்டும் படி</Link></div>
        </section>
      )}
    </main>
  );
};

const ImportantQuestions = ({ reviewByMarks }) => (
  <aside className="rounded-3xl border border-amber-100 bg-amber-50/60 p-4 sm:p-5">
    <h2 className="mb-3 flex items-center gap-2 font-black text-slate-900"><CheckCircle2 size={19} className="text-amber-700" /> முக்கிய வினாக்கள் · மீள்பார்வை</h2>
    {[3, 2].map((mark) => (
      <section key={mark} className="mb-3 rounded-2xl border border-white bg-white/80 p-3">
        <h3 className="mb-2 text-sm font-extrabold text-amber-900">{mark} மதிப்பெண் வினாக்கள்</h3>
        {reviewByMarks[mark].length ? reviewByMarks[mark].map((item) => <article key={item.id} className="border-t border-amber-100 py-2 first:border-0"><p className="text-xs font-bold leading-5 text-slate-800">{item.title}</p><p className="mt-1 text-xs leading-5 text-slate-600">{item.content}</p></article>) : <p className="text-xs text-slate-500">இந்த மதிப்பெண் வகைக்கான வினாக்கள் இன்னும் சேர்க்கப்படவில்லை.</p>}
      </section>
    ))}
    <p className="text-[11px] leading-5 text-slate-500">இந்த வினாக்கள் தேர்வுக்கு முன்/பின் படித்து எழுதிப் பழகுவதற்கானவை; 200 மதிப்பெண் தேர்வில் தானாக மதிப்பிடப்படாது.</p>
  </aside>
);
