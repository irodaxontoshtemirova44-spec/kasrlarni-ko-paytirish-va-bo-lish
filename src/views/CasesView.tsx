import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { realLifeCases, CaseStudy } from '../data/cases';
import { FractionDisplay } from '../components/FractionDisplay';
import { Mascot } from '../components/Mascot';
import { SoundPlayer } from '../utils/sound';
import {
  BookOpen,
  Compass,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export const CasesView: React.FC = () => {
  const { lang, t, addStars, addXP, soundEnabled, triggerConfetti } = useApp();

  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState<number>(1); // 1: Read, 2: Plan, 3: Solve, 4: Check, 5: Reflect
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const activeCase: CaseStudy = realLifeCases[selectedCaseIdx];

  const handleCheckAnswer = () => {
    SoundPlayer.playClick(soundEnabled);
    const norm = (str: string) => str.trim().replace(/\s+/g, ' ');
    const correct = norm(userAnswer) === norm(activeCase.correctAnswer);
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      SoundPlayer.playCorrect(soundEnabled);
      addStars(3);
      addXP(35);
      triggerConfetti();
    } else {
      SoundPlayer.playWrong(soundEnabled);
    }
  };

  const stepsList = [
    { num: 1, label: t('caseReadStep') },
    { num: 2, label: t('casePlanStep') },
    { num: 3, label: t('caseSolveStep') },
    { num: 4, label: t('caseCheckStep') },
    { num: 5, label: t('caseReflectionStep') }
  ];

  return (
    <div className="space-y-6 animate-pop">
      {/* Case Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {realLifeCases.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setSelectedCaseIdx(idx);
              setCurrentStep(1);
              setUserAnswer('');
              setIsAnswerChecked(false);
              setIsCorrect(null);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition cursor-pointer ${
              selectedCaseIdx === idx
                ? 'bg-amber-500 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.title[lang]}</span>
          </button>
        ))}
      </div>

      {/* Main Case Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-3 bg-amber-100 dark:bg-slate-700 rounded-2xl">{activeCase.icon}</span>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Hayotiy Matematik Keys #{selectedCaseIdx + 1}
              </span>
              <h2 className="font-fredoka text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {activeCase.title[lang]}
              </h2>
            </div>
          </div>

          <Mascot
            mood="thinking"
            size="sm"
            message="Masalani bosqichma-bosqich yechamiz!"
            soundEnabled={soundEnabled}
          />
        </div>

        {/* 5-Step Process Bar */}
        <div className="grid grid-cols-5 gap-2 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-600">
          {stepsList.map(s => {
            const isActive = currentStep === s.num;
            const isPassed = currentStep > s.num;
            return (
              <button
                key={s.num}
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setCurrentStep(s.num);
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md'
                    : isPassed
                    ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50'
                }`}
              >
                <span>{s.num}.</span>
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* STEP 1: READ */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-pop">
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-slate-700/60 border border-amber-200 leading-relaxed space-y-3">
              <h4 className="font-fredoka text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>📖 Masala hikoyasi</span>
              </h4>
              <p className="text-base text-slate-800 dark:text-slate-200 font-medium">
                {activeCase.story[lang]}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 space-y-2">
              <h5 className="font-bold text-xs uppercase text-slate-500 tracking-wider">
                Berilgan ma'lumotlar:
              </h5>
              <ul className="list-disc list-inside space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {activeCase.given[lang].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: PLAN */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-pop">
            <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-slate-700/60 border border-indigo-200 space-y-3">
              <h4 className="font-fredoka text-lg font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <span>Yechim rejasi va ifodasi</span>
              </h4>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Ushbu masalada qaysi matematik amalni bajarishimiz kerak?
              </p>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-600 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Tuzilgan ifoda:</span>
                <span className="font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {activeCase.expression}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SOLVE */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-pop">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 space-y-3">
              <h4 className="font-fredoka text-lg font-bold text-slate-900 dark:text-white">
                {activeCase.question[lang]}
              </h4>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Javobni yoz: masalan 1 3/4"
                  className="w-full sm:w-64 p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 font-mono font-bold text-base outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleCheckAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs shadow-md transition cursor-pointer"
                >
                  Tekshirish
                </button>
              </div>

              {isAnswerChecked && (
                <div className={`p-4 rounded-2xl border-2 animate-pop ${isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                  <p className="font-black text-sm mb-2">
                    {isCorrect ? "To'ppa-to'g'ri! Barakalla!" : "Biroz xato bo'ldi! Mana to'g'ri yechim:"}
                  </p>
                  <div className="space-y-1.5 text-xs font-semibold">
                    {activeCase.solutionSteps[lang].map((step, idx) => (
                      <p key={idx}>{step}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: CHECK */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-pop">
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-900 dark:text-emerald-200 space-y-2">
              <h4 className="font-fredoka text-lg font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Natijani tekshirish</span>
              </h4>
              <p className="text-sm font-semibold leading-relaxed">
                {activeCase.checkNote[lang]}
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: REFLECTION */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-pop">
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-slate-700/60 border border-amber-200 space-y-3">
              <h4 className="font-fredoka text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{activeCase.reflectionPrompt[lang]}</span>
              </h4>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-300 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {activeCase.reflectionAnswer[lang]}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setCurrentStep(prev => Math.max(1, prev - 1));
            }}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              currentStep === 1 ? 'opacity-40 cursor-not-allowed' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            Oldingi qadam
          </button>

          {currentStep < 5 ? (
            <button
              onClick={() => {
                SoundPlayer.playClick(soundEnabled);
                setCurrentStep(prev => prev + 1);
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Keyingi qadam</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                SoundPlayer.playClick(soundEnabled);
                setSelectedCaseIdx(prev => (prev + 1) % realLifeCases.length);
                setCurrentStep(1);
                setUserAnswer('');
                setIsAnswerChecked(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition cursor-pointer"
            >
              Keyingi keysga o'tish →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
