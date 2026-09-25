import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MOCK_TAMIL_UNITS } from "../../data/mockTamilData";
import { useUserProgress } from "../../context/UserProgressContext";
import { playGameSound } from "../../utils/gameSounds";
import { TamilWordGlossary } from "../../components/learning/TamilWordGlossary";
import { TamilAudioPlayer } from "../../components/learning/TamilAudioPlayer";
import { ExamFocusCard } from "../../components/learning/ExamFocusCard";
import { Button } from "../../components/common/Button";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  Sparkles,
  CheckCircle2,
  Edit3,
  HelpCircle,
  FileCheck,
  Moon,
  Sun,
  Coffee,
  Type,
  Check,
  Play,
  Lock,
} from "lucide-react";

export const TamilLessonReader = () => {
  const { subjectId, lessonId } = useParams();
  const navigate = useNavigate();

  const UNITS_DATA = MOCK_TAMIL_UNITS;
  const {
    progress,
    markLessonComplete,
    toggleBookmark,
    isBookmarked,
    saveLessonNote,
    getLessonNote,
    isUnitUnlocked,
    isLessonUnlocked,
    getUnitPrerequisite,
  } = useUserProgress();

  const [fontSize, setFontSize] = useState("base");
  const [readerTheme, setReaderTheme] = useState("light");
  const [highContrast, setHighContrast] = useState(false);
  const [activeTab, setActiveTab] = useState("content");

  // Locate the lesson across units
  const allLessons = UNITS_DATA.flatMap((u) => u.lessons);
  const currentLesson =
    allLessons.find((l) => l.id === lessonId) || allLessons[0];
  const currentUnit =
    UNITS_DATA.find((u) => u.id === currentLesson?.unitId) ||
    UNITS_DATA[0];

  const isCurrentUnitUnlocked = isUnitUnlocked(currentUnit.id);
  const isCurrentLessonUnlocked = isLessonUnlocked(currentLesson.id);
  const unitPrerequisite = getUnitPrerequisite(currentUnit.id);

  const [studentNote, setStudentNote] = useState(
    () => getLessonNote(currentLesson.id) || "",
  );
  const [noteSaved, setNoteSaved] = useState(false);

  // Find next lesson
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  const isCompleted = progress.completedLessonIds.includes(currentLesson.id);
  const bookmarked = isBookmarked(currentLesson.id);

  const handleMarkComplete = () => {
    navigate(`/practice/tamil/lesson/${currentLesson.id}`);
  };

  const handleSaveNote = () => {
    saveLessonNote(currentLesson.id, studentNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const fontSizeClasses = {
    sm: "text-sm sm:text-base leading-relaxed",
    base: "text-base sm:text-lg leading-loose",
    lg: "text-lg sm:text-xl leading-loose",
    xl: "text-xl sm:text-2xl leading-loose",
  };

  // Dynamic Theme Styling
  const themeContainerStyles = {
    light: "bg-white border-slate-200 text-slate-950",
    sepia: "bg-[#fcf8f0] border-[#ecdcc7] text-[#2c1d11]",
    dark: "bg-slate-950 border-slate-800 text-slate-100",
  };

  const themeCardStyles = {
    light: "bg-white border-slate-200 shadow-xs",
    sepia: "bg-[#f7efe1] border-[#e2d0b5] shadow-xs text-[#26170d]",
    dark: "bg-slate-900 border-slate-800 shadow-md text-slate-100",
  };

  const textContrastStyles = {
    light: highContrast
      ? "text-black font-semibold"
      : "text-slate-950 font-medium",
    sepia: highContrast
      ? "text-[#1a0f07] font-semibold"
      : "text-[#2e1b0f] font-medium",
    dark: highContrast
      ? "text-white font-semibold"
      : "text-slate-100 font-medium",
  };

  // IF UNIT OR LESSON IS LOCKED, SHOW GUARD VIEW
  if (!isCurrentUnitUnlocked && unitPrerequisite) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="bento-card bento-card-rose rounded-3xl p-8 space-y-6 shadow-2xl border-2 border-rose-500/40">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center justify-center mx-auto shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-500/40 px-3 py-1 rounded-full">
              Iyal Locked • பூட்டப்பட்டுள்ளது
            </span>
            <h2 className="text-2xl font-black text-white font-serif mt-3">
              {currentUnit.titleTamil} is Currently Locked
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
              You must finish all lessons in{" "}
              <strong className="text-white">
                {unitPrerequisite.prevUnit.titleTamil}
              </strong>{" "}
              before unlocking this Iyal.
            </p>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 text-left max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">
                {unitPrerequisite.prevUnit.titleTamil.split(":")[0]}
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {unitPrerequisite.completedCount} /{" "}
                {unitPrerequisite.totalCount} Done
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all"
                style={{
                  width: `${Math.round((unitPrerequisite.completedCount / unitPrerequisite.totalCount) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to={`/learning/subjects/${subjectId}`}>
              <Button
                variant="outline"
                size="md"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                பாடப்பாதைக்குத் திரும்பு
              </Button>
            </Link>
            <Button
              variant="accent"
              size="md"
              onClick={() => {
                const uncompleted = unitPrerequisite.prevUnit.lessons.find(
                  (l) => !progress.completedLessonIds.includes(l.id),
                );
                if (uncompleted) {
                  navigate(`/lesson/${subjectId}/${uncompleted.id}`);
                } else {
                  navigate(`/learning/subjects/${subjectId}`);
                }
              }}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              மீண்டும் தொடர்க
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-4xl mx-auto space-y-6 text-left pb-28 pt-2 rounded-3xl transition-colors duration-200 p-2 sm:p-4 ${readerTheme === "dark" ? "bg-slate-950/60" : readerTheme === "sepia" ? "bg-[#faf4e8]/60" : ""}`}
    >
      {/* 1. TOP NAVIGATION & ACCESSIBILITY CONTROLS */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${readerTheme === "dark" ? "border-slate-800" : "border-slate-200"}`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/learning/subjects/${subjectId}`)}
            className={`p-2 rounded-xl transition cursor-pointer ${
              readerTheme === "dark"
                ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
            title="தமிழ் பாடப்பாதைக்குத் திரும்பு"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
              {currentLesson.unitNameTamil} • {currentLesson.categoryNameTamil?.replace(/\s*\([^)]*\)\s*/g, " ").trim()}
            </span>
            <h1
              className={`text-xl sm:text-2xl font-bold font-serif ${readerTheme === "dark" ? "text-white" : "text-slate-950"}`}
            >
              {currentLesson.titleTamil}
            </h1>
          </div>
        </div>

        {/* Action & Reader Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Reader Theme Mode Selector */}
          <div
            className={`flex items-center p-0.5 rounded-xl border ${readerTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}
          >
            <button
              onClick={() => setReaderTheme("light")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                readerTheme === "light"
                  ? "bg-white text-slate-950 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="ஒளி வாசிப்பு முறை"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">ஒளி</span>
            </button>
            <button
              onClick={() => setReaderTheme("sepia")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                readerTheme === "sepia"
                  ? "bg-[#f4ebd9] text-[#2c1d11] shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="கண் சோர்வு குறைக்கும் முறை"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">செப்பியா</span>
            </button>
            <button
              onClick={() => setReaderTheme("dark")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                readerTheme === "dark"
                  ? "bg-slate-800 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="இரவு வாசிப்பு முறை"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">இரவு</span>
            </button>
          </div>

          {/* High Contrast Text Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              highContrast
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : readerTheme === "dark"
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:text-slate-950"
            }`}
            title="எழுத்துகளை இன்னும் தெளிவாகக் காட்ட"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">தெளிவான எழுத்து</span>
            {highContrast && <Check className="w-3 h-3 text-emerald-400" />}
          </button>

          {/* Font Size Adjuster */}
          <div
            className={`flex items-center p-0.5 rounded-xl border ${readerTheme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}
          >
            <button
              onClick={() => setFontSize("sm")}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                fontSize === "sm"
                  ? readerTheme === "dark"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "bg-white text-slate-950 shadow-2xs"
                  : "text-slate-500"
              }`}
              title="சிறிய எழுத்து"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("base")}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                fontSize === "base"
                  ? readerTheme === "dark"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "bg-white text-slate-950 shadow-2xs"
                  : "text-slate-500"
              }`}
              title="இயல்பான எழுத்து"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                fontSize === "lg"
                  ? readerTheme === "dark"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "bg-white text-slate-950 shadow-2xs"
                  : "text-slate-500"
              }`}
              title="பெரிய எழுத்து"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xl")}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                fontSize === "xl"
                  ? readerTheme === "dark"
                    ? "bg-slate-800 text-white shadow-2xs"
                    : "bg-white text-slate-950 shadow-2xs"
                  : "text-slate-500"
              }`}
              title="மிகப் பெரிய எழுத்து"
            >
              A++
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentLesson.id)}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              bookmarked
                ? "bg-amber-50 border-amber-300 text-amber-700"
                : readerTheme === "dark"
                  ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-950"
            }`}
            title={bookmarked ? "சேமித்த பாடத்திலிருந்து நீக்கு" : "இந்தப் பாடத்தைச் சேமி"}
          >
            <Bookmark
              className={`w-4 h-4 ${bookmarked ? "fill-amber-500 text-amber-600" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* 2. SUB TABS */}
      <div
        className={`flex items-center gap-2 border-b pb-2 ${readerTheme === "dark" ? "border-slate-800" : "border-slate-200"}`}
      >
        <button
          onClick={() => setActiveTab("content")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "content"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : readerTheme === "dark"
                ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
          }`}
        >
          பாடமும் விளக்கமும்
        </button>
        <button
          onClick={() => setActiveTab("solporul")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "solporul"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : readerTheme === "dark"
                ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
          }`}
        >
          <span>சொற்பொருள் ({currentLesson.solPorulList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "notes"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : readerTheme === "dark"
                ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>என் குறிப்புகள்</span>
        </button>
      </div>

      {/* 3. MAIN TAB CONTENT */}
      {activeTab === "content" && (
        <div className="space-y-6">
          {/* Lesson Intro (High-contrast dark reading box) */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border ${
              readerTheme === "dark"
                ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-100"
                : readerTheme === "sepia"
                  ? "bg-[#f4ebd9] border-[#e0cdb2] text-[#2c1d11]"
                  : "bg-emerald-50/80 border-emerald-200/90 text-slate-950"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1.5 font-sans">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs uppercase tracking-wider font-bold">
                முன்னுரை:
              </span>
            </div>
            <p
              className={`text-sm sm:text-base leading-relaxed font-serif ${textContrastStyles[readerTheme]}`}
            >
              {currentLesson.introduction}
            </p>
          </div>

          {/* Audio Recitation Player (If poem/verses exist) */}
          {currentLesson.poemLines && currentLesson.poemLines.length > 0 && (
            <TamilAudioPlayer
              titleTamil={currentLesson.titleTamil}
              author={currentLesson.author}
              poemLines={currentLesson.poemLines}
              manappadam={currentLesson.manappadam}
            />
          )}

          {/* Full Lesson Text Body (High-contrast dark text) */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border space-y-5 ${themeCardStyles[readerTheme]}`}
          >
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3
                className={`text-sm font-bold uppercase tracking-wider font-sans ${readerTheme === "dark" ? "text-slate-200" : "text-slate-950"}`}
              >
                பாடப்பகுதி மற்றும் செய்யுள்
              </h3>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                சமச்சீர் கல்வி · 10-ஆம் வகுப்பு
              </span>
            </div>

            {/* Main Lesson Content with Deep Dark High-Contrast Typography */}
            <div
              className={`font-serif space-y-5 ${fontSizeClasses[fontSize]} ${textContrastStyles[readerTheme]}`}
            >
              {currentLesson.fullContent.map((paragraph, pIdx) => (
                <p key={pIdx} className="whitespace-pre-line tracking-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Explanation Sections */}
            {currentLesson.explanationSections &&
              currentLesson.explanationSections.length > 0 && (
                <div
                  className={`mt-8 pt-6 border-t space-y-4 ${readerTheme === "dark" ? "border-slate-800" : "border-slate-200"}`}
                >
                  <h4
                    className={`text-xs font-bold uppercase tracking-wider font-sans ${readerTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                  >
                    பொருள் விளக்கம்:
                  </h4>
                  {currentLesson.explanationSections.map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className={`p-4 sm:p-5 rounded-xl border ${
                        readerTheme === "dark"
                          ? "bg-slate-800/70 border-slate-700/80 text-slate-100"
                          : readerTheme === "sepia"
                            ? "bg-[#f4ebd9]/80 border-[#ded0bb] text-[#2c1d11]"
                            : "bg-slate-50 border-slate-200 text-slate-950"
                      }`}
                    >
                      <h5
                        className={`font-bold text-sm sm:text-base font-serif mb-2 ${readerTheme === "dark" ? "text-emerald-400" : "text-emerald-900"}`}
                      >
                        {sec.heading}
                      </h5>
                      <p
                        className={`text-sm sm:text-base leading-relaxed font-serif ${textContrastStyles[readerTheme]}`}
                      >
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Sol Porul Interactive Glossary Inline Section */}
          <TamilWordGlossary
            words={currentLesson.solPorulList}
            title={`${currentLesson.titleTamil} — சொற்பொருள்`}
          />

          {/* Exam Focus Callout Cards */}
          <ExamFocusCard highlights={currentLesson.examHighlights} />

          {/* Nool Veli (Author / Literary Background) */}
          {currentLesson.noolVeli && (
            <div
              className={`p-5 sm:p-6 rounded-2xl border ${
                readerTheme === "dark"
                  ? "bg-indigo-950/40 border-indigo-800/80 text-indigo-100"
                  : readerTheme === "sepia"
                    ? "bg-[#ede5f2] border-[#dacbe2] text-[#281c33]"
                    : "bg-indigo-50/90 border-indigo-200 text-slate-950"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-2 font-sans text-indigo-900 dark:text-indigo-300">
                <BookOpen className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                <span>
                  நூல் வெளி:{" "}
                  {currentLesson.noolVeli.author}
                </span>
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed font-serif mb-3 ${textContrastStyles[readerTheme]}`}
              >
                {currentLesson.noolVeli.details}
              </p>
              {currentLesson.noolVeli.works &&
                currentLesson.noolVeli.works.length > 0 && (
                  <div
                    className={`text-xs font-semibold ${readerTheme === "dark" ? "text-indigo-300" : "text-indigo-950"}`}
                  >
                    <span>முக்கிய படைப்புகள்: </span>
                    <span
                      className={`font-medium ${textContrastStyles[readerTheme]}`}
                    >
                      {currentLesson.noolVeli.works.join(", ")}
                    </span>
                  </div>
                )}
            </div>
          )}

          {/* Mun Thondriya Muthukudi (Ancient Tamil Heritage Box) */}
          {currentLesson.munThondriyaMuthukudi && (
            <div
              className={`p-5 sm:p-6 rounded-2xl border ${
                readerTheme === "dark"
                  ? "bg-amber-950/40 border-amber-800/80 text-amber-100"
                  : readerTheme === "sepia"
                    ? "bg-[#f8eedc] border-[#e7d8bf] text-[#2c1d11]"
                    : "bg-amber-50/90 border-amber-200 text-slate-950"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-2 font-sans text-amber-900 dark:text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>
                  முன்தோன்றிய மூத்தகுடி:{" "}
                  {currentLesson.munThondriyaMuthukudi.district}
                </span>
              </div>
              <p
                className={`text-sm sm:text-base font-serif italic mb-2 font-semibold ${textContrastStyles[readerTheme]}`}
              >
                "{currentLesson.munThondriyaMuthukudi.verse}" —{" "}
                {currentLesson.munThondriyaMuthukudi.source}
              </p>
              <p
                className={`text-xs font-medium ${readerTheme === "dark" ? "text-slate-400" : "text-slate-700"}`}
              >
                இடம்: {currentLesson.munThondriyaMuthukudi.location}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SOL PORUL FULL SCREEN */}
      {activeTab === "solporul" && (
        <div className="space-y-4">
          <TamilWordGlossary
            words={currentLesson.solPorulList}
            title={`${currentLesson.titleTamil} — முழுச் சொற்பொருள்`}
          />
        </div>
      )}

      {/* TAB 3: STUDENT NOTE SCRATCHPAD */}
      {activeTab === "notes" && (
        <div
          className={`p-6 rounded-2xl border space-y-4 ${themeCardStyles[readerTheme]}`}
        >
          <div>
            <h3
              className={`text-base font-bold font-sans ${readerTheme === "dark" ? "text-white" : "text-slate-950"}`}
            >
              என் படிப்புக் குறிப்புகள்
            </h3>
            <p
              className={`text-xs ${readerTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}
            >
              இந்தப் பாடத்தின் முக்கியக் குறிப்புகளையும் தேர்வு நினைவூட்டல்களையும்
              சேமியுங்கள். குறிப்புகள் இந்தச் சாதனத்தில் இருக்கும்.
            </p>
          </div>

          <textarea
            value={studentNote}
            onChange={(e) => setStudentNote(e.target.value)}
            rows={8}
            placeholder="e.g. அன்னை மொழியே: பெருஞ்சித்திரனாரின் இயற்பெயர் துரை. மாணிக்கம். கணிச்சாறு தொகுதியிலிருந்து எடுக்கப்பட்டது..."
            className={`w-full p-4 rounded-xl border focus:ring-4 focus:ring-emerald-500/20 transition text-sm sm:text-base font-serif ${
              readerTheme === "dark"
                ? "bg-slate-950 border-slate-700 text-white placeholder-slate-500"
                : readerTheme === "sepia"
                  ? "bg-[#fcf8f0] border-[#d8c5ad] text-[#2c1d11] placeholder-stone-500"
                  : "bg-white border-slate-300 text-slate-950 placeholder-slate-400"
            }`}
          />

          <div className="flex items-center justify-between">
            <span className="text-xs">
              {noteSaved && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ குறிப்பு சேமிக்கப்பட்டது!
                </span>
              )}
            </span>
            <Button variant="primary" size="sm" onClick={handleSaveNote}>
              குறிப்பைச் சேமி
            </Button>
          </div>
        </div>
      )}

      {/* 4. STICKY FOOTER ACTIONS */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-md border-t py-3 px-4 shadow-xl ${
          readerTheme === "dark"
            ? "bg-slate-950/95 border-slate-800"
            : "bg-white/95 border-slate-200"
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant={isCompleted ? "secondary" : "accent"}
              size="md"
              onClick={handleMarkComplete}
              icon={<CheckCircle2 className="w-4 h-4" />}
            >
              {isCompleted
                ? "இந்தப் பாடத்தில் மீண்டும் பயிற்சி செய்"
                : "பாடப் பயிற்சியைத் தொடங்கு (5 வினாக்கள்)"}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/practice/${subjectId}/${currentUnit.id}`}>
              <Button
                variant="outline"
                size="md"
                icon={<HelpCircle className="w-4 h-4" />}
              >
                பயிற்சி வினாக்கள்
              </Button>
            </Link>

            {nextLesson ? (
              <Link to={`/lesson/${subjectId}/${nextLesson.id}`}>
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  அடுத்த பாடம்
                </Button>
              </Link>
            ) : (
              <Link to={`/test/${currentUnit.id}`}>
                <Button
                  variant="primary"
                  size="md"
                  icon={<FileCheck className="w-4 h-4" />}
                  iconPosition="right"
                >
                  இயல் தேர்வு
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


