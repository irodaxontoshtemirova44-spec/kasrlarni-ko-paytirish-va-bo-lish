import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Language, UserProgress } from '../types';
import { translations, allBadgesList } from '../translations';
import { SoundPlayer } from '../utils/sound';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  user: UserProgress;
  setName: (name: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addXP: (amount: number) => void;
  addStars: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  recordAnswerResult: (correct: boolean) => void;
  unlockBadge: (badgeId: string) => void;
  recordTestResult: (topicId: string, score: number, total: number) => void;
  recordFinalExamResult: (percentage: number, grade: number) => void;
  recordGameScore: (gameKey: keyof UserProgress['gameHighScores'], score: number) => void;
  triggerConfetti: () => void;
  t: (key: keyof typeof translations['uz']) => string;
  largeText: boolean;
  setLargeText: (val: boolean) => void;
}

const STORAGE_KEY = 'kasrlar_olami_state_v1';

const defaultUser: UserProgress = {
  name: "Jasur",
  stars: 12,
  xp: 150,
  level: 2,
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalCompleted: false,
  unlockedBadges: ["b1"],
  completedLessons: ["l1"],
  testScores: [],
  gameHighScores: {
    pizza: 120,
    builder: 80,
    memory: 60,
    race: 90,
    detective: 100
  },
  adaptiveLevel: 2,
  consecutiveCorrect: 0,
  consecutiveWrong: 0
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('kasr_lang');
    return (saved as Language) || 'uz';
  });

  const [darkMode, setDarkModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('kasr_dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('kasr_sound');
    return saved !== null ? saved === 'true' : true;
  });

  const [largeText, setLargeText] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');

  const [user, setUser] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultUser;
  });

  // Keep dark mode class synced on html root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kasr_dark', String(darkMode));
  }, [darkMode]);

  // Persist user state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('kasr_lang', newLang);
  };

  const setDarkMode = (val: boolean) => {
    setDarkModeState(val);
  };

  const setSoundEnabled = (val: boolean) => {
    setSoundEnabledState(val);
    localStorage.setItem('kasr_sound', String(val));
  };

  const calculateLevel = (xp: number): number => {
    if (xp >= 3200) return 10;
    if (xp >= 2500) return 9;
    if (xp >= 1900) return 8;
    if (xp >= 1400) return 7;
    if (xp >= 1000) return 6;
    if (xp >= 700) return 5;
    if (xp >= 450) return 4;
    if (xp >= 250) return 3;
    if (xp >= 100) return 2;
    return 1;
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const addXP = (amount: number) => {
    setUser(prev => {
      const nextXP = prev.xp + amount;
      const nextLevel = calculateLevel(nextXP);
      if (nextLevel > prev.level) {
        SoundPlayer.playLevelUp(soundEnabled);
        triggerConfetti();
        if (nextLevel === 10) {
          unlockBadge('b10');
        }
      }
      return {
        ...prev,
        xp: nextXP,
        level: nextLevel
      };
    });
  };

  const addStars = (amount: number) => {
    setUser(prev => ({
      ...prev,
      stars: prev.stars + amount
    }));
  };

  const setName = (newName: string) => {
    setUser(prev => ({ ...prev, name: newName }));
  };

  const unlockBadge = (badgeId: string) => {
    setUser(prev => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      SoundPlayer.playLevelUp(soundEnabled);
      triggerConfetti();
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId]
      };
    });
  };

  const completeLesson = (lessonId: string) => {
    setUser(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const nextCompleted = [...prev.completedLessons, lessonId];
      if (nextCompleted.length >= 5) {
        unlockBadge('b2');
      }
      return {
        ...prev,
        completedLessons: nextCompleted
      };
    });
    addXP(40);
    addStars(3);
    SoundPlayer.playCorrect(soundEnabled);
  };

  const recordAnswerResult = (correct: boolean) => {
    setUser(prev => {
      const nextStreakCorrect = correct ? prev.consecutiveCorrect + 1 : 0;
      const nextStreakWrong = !correct ? prev.consecutiveWrong + 1 : 0;

      let nextAdaptive = prev.adaptiveLevel;
      if (nextStreakCorrect >= 3 && nextAdaptive < 3) {
        nextAdaptive += 1;
      } else if (nextStreakWrong >= 2 && nextAdaptive > 1) {
        nextAdaptive -= 1;
      }

      if (nextStreakCorrect >= 10) {
        unlockBadge('b8');
      }

      return {
        ...prev,
        consecutiveCorrect: nextStreakCorrect,
        consecutiveWrong: nextStreakWrong,
        adaptiveLevel: nextAdaptive
      };
    });
  };

  const recordTestResult = (topicId: string, score: number, total: number) => {
    setUser(prev => ({
      ...prev,
      testScores: [
        ...prev.testScores,
        { topicId, score, total, date: new Date().toLocaleDateString() }
      ]
    }));
    unlockBadge('b1');
  };

  const recordFinalExamResult = (percentage: number, grade: number) => {
    setUser(prev => ({
      ...prev,
      finalExamBestScore: {
        percentage,
        grade,
        date: new Date().toLocaleDateString()
      }
    }));
    if (grade === 5) {
      unlockBadge('b9');
    }
  };

  const recordGameScore = (gameKey: keyof UserProgress['gameHighScores'], score: number) => {
    setUser(prev => {
      const currentBest = prev.gameHighScores[gameKey] || 0;
      if (score > currentBest) {
        return {
          ...prev,
          gameHighScores: {
            ...prev.gameHighScores,
            [gameKey]: score
          }
        };
      }
      return prev;
    });

    if (gameKey === 'pizza' && score >= 500) {
      unlockBadge('b5');
    } else if (gameKey === 'race' && score >= 200) {
      unlockBadge('b7');
    } else if (gameKey === 'detective' && score >= 3) {
      unlockBadge('b6');
    }
  };

  const t = (key: keyof typeof translations['uz']): string => {
    const dict = translations[lang] || translations.uz;
    const val = dict[key];
    if (typeof val === 'string') return val;
    return (translations.uz[key] as string) || String(key);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        darkMode,
        setDarkMode,
        soundEnabled,
        setSoundEnabled,
        user,
        setName,
        activeTab,
        setActiveTab,
        addXP,
        addStars,
        completeLesson,
        recordAnswerResult,
        unlockBadge,
        recordTestResult,
        recordFinalExamResult,
        recordGameScore,
        triggerConfetti,
        t,
        largeText,
        setLargeText
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
