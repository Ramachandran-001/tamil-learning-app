import React, { createContext, useContext, useState, useEffect } from "react";

import { MOCK_BADGES, MOCK_TAMIL_UNITS } from "../data/mockTamilData";

const ALL_SUBJECT_UNITS = MOCK_TAMIL_UNITS;
const getUnitsFor = (unitId) => {
  const subjectPrefix = unitId?.split("-unit-")[0];
  return ALL_SUBJECT_UNITS.filter((unit) => unit.id.startsWith(`${subjectPrefix}-unit-`));
};
const getLocalDayKey = (date) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};
const markDailyActivity = (current) => {
  const now = new Date();
  const today = getLocalDayKey(now);
  if (current.lastActiveDate === today) return current;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const continuesStreak = current.lastActiveDate === getLocalDayKey(yesterday);
  return {
    ...current,
    lastActiveDate: today,
    currentStreak: continuesStreak ? current.currentStreak + 1 : 1,
  };
};
import confetti from "canvas-confetti";

const INITIAL_PROGRESS = {
  totalXp: 0,
  currentStreak: 0,
  lastActiveDate: null,
  completedLessonIds: [],
  completedUnitIds: [],
  completedUnitQuizIds: [],
  unitQuizAttempts: [],
  bookmarkedLessonIds: [],
  notes: {},
  quizScores: [],
  examScores: [],
  finalExamPassed: false,
  finalExamScore: null,
  finalExamAttempts: [],
  unlockedBadgeIds: [],
};

const UserProgressContext = createContext(undefined);

export const UserProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("studypath_tamil_progress");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PROGRESS;
      }
    }
    return INITIAL_PROGRESS;
  });

  const [recentUnlockedBadge, setRecentUnlockedBadge] = useState(null);
  const [recentlyUnlockedUnit, setRecentlyUnlockedUnit] = useState(null);
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("studypath_tamil_progress", JSON.stringify(progress));
  }, [progress]);

  // Evaluate whether a unit is completed
  const isUnitCompleted = (unitId) => {
    const unit = ALL_SUBJECT_UNITS.find((u) => u.id === unitId);
    if (!unit) return false;
    const lessonsComplete = progress.completedUnitIds.includes(unitId) || (
      unit.lessons.length > 0 &&
      unit.lessons.every((l) => progress.completedLessonIds.includes(l.id))
    );
    return lessonsComplete && (progress.completedUnitQuizIds || []).includes(unitId);
  };

  const areUnitLessonsComplete = (unitId) => {
    const unit = ALL_SUBJECT_UNITS.find((u) => u.id === unitId);
    if (!unit || !unit.lessons.length) return false;
    return unit.lessons.every((lesson) => progress.completedLessonIds.includes(lesson.id));
  };

  // Evaluate whether a unit is unlocked: Unit 1 is always unlocked; Unit N unlocks only if Unit N-1 is completed
  const isUnitUnlocked = (unitId) => {
    const subjectUnits = getUnitsFor(unitId);
    const unitIndex = subjectUnits.findIndex((u) => u.id === unitId);
    if (unitIndex <= 0) return true; // Unit 1 is always unlocked
    const prevUnit = subjectUnits[unitIndex - 1];
    return isUnitCompleted(prevUnit.id);
  };

  // Evaluate whether a lesson is unlocked
  const isLessonUnlocked = (lessonId) => {
    const unit = ALL_SUBJECT_UNITS.find((u) =>
      u.lessons.some((l) => l.id === lessonId),
    );
    if (!unit) return true;
    if (!isUnitUnlocked(unit.id)) return false;

    const lessonIndex = unit.lessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex <= 0) return true;

    // Sequential lesson unlocking within the unit
    const prevLesson = unit.lessons[lessonIndex - 1];
    return progress.completedLessonIds.includes(prevLesson.id);
  };

  const getUnitPrerequisite = (unitId) => {
    const subjectUnits = getUnitsFor(unitId);
    const unitIndex = subjectUnits.findIndex((u) => u.id === unitId);
    if (unitIndex <= 0) return null;
    const prevUnit = subjectUnits[unitIndex - 1];
    const completedCount = prevUnit.lessons.filter((l) =>
      progress.completedLessonIds.includes(l.id),
    ).length;
    const isPrevCompleted = isUnitCompleted(prevUnit.id);
    return {
      prevUnit,
      isPrevCompleted,
      completedCount,
      totalCount: prevUnit.lessons.length,
    };
  };

  // Check and evaluate badges whenever progress updates
  useEffect(() => {
    MOCK_BADGES.forEach((badge) => {
      if (!progress.unlockedBadgeIds.includes(badge.id)) {
        let shouldUnlock = false;

        if (
          badge.requiredLessons &&
          progress.completedLessonIds.length >= badge.requiredLessons
        ) {
          shouldUnlock = true;
        }
        if (badge.requiredXp && progress.totalXp >= badge.requiredXp) {
          shouldUnlock = true;
        }
        if (
          badge.requiredQuizzes &&
          progress.quizScores.length >= badge.requiredQuizzes
        ) {
          shouldUnlock = true;
        }

        if (shouldUnlock) {
          setProgress((prev) => ({
            ...prev,
            unlockedBadgeIds: [...prev.unlockedBadgeIds, badge.id],
          }));
          setRecentUnlockedBadge(badge);
          setActiveNotification({
            title: `பதக்கம் வென்றீர்கள்! 🎉 (${badge.titleTamil})`,
            message: badge.descriptionTamil,
            type: "badge",
          });
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch {
            // Ignore if canvas confetti not available
          }
        }
      }
    });
  }, [progress.completedLessonIds, progress.totalXp, progress.quizScores]);

  const addXp = (amount, reasonTamil) => {
    setProgress((prev) => ({
      ...markDailyActivity(prev),
      totalXp: prev.totalXp + amount,
    }));
    setActiveNotification({
      title: `+${amount} XP பெற்றது! 🌟`,
      message: reasonTamil || "சிறப்பான கற்றல் முயற்சிக்கு வாழ்த்துகள்!",
      type: "xp",
    });
  };

  const markLessonComplete = (lessonId, unitId) => {
    const alreadyDone = progress.completedLessonIds.includes(lessonId);
    const newCompletedLessonIds = alreadyDone
      ? progress.completedLessonIds
      : [...progress.completedLessonIds, lessonId];

    const unit = ALL_SUBJECT_UNITS.find((u) => u.id === unitId);
    const isUnitFinishedNow =
      unit &&
      unit.lessons.length > 0 &&
      unit.lessons.every((l) => newCompletedLessonIds.includes(l.id));

    const wasUnitAlreadyCompleted = progress.completedUnitIds.includes(unitId);
    const newCompletedUnitIds =
      isUnitFinishedNow && !wasUnitAlreadyCompleted
        ? [...progress.completedUnitIds, unitId]
        : progress.completedUnitIds;

    const xpEarned =
      (alreadyDone ? 0 : 25) +
      (isUnitFinishedNow && !wasUnitAlreadyCompleted ? 50 : 0);

    setProgress((prev) => ({
      ...markDailyActivity(prev),
      completedLessonIds: newCompletedLessonIds,
      completedUnitIds: newCompletedUnitIds,
      totalXp: prev.totalXp + xpEarned,
    }));

    if (isUnitFinishedNow && !wasUnitAlreadyCompleted && unit) {
      setActiveNotification({
        title: `🎉 ${unit.titleTamil} பாடங்கள் முடிந்தன!`,
        message: "இயல் தேர்வை முடித்தால் அடுத்த இயல் திறக்கும். (+50 போனஸ் XP)",
        type: "badge",
      });

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // Ignored
      }
    } else if (!alreadyDone) {
      setActiveNotification({
        title: "பாடம் நிறைவுற்றது! 🏆",
        message: "பாடத்தை வெற்றிகரமாக முடித்தீர்கள் (+25 XP)",
        type: "xp",
      });
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {
        // Ignored
      }
    }
  };

  const toggleBookmark = (lessonId) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarkedLessonIds.includes(lessonId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedLessonIds.filter((id) => id !== lessonId)
        : [...prev.bookmarkedLessonIds, lessonId];
      return {
        ...prev,
        bookmarkedLessonIds: newBookmarks,
      };
    });
  };

  const isBookmarked = (lessonId) => {
    return progress.bookmarkedLessonIds.includes(lessonId);
  };

  const saveLessonNote = (lessonId, noteText) => {
    setProgress((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: noteText,
      },
    }));
  };

  const getLessonNote = (lessonId) => {
    return progress.notes[lessonId] || "";
  };

  const recordQuizAttempt = (unitId, score, totalQuestions) => {
    const accuracy = Math.round((score / totalQuestions) * 100);
    const xpGained = score * 10;

    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + xpGained,
      quizScores: [
        ...prev.quizScores,
        {
          quizId: `quiz-${Date.now()}`,
          unitId,
          score,
          totalQuestions,
          date: new Date().toISOString().split("T")[0],
          accuracy,
        },
      ],
    }));

    setActiveNotification({
      title: `பயிற்சி வினா நிறைவு! (${score}/${totalQuestions})`,
      message: `மதிப்பெண்: ${accuracy}% | +${xpGained} XP வழங்கப்பட்டது!`,
      type: "xp",
    });
  };

  const recordUnitQuizAttempt = (unitId, score, totalQuestions, timeSpentSeconds) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;
    setProgress((prev) => ({
      ...markDailyActivity(prev),
      completedUnitQuizIds: passed
        ? [...new Set([...(prev.completedUnitQuizIds || []), unitId])]
        : (prev.completedUnitQuizIds || []),
      unitQuizAttempts: [
        ...(prev.unitQuizAttempts || []),
        { unitId, score, totalQuestions, percentage, passed, timeSpentSeconds, date: getLocalDayKey(new Date()) },
      ],
    }));
    setActiveNotification({
      title: passed ? "இயல் தேர்ச்சி! 🌟" : "இன்னும் கொஞ்சம் பயிற்சி செய்யலாம்",
      message: passed ? "அடுத்த இயல் திறக்கப்பட்டது!" : "பாடங்களை மீண்டும் படித்து, 10 நிமிடத் தேர்வை மீண்டும் முயற்சிக்கவும்.",
      type: passed ? "xp" : "info",
    });
    return passed;
  };

  const recordExamAttempt = (unitId, score, totalMarks, timeSpentSeconds) => {
    const percentage = Math.round((score / totalMarks) * 100);
    const passed = percentage >= 70;
    const xpAward = passed ? 100 + score * 5 : score * 2;

    setProgress((prev) => ({
      ...prev,
      totalXp: prev.totalXp + xpAward,
      examScores: [
        ...prev.examScores,
        {
          examId: `exam-${Date.now()}`,
          unitId,
          score,
          totalMarks,
          percentage,
          passed,
          date: new Date().toISOString().split("T")[0],
          timeSpentSeconds,
        },
      ],
    }));

    if (passed) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // Ignored
      }
    }
  };

  const recordFinalExamAttempt = (score, totalQuestions, timeSpentSeconds) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;
    setProgress((prev) => ({
      ...markDailyActivity(prev),
      finalExamPassed: prev.finalExamPassed || passed,
      finalExamScore: Math.max(prev.finalExamScore || 0, score),
      finalExamAttempts: [
        ...prev.finalExamAttempts,
        {
          score,
          totalQuestions,
          percentage,
          passed,
          date: getLocalDayKey(new Date()),
          timeSpentSeconds,
        },
      ],
    }));
    if (passed) {
      try {
        confetti({ particleCount: 150, spread: 85, origin: { y: 0.5 } });
      } catch {
        // Celebration is optional.
      }
    }
    return passed;
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
  };

  const clearRecentBadge = () => setRecentUnlockedBadge(null);
  const clearRecentlyUnlockedUnit = () => setRecentlyUnlockedUnit(null);
  const clearNotification = () => setActiveNotification(null);

  const badges = MOCK_BADGES.map((b) => ({
    ...b,
    unlockedAt: progress.unlockedBadgeIds.includes(b.id)
      ? "2026-08-25"
      : undefined,
  }));

  return (
    <UserProgressContext.Provider
      value={{
        progress,
        badges,
        addXp,
        markLessonComplete,
        isUnitCompleted,
        areUnitLessonsComplete,
        isUnitUnlocked,
        isLessonUnlocked,
        getUnitPrerequisite,
        toggleBookmark,
        isBookmarked,
        saveLessonNote,
        getLessonNote,
        recordQuizAttempt,
        recordUnitQuizAttempt,
        recordExamAttempt,
        recordFinalExamAttempt,
        resetProgress,
        recentUnlockedBadge,
        clearRecentBadge,
        recentlyUnlockedUnit,
        clearRecentlyUnlockedUnit,
        activeNotification,
        clearNotification,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error(
      "useUserProgress must be used within a UserProgressProvider",
    );
  }
  return context;
};
