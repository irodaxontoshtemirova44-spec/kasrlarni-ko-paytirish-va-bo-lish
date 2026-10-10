import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { parseFractionString, calculateFractions, CalculationResult } from '../utils/fractionMath';
import { FractionDisplay } from '../components/FractionDisplay';
import { FractionVisualizer } from '../components/FractionVisualizer';
import { Mascot } from '../components/Mascot';
import { SoundPlayer } from '../utils/sound';
import { Calculator, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

export const CalculatorView: React.FC = () => {
  const { lang, t, soundEnabled } = useApp();

  const [input1, setInput1] = useState('2 1/3');
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [input2, setInput2] = useState('1 1/2');

  const [calcResult, setCalcResult] = useState<CalculationResult | null>(() => {
    const f1 = parseFractionString('2 1/3');
    const f2 = parseFractionString('1 1/2');
    if (f1 && f2) {
      return calculateFractions(f1, '+', f2);
    }
    return null;
  });

  const handleCompute = () => {
    SoundPlayer.playClick(soundEnabled);
    const f1 = parseFractionString(input1);
    const f2 = parseFractionString(input2);

    if (f1 && f2) {
      const res = calculateFractions(f1, op, f2);
      setCalcResult(res);
      SoundPlayer.playCorrect(soundEnabled);
    }
  };

  const f1Parsed = parseFractionString(input1);
  const f2Parsed = parseFractionString(input2);

  return (
    <div className="space-y-6 animate-pop">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fredoka text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🧮 {t('calculatorTitle')}</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            {t('calcSubtitle')}
          </p>
        </div>

        <Mascot
          mood="thinking"
          size="sm"
          message="Istalgan kasrni kirit, men har bir qadamni ko'rsatib beraman!"
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {/* Fraction 1 */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">
              {t('firstFraction')}
            </label>
            <input
              type="text"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="masalan 2 1/3"
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 font-mono font-bold text-lg outline-none focus:border-amber-500 text-slate-900 dark:text-white"
            />
            {f1Parsed && (
              <div className="p-2 bg-amber-50 dark:bg-slate-700/60 rounded-xl flex items-center justify-center">
                <FractionDisplay fraction={f1Parsed} size="sm" />
              </div>
            )}
          </div>

          {/* Operation Selector */}
          <div className="space-y-2 text-center">
            <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">
              {t('operationLabel')}
            </label>
            <div className="flex items-center justify-center gap-2">
              {(['+', '-', '*', '/'] as const).map((operation) => (
                <button
                  key={operation}
                  onClick={() => {
                    SoundPlayer.playClick(soundEnabled);
                    setOp(operation);
                  }}
                  className={`w-12 h-12 rounded-2xl font-mono text-xl font-black transition cursor-pointer ${
                    op === operation
                      ? 'bg-amber-500 text-white shadow-md scale-110'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-amber-100'
                  }`}
                >
                  {operation === '*' ? '×' : operation === '/' ? '÷' : operation}
                </button>
              ))}
            </div>
          </div>

          {/* Fraction 2 */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">
              {t('secondFraction')}
            </label>
            <input
              type="text"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="masalan 1 1/2"
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 font-mono font-bold text-lg outline-none focus:border-amber-500 text-slate-900 dark:text-white"
            />
            {f2Parsed && (
              <div className="p-2 bg-amber-50 dark:bg-slate-700/60 rounded-xl flex items-center justify-center">
                <FractionDisplay fraction={f2Parsed} size="sm" />
              </div>
            )}
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={handleCompute}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-sm shadow-md transition cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t('calculateBtn')}</span>
          </button>
        </div>

        {/* Results and Step-by-Step Breakdown */}
        {calcResult && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-700 space-y-6 animate-pop">
            {/* Final Answer Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-700/80 border-2 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase">
                  Yakuniy natija:
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <FractionDisplay fraction={calcResult.result} size="xl" />
                  {calcResult.result.whole && calcResult.result.whole > 0 && calcResult.result.num > 0 && (
                    <span className="text-xs font-bold text-slate-400">
                      (yoki {calcResult.resultImproper.num}/{calcResult.resultImproper.den})
                    </span>
                  )}
                </div>
              </div>

              {calcResult.result.den > 1 && (
                <FractionVisualizer
                  whole={calcResult.result.whole || 0}
                  num={calcResult.result.num}
                  den={calcResult.result.den}
                  size={100}
                />
              )}
            </div>

            {/* Steps Trace */}
            <div className="space-y-3">
              <h4 className="font-fredoka text-lg font-bold text-slate-900 dark:text-white">
                Batafsil yechim qadamlari:
              </h4>

              {calcResult.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-600 dark:text-amber-400">
                      {st.title[lang]}
                    </span>
                    <span className="font-mono font-black text-sm bg-white dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-900 dark:text-white">
                      {st.math}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {st.desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
