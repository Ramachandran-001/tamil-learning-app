export const MOCK_SOCIAL_UNITS = [
  {
    id: "social-unit-1",
    unitNumber: 1,
    titleTamil: "Unit 1: Outbreak of World War I",
    themeTamil: "Outbreak of World War I",
    themeEnglish: "Outbreak of World War I",
    icon: "Globe",
    color: "rose",
    summary:
      "The causes, course, and results of World War I.",
    lessons: [
      {
        id: "lesson-soc-1-1",
        unitId: "social-unit-1",
        unitNumber: 1,
        unitNameTamil: "Outbreak of World War I",
        category: "history",
        categoryNameTamil: "History",
        titleTamil: "Causes of World War I",
        titleEnglish: "Causes of World War I",
        author: "TN Board",
        authorBio: "",
        manappadam: false,
        estimatedMinutes: 25,
        learningObjectives: [
          "Understand the long-term causes of WWI.",
          "Identify the immediate cause of the war.",
        ],
        introduction: "The First World War (1914–1918) was the first war that involved almost all the major countries of the world...",
        fullContent: [
          "Imperialism, militarism, nationalism, and secret alliances were the main causes.",
          "The assassination of Archduke Franz Ferdinand was the spark that ignited the war.",
        ],
        poemLines: [],
        explanationSections: [
          {
            heading: "Militarism",
            body: "The belief or desire of a government or people that a country should maintain a strong military capability and be prepared to use it aggressively.",
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
            word: "Alliance",
            meaning: "A union or association formed for mutual benefit, especially between countries or organizations.",
          }
        ],
        examHighlights: [
          {
            id: "eh-soc-1-1",
            title: "What was the immediate cause of the First World War?",
            badge: "repeated",
            content: "The assassination of Archduke Franz Ferdinand of Austria-Hungary on 28 June 1914.",
            pastExamYears: ["2019", "2022"],
            marksWeightage: 2,
          }
        ],
      }
    ]
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: "q-soc-1",
    unitId: "social-unit-1",
    questionTamil: "What was the immediate cause of the First World War?",
    optionsTamil: [
      "Militarism",
      "Imperialism",
      "Assassination of Archduke Franz Ferdinand",
      "Secret Alliances"
    ],
    correctAnswerIndex: 2,
    explanationTamil: "The assassination of Archduke Franz Ferdinand of Austria-Hungary on 28 June 1914 was the spark that ignited the war.",
    difficulty: "easy",
    grammarCategory: "History",
    referenceLessonId: "lesson-soc-1-1",
    points: 10,
  }
];
