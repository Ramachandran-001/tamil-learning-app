import { MOCK_QUIZ_QUESTIONS, MOCK_TAMIL_UNITS } from "./mockTamilData.js";

const COURSE_UNITS = MOCK_TAMIL_UNITS.filter((unit) => unit.lessons?.length);
const lessons = COURSE_UNITS.flatMap((unit) => unit.lessons);
const terms = lessons.flatMap((lesson) =>
  (lesson.solPorulList || []).map((term) => ({
    ...term,
    unitId: lesson.unitId,
    lessonId: lesson.id,
    lessonTitle: lesson.titleTamil,
  })),
);
const uniqueTerms = [...new Map(terms.map((term) => [term.word, term])).values()];
const highlights = lessons.flatMap((lesson) =>
  (lesson.examHighlights || []).map((highlight) => ({
    ...highlight,
    unitId: lesson.unitId,
    lessonId: lesson.id,
    lessonTitle: lesson.titleTamil,
  })),
);

const createOptions = (correct, candidates, seed) => {
  const choices = [];
  for (let offset = 0; offset < candidates.length && choices.length < 3; offset += 1) {
    const candidate = candidates[(seed * 7 + offset * 11) % candidates.length];
    if (candidate && candidate !== correct && !choices.includes(candidate)) {
      choices.push(candidate);
    }
  }
  const options = [...choices, correct];
  const answerIndex = seed % 4;
  const correctOption = options.pop();
  options.splice(answerIndex, 0, correctOption);
  return { optionsTamil: options, correctAnswerIndex: answerIndex };
};

const meaningPool = [...new Set(uniqueTerms.map((term) => term.meaning).filter(Boolean))];
const wordPool = uniqueTerms.map((term) => term.word);

const glossaryQuestions = uniqueTerms.map((term, index) => ({
  id: `final-word-${index + 1}`,
  unitId: term.unitId,
  referenceLessonId: term.lessonId,
  grammarCategory: `${term.lessonTitle} · சொற்பொருள்`,
  questionTamil: `“${term.word}” என்பதன் சரியான பொருள் எது?`,
  ...createOptions(term.meaning, meaningPool, index),
  explanationTamil: `“${term.word}” என்பதன் பொருள்: ${term.meaning}.`,
  points: 1,
}));

const reverseTerms = uniqueTerms.filter((_, index) => index % 2 === 0);
const lastUnitTerm = [...uniqueTerms].reverse().find((term) => term.unitId === "tamil-unit-9");
if (lastUnitTerm && !reverseTerms.includes(lastUnitTerm)) reverseTerms.push(lastUnitTerm);

const reverseWordQuestions = reverseTerms.map((term, index) => ({
  id: `final-recall-${index + 1}`,
  unitId: term.unitId,
  referenceLessonId: term.lessonId,
  grammarCategory: `${term.lessonTitle} · சொல்வளம்`,
  questionTamil: `“${term.meaning}” என்ற பொருளைத் தரும் சொல் எது?`,
  ...createOptions(term.word, wordPool, index + 106),
  explanationTamil: `“${term.word}” என்பதன் பொருள்: ${term.meaning}.`,
  points: 1,
}));

const highlightPool = [...new Set(highlights.map((item) => item.content).filter(Boolean))];
const highlightQuestions = highlights.map((item, index) => ({
  id: `final-highlight-${index + 1}`,
  unitId: item.unitId,
  referenceLessonId: item.lessonId,
  grammarCategory: `${item.lessonTitle} · தேர்வுக் குறிப்பு`,
  questionTamil: `${item.lessonTitle}: “${item.title}” வினாவிற்குப் பொருத்தமான குறிப்பு எது?`,
  ...createOptions(item.content, highlightPool, index + 159),
  explanationTamil: item.content,
  points: 1,
}));

const additionalQuestions = [
  {
    id: "final-fact-1",
    unitId: "tamil-unit-1",
    referenceLessonId: "lesson-tamil-1-2",
    grammarCategory: "பாவாணர் பார்வையில் தமிழ்ச்சொல் வளம் · உலகத் தமிழ் மாநாடு",
    questionTamil: "ஒரு மொழிக்காக முதன்முதலில் உலகத் தமிழ் மாநாட்டை நடத்திய நாடு எது?",
    ...createOptions("மலேசியா", ["இந்தியா", "இலங்கை", "சிங்கப்பூர்", "மலேசியா"], 1),
    explanationTamil: "பன்மொழிப் புலவர் கா. அப்பாத்துரையார் குறிப்பின்படி, மலேசியாவே அந்த மாநாட்டை முதலில் நடத்தியது.",
    points: 1,
  },
  {
    id: "final-fact-2",
    unitId: "tamil-unit-1",
    referenceLessonId: "lesson-tamil-1-2",
    grammarCategory: "பாவாணர் பார்வையில் தமிழ்ச்சொல் வளம் · கிளைப்பெயர் வகை",
    questionTamil: "அடிமரத்தினின்று பிரியும் மாபெரும் கிளையின் பெயர் எது?",
    ...createOptions("கவை", ["கொம்பு", "கிளை", "சினை", "கவை"], 2),
    explanationTamil: "அடிமரத்திலிருந்து பிரியும் மாபெரும் கிளை “கவை” எனப்படும்.",
    points: 1,
  },
];

export const FINAL_TAMIL_QUESTIONS = [
  ...MOCK_QUIZ_QUESTIONS.map((question, index) => ({
    ...question,
    id: `final-existing-${index + 1}`,
    points: 1,
  })),
  ...glossaryQuestions,
  ...reverseWordQuestions,
  ...highlightQuestions,
  ...additionalQuestions,
];

if (FINAL_TAMIL_QUESTIONS.length !== 200) {
  throw new Error(`இறுதித் தேர்வில் 200 வினாக்கள் தேவை; இப்போது ${FINAL_TAMIL_QUESTIONS.length} உள்ளன.`);
}

export const IMPORTANT_FINAL_REVIEW = highlights.filter(
  (item) => item.marksWeightage === 3 || item.marksWeightage === 5,
);
