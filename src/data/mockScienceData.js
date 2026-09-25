export const MOCK_SCIENCE_UNITS = [
  {
    id: "science-unit-1",
    unitNumber: 1,
    titleTamil: "Unit 1: Laws of Motion",
    themeTamil: "Laws of Motion",
    themeEnglish: "Laws of Motion",
    icon: "Microscope",
    color: "purple",
    summary:
      "Understanding force, motion, and Newton's laws.",
    lessons: [
      {
        id: "lesson-sci-1-1",
        unitId: "science-unit-1",
        unitNumber: 1,
        unitNameTamil: "Laws of Motion",
        category: "physics",
        categoryNameTamil: "Physics",
        titleTamil: "Force and Motion",
        titleEnglish: "Force and Motion",
        author: "TN Board",
        authorBio: "",
        manappadam: false,
        estimatedMinutes: 20,
        learningObjectives: [
          "Understand the concept of force.",
          "Learn Newton's laws of motion.",
        ],
        introduction: "In physics, a force is any interaction that, when unopposed, will change the motion of an object...",
        fullContent: [
          "Force can cause an object with mass to change its velocity (which includes to begin moving from a state of rest), i.e., to accelerate.",
          "Force can also be described intuitively as a push or a pull.",
        ],
        poemLines: [],
        explanationSections: [
          {
            heading: "Newton's First Law",
            body: "An object remains in the state of rest or of uniform motion in a straight line unless compelled to change that state by an applied force.",
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
            word: "Inertia",
            meaning: "The resistance of any physical object to any change in its velocity.",
          }
        ],
        examHighlights: [
          {
            id: "eh-sci-1-1",
            title: "State Newton's First Law of Motion.",
            badge: "repeated",
            content: "Every body continues in its state of rest, or of uniform motion in a straight line, unless it is compelled to change that state by forces impressed upon it.",
            pastExamYears: ["2021", "2023"],
            marksWeightage: 2,
          }
        ],
      }
    ]
  }
];

export const MOCK_QUIZ_QUESTIONS = [
  {
    id: "q-sci-1",
    unitId: "science-unit-1",
    questionTamil: "According to Newton's First Law of Motion, an object at rest will:",
    optionsTamil: [
      "Start moving on its own",
      "Remain at rest unless acted upon by an external force",
      "Accelerate",
      "Change direction"
    ],
    correctAnswerIndex: 1,
    explanationTamil: "An object will remain at rest or in uniform motion unless compelled to change its state by the action of an external force.",
    difficulty: "easy",
    grammarCategory: "Physics",
    referenceLessonId: "lesson-sci-1-1",
    points: 10,
  }
];
