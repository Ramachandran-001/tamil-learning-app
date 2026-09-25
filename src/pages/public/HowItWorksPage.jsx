import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/common/Button";

export const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
          Platform Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-sans">
          How StudyPath Works
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          A sequential Iyal node progression model purpose-built for 10th
          Standard Tamil Medium students to achieve board exam mastery.
        </p>
      </div>

      {/* 4 Steps In Detail */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="bento-card bento-card-emerald rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 font-mono">
              1
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Step 1
                </span>
                <h3 className="text-lg font-bold text-white font-sans">
                  Unit Selection (Iyal Hub)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                Follow the official Tamil Nadu State Board curriculum from Unit
                1 (அமுதஊற்று) through Unit 7 (பெருவழி). Every unit contains
                Poetry (செய்யுள்), Prose (உரைநடை), Supplementary (துணைப்பாடம்),
                Activities, and Grammar (இலக்கணம்).
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-medium">
                  Units 1 through 7
                </span>
                <span className="text-[11px] px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 rounded-lg font-medium">
                  TN State Board Syllabus
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card bento-card-emerald rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/30 font-mono">
              2
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  Step 2
                </span>
                <h3 className="text-lg font-bold text-white font-sans">
                  Digital Reader & Interactive Tamil Glossary
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                Read textbook lessons while tapping on ancient Tamil vocabulary
                (சொல் பொருள்) to reveal roots, synonyms, and exam hints.
                Practice memory verses with audio pronunciation and synchronized
                line highlighting.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 bg-teal-950/80 border border-teal-500/30 text-teal-300 rounded-lg font-medium">
                  Word-by-Word Meanings
                </span>
                <span className="text-[11px] px-2.5 py-1 bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 rounded-lg font-medium">
                  Audio Recitation
                </span>
                <span className="text-[11px] px-2.5 py-1 bg-rose-950/80 border border-rose-500/30 text-rose-300 rounded-lg font-medium">
                  Public Exam Focus Notes
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card bento-card-indigo rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30 font-mono">
              3
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Step 3
                </span>
                <h3 className="text-lg font-bold text-white font-sans">
                  Grammar Drill & Practice Quiz Engine
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                Solve targeted questions covering grammatical rules (தொகைநிலை,
                தொகாநிலைத் தொடர், வழுவமைதி, அணி இலக்கணம்). Earn +10 XP per
                correct answer with instant textbook explanations and rule
                citations.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 rounded-lg font-medium">
                  Instant Explanation
                </span>
                <span className="text-[11px] px-2.5 py-1 bg-amber-950/80 border border-amber-500/30 text-amber-300 rounded-lg font-medium">
                  +10 XP per Question
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card bento-card-amber rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 font-mono">
              4
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step 4
                </span>
                <h3 className="text-lg font-bold text-white font-sans">
                  Timed Public Board Mock Exam
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                Experience realistic exam simulation with 20 questions in 30
                minutes, 70% passing benchmark, negative marks protections,
                comprehensive scorecards, and verifiable completion
                certificates.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 bg-amber-950/80 border border-amber-500/30 text-amber-300 rounded-lg font-medium">
                  30 Min Timer
                </span>
                <span className="text-[11px] px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 rounded-lg font-medium">
                  70% Pass Standard
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <Link to="/learning/subjects/tamil">
          <Button
            size="lg"
            variant="primary"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Explore 10th Tamil Curriculum
          </Button>
        </Link>
      </div>
    </div>
  );
};
