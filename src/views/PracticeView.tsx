import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QuizQuestion } from '../types';
import { predefinedQuestions, generateRandomQuestion } from '../data/questions';
import { FractionDisplay } from '../components/FractionDisplay';
import { Mascot } from '../components/Mascot';
import { SoundPlayer } from '../utils/sound';
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  Zap,
  GraduationCap,
  Clock,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Award,
  AlertCircle
} from 'lucide-react';

export const PracticeView: React.FC = () => {
  const {
    lang,
    t,
    user,
    addStars,
    addXP,
    recordAnswerResult,
    recordFinalExamResult,
    soundEnabled,
    triggerConfetti
  } = useApp();

  // Mode: 'topic' | 'blitz' | 'exam'
  const [mode, setMode] = useState<'topic' | 'blitz' | 'exam'>('topic');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Active question state
  const [questionList, setQuestionList] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User input states
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintShown, setHintShown] = useState<boolean>(false);

  // Blitz mode timer
  const [blitzTimeLeft, setBlitzTimeLeft] = useState<number>(60);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzActive, setBlitzActive] = useState<boolean>(false);

  // Exam state
  const [examResults, setExamResults] = useState<{
    total: number;
    correct: number;
    topicStats: Record<string, { correct: number; total: number }>;
  } | null>(null);

  // Topic breakdown for diagnostic report
  const [topicScoreTracker, setTopicScoreTracker] = useState<Record<string, { correct: number; total: number }>>({});

  // Initialize questions on mode or topic change
  useEffect(() => {
    loadQuestions();
  }, [mode, selectedTopic, difficulty]);

  // Blitz timer ticker
  useEffect(() => {
    let timer: any;
    if (mode === 'blitz' && blitzActive && blitzTimeLeft > 0) {
      timer = setInterval(() => {
        setBlitzTimeLeft(prev => {
          if (prev <= 1) {
            setBlitzActive(false);
            SoundPlayer.playLevelUp(soundEnabled);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, blitzActive, blitzTimeLeft]);

  const loadQuestions = () => {
    setIsAnswered(false);
    setIsCorrect(null);
    setHintShown(false);
    setSelectedOption('');
    setTextInput('');
    setCurrentIndex(0);

    if (mode === 'exam') {
      // 20 questions across all 5 topics
      const examSet: QuizQuestion[] = [];
      const topics = ['l1', 'l2', 'l3', 'l4', 'l5'];
      for (let i = 0; i < 20; i++) {
        const tId = topics[i % 5];
        examSet.push(generateRandomQuestion(tId, i < 7 ? 'easy' : i < 15 ? 'medium' : 'hard'));
      }
      setQuestionList(examSet);
      setExamResults(null);
      setTopicScoreTracker({
        l1: { correct: 0, total: 0 },
        l2: { correct: 0, total: 0 },
        l3: { correct: 0, total: 0 },
        l4: { correct: 0, total: 0 },
        l5: { correct: 0, total: 0 }
      });
      return;
    }

    if (mode === 'blitz') {
      // Unlimited fast-paced generator
      const blitzSet: QuizQuestion[] = [];
      for (let i = 0; i < 30; i++) {
        blitzSet.push(generateRandomQuestion(undefined, 'easy'));
      }
      setQuestionList(blitzSet);
      setBlitzTimeLeft(60);
      setBlitzScore(0);
      setBlitzActive(true);
      return;
    }

    // Normal topic practice
    let filtered = predefinedQuestions.filter(q => {
      const matchTopic = selectedTopic === 'all' || q.topicId === selectedTopic;
      const matchDiff = q.difficulty === difficulty;
      return matchTopic && matchDiff;
    });

    // Supplement with generated questions to guarantee 15+ questions
    while (filtered.length < 15) {
      filtered.push(generateRandomQuestion(selectedTopic, difficulty));
    }

    filtered = filtered.sort(() => Math.random() - 0.5);
    setQuestionList(filtered);
  };

  const currentQ = questionList[currentIndex];

  const handleCheckAnswer = () => {
    if (!currentQ || isAnswered) return;

    let submitted = '';
    if (currentQ.type === 'multiple_choice' || currentQ.type === 'true_false') {
      submitted = selectedOption;
    } else {
      submitted = textInput.trim();
    }

    if (!submitted) return;

    // Normalizing fraction comparisons (e.g. 2 2/4 vs 2 1/2 or 0.5 vs 1/2)
    const norm = (str: string) => str.replace(/\s+/g, ' ').toLowerCase();
    const correct = norm(submitted) === norm(currentQ.correctAnswer);

    setIsCorrect(correct);
    setIsAnswered(true);
    recordAnswerResult(correct);

    if (correct) {
      SoundPlayer.playCorrect(soundEnabled);
      const starReward = hintShown ? 1 : 2;
      addStars(starReward);
      addXP(15);
      if (mode === 'blitz') {
        setBlitzScore(prev => prev + 10);
      }
    } else {
      SoundPlayer.playWrong(soundEnabled);
    }

    // Track for exam
    if (mode === 'exam') {
      setTopicScoreTracker(prev => {
        const current = prev[currentQ.topicId] || { correct: 0, total: 0 };
        return {
          ...prev,
          [currentQ.topicId]: {
            correct: current.correct + (correct ? 1 : 0),
            total: current.total + 1
          }
        };
      });
    }
  };

  const handleNextQuestion = () => {
    SoundPlayer.playClick(soundEnabled);
    if (currentIndex + 1 < questionList.length) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setHintShown(false);
      setSelectedOption('');
      setTextInput('');
    } else {
      // Completed all questions
      if (mode === 'exam') {
        const total = questionList.length;
        let totalCorrect = 0;
        Object.values(topicScoreTracker).forEach(item => {
          totalCorrect += item.correct;
        });
        const pct = Math.round((totalCorrect / total) * 100);
        let grade = 2;
        if (pct >= 85) grade = 5;
        else if (pct >= 70) grade = 4;
        else if (pct >= 55) grade = 3;

        setExamResults({
          total,
          correct: totalCorrect,
          topicStats: topicScoreTracker
        });
        recordFinalExamResult(pct, grade);
        triggerConfetti();
        SoundPlayer.playLevelUp(soundEnabled);
      }
    }
  };

  const topicNames: Record<string, string> = {
    l1: "1-mavzu: Aralash ⇄ Noto'g'ri",
    l2: "2-mavzu: Aralash qo'shish",
    l3: "3-mavzu: Aralash ayirish",
    l4: "4-mavzu: Ko'paytirish",
    l5: "5-mavzu: Bo'lish"
  };

  return (
    <div className="space-y-6 animate-pop">
      {/* Mode Selector Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setMode('topic');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              mode === 'topic'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>{t('normalPractice')}</span>
          </button>

          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setMode('blitz');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              mode === 'blitz'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{t('blitzMode')}</span>
          </button>

          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setMode('exam');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              mode === 'exam'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{t('finalExam')}</span>
          </button>
        </div>

        {/* Adaptive level indicator */}
        <div className="flex items-center gap-2 text-xs font-bold bg-amber-50 dark:bg-slate-700 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-slate-600">
          <span className="text-slate-500 dark:text-slate-400">Moslashuvchan qiyinlik:</span>
          <span className="text-amber-600 dark:text-amber-400 font-black">
            {user.adaptiveLevel === 1 ? t('difficultyEasy') : user.adaptiveLevel === 2 ? t('difficultyMedium') : t('difficultyHard')}
          </span>
        </div>
      </div>

      {/* Topic and Difficulty Filters (for normal practice mode) */}
      {mode === 'topic' && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          {/* Topic Select */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('selectTopic')}</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="bg-white dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 outline-none"
            >
              <option value="all">{t('allTopics')}</option>
              <option value="l1">1-dars: Aralash ⇄ Noto'g'ri</option>
              <option value="l2">2-dars: Aralash qo'shish</option>
              <option value="l3">3-dars: Aralash ayirish</option>
              <option value="l4">4-dars: Ko'paytirish</option>
              <option value="l5">5-dars: Bo'lish</option>
            </select>
          </div>

          {/* Difficulty Select */}
          <div className="flex items-center gap-1.5">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setDifficulty(d);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition ${
                  difficulty === d
                    ? 'bg-amber-500 text-white font-black'
                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {d === 'easy' ? t('difficultyEasy') : d === 'medium' ? t('difficultyMedium') : t('difficultyHard')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blitz Mode Header Status */}
      {mode === 'blitz' && (
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-2xl shadow-md">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 animate-spin" />
            <span className="font-bold text-sm">{t('blitzTimer')}:</span>
            <span className="font-mono text-2xl font-black">{blitzTimeLeft}s</span>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase font-bold tracking-wider">Ball:</span>
            <span className="font-mono text-2xl font-black ml-2">{blitzScore}</span>
          </div>
        </div>
      )}

      {/* Final Exam Diagnostic Results Modal/View */}
      {mode === 'exam' && examResults && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-indigo-300 dark:border-indigo-700 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 mx-auto flex items-center justify-center text-3xl">
              🎓
            </div>
            <h2 className="font-fredoka text-3xl font-black text-slate-900 dark:text-white">
              {t('examResultTitle')}
            </h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              20 ta savoldan {examResults.correct} tasiga to'g'ri javob berildi!
            </p>
          </div>

          {/* Grade and accuracy badges */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-indigo-50 dark:bg-slate-700 p-4 rounded-2xl text-center">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block uppercase">
                {t('examGrade')}
              </span>
              <span className="font-fredoka text-4xl font-black text-indigo-700 dark:text-indigo-300">
                {Math.round((examResults.correct / 20) * 100) >= 85 ? '5 (A\'lo)' : Math.round((examResults.correct / 20) * 100) >= 70 ? '4 (Yaxshi)' : Math.round((examResults.correct / 20) * 100) >= 55 ? '3 (Qoniqarli)' : '2 (Yetarsiz)'}
              </span>
            </div>

            <div className="bg-amber-50 dark:bg-slate-700 p-4 rounded-2xl text-center">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block uppercase">
                {t('examAccuracy')}
              </span>
              <span className="font-fredoka text-4xl font-black text-amber-600 dark:text-amber-400">
                {Math.round((examResults.correct / 20) * 100)}%
              </span>
            </div>
          </div>

          {/* Topic-by-topic diagnostics */}
          <div className="space-y-3 pt-2">
            <h4 className="font-fredoka text-base font-bold text-slate-800 dark:text-white">
              Mavzular bo'yicha tahlil:
            </h4>
            <div className="space-y-2">
              {Object.entries(examResults.topicStats).map(([tId, stat]) => {
                const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return (
                  <div key={tId} className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-700/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-600">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{topicNames[tId]}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-500">{stat.correct}/{stat.total}</span>
                      <span className={`font-black px-2 py-0.5 rounded-lg ${pct >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personal Teacher Recommendation */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
            <span className="font-black block uppercase text-indigo-700 dark:text-indigo-300">
              {t('recommendationTitle')}
            </span>
            <p className="font-medium">
              {examResults.correct >= 17
                ? "Ajoyib natija! Sen kasrlar bo'yicha haqiqiy ustozsan. Barcha amallarni bexato bajarding!"
                : examResults.correct >= 13
                ? "Yaxshi bilim! Faqat ayirishda qarz olish yoki kasrlarni bo'lishda biroz e'tiborliroq bo'lsang, natijang 5 ga aylanadi!"
                : "Hechqisi yo'q! Darslar bo'limiga qaytib, qadamma-qadam tushuntirishlarni yana bir bor ko'rib chiqishni maslahat beramiz."}
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={loadQuestions}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs transition cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Imtihonni qayta topshirish</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Question Card (Active question) */}
      {currentQ && (!examResults || mode !== 'exam') && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
          {/* Header row: question count, hint button */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full">
                Savol {currentIndex + 1} / {questionList.length}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {currentQ.difficulty.toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => {
                SoundPlayer.playClick(soundEnabled);
                setHintShown(true);
              }}
              disabled={hintShown}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                hintShown
                  ? 'bg-amber-100 text-amber-800 border-amber-300 opacity-80'
                  : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50 border-slate-200 dark:border-slate-600'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>{t('hint')}</span>
            </button>
          </div>

          {/* Question Text & Math representation */}
          <div className="space-y-4">
            <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question[lang]}
            </h3>

            {currentQ.fractionA && (
              <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-slate-700/40 rounded-2xl w-fit">
                <FractionDisplay fraction={currentQ.fractionA} size="lg" />
                {currentQ.operation && (
                  <span className="text-2xl font-black text-amber-600 font-mono">{currentQ.operation}</span>
                )}
                {currentQ.fractionB && (
                  <FractionDisplay fraction={currentQ.fractionB} size="lg" />
                )}
              </div>
            )}
          </div>

          {/* Hint disclosure box */}
          {hintShown && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 animate-pop">
              <span className="text-lg">💡</span>
              <div>
                <span className="font-black block uppercase text-amber-700 dark:text-amber-400 mb-0.5">
                  {t('hint')} ({t('hintUsedText')}):
                </span>
                <p className="font-semibold">{currentQ.hint[lang]}</p>
              </div>
            </div>
          )}

          {/* Question Answer Inputs */}
          <div>
            {currentQ.type === 'multiple_choice' || currentQ.type === 'true_false' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options?.map((opt) => {
                  const isSelected = selectedOption === opt.value;
                  let optStyle = "bg-slate-50 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600";

                  if (isAnswered) {
                    if (opt.value === currentQ.correctAnswer) {
                      optStyle = "bg-emerald-500 text-white border-emerald-600 font-black";
                    } else if (isSelected && !isCorrect) {
                      optStyle = "bg-rose-500 text-white border-rose-600 font-black animate-shake";
                    }
                  } else if (isSelected) {
                    optStyle = "bg-amber-500 text-white border-amber-600 font-black shadow-md";
                  }

                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        if (!isAnswered) {
                          SoundPlayer.playClick(soundEnabled);
                          setSelectedOption(opt.value);
                        }
                      }}
                      disabled={isAnswered}
                      className={`p-4 rounded-2xl border-2 text-left text-sm font-bold transition flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span>{opt[lang] || opt.value}</span>
                      {isAnswered && opt.value === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Input Mixed or text input */
              <div className="space-y-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isAnswered}
                  placeholder={t('enterMixedPlaceholder')}
                  className="w-full sm:max-w-md p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-mono font-bold text-lg outline-none focus:border-amber-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isAnswered) handleCheckAnswer();
                  }}
                />
                <p className="text-xs text-slate-400 font-semibold">
                  Maslahat: Aralash kasrlarni butun va kasr orasiga bitta bo'sh joy tashlab yoz: masalan 2 1/4
                </p>
              </div>
            )}
          </div>

          {/* Step-by-step Feedback Box on submission */}
          {isAnswered && (
            <div
              className={`p-5 rounded-2xl border-2 animate-pop ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-black text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>{t('correct')} (+2 yulduz)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>{t('incorrect')}</span>
                  </>
                )}
              </div>

              {/* Explaining WHY it's correct/wrong step-by-step */}
              <div className="space-y-1 text-xs leading-relaxed font-semibold">
                <span className="font-black uppercase tracking-wider block opacity-70">
                  {t('explanation')}
                </span>
                <p>{currentQ.explanation[lang]}</p>
                {!isCorrect && (
                  <p className="font-black text-rose-700 dark:text-rose-300 mt-1">
                    To'g'ri javob: {currentQ.correctAnswer}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons: Submit / Next Question */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={
                  (currentQ.type === 'multiple_choice' || currentQ.type === 'true_false')
                    ? !selectedOption
                    : !textInput.trim()
                }
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-sm shadow-md transition cursor-pointer"
              >
                {t('submitAnswer')}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <span>{currentIndex + 1 < questionList.length ? t('next') : t('finish')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
