import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { glossaryItems } from '../translations';
import { FractionDisplay } from '../components/FractionDisplay';
import { FractionVisualizer } from '../components/FractionVisualizer';
import { Mascot } from '../components/Mascot';
import { Bookmark, Search, Sparkles } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const { lang, t, soundEnabled } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = glossaryItems.filter(item => {
    const q = searchTerm.toLowerCase();
    return (
      item.term[lang].toLowerCase().includes(q) ||
      item.definition[lang].toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-pop">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fredoka text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>📖 {t('glossaryTitle')}</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            {t('glossarySubtitle')}
          </p>
        </div>

        <Mascot
          mood="teaching"
          size="sm"
          message="Har bir atamani yaxshi tushunib olsang, matematika oson bo'ladi!"
          soundEnabled={soundEnabled}
        />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Atamani qidirish..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm outline-none focus:border-amber-500 shadow-sm"
        />
      </div>

      {/* Term Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-400 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-fredoka text-xl font-bold text-amber-600 dark:text-amber-400">
                {item.term[lang]}
              </h3>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-lg">
                Atama #{idx + 1}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              {item.definition[lang]}
            </p>

            <div className="p-3 bg-amber-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-between text-xs font-semibold text-amber-900 dark:text-amber-200">
              <span>Misol:</span>
              <span className="font-mono font-bold">{item.example}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
