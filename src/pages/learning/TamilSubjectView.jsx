import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MOCK_TAMIL_UNITS,
  MOCK_THIRUKKURAL_CHAPTERS,
} from "../../data/mockTamilData";
import { useUserProgress } from "../../context/UserProgressContext";

import { Button } from "../../components/common/Button";
import { ProgressBar } from "../../components/common/ProgressBar";
import { LessonPathMap } from "../../components/learning/LessonPathMap";
import {
  Sparkles,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  Lock,
  Play,
  Volume2,
} from "lucide-react";

export const TamilSubjectView = () => {
  const {
    progress,
    isUnitCompleted,
    isUnitUnlocked,
    isLessonUnlocked,
    getUnitPrerequisite,
    recentlyUnlockedUnit,
    clearRecentlyUnlockedUnit,
  } = useUserProgress();
  const [selectedUnitId, setSelectedUnitId] = useState("tamil-unit-1");
  const [activeTab, setActiveTab] = useState("iyals");

  const selectedUnit =
    MOCK_TAMIL_UNITS.find((u) => u.id === selectedUnitId) ||
    MOCK_TAMIL_UNITS[0];
  const isSelectedUnlocked = isUnitUnlocked(selectedUnit.id);
  const selectedUnitPrerequisite = getUnitPrerequisite(selectedUnit.id);

  const totalLessons = MOCK_TAMIL_UNITS.reduce(
    (acc, u) => acc + u.lessons.length,
    0,
  );
  const completedLessons = progress.completedLessonIds.length;
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  // Filter lessons for manappadam tab
  const manappadamLessons = MOCK_TAMIL_UNITS.flatMap((u) =>
    u.lessons.filter((l) => l.manappadam),
  );

  return (
    <div className="space-y-6 text-left pb-12">
      {/* 0. RECENTLY UNLOCKED UNIT CELEBRATION BANNER */}
      {recentlyUnlockedUnit && (
        <div className="bento-card bento-card-amber rounded-3xl p-5 border-2 border-amber-400 shadow-2xl relative animate-bounce-short">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 text-xl">
                🔓
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  New Unit Unlocked! • புதிய இயல் திறக்கப்பட்டது
                </span>
                <h3 className="text-base font-bold text-white font-serif">
                  {recentlyUnlockedUnit.titleTamil}:{" "}
                  {recentlyUnlockedUnit.themeTamil}
                </h3>
                <p className="text-xs text-slate-300">
                  Previous Iyal successfully completed! You can now access all 5
                  modules in this Iyal.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <Button
                variant="accent"
                size="sm"
                onClick={() => {
                  setSelectedUnitId(recentlyUnlockedUnit.id);
                  clearRecentlyUnlockedUnit();
                }}
              >
                Open {recentlyUnlockedUnit.titleTamil.split(":")[0]} →
              </Button>
              <button
                onClick={clearRecentlyUnlockedUnit}
                className="text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. HUB BANNER BENTO */}
      <div className="bento-card bento-card-emerald rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TN State Board Tamil Medium Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white">
              Grade 10 Tamil Learning Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Units 1 to 7: Sequential Node Progression. Complete Iyal 1 to
              unlock Iyal 2, Iyal 2 to unlock Iyal 3, continuing step-by-step to
              board exam mastery.
            </p>
          </div>

          <div className="shrink-0 p-5 bg-slate-950/70 backdrop-blur-xl rounded-2xl border border-emerald-500/30 min-w-[220px] text-center shadow-lg">
            <span className="text-xs text-emerald-300 font-semibold block mb-1">
              Overall Tamil Completion
            </span>
            <span className="text-3xl font-black font-mono text-white">
              {overallProgress}%
            </span>
            <ProgressBar
              value={overallProgress}
              color="emerald"
              size="sm"
              showPercentage={false}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("iyals")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "iyals"
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
          }`}
        >
          Curriculum Map (Units 1-7)
        </button>
        <button
          onClick={() => setActiveTab("manappadam")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "manappadam"
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
          }`}
        >
          Memory Verses (மனப்பாடப் பகுதி)
        </button>
        <button
          onClick={() => setActiveTab("thirukkural")}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === "thirukkural"
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
          }`}
        >
          Thirukkural (திருக்குறள்)
        </button>
      </div>

      {/* 3. TAB 1: IYALS CONTENT */}
      {activeTab === "iyals" && (
        <div className="space-y-6">
          {/* Iyal Selector Buttons with Sequential Unlock Status */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {MOCK_TAMIL_UNITS.map((unit) => {
              const isSelected = unit.id === selectedUnitId;
              const isDone = isUnitCompleted(unit.id);
              const isUnlocked = isUnitUnlocked(unit.id);
              const completedCount = unit.lessons.filter((l) =>
                progress.completedLessonIds.includes(l.id),
              ).length;

              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`px-4 py-2.5 rounded-2xl text-left border transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? isUnlocked
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30 shadow-md"
                        : "bg-rose-950/40 border-rose-500/80 text-rose-200 font-bold ring-2 ring-rose-500/30 shadow-md"
                      : isUnlocked
                        ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        : "bg-slate-950/40 border-slate-800/60 text-slate-500 hover:border-slate-700 hover:text-slate-400 opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold">
                      {unit.titleTamil.split(":")[0]}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : isUnlocked ? (
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                        {completedCount}/{unit.lessons.length}
                      </span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate max-w-[140px]">
                    {isUnlocked ? unit.themeTamil : "Locked (பூட்டப்பட்டது)"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sequential Unit Unlock Gate or Content */}
          {!isSelectedUnlocked && selectedUnitPrerequisite ? (
            /* LOCKED UNIT GATE CARD */
            <div className="bento-card bento-card-rose rounded-3xl p-8 text-center space-y-6 shadow-2xl border-2 border-rose-500/40">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center mx-auto shadow-xl shadow-rose-950/60">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-500/40 px-3 py-1 rounded-full">
                    Iyal Locked • பூட்டப்பட்டுள்ளது
                  </span>
                  <h3 className="text-2xl font-black text-white font-serif mt-3">
                    {selectedUnit.titleTamil}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    <strong className="text-white">
                      {selectedUnitPrerequisite.prevUnit.titleTamil}
                    </strong>
                    -ன் அனைத்து {selectedUnitPrerequisite.totalCount}{" "}
                    பாடங்களையும் முடித்த பிறகே இந்த இயல் திறக்கப்படும்.
                  </p>
                  <p className="text-xs text-rose-300 font-sans mt-1">
                    You must complete all lessons in{" "}
                    {selectedUnitPrerequisite.prevUnit.titleTamil.split(":")[0]}{" "}
                    to unlock this unit.
                  </p>
                </div>

                {/* Prerequisite Unit Progress Box */}
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 text-left space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold font-serif">
                      {selectedUnitPrerequisite.prevUnit.titleTamil} Progress
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {selectedUnitPrerequisite.completedCount} /{" "}
                      {selectedUnitPrerequisite.totalCount} Lessons Done
                    </span>
                  </div>
                  <ProgressBar
                    value={Math.round(
                      (selectedUnitPrerequisite.completedCount /
                        selectedUnitPrerequisite.totalCount) *
                        100,
                    )}
                    color="emerald"
                    size="sm"
                    showPercentage={false}
                  />

                  <p className="text-[11px] text-slate-400">
                    {selectedUnitPrerequisite.totalCount -
                      selectedUnitPrerequisite.completedCount}{" "}
                    more lesson(s) remaining in{" "}
                    {selectedUnitPrerequisite.prevUnit.titleTamil.split(":")[0]}{" "}
                    to unlock {selectedUnit.titleTamil.split(":")[0]}.
                  </p>
                </div>

                {/* Action CTA to Jump to Prerequisite */}
                <div className="pt-2">
                  <Button
                    variant="accent"
                    size="md"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      setSelectedUnitId(selectedUnitPrerequisite.prevUnit.id)
                    }
                    icon={<Play className="w-4 h-4 fill-current" />}
                  >
                    Go to{" "}
                    {selectedUnitPrerequisite.prevUnit.titleTamil.split(":")[0]}{" "}
                    to Complete Lessons
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* UNLOCKED UNIT CONTENT */
            <>
              {/* Sequential Node Progression Map for the Selected Unit */}
              <LessonPathMap unit={selectedUnit} />

              {/* Unit Academic Modules Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">
                      {selectedUnit.titleTamil}: {selectedUnit.themeTamil} —
                      Lesson Modules
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedUnit.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to={`/practice/tamil/${selectedUnit.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<HelpCircle className="w-4 h-4" />}
                      >
                        Practice Quiz
                      </Button>
                    </Link>
                    <Link to={`/test/${selectedUnit.id}`}>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<FileCheck className="w-4 h-4" />}
                      >
                        Model Exam
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* List of 5 Lessons in this Iyal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedUnit.lessons.map((lesson, idx) => {
                    const isDone = progress.completedLessonIds.includes(
                      lesson.id,
                    );
                    const isLessonUnlockedNow = isLessonUnlocked(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`bento-card rounded-3xl p-5 flex flex-col justify-between ${
                          isDone
                            ? "border-emerald-500/40 bg-emerald-950/20"
                            : !isLessonUnlockedNow
                              ? "opacity-70 bg-slate-950/40 border-slate-800"
                              : ""
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                              {lesson.categoryNameTamil}
                            </span>
                            {isDone ? (
                              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Completed
                              </span>
                            ) : isLessonUnlockedNow ? (
                              <span className="text-xs text-slate-400 font-mono">
                                ⏱ {lesson.estimatedMinutes} mins
                              </span>
                            ) : (
                              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" /> Complete Module{" "}
                                {idx} first
                              </span>
                            )}
                          </div>

                          <h4 className="text-base font-bold text-white font-serif mb-0.5">
                            {lesson.titleTamil}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium mb-2">
                            Author: {lesson.author}
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                            {lesson.introduction}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-slate-400">
                            <span>
                              {lesson.solPorulList.length} Glossary terms
                            </span>
                            <span>•</span>
                            <span>{lesson.examHighlights.length} Key Q&As</span>
                            {lesson.manappadam && (
                              <>
                                <span>•</span>
                                <span className="font-bold text-amber-400">
                                  ★ Memory Verse
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-mono">
                            Module {idx + 1}
                          </span>
                          {isLessonUnlockedNow ? (
                            <Link to={`/lesson/tamil/${lesson.id}`}>
                              <Button
                                variant={isDone ? "outline" : "primary"}
                                size="sm"
                              >
                                <span>
                                  {isDone ? "Review Lesson" : "Start Lesson"}
                                </span>
                                <Play className="w-3.5 h-3.5 ml-1 fill-current" />
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="secondary"
                              size="sm"
                              disabled
                              icon={<Lock className="w-3.5 h-3.5" />}
                            >
                              Locked
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 4. TAB 2: MANAPPADAM (Memory Verses) */}
      {activeTab === "manappadam" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30 text-amber-200 text-xs">
            <span className="font-bold">TN Board Exam Focus: </span>
            Memory poems (அன்னை மொழியே, காலக்கணிதம், காசிக்காண்டம்,
            முத்துக்குமாரசாமி பிள்ளைத்தமிழ், கம்பராமாயணம், திருக்குறள்) carry
            mandatory 5-mark questions in the public board examination.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manappadamLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bento-card bento-card-amber rounded-3xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    Unit {lesson.unitNumber}: {lesson.unitNameTamil}
                  </span>
                  <span className="text-xs text-slate-400">
                    {lesson.author}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white font-serif">
                  {lesson.titleTamil}
                </h4>

                {lesson.poemLines && (
                  <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 font-serif text-xs leading-loose text-amber-100 whitespace-pre-line">
                    {lesson.poemLines.join("\n")}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <Link to={`/lesson/tamil/${lesson.id}`}>
                    <Button
                      variant="accent"
                      size="sm"
                      icon={<Volume2 className="w-4 h-4" />}
                    >
                      Read with Audio Guide
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: THIRUKKURAL */}
      {activeTab === "thirukkural" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed">
            <h4 className="font-bold text-sm mb-1 font-sans">
              Thirukkural Moral Literature
            </h4>
            Essential chapters from the Grade 10 Tamil curriculum: ஒழுக்கமுடைமை,
            மெய் உணர்தல், பெரியாரைத் துணைக்கோடல், கொடுங்கோன்மை, கண்ணோட்டம்,
            ஆள்வினை உடைமை, பொருள் செயல்வகை, கூடா நட்பு, பகை மாட்சி, நன்றிஇல்
            செல்வம், குடிசெயல் வகை, நல்குரவு, இரவு, கயமை.
          </div>

          <div className="space-y-4">
            {MOCK_THIRUKKURAL_CHAPTERS.map((chap) => (
              <div
                key={chap.chapterNumber}
                className="bento-card rounded-3xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    Chapter {chap.chapterNumber}
                  </span>
                  <h4 className="text-base font-bold text-white font-serif">
                    {chap.chapterTamil}
                  </h4>
                </div>

                <div className="space-y-3">
                  {chap.couplets.map((c) => (
                    <div
                      key={c.number}
                      className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 text-left space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold font-mono text-emerald-400">
                          Kural {c.number}
                        </span>
                      </div>
                      <p className="font-serif font-bold text-sm text-slate-100 leading-relaxed">
                        {c.verse1}
                        <br />
                        {c.verse2}
                      </p>
                      <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                        <strong className="text-emerald-300">
                          பொருள் (Meaning):{" "}
                        </strong>
                        {c.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
