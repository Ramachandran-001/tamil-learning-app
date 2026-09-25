import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { UserProgressProvider } from "./context/UserProgressContext";
import { TamilGameLayout } from "./layouts/TamilGameLayout";
import { TamilGameHome } from "./pages/learning/TamilGameHome";
import { TamilLessonReader } from "./pages/learning/TamilLessonReader";
import { PracticeQuizEngine } from "./pages/practice/PracticeQuizEngine";
import { LessonPracticeEngine } from "./pages/practice/LessonPracticeEngine";
import { UnitQuizEngine } from "./pages/test/UnitQuizEngine";
import { UnitExamEngine } from "./pages/test/UnitExamEngine";
import { TamilAchievementPage } from "./pages/learning/TamilAchievementPage";

const FinalTamilExam = lazy(() => import("./pages/test/FinalTamilExam").then((module) => ({ default: module.FinalTamilExam })));

const TamilLessonRoute = () => {
  const { subjectId } = useParams();
  return subjectId === "tamil" ? <TamilLessonReader /> : <Navigate to="/" replace />;
};

const TamilExamRoute = () => {
  const { unitId } = useParams();
  return unitId?.startsWith("tamil-unit-") ? <UnitExamEngine /> : <Navigate to="/" replace />;
};

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <UserProgressProvider>
        <Routes>
          <Route element={<TamilGameLayout />}>
            <Route path="/" element={<TamilGameHome />} />
            <Route path="/learning/subjects/tamil" element={<Navigate to="/" replace />} />
            <Route path="/lesson/:subjectId/:lessonId" element={<TamilLessonRoute />} />
            <Route path="/practice/tamil/lesson/:lessonId" element={<LessonPracticeEngine />} />
            <Route path="/practice/tamil/:unitId" element={<PracticeQuizEngine />} />
            <Route path="/unit-quiz/:unitId" element={<UnitQuizEngine />} />
            <Route path="/test/:unitId" element={<TamilExamRoute />} />
            <Route path="/final-exam" element={<Suspense fallback={<div className="mx-auto max-w-3xl p-10 text-center text-emerald-800">இறுதித் தேர்வு தயாராகிறது...</div>}><FinalTamilExam /></Suspense>} />
            <Route path="/achievement/tamil" element={<TamilAchievementPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </UserProgressProvider>
    </BrowserRouter>
  );
}

export default App;
