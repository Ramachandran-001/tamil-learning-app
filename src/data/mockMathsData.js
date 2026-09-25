export const MOCK_MATHS_UNITS = [
  {
    id: "maths-unit-1",
    unitNumber: 1,
    titleTamil: "Chapter 1: Relations and Functions",
    themeTamil: "Relations and Functions",
    themeEnglish: "Relations and Functions",
    icon: "Calculator",
    color: "amber",
    summary:
      "Understanding sets, relations, and functions in mathematics.",
    lessons: [
      {
        id: "lesson-mat-1-1",
        unitId: "maths-unit-1",
        unitNumber: 1,
        unitNameTamil: "Relations and Functions",
        category: "algebra",
        categoryNameTamil: "Algebra",
        titleTamil: "Introduction to Sets",
        titleEnglish: "Introduction to Sets",
        author: "TN Board",
        authorBio: "",
        manappadam: false,
        estimatedMinutes: 25,
        learningObjectives: [
          "Understand the concept of sets.",
          "Learn to represent sets in different forms.",
        ],
        introduction: "A set is a well-defined collection of objects...",
        fullContent: [
          "A set is a well-defined collection of objects.",
          "The objects in a set are called its elements or members.",
        ],
        poemLines: [],
        explanationSections: [
          {
            heading: "Examples of Sets",
            body: "The collection of all vowels in the English alphabet is a set.",
          }
        ],
        noolVeli: {
          author: "",
          details: "",
          works: [],
          awards: [],
        },
        solPorulList: [
          {
            word: "Element",
            meaning: "An object that belongs to a set.",
          }
        ],
        examHighlights: [
          {
            id: "eh-mat-1-1",
            title: "Define a set.",
            badge: "expected",
            content: "A set is a well-defined collection of objects.",
            marksWeightage: 2,
          }
        ],
      }
    ]
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: "q-mat-1",
    unitId: "maths-unit-1",
    questionTamil: "Which of the following is a well-defined collection of objects?",
    optionsTamil: [
      "A group of tall boys in a class",
      "A collection of all vowels in the English alphabet",
      "A collection of difficult questions in a test",
      "A collection of beautiful flowers"
    ],
    correctAnswerIndex: 1,
    explanationTamil: "Only 'all vowels in the English alphabet' is clearly defined and leaves no ambiguity.",
    difficulty: "easy",
    grammarCategory: "Sets",
    referenceLessonId: "lesson-mat-1-1",
    points: 10,
  }
];
