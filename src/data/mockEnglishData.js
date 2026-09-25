export const MOCK_ENGLISH_UNITS = [
  {
    id: "english-unit-1",
    unitNumber: 1,
    titleTamil: "Unit 1: His First Flight",
    themeTamil: "Courage and Self-belief",
    themeEnglish: "Courage and Self-belief",
    icon: "BookOpen",
    color: "blue",
    summary:
      "A story about a young seagull's first flight and overcoming fear.",
    lessons: [
      {
        id: "lesson-eng-1-1",
        unitId: "english-unit-1",
        unitNumber: 1,
        unitNameTamil: "His First Flight",
        category: "prose",
        categoryNameTamil: "Prose",
        titleTamil: "His First Flight",
        titleEnglish: "His First Flight",
        author: "Liam O' Flaherty",
        authorBio: "An Irish novelist and short story writer.",
        manappadam: false,
        estimatedMinutes: 20,
        learningObjectives: [
          "Understand the theme of courage and overcoming fear.",
          "Learn new vocabulary related to the sea and flight.",
        ],
        introduction: "The young seagull was alone on his ledge...",
        fullContent: [
          "The young seagull was alone on his ledge.",
          "His two brothers and his sister had already flown away the day before.",
          "He had been afraid to fly with them.",
        ],
        poemLines: [],
        explanationSections: [
          {
            heading: "Summary",
            body: "The story highlights the importance of independence and self-reliance. It shows how the parents force the young bird to fly by making him hungry.",
          }
        ],
        noolVeli: {
          author: "Liam O' Flaherty",
          details: "From his collection of short stories.",
          works: [],
          awards: [],
        },
        solPorulList: [
          {
            word: "ledge",
            meaning: "a narrow horizontal surface projecting from a wall, cliff, or other surface.",
          },
          {
            word: "brink",
            meaning: "the edge of a steep place.",
          }
        ],
        examHighlights: [
          {
            id: "eh-eng-1-1",
            title: "Why did the young seagull fail to fly?",
            badge: "repeated",
            content: "He was afraid that his wings would not support him.",
            pastExamYears: ["2020", "2022"],
            marksWeightage: 2,
          }
        ],
      }
    ]
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: "q-eng-1",
    unitId: "english-unit-1",
    questionTamil: "Why did the young seagull fail to fly?",
    optionsTamil: [
      "He was lazy.",
      "He was afraid.",
      "His wings were broken.",
      "He didn't want to leave his parents."
    ],
    correctAnswerIndex: 1,
    explanationTamil: "The young seagull was afraid that his wings would not support him.",
    difficulty: "easy",
    grammarCategory: "Prose",
    referenceLessonId: "lesson-eng-1-1",
    points: 10,
  }
];
