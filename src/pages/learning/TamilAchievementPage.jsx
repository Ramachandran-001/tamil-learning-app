import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Award, BookOpen, Mail, Sparkles, Trophy } from "lucide-react";
import { useUserProgress } from "../../context/UserProgressContext";
import { IMPORTANT_WRITTEN_QUESTIONS, COURSE_UNITS } from "../../data/assessmentData";

const FEEDBACK_EMAIL = "YOUR_EMAIL_HERE"; // மாணவர் உரிமையாளர் மின்னஞ்சலை இங்கே இடலாம்.

export const TamilAchievementPage = () => {
  const location = useLocation();
  const { progress } = useUserProgress();
  const [draftAnswers, setDraftAnswers] = useState({});
  const passed = progress.finalExamPassed || location.state?.passed;
  if (!passed) return <Navigate to="/" replace />;

  const score = location.state?.score ?? progress.finalExamScore ?? 140;
  const date = location.state?.passed
    ? new Date().toLocaleDateString("ta-IN", { dateStyle: "long" })
    : progress.finalExamAttempts?.slice().reverse().find((attempt) => attempt.passed)?.date;

  const mailHref = (item) => {
    const answer = draftAnswers[item.id]?.trim() || "(பதில் இன்னும் எழுதப்படவில்லை)";
    const subject = `தமிழ் ${item.marksWeightage} மதிப்பெண் விடை - ${item.title}`;
    const body = `வினா: ${item.title}\n\nபாடக்குறிப்பு: ${item.content}\n\nஎனது விடை:\n${answer}`;
    return `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="mx-auto max-w-4xl space-y-7 px-4 py-8 sm:py-12">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-amber-200 bg-gradient-to-br from-white via-amber-50 to-emerald-50 p-7 text-center shadow-xl sm:p-12">
        <span className="absolute -right-8 -top-8 text-8xl text-amber-100" aria-hidden="true">✦</span>
        <span className="relative mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[1.7rem] bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 shadow-lg"><Trophy size={38} /></span>
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black text-emerald-900"><Sparkles size={14} /> கற்றல் சாதனை நிறைவு</span>
        <h1 className="relative mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">தமிழில் தேர்ச்சி பெற்றுள்ளீர்கள்!</h1>
        <p className="relative mx-auto mt-3 max-w-xl text-base leading-7 text-slate-700">அனைத்து இயல்களையும் முடித்து இறுதித் தேர்வில் வெற்றி பெற்றுள்ளீர்கள். நீங்கள் <strong>தமிழ் கற்றல் சாதனையாளர்</strong>.</p>
        <div className="relative mx-auto my-7 grid max-w-md grid-cols-2 gap-3">
          <div className="rounded-2xl border border-amber-100 bg-white/90 p-4"><Award className="mx-auto mb-1 text-amber-600" size={22} /><strong className="block text-2xl font-black text-slate-900">{score} / 200</strong><span className="text-xs text-slate-500">இறுதித் தேர்வு மதிப்பெண்</span></div>
          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4"><BookOpen className="mx-auto mb-1 text-emerald-700" size={22} /><strong className="block text-2xl font-black text-slate-900">{COURSE_UNITS.length} / {COURSE_UNITS.length}</strong><span className="text-xs text-slate-500">இயல்கள் நிறைவு</span></div>
        </div>
        {date && <p className="relative text-sm text-slate-500">சாதனை பெற்ற நாள் · {date}</p>}
        <div className="relative mt-7 flex flex-wrap justify-center gap-3"><Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-sm hover:bg-emerald-800"><BookOpen size={18} /> பாடங்களை மீண்டும் படிக்கலாம்</Link></div>
        <p className="relative mt-4 text-xs text-slate-500">எல்லா இயல்களும் மீள்பார்வைக்கு திறந்திருக்கும்.</p>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5"><span className="text-xs font-bold text-emerald-700">எழுத்துப் பயிற்சி</span><h2 className="mt-1 text-2xl font-black text-slate-900">முக்கிய 2 மற்றும் 5 மதிப்பெண் வினாக்கள்</h2><p className="mt-2 text-sm leading-6 text-slate-600">விடையை எழுதிப் பயிற்சி செய்து, மின்னஞ்சல் பொத்தானை அழுத்தினால் உங்கள் பதில் மின்னஞ்சல் வரைவு திறக்கும். அனுப்புவதற்கு முன் பெறுநர் மின்னஞ்சலை அமைக்கவும்.</p></div>
        <div className="space-y-4">
          {[3, 2].map((mark) => <div key={mark}><h3 className="mb-2 font-extrabold text-emerald-900">{mark} மதிப்பெண் வினாக்கள்</h3>{IMPORTANT_WRITTEN_QUESTIONS.filter((item) => item.marksWeightage === mark).map((item) => <article key={item.id} className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="font-bold leading-6 text-slate-900">{item.title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{item.content}</p><label className="mt-3 block text-xs font-bold text-slate-700" htmlFor={`answer-${item.id}`}>உங்கள் விடை</label><textarea id={`answer-${item.id}`} value={draftAnswers[item.id] || ""} onChange={(event) => setDraftAnswers((old) => ({ ...old, [item.id]: event.target.value }))} rows={4} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm leading-6 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" placeholder="இங்கே உங்கள் விடையை எழுதுங்கள்" /><a href={mailHref(item)} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"><Mail size={16} /> இந்த விடையை மின்னஞ்சலில் அனுப்பு</a></article>)}</div>)}
        </div>
      </section>
    </main>
  );
};
