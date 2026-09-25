import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Volume2,
  FileCheck,
} from "lucide-react";
import { Button } from "../../components/common/Button";

import { MOCK_TAMIL_UNITS } from "../../data/mockTamilData";
import { TESTIMONIALS_DATA } from "../../data/mockData";

export const LandingPage = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Decorative ambient background accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            Tamil Nadu 10th Standard Public Board Exam Preparation Portal
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-blue tracking-tight font-sans max-w-4xl mx-auto leading-tight sm:leading-tight">
          Master 10th Grade &{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Score Centum (100/100)
          </span>{" "}
          with Guided Learning
        </h1>

        <p className="mt-6 text-sm sm:text-base text-green-500 max-w-2xl mx-auto leading-relaxed">
          Complete Tamil Nadu Samacheer Kalvi textbook chapters, interactive
          word-by-word Tamil glossaries, memory verse audio recitation, and
          timed 30-minute public board mock exams in one unified platform.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/learning/subjects/tamil">
            <Button
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Start Learning for Free
            </Button>
          </Link>
          <Link to="/learning/subjects/tamil">
            <Button size="lg" variant="outline">
              Explore All Units (Iyal 1-7)
            </Button>
          </Link>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-4 bento-card rounded-2xl border border-slate-800 shadow-lg">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              7+
            </span>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Complete Units (இயல்)
            </p>
          </div>
          <div className="p-4 bento-card rounded-2xl border border-slate-800 shadow-lg">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              100%
            </span>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              TN State Board Aligned
            </p>
          </div>
          <div className="p-4 bento-card rounded-2xl border border-slate-800 shadow-lg">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              500+
            </span>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Tamil Word Meanings
            </p>
          </div>
          <div className="p-4 bento-card rounded-2xl border border-slate-800 shadow-lg">
            <span className="text-2xl font-black text-emerald-400 font-mono">
              30 Min
            </span>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Timed Mock Unit Exams
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHY STUDYPATH? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
            Why StudyPath?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans mt-2">
            Four Core Pillars Built for Student Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Move beyond rote memorization to deeply understand and master Tamil
            literature and grammar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bento-card bento-card-emerald rounded-3xl p-6 text-left hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">
              Full Iyal Framework
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
              Every unit neatly covers Poetry (கவிதைப் பேழை), Prose (உரைநடை),
              Supplementary (விரிவானம்), Activities (கற்பவை), and Grammar
              (இலக்கணம்).
            </p>
          </div>

          <div className="bento-card bento-card-amber rounded-3xl p-6 text-left hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">
              Interactive Word Glossary
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
              Click on classical words (சொல் பொருள்) to uncover root meanings,
              synonyms, exam contexts, and sample sentence applications
              instantly.
            </p>
          </div>

          <div className="bento-card bento-card-indigo rounded-3xl p-6 text-left hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center mb-4">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">
              Audio Recitation Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
              Hear pristine Tamil pronunciation and rhythm for mandatory memory
              verses (மனப்பாடப் பாடல்கள்) with synced line highlighting and
              speed control.
            </p>
          </div>

          <div className="bento-card bento-card-rose rounded-3xl p-6 text-left hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">
              Board Mock Tests
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
              20 questions, 30 minutes, 70% passing threshold with realistic
              board patterns, negative marks safeguards, and immediate answer
              reviews.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="bg-slate-950/60 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
              Learning Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans mt-2">
              Step-by-Step Mastery Path
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="p-6 bento-card rounded-3xl relative">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center mb-3 font-mono">
                01
              </div>
              <h4 className="text-base font-bold text-white font-sans">
                Select Your Unit (Iyal)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
                Choose any chapter from Unit 1 to Unit 7 on your interactive
                Tamil syllabus map.
              </p>
            </div>

            <div className="p-6 bento-card bento-card-emerald rounded-3xl relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-3 font-mono">
                02
              </div>
              <h4 className="text-base font-bold text-white font-sans">
                Read Digital Textbook
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
                Study with integrated glossaries, exam focus callouts, and
                synchronized audio verse recitation.
              </p>
            </div>

            <div className="p-6 bento-card bento-card-indigo rounded-3xl relative">
              <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white font-bold text-xs flex items-center justify-center mb-3 font-mono">
                03
              </div>
              <h4 className="text-base font-bold text-white font-sans">
                Take Practice Quizzes
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
                Test concepts with instant feedback, solution breakdowns, and
                earn +10 XP per question.
              </p>
            </div>

            <div className="p-6 bento-card bento-card-amber rounded-3xl relative">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mb-3 font-mono">
                04
              </div>
              <h4 className="text-base font-bold text-white font-sans">
                Unlock Milestones & Badges
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-serif">
                Earn prestigious badges like Board Exam Architect, Grammar
                Prodigy, and Centum Master.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 10TH TAMIL SPOTLIGHT (Iyal Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
              Curriculum Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans mt-2">
              10th Grade Tamil Curriculum Catalog (தமிழ் இயல்கள்)
            </h2>
          </div>
          <Link to="/learning/subjects/tamil">
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              View All Units
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TAMIL_UNITS.slice(0, 3).map((unit) => (
            <div
              key={unit.id}
              className="bento-card bento-card-emerald rounded-3xl p-6 text-left flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                    {unit.themeTamil}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {unit.lessons.length} Lessons
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-serif mb-1 tracking-tight">
                  {unit.titleTamil}
                </h3>
                <p className="text-xs text-slate-400 font-medium mb-3">
                  {unit.themeEnglish}
                </p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3 font-serif">
                  {unit.summary}
                </p>

                <div className="mt-4 pt-3.5 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                    Key Lessons:
                  </span>
                  {unit.lessons.slice(0, 3).map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center gap-2 text-xs text-slate-200 font-serif"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="truncate font-medium">
                        {l.titleTamil}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal font-sans">
                        ({l.categoryNameTamil.split(" ")[0]})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <Link to={`/learning/subjects/tamil`}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-between font-bold"
                  >
                    <span>Study Unit Lessons</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
            Student Reviews
          </span>
          <h2 className="text-2xl font-black text-white font-sans mt-2">
            What 10th Standard Students in Tamil Nadu Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="bento-card rounded-3xl p-6 text-left flex flex-col justify-between hover:-translate-y-1 transition duration-300"
            >
              <p className="text-xs sm:text-sm text-slate-200 italic font-serif leading-relaxed mb-4">
                "{t.quoteTamil}"
              </p>
              <div className="flex items-center gap-3 pt-3.5 border-t border-slate-800/80">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">
                    {t.nameTamil}
                  </h4>
                  <p className="text-xs text-slate-400">{t.schoolTamil}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black font-sans tracking-tight">
              Ready to Excel in Your 10th Standard Board Exams?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Access all unit lessons, interactive glossaries, memory verse
              audio recitations, and timed board exam practice for free.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="accent"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Create Free Student Account
                </Button>
              </Link>
              <Link to="/learning/subjects/tamil">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Browse Curriculum
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
