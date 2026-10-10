export type Language = 'uz' | 'ru' | 'en';

export interface Fraction {
  whole?: number;
  num: number;
  den: number;
}

export type MathOperation = '+' | '-' | '*' | '/';

export interface UserBadge {
  id: string;
  icon: string;
  titleKey: string;
  descKey: string;
  unlockedAt?: string;
}

export interface UserProgress {
  name: string;
  stars: number;
  xp: number;
  level: number; // 1 to 10
  streak: number;
  lastActiveDate: string;
  dailyGoalCompleted: boolean;
  unlockedBadges: string[];
  completedLessons: string[];
  testScores: {
    topicId: string;
    score: number;
    total: number;
    date: string;
  }[];
  finalExamBestScore?: {
    percentage: number;
    grade: number;
    date: string;
  };
  gameHighScores: {
    pizza: number;
    builder: number;
    memory: number;
    race: number;
    detective: number;
  };
  adaptiveLevel: number; // 1 (Easy), 2 (Medium), 3 (Hard)
  consecutiveCorrect: number;
  consecutiveWrong: number;
}

export type QuestionType = 'multiple_choice' | 'input_mixed' | 'true_false' | 'matching' | 'fill_blank';

export interface QuizQuestion {
  id: string;
  topicId: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: {
    uz: string;
    ru: string;
    en: string;
  };
  fractionA?: Fraction;
  fractionB?: Fraction;
  operation?: MathOperation;
  options?: {
    uz: string;
    ru: string;
    en: string;
    value: string;
  }[];
  correctAnswer: string; // e.g. "2 1/4" or "7/4" or "true"
  hint: {
    uz: string;
    ru: string;
    en: string;
  };
  explanation: {
    uz: string;
    ru: string;
    en: string;
  };
  matchingPairs?: {
    left: string;
    right: string;
  }[];
}
