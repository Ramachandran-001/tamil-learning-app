import { MOCK_QUIZ_QUESTIONS, MOCK_TAMIL_UNITS } from "./mockTamilData.js";

export const COURSE_UNITS = MOCK_TAMIL_UNITS.filter((unit) => unit.lessons?.length);
export const COURSE_LESSONS = COURSE_UNITS.flatMap((unit) => unit.lessons);

const allTerms = COURSE_LESSONS.flatMap((lesson) =>
  (lesson.solPorulList || []).map((term) => ({ ...term, unitId: lesson.unitId, lessonId: lesson.id, lessonTitle: lesson.titleTamil })),
);
const uniqueTerms = [...new Map(allTerms.map((term) => [`${term.unitId}:${term.word}`, term])).values()];
const allHighlights = COURSE_LESSONS.flatMap((lesson) =>
  (lesson.examHighlights || []).map((item) => ({ ...item, unitId: lesson.unitId, lessonId: lesson.id, lessonTitle: lesson.titleTamil })),
);
const allFactTexts = COURSE_LESSONS.flatMap((lesson) => (lesson.fullContent || []).filter((text) => text.trim().length > 8).map((text) => ({ text: text.trim(), lesson })));
const allExplanationSections = COURSE_LESSONS.flatMap((lesson) => (lesson.explanationSections || []).map((section) => ({ ...section, lesson })));
const allObjectives = COURSE_LESSONS.flatMap((lesson) => (lesson.learningObjectives || []).map((text) => ({ text, lesson })));

const makeOptions = (answer, candidates, seed) => {
  const pool = [...new Set(candidates.filter((choice) => typeof choice === "string" && choice.trim() && choice !== answer))];
  const distractors = [];
  for (let index = 0; index < pool.length && distractors.length < 3; index += 1) {
    const choice = pool[(seed * 13 + index * 7) % pool.length];
    if (!distractors.includes(choice)) distractors.push(choice);
  }
  const choices = [...distractors, answer];
  const correctAnswerIndex = seed % 4;
  choices.splice(correctAnswerIndex, 0, choices.pop());
  return { optionsTamil: choices, correctAnswerIndex };
};

const tagQuestion = (question, lesson, id) => ({
  ...question,
  id,
  unitId: lesson.unitId,
  referenceLessonId: lesson.id,
  lessonTitle: lesson.titleTamil,
  points: 1,
});

const termQuestion = (term, index, reverse = false) => {
  const answer = reverse ? term.word : term.meaning;
  const candidates = reverse ? uniqueTerms.map((item) => item.word) : uniqueTerms.map((item) => item.meaning);
  return tagQuestion({
    grammarCategory: `${term.lessonTitle} · சொற்பொருள்`,
    questionTamil: reverse ? `“${term.meaning}” என்ற பொருளைத் தரும் சொல் எது?` : `“${term.word}” என்பதன் பொருள் எது?`,
    ...makeOptions(answer, candidates, index + (reverse ? 401 : 101)),
    explanationTamil: `“${term.word}” என்பதன் பொருள்: ${term.meaning}.`,
  }, { id: term.lessonId, unitId: term.unitId, titleTamil: term.lessonTitle }, `term-${reverse ? "reverse" : "meaning"}-${term.unitId}-${index}`);
};

const highlightQuestion = (item, index) => tagQuestion({
  grammarCategory: `${item.lessonTitle} · பாடக் குறிப்பு`,
  questionTamil: `“${item.title}” வினாவிற்கு ஏற்ற கருத்து எது?`,
  ...makeOptions(item.content, allHighlights.map((entry) => entry.content || "").filter(Boolean), index + 701),
  explanationTamil: item.content,
}, { id: item.lessonId, unitId: item.unitId, titleTamil: item.lessonTitle }, `highlight-${item.id}`);

const factQuestion = (item, index) => tagQuestion({
  grammarCategory: `${item.lesson.titleTamil} · பாடப்பகுதி`,
  questionTamil: `“${item.lesson.titleTamil}” பாடத்தில் இடம்பெற்ற தகவல் எது?`,
  ...makeOptions(item.text, allFactTexts.map((entry) => entry.text), index + 1101),
  explanationTamil: item.text,
}, item.lesson, `fact-${item.lesson.id}-${index}`);

const explanationQuestion = (item, index) => tagQuestion({
  grammarCategory: `${item.lesson.titleTamil} · விளக்கம்`,
  questionTamil: `“${item.heading}” பகுதியில் கூறப்படும் கருத்து எது?`,
  ...makeOptions(item.body, allExplanationSections.map((entry) => entry.body).filter(Boolean), index + 1501),
  explanationTamil: item.body,
}, item.lesson, `explanation-${item.lesson.id}-${index}`);

const objectiveQuestion = (item, index) => tagQuestion({
  grammarCategory: `${item.lesson.titleTamil} · கற்றல் நோக்கம்`,
  questionTamil: `“${item.lesson.titleTamil}” பாடத்தின் கற்றல் நோக்கங்களில் ஒன்று எது?`,
  ...makeOptions(item.text, allObjectives.map((entry) => entry.text), index + 1901),
  explanationTamil: item.text,
}, item.lesson, `objective-${item.lesson.id}-${index}`);

const rawQuestionPool = [
  ...MOCK_QUIZ_QUESTIONS.map((question, index) => {
    const lesson = COURSE_LESSONS.find((item) => item.id === question.referenceLessonId);
    return lesson ? tagQuestion(question, lesson, `existing-${index}`) : question;
  }),
  ...uniqueTerms.flatMap((term, index) => [termQuestion(term, index), termQuestion(term, index, true)]),
  ...allHighlights.map(highlightQuestion),
  ...allFactTexts.map(factQuestion),
  ...allExplanationSections.map(explanationQuestion),
  ...allObjectives.map(objectiveQuestion),
];

const validQuestion = (question) => question.optionsTamil?.length === 4 && question.optionsTamil.every(Boolean) && new Set(question.optionsTamil).size === 4;
const uniqueQuestionPool = [...new Map(rawQuestionPool.filter(validQuestion).map((question) => [question.id, question])).values()];

export const LESSON_QUESTION_SETS = Object.fromEntries(COURSE_LESSONS.map((lesson) => {
  const candidates = uniqueQuestionPool.filter((question) => question.referenceLessonId === lesson.id);
  const chosen = [];
  const seenPrompts = new Set();
  for (const question of candidates) {
    if (!seenPrompts.has(question.questionTamil)) {
      chosen.push(question);
      seenPrompts.add(question.questionTamil);
    }
    if (chosen.length === 5) break;
  }
  return [lesson.id, chosen];
}));

export const UNIT_QUESTION_SETS = Object.fromEntries(COURSE_UNITS.map((unit) => [
  unit.id,
  unit.lessons.flatMap((lesson) => LESSON_QUESTION_SETS[lesson.id] || []),
]));

const lessonQuestionIds = new Set(COURSE_LESSONS.flatMap((lesson) => (LESSON_QUESTION_SETS[lesson.id] || []).map((question) => question.id)));
export const FINAL_TAMIL_QUESTIONS = [
  ...COURSE_LESSONS.flatMap((lesson) => LESSON_QUESTION_SETS[lesson.id] || []),
  ...uniqueQuestionPool.filter((question) => !lessonQuestionIds.has(question.id)),
].slice(0, 200);

export const IMPORTANT_WRITTEN_QUESTIONS = allHighlights.filter(
  (item) => item.marksWeightage === 2 || item.marksWeightage === 3,
);
