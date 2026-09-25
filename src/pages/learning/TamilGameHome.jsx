import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, ChevronRight, CirclePlay,
  Compass, LockKeyhole, MessageCircle, Sparkles, Star, Target, Trophy, UserRoundPlus, Users,
} from "lucide-react";
import { MOCK_TAMIL_UNITS, MOCK_THIRUKKURAL_CHAPTERS } from "../../data/mockTamilData";
import { useUserProgress } from "../../context/UserProgressContext";

const COURSE_UNITS = MOCK_TAMIL_UNITS.filter((unit) => unit.lessons?.length);
const unitColors = ["leaf", "sun", "sky", "berry", "plum"];
const FEEDBACK_EMAIL = "YOUR_EMAIL_HERE"; // Replace with your email address.
const FEEDBACK_INSTAGRAM_URL = "https://www.instagram.com/YOUR_INSTAGRAM_PAGE/"; // Replace with your profile link.
const STUDENT_NICKNAMES_KEY = "tamilpath_student_nicknames_v1";

const readStudentNicknames = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STUDENT_NICKNAMES_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((entry) => entry && typeof entry.nickname === "string") : [];
  } catch {
    return [];
  }
};

export const TamilGameHome = () => {
  const {
    progress, isUnitCompleted, areUnitLessonsComplete, isUnitUnlocked, isLessonUnlocked,
  } = useUserProgress();
  const [selectedUnitId, setSelectedUnitId] = useState(COURSE_UNITS[0]?.id);
  const [nickname, setNickname] = useState("");
  const [studentNicknames, setStudentNicknames] = useState(readStudentNicknames);
  const [showStudents, setShowStudents] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const selectedUnit = COURSE_UNITS.find((unit) => unit.id === selectedUnitId) || COURSE_UNITS[0];
  const allLessons = useMemo(() => COURSE_UNITS.flatMap((unit) => unit.lessons), []);
  const completedIds = new Set(progress.completedLessonIds);
  const completeCount = allLessons.filter((lesson) => completedIds.has(lesson.id)).length;
  const overall = allLessons.length ? Math.round((completeCount / allLessons.length) * 100) : 0;
  const nextLesson = allLessons.find((lesson) => isLessonUnlocked(lesson.id) && !completedIds.has(lesson.id));
  const selectedComplete = selectedUnit.lessons.filter((lesson) => completedIds.has(lesson.id)).length;
  const selectedUnlocked = isUnitUnlocked(selectedUnit.id);
  const nextUnit = COURSE_UNITS.find((unit) => !isUnitCompleted(unit.id));
  const nextUnitTitle = nextUnit?.titleTamil || "அனைத்து இயல்களும் முடிந்தன!";
  const allCourseUnitsComplete = COURSE_UNITS.every((unit) => isUnitCompleted(unit.id));
  const unitReadyForQuiz = COURSE_UNITS.find((unit) => isUnitUnlocked(unit.id) && areUnitLessonsComplete(unit.id) && !isUnitCompleted(unit.id));

  const handleNicknameSubmit = (event) => {
    event.preventDefault();
    const cleanNickname = nickname.trim().replace(/\s+/g, " ").slice(0, 30);
    if (cleanNickname.length < 2) {
      setNicknameMessage("குறைந்தது 2 எழுத்துகள் உள்ள நிக் நேம் உள்ளிடுங்கள்.");
      return;
    }
    const nextEntries = [{
      id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      nickname: cleanNickname,
      joinedAt: new Date().toISOString(),
    }, ...studentNicknames];
    try {
      localStorage.setItem(STUDENT_NICKNAMES_KEY, JSON.stringify(nextEntries));
      setStudentNicknames(nextEntries);
      setNickname("");
      setNicknameMessage("உங்கள் நிக் நேம் இந்த உலாவியில் சேர்க்கப்பட்டது.");
    } catch {
      setNicknameMessage("இந்த உலாவியில் சேமிக்க முடியவில்லை. சேமிப்பிடத்தைச் சரிபார்க்கவும்.");
    }
  };

  return (
    <div className="tamil-home">
      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="eyebrow"><Sparkles size={15} /> 10-ஆம் வகுப்பு · தமிழ்</span>
          <h1>தமிழ் கற்றல் பயணம்<br /><em>இன்றே தொடங்கட்டும்!</em></h1>
          <p>பாடங்களைச் சிறு படிகளாகக் கற்று, பயிற்சிகளை முடித்து, ஒவ்வொரு நாளும் முன்னேறுங்கள்.</p>
          {nextLesson ? (
            <Link className="start-button" to={`/lesson/tamil/${nextLesson.id}`}>
              <CirclePlay size={20} fill="currentColor" /> {completeCount ? "தொடர்ந்து படிக்கலாம்" : "முதல் பாடத்தைத் தொடங்கலாம்"} <ArrowRight size={18} />
            </Link>
          ) : unitReadyForQuiz ? (
            <Link className="start-button completed-button" to={`/unit-quiz/${unitReadyForQuiz.id}`}><Trophy size={20} /> 10 நிமிட இயல் தேர்வைத் தொடங்கலாம் <ArrowRight size={18} /></Link>
          ) : progress.finalExamPassed ? (
            <Link className="start-button completed-button" to="/achievement/tamil"><Trophy size={20} /> தமிழ் சாதனையைப் பாருங்கள் <ArrowRight size={18} /></Link>
          ) : allCourseUnitsComplete ? (
            <Link className="start-button completed-button" to="/final-exam"><Trophy size={20} /> இறுதித் தேர்வைத் தொடங்கலாம் <ArrowRight size={18} /></Link>
          ) : (
            <div className="start-button completed-button"><Trophy size={20} /> அருமை! பாடங்கள் முடிந்தன</div>
          )}
          <div className="welcome-footnote"><Star size={15} fill="currentColor" /> அடுத்த இலக்கு: {progress.finalExamPassed ? "தமிழ் முழுமைச் சாதனை" : allCourseUnitsComplete ? "200 வினாக்கள் கொண்ட இறுதித் தேர்வு" : unitReadyForQuiz ? `${unitReadyForQuiz.titleTamil} இயல் தேர்வு` : nextUnitTitle}</div>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="letter-hero"><span>அ</span><i>தமிழ்</i></div>
          <div className="mini-path path-one"><span>01</span><BookOpen size={15} /></div>
          <div className="mini-path path-two"><span>02</span><Star size={14} fill="currentColor" /></div>
          <span className="float-star star-one">✦</span><span className="float-star star-two">✧</span><span className="float-star star-three">✦</span>
          <span className="art-caption">கற்றல் ஒரு மகிழ்ச்சி!</span>
        </div>
      </section>

      <section className="journey-summary" aria-label="உங்கள் கற்றல் முன்னேற்றம்">
        <div className="summary-intro"><span className="summary-icon"><Compass size={20} /></span><div><strong>உங்கள் பயணம்</strong><small>சிறு முயற்சிகள் பெரிய வெற்றிக்கு</small></div></div>
        <div className="summary-progress"><div className="summary-label"><span>மொத்த முன்னேற்றம்</span><strong>{overall}%</strong></div><div className="progress-track"><span style={{ width: `${overall}%` }} /></div></div>
        <div className="summary-count"><strong>{completeCount}<small> / {allLessons.length}</small></strong><span>பாடங்கள் முடிந்தன</span></div>
      </section>

      <section className="course-section">
        <div className="section-heading">
          <div><span className="eyebrow plain-eyebrow">தமிழ் பாடப்பாதை</span><h2>உங்கள் அடுத்த படி</h2><p>ஒரு இயலைத் தேர்ந்தெடுத்து, பாடப் படிகளை ஒன்றன்பின் ஒன்றாக முடிக்கவும்.</p></div>
          <div className="section-mini-stat"><Trophy size={18} /><span>{COURSE_UNITS.length} இயல்கள்</span></div>
        </div>

        <div className="unit-selector" role="tablist" aria-label="தமிழ் இயல்கள்">
          {COURSE_UNITS.map((unit, index) => {
            const unlocked = isUnitUnlocked(unit.id);
            const done = isUnitCompleted(unit.id);
            const active = selectedUnit.id === unit.id;
            const unitDone = unit.lessons.filter((lesson) => completedIds.has(lesson.id)).length;
            return (
              <button key={unit.id} role="tab" aria-selected={active} disabled={!unlocked} onClick={() => setSelectedUnitId(unit.id)} className={`unit-tab ${unitColors[index % unitColors.length]} ${active ? "active" : ""} ${!unlocked ? "locked" : ""}`}>
                <span className="unit-tab-number">{done ? <Check size={16} /> : unlocked ? String(index + 1).padStart(2, "0") : <LockKeyhole size={15} />}</span>
                <span className="unit-tab-title">{unit.titleTamil.split(":")[1]?.trim() || unit.titleTamil}</span>
                <span className="unit-tab-progress">{unitDone}/{unit.lessons.length}</span>
              </button>
            );
          })}
        </div>

        <div className={`unit-board ${unitColors[COURSE_UNITS.indexOf(selectedUnit) % unitColors.length]}`}>
          <div className="unit-board-heading">
            <div><span className="unit-kicker">{selectedUnit.titleTamil.split(":")[0]}</span><h3>{selectedUnit.titleTamil.split(":")[1]?.trim() || selectedUnit.titleTamil}</h3><p>{selectedUnit.themeTamil}</p></div>
            <div className="unit-board-count"><strong>{selectedComplete}<small>/{selectedUnit.lessons.length}</small></strong><span>படிகள்</span></div>
          </div>
          {selectedUnlocked ? (
            <div className="lesson-steps">
              {selectedUnit.lessons.map((lesson, index) => {
                const done = completedIds.has(lesson.id);
                const unlocked = isLessonUnlocked(lesson.id);
                return (
                  <div key={lesson.id} className={`lesson-step ${done ? "done" : unlocked ? "ready" : "locked"}`}>
                    <div className="step-rail"><span className="step-node">{done ? <CheckCircle2 size={21} /> : unlocked ? <BookOpen size={19} /> : <LockKeyhole size={17} />}</span>{index < selectedUnit.lessons.length - 1 && <span className="step-line" />}</div>
                    <div className="step-content"><span className="step-type">{lesson.categoryNameTamil?.replace(/\s*\([^)]*\)\s*/g, " ").trim()}</span><h4>{lesson.titleTamil}</h4><span className="step-duration">சுமார் {lesson.estimatedMinutes || 15} நிமிடங்கள்</span></div>
                    {unlocked ? <Link className={`step-action ${done ? "review" : ""}`} to={`/lesson/tamil/${lesson.id}`}>{done ? "மீண்டும் படி" : "படி"}<ChevronRight size={17} /></Link> : <span className="step-locked-label">முந்தைய படியை முடிக்கவும்</span>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="unit-locked-message"><LockKeyhole size={26} /><div><strong>இந்த இயல் இன்னும் பூட்டப்பட்டுள்ளது</strong><span>முந்தைய இயலின் பாடங்களை முடித்ததும் திறக்கும்.</span></div></div>
          )}
          {selectedUnlocked && <div className="unit-challenge-row"><div><Target size={19} /><span>{areUnitLessonsComplete(selectedUnit.id) && !isUnitCompleted(selectedUnit.id) ? <>இந்த இயலின் அனைத்து பாடங்களும் முடிந்தன. இப்போது <strong>10 நிமிட இயல் தேர்வு</strong> எழுதுங்கள்.</> : <>இந்த இயலை முடித்து <strong>50 XP</strong> போனஸ் பெறுங்கள்!</>}</span></div>{areUnitLessonsComplete(selectedUnit.id) && !isUnitCompleted(selectedUnit.id) ? <Link to={`/unit-quiz/${selectedUnit.id}`}>இயல் தேர்வு தொடங்கு <ArrowRight size={16} /></Link> : <Link to={`/practice/tamil/${selectedUnit.id}`}>பயிற்சி வினாக்கள் <ArrowRight size={16} /></Link>}</div>}
        </div>
      </section>

      <details className="kural-library">
        <summary><span className="kural-icon">குறள்</span><span><strong>திருக்குறள் தொகுப்பு</strong><small>{MOCK_THIRUKKURAL_CHAPTERS.length} அதிகாரங்கள் · பொருளுடன்</small></span><ChevronRight className="kural-chevron" size={19} /></summary>
        <div className="kural-chapters">
          {MOCK_THIRUKKURAL_CHAPTERS.map((chapter) => (
            <details className="kural-chapter" key={chapter.chapterNumber}>
              <summary><span>அதிகாரம் {chapter.chapterNumber}</span><strong>{chapter.chapterTamil}</strong><ChevronRight size={16} /></summary>
              {chapter.couplets.map((couplet) => (
                <div className="kural-couplet" key={couplet.number}>
                  <span>குறள் {couplet.number}</span>
                  <p>{couplet.verse1}<br />{couplet.verse2}</p>
                  <small>{couplet.meaning}</small>
                </div>
              ))}
            </details>
          ))}
        </div>
      </details>

      <section className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="student-nicknames-title">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-800"><Users size={22} /></span><div><span className="text-xs font-bold text-emerald-700">தமிழ் கற்றல் பயணம்</span><h2 id="student-nicknames-title" className="text-xl font-black text-slate-900">தமிழுடன் இணைந்த மாணவர்கள்</h2></div></div>
          <button type="button" onClick={() => setShowStudents((shown) => !shown)} aria-expanded={showStudents} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"><Users size={16} /> மாணவர்கள் ({studentNicknames.length})</button>
        </div>
        <form onSubmit={handleNicknameSubmit} className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="student-nickname">உங்கள் நிக் நேம்</label>
          <input id="student-nickname" name="nickname" value={nickname} onChange={(event) => { setNickname(event.target.value); setNicknameMessage(""); }} maxLength={30} autoComplete="nickname" placeholder="உங்கள் நிக் நேமை உள்ளிடுங்கள்" className="min-h-12 min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-amber-950 hover:bg-amber-300"><UserRoundPlus size={17} /> சேர்க்கவும்</button>
        </form>
        {nicknameMessage && <p role="status" className="mt-2 text-sm font-semibold text-emerald-800">{nicknameMessage}</p>}
        <p className="mt-2 text-xs leading-5 text-slate-500">நிக் நேம் மட்டும் உள்ளிடுங்கள். பட்டியல் இந்த உலாவியில் மட்டும் சேமிக்கப்படும்; மற்ற மாணவர்களின் சாதனங்களுடன் பகிரப்படாது.</p>
        {showStudents && <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4"><h3 className="mb-3 text-sm font-extrabold text-slate-800">இந்த உலாவியில் சேர்க்கப்பட்டவர்கள் · {studentNicknames.length}</h3>{studentNicknames.length ? <ul className="grid gap-2 sm:grid-cols-2">{studentNicknames.map((entry) => <li key={entry.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5"><span className="truncate font-bold text-slate-800">{entry.nickname}</span><span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-slate-500"><CalendarDays size={13} />{new Date(entry.joinedAt).toLocaleDateString("ta-IN")}</span></li>)}</ul> : <p className="rounded-xl bg-white px-3 py-4 text-center text-sm text-slate-500">இன்னும் யாரும் நிக் நேம் சேர்க்கவில்லை.</p>}</div>}
      </section>

      <section id="student-feedback" className="feedback-card">
        <div className="feedback-symbol"><MessageCircle size={25} /></div>
        <div className="feedback-copy"><span className="eyebrow plain-eyebrow">உங்கள் கருத்து எங்களுக்கு உதவும்</span><h2>இன்னும் சிறப்பாக மாற்றலாமா?</h2><p>இந்தப் பாடத்தைப் பயன்படுத்திப் பாருங்கள். எதை மேம்படுத்தலாம் என்று உங்கள் எண்ணத்தை மின்னஞ்சலிலோ Instagram-லோ பகிருங்கள்.</p></div>
       <div className="feedback-actions">
         <a className="feedback-button email-button"href={`mailto:csk634790@gmail.com?subject=தமிழ்ப்பாதை மாணவர் கருத்து`}>
           <MessageCircle size={17} /> மின்னஞ்சல் அனுப்பு
         </a>
         <a className="feedback-button instagram-button"href="https://www.instagram.com/codei.nsights?stkn=YjF6cWk3dDl4cWVn" target="_blank" rel="noreferrer">
            Instagram-ல் பகிர் <ArrowRight size={16} />
         </a>
        </div>
      </section>
    </div>
  );
};

