import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FractionDisplay } from '../components/FractionDisplay';
import { FractionVisualizer } from '../components/FractionVisualizer';
import { Mascot } from '../components/Mascot';
import { SoundPlayer } from '../utils/sound';
import { detectiveCases } from '../data/games';
import {
  Gamepad2,
  Trophy,
  Flame,
  RotateCcw,
  Sparkles,
  Search,
  CheckCircle,
  XCircle,
  Car
} from 'lucide-react';

export const GamesView: React.FC = () => {
  const { lang, t, addStars, addXP, recordGameScore, soundEnabled, triggerConfetti, user } = useApp();

  // Active game: 'pizza' | 'builder' | 'memory' | 'race' | 'detective'
  const [activeGame, setActiveGame] = useState<'pizza' | 'builder' | 'memory' | 'race' | 'detective'>('pizza');

  // --- GAME 1: PIZZA WORKSHOP STATE ---
  const [pizzaTarget, setPizzaTarget] = useState({ whole: 2, num: 1, den: 4 });
  const [pizzaCurrent, setPizzaCurrent] = useState({ whole: 0, num: 0, den: 4 });
  const [pizzaScore, setPizzaScore] = useState(0);
  const [pizzaCombo, setPizzaCombo] = useState(0);
  const [pizzaFeedback, setPizzaFeedback] = useState<string | null>(null);

  const generateNewPizzaOrder = () => {
    const dens = [2, 4, 8];
    const den = dens[Math.floor(Math.random() * dens.length)];
    const whole = Math.floor(Math.random() * 3) + 1;
    const num = Math.floor(Math.random() * (den - 1)) + 1;
    setPizzaTarget({ whole, num, den });
    setPizzaCurrent({ whole: 0, num: 0, den });
    setPizzaFeedback(null);
  };

  const addPizzaItem = (wholeAdd: number, numAdd: number) => {
    SoundPlayer.playClick(soundEnabled);
    setPizzaCurrent(prev => {
      let totalNum = prev.whole * prev.den + prev.num + (wholeAdd * prev.den + numAdd);
      let newWhole = Math.floor(totalNum / prev.den);
      let newNum = totalNum % prev.den;
      return { whole: newWhole, num: newNum, den: prev.den };
    });
  };

  const deliverPizza = () => {
    const isMatch = pizzaCurrent.whole === pizzaTarget.whole && pizzaCurrent.num === pizzaTarget.num;
    if (isMatch) {
      SoundPlayer.playCorrect(soundEnabled);
      const points = 100 + pizzaCombo * 20;
      setPizzaScore(prev => prev + points);
      setPizzaCombo(prev => prev + 1);
      setPizzaFeedback("Mijoz juda xursand! Mazali pitsa! 🎉");
      addXP(25);
      addStars(2);
      recordGameScore('pizza', pizzaScore + points);
      setTimeout(generateNewPizzaOrder, 1200);
    } else {
      SoundPlayer.playWrong(soundEnabled);
      setPizzaCombo(0);
      setPizzaFeedback("Bo'laklar to'g'ri kelmadi! Qaytadan yig'ib ko'r!");
    }
  };

  // --- GAME 2: FRACTION BUILDER (Matching Improper & Mixed) ---
  const builderPairs = [
    { improper: "7/2", mixed: "3 1/2" },
    { improper: "9/4", mixed: "2 1/4" },
    { improper: "11/3", mixed: "3 2/3" },
    { improper: "13/5", mixed: "2 3/5" }
  ];
  const [selectedBuilderImproper, setSelectedBuilderImproper] = useState<string | null>(null);
  const [selectedBuilderMixed, setSelectedBuilderMixed] = useState<string | null>(null);
  const [matchedBuilder, setMatchedBuilder] = useState<string[]>([]);
  const [builderScore, setBuilderScore] = useState(0);

  const handleBuilderMatch = (imp: string | null, mix: string | null) => {
    if (!imp || !mix) return;
    const found = builderPairs.find(p => p.improper === imp && p.mixed === mix);
    if (found) {
      SoundPlayer.playCorrect(soundEnabled);
      setMatchedBuilder(prev => [...prev, imp]);
      setBuilderScore(prev => prev + 50);
      addXP(15);
      recordGameScore('builder', builderScore + 50);
    } else {
      SoundPlayer.playWrong(soundEnabled);
    }
    setSelectedBuilderImproper(null);
    setSelectedBuilderMixed(null);
  };

  // --- GAME 3: MEMORY CARDS STATE ---
  interface MemoryCard {
    id: number;
    val: string;
    pairKey: string;
    isFlipped: boolean;
    isMatched: boolean;
  }
  const initialMemoryItems = [
    { val: "1/2", pairKey: "half" },
    { val: "2/4", pairKey: "half" },
    { val: "2 1/2", pairKey: "five_halves" },
    { val: "5/2", pairKey: "five_halves" },
    { val: "3/4 + 1/4", pairKey: "one" },
    { val: "1", pairKey: "one" },
    { val: "1/2 × 1/2", pairKey: "quarter" },
    { val: "1/4", pairKey: "quarter" },
    { val: "3 1/3", pairKey: "ten_thirds" },
    { val: "10/3", pairKey: "ten_thirds" },
    { val: "1 ÷ 1/3", pairKey: "three" },
    { val: "3", pairKey: "three" }
  ];
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(() =>
    initialMemoryItems
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({ ...item, id: idx, isFlipped: false, isMatched: false }))
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);

  const handleCardClick = (id: number) => {
    if (selectedCards.length === 2 || memoryCards[id].isFlipped || memoryCards[id].isMatched) return;

    SoundPlayer.playFlip(soundEnabled);
    const newCards = [...memoryCards];
    newCards[id].isFlipped = true;
    setMemoryCards(newCards);

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (memoryCards[first].pairKey === memoryCards[second].pairKey) {
        SoundPlayer.playCorrect(soundEnabled);
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setMemoryScore(prev => prev + 40);
        addXP(20);
        setSelectedCards([]);
      } else {
        SoundPlayer.playWrong(soundEnabled);
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setMemoryCards([...newCards]);
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  // --- GAME 4: FRACTION RACE STATE ---
  const [raceProgress, setRaceProgress] = useState(10); // percentage (10 to 100)
  const [raceQuestion, setRaceQuestion] = useState({ q: "2/3 × 3/4 = ?", options: ["1/2", "6/7", "2/4", "5/7"], ans: "1/2" });
  const [raceWon, setRaceWon] = useState(false);
  const [raceScore, setRaceScore] = useState(0);

  const generateRaceQuestion = () => {
    const questions = [
      { q: "1/2 + 1/2 = ?", options: ["1", "2/4", "1/4", "2"], ans: "1" },
      { q: "3/4 - 1/4 = ?", options: ["1/2", "2/0", "1/4", "1"], ans: "1/2" },
      { q: "2/5 × 5/2 = ?", options: ["1", "10/10", "4/25", "2/5"], ans: "1" },
      { q: "1 ÷ 1/4 = ?", options: ["4", "1/4", "4/1", "0"], ans: "4" },
      { q: "1 1/2 = ?", options: ["3/2", "2/2", "1/2", "4/2"], ans: "3/2" }
    ];
    setRaceQuestion(questions[Math.floor(Math.random() * questions.length)]);
  };

  const handleRaceAnswer = (opt: string) => {
    if (opt === raceQuestion.ans) {
      SoundPlayer.playCarZoom(soundEnabled);
      const nextProgress = raceProgress + 20;
      setRaceProgress(nextProgress);
      setRaceScore(prev => prev + 50);
      addXP(20);

      if (nextProgress >= 100) {
        setRaceWon(true);
        triggerConfetti();
        SoundPlayer.playLevelUp(soundEnabled);
        recordGameScore('race', raceScore + 100);
      } else {
        generateRaceQuestion();
      }
    } else {
      SoundPlayer.playWrong(soundEnabled);
    }
  };

  // --- GAME 5: FRACTION DETECTIVE STATE ---
  const [detectiveCaseIdx, setDetectiveCaseIdx] = useState(0);
  const [selectedDetectiveStep, setSelectedDetectiveStep] = useState<number | null>(null);
  const [detectiveSolved, setDetectiveSolved] = useState(false);

  const currentDetCase = detectiveCases[detectiveCaseIdx];

  const handleDetectiveInspect = (stepNum: number) => {
    SoundPlayer.playClick(soundEnabled);
    setSelectedDetectiveStep(stepNum);
    const stepObj = currentDetCase.steps.find(s => s.stepNum === stepNum);
    if (stepObj && stepObj.isFlawed) {
      SoundPlayer.playCorrect(soundEnabled);
      setDetectiveSolved(true);
      addStars(3);
      addXP(30);
      recordGameScore('detective', 3);
    } else {
      SoundPlayer.playWrong(soundEnabled);
    }
  };

  return (
    <div className="space-y-6 animate-pop">
      {/* Game Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'pizza', name: t('gamePizzaTitle'), icon: '🍕' },
          { id: 'builder', name: t('gameBuilderTitle'), icon: '🧱' },
          { id: 'memory', name: t('gameMemoryTitle'), icon: '🎴' },
          { id: 'race', name: t('gameRaceTitle'), icon: '🏎️' },
          { id: 'detective', name: t('gameDetectiveTitle'), icon: '🔍' }
        ].map(g => (
          <button
            key={g.id}
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setActiveGame(g.id as any);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition cursor-pointer ${
              activeGame === g.id
                ? 'bg-amber-500 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span>{g.icon}</span>
            <span>{g.name}</span>
          </button>
        ))}
      </div>

      {/* GAME 1: PIZZA WORKSHOP */}
      {activeGame === 'pizza' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-fredoka text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🍕 {t('gamePizzaTitle')}</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('gamePizzaDesc')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-xs bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1.5 rounded-xl">
                Ball: {pizzaScore}
              </span>
              {pizzaCombo > 1 && (
                <span className="font-black text-xs bg-orange-500 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 animate-pop">
                  <Flame className="w-3.5 h-3.5 fill-current" /> {pizzaCombo}x {t('comboText')}
                </span>
              )}
            </div>
          </div>

          {/* Customer Order Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-700/80 border-2 border-amber-300 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md">
                👨‍🍳
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase">Mijoz buyurtmasi:</span>
                <h3 className="font-fredoka text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Menga</span>
                  <FractionDisplay fraction={pizzaTarget} size="lg" />
                  <span>pitsa kerak!</span>
                </h3>
              </div>
            </div>

            <button
              onClick={generateNewPizzaOrder}
              className="text-xs font-bold text-slate-500 hover:text-amber-600 underline cursor-pointer"
            >
              Yangi buyurtma
            </button>
          </div>

          {/* Pizza Slicing Board */}
          <div className="p-6 rounded-3xl bg-amber-100/40 dark:bg-slate-900 border-2 border-dashed border-amber-300 flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-xs font-black text-slate-400 uppercase mb-3">Tovoqdagi pitsalar:</span>
            <FractionVisualizer
              whole={pizzaCurrent.whole}
              num={pizzaCurrent.num}
              den={pizzaTarget.den}
              size={130}
            />

            <div className="mt-4 flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500">Hozirgi tovoq:</span>
              <FractionDisplay fraction={pizzaCurrent} size="md" />
            </div>

            {pizzaFeedback && (
              <p className="mt-3 font-bold text-sm text-amber-700 dark:text-amber-300 animate-pop">
                {pizzaFeedback}
              </p>
            )}
          </div>

          {/* Ingredient Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => addPizzaItem(1, 0)}
              className="p-3 bg-amber-50 dark:bg-slate-700 hover:bg-amber-100 border border-amber-300 rounded-2xl font-black text-xs text-amber-900 dark:text-amber-200 transition cursor-pointer flex flex-col items-center gap-1"
            >
              <span className="text-xl">🍕</span>
              <span>+1 Butun Pitsa</span>
            </button>

            <button
              onClick={() => addPizzaItem(0, 1)}
              className="p-3 bg-indigo-50 dark:bg-slate-700 hover:bg-indigo-100 border border-indigo-300 rounded-2xl font-black text-xs text-indigo-900 dark:text-indigo-200 transition cursor-pointer flex flex-col items-center gap-1"
            >
              <span className="text-xl">🍰</span>
              <span>+1/{pizzaTarget.den} Bo'lak</span>
            </button>

            <button
              onClick={() => {
                SoundPlayer.playClick(soundEnabled);
                setPizzaCurrent({ whole: 0, num: 0, den: pizzaTarget.den });
              }}
              className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 border border-slate-300 rounded-2xl font-black text-xs text-slate-700 dark:text-slate-200 transition cursor-pointer flex flex-col items-center gap-1"
            >
              <span className="text-xl">🗑️</span>
              <span>Tovoqni tozalash</span>
            </button>

            <button
              onClick={deliverPizza}
              className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs shadow-md transition cursor-pointer flex flex-col items-center gap-1"
            >
              <span className="text-xl">🚀</span>
              <span>Yetkazib berish!</span>
            </button>
          </div>
        </div>
      )}

      {/* GAME 2: FRACTION BUILDER */}
      {activeGame === 'builder' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-fredoka text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🧱 {t('gameBuilderTitle')}</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Noto'g'ri kasrni unga teng bo'lgan aralash kasr bilan juftlab bosing!
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1.5 rounded-xl">
              Ball: {builderScore}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Left Column: Improper Fractions */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400">Noto'g'ri kasrlar</h4>
              {builderPairs.map(p => {
                const isMatched = matchedBuilder.includes(p.improper);
                const isSelected = selectedBuilderImproper === p.improper;
                return (
                  <button
                    key={p.improper}
                    disabled={isMatched}
                    onClick={() => {
                      SoundPlayer.playClick(soundEnabled);
                      setSelectedBuilderImproper(p.improper);
                      handleBuilderMatch(p.improper, selectedBuilderMixed);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 font-mono font-black text-lg transition flex items-center justify-between cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 opacity-60'
                        : isSelected
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-amber-400 text-slate-800 dark:text-white'
                    }`}
                  >
                    <span>{p.improper}</span>
                    {isMatched && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Mixed Fractions */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400">Aralash kasrlar</h4>
              {[...builderPairs].sort().map(p => {
                const isMatched = matchedBuilder.includes(p.improper);
                const isSelected = selectedBuilderMixed === p.mixed;
                return (
                  <button
                    key={p.mixed}
                    disabled={isMatched}
                    onClick={() => {
                      SoundPlayer.playClick(soundEnabled);
                      setSelectedBuilderMixed(p.mixed);
                      handleBuilderMatch(selectedBuilderImproper, p.mixed);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 font-mono font-black text-lg transition flex items-center justify-between cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 opacity-60'
                        : isSelected
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-amber-400 text-slate-800 dark:text-white'
                    }`}
                  >
                    <span>{p.mixed}</span>
                    {isMatched && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GAME 3: MEMORY CARDS */}
      {activeGame === 'memory' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-fredoka text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎴 {t('gameMemoryTitle')}</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('gameMemoryDesc')}
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1.5 rounded-xl">
              Ball: {memoryScore}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {memoryCards.map(c => {
              const showFront = c.isFlipped || c.isMatched;
              return (
                <div
                  key={c.id}
                  onClick={() => handleCardClick(c.id)}
                  className={`h-28 rounded-2xl border-2 flex items-center justify-center font-bold text-sm cursor-pointer select-none transition-all duration-300 transform ${
                    c.isMatched
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 scale-95 opacity-80'
                      : showFront
                      ? 'bg-white dark:bg-slate-700 border-amber-400 text-slate-900 dark:text-white shadow-md'
                      : 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-500 text-white shadow hover:scale-105'
                  }`}
                >
                  {showFront ? (
                    <span className="font-mono text-base font-black px-1 text-center">{c.val}</span>
                  ) : (
                    <span className="text-2xl opacity-70">❓</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME 4: FRACTION RACE */}
      {activeGame === 'race' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-fredoka text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🏎️ {t('gameRaceTitle')}</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('gameRaceDesc')}
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1.5 rounded-xl">
              Masofa: {raceProgress}%
            </span>
          </div>

          {/* Race Track Canvas/Bar */}
          <div className="relative h-20 bg-slate-800 rounded-2xl overflow-hidden border-4 border-slate-700 flex items-center px-4">
            {/* Track road dashes */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b-2 border-dashed border-yellow-400 opacity-60" />

            {/* Finish Line Checkered Banner */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-[repeating-conic-gradient(#fff_0_25%,#000_0_50%)] bg-[length:12px_12px]" />

            {/* Moving Car */}
            <div
              className="absolute transition-all duration-500 ease-out flex items-center text-3xl"
              style={{ left: `calc(${Math.min(90, raceProgress)}% - 20px)` }}
            >
              🏎️
            </div>
          </div>

          {/* Race Question Card */}
          {!raceWon ? (
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-slate-700/60 border border-amber-200 dark:border-slate-600 text-center space-y-4">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">
                Nitro tezlanish savoli:
              </span>
              <h3 className="font-fredoka text-3xl font-black text-slate-900 dark:text-white font-mono">
                {raceQuestion.q}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
                {raceQuestion.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleRaceAnswer(opt)}
                    className="p-3 bg-white dark:bg-slate-800 hover:bg-amber-500 hover:text-white border-2 border-amber-300 rounded-xl font-black text-sm text-slate-800 dark:text-white transition cursor-pointer shadow-sm"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-2 border-emerald-400 space-y-3">
              <span className="text-4xl">🏆</span>
              <h3 className="font-fredoka text-2xl font-black text-emerald-800 dark:text-emerald-300">
                G'alaba! Sen marraga birinchi yetib kelding!
              </h3>
              <button
                onClick={() => {
                  setRaceProgress(10);
                  setRaceWon(false);
                  generateRaceQuestion();
                }}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow cursor-pointer"
              >
                Qaytadan poyga
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 5: FRACTION DETECTIVE */}
      {activeGame === 'detective' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="font-fredoka text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🔍 {t('gameDetectiveTitle')}</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('gameDetectiveDesc')}
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-3 py-1.5 rounded-xl">
              Ish #{detectiveCaseIdx + 1}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-slate-700/60 border border-amber-200">
            <span className="text-xs font-bold text-slate-400 block uppercase">Tekshirilayotgan misol:</span>
            <p className="font-mono text-xl font-black text-slate-900 dark:text-white">{currentDetCase.problem}</p>
          </div>

          <div className="space-y-3">
            {currentDetCase.steps.map(s => {
              const isSelected = selectedDetectiveStep === s.stepNum;
              return (
                <div
                  key={s.stepNum}
                  onClick={() => handleDetectiveInspect(s.stepNum)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    isSelected
                      ? s.isFlawed
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 animate-shake'
                      : 'bg-slate-50 dark:bg-slate-700 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {s.text[lang]}
                    </p>
                    <span className="font-mono font-bold text-sm bg-white dark:bg-slate-800 px-2 py-1 rounded-lg">
                      {s.math}
                    </span>
                  </div>

                  {isSelected && s.isFlawed && (
                    <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{s.flawExplanation[lang]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {detectiveSolved && (
            <div className="text-right pt-2">
              <button
                onClick={() => {
                  setDetectiveCaseIdx(prev => (prev + 1) % detectiveCases.length);
                  setSelectedDetectiveStep(null);
                  setDetectiveSolved(false);
                }}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs shadow-md transition cursor-pointer"
              >
                Keyingi ishni tergov qilish →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
