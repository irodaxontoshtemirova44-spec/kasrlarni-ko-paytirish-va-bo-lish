import React from 'react';
import { useApp } from '../context/AppContext';
import { allBadgesList } from '../translations';
import { Mascot } from '../components/Mascot';
import { SoundPlayer } from '../utils/sound';
import {
  Printer,
  Award,
  Star,
  Sparkles,
  Flame,
  CheckCircle,
  Trophy,
  Calendar
} from 'lucide-react';

export const ProfileReportView: React.FC = () => {
  const { user, t, soundEnabled, lang } = useApp();

  const handlePrint = () => {
    SoundPlayer.playClick(soundEnabled);
    window.print();
  };

  const levelTitles = (t('levels' as any) as unknown as string[]) || [];
  const currentTitle = levelTitles[user.level - 1] || `Level ${user.level}`;

  return (
    <div className="space-y-8 animate-pop">
      {/* Header with Print Button */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-fredoka text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>🏆 {t('profileTitle')}</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Barcha yutuqlaring va o'qituvchi/ota-ona uchun rasmiy hisobot
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs shadow-md transition cursor-pointer flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>{t('printReportBtn')}</span>
        </button>
      </div>

      {/* Printable Report Sheet */}
      <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-lg space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Report Official Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl font-black shadow-md">
              ½
            </div>
            <div>
              <h1 className="font-fredoka text-3xl font-black text-amber-700">
                Kasrlar Olami — Rasmiy O'quvchi Hisoboti
              </h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                5-sinf matematika: Aralash va oddiy kasrlar kursi
              </p>
            </div>
          </div>

          <div className="text-right text-xs font-bold text-slate-500">
            <p>Sana: {new Date().toLocaleDateString()}</p>
            <p>Holat: Faol o'quvchi</p>
          </div>
        </div>

        {/* Student Name & High-level Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
          <div>
            <span className="text-xs font-bold text-slate-500 block uppercase">O'quvchi:</span>
            <span className="font-fredoka text-xl font-black text-slate-900">{user.name}</span>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 block uppercase">Daraja (Level):</span>
            <span className="font-fredoka text-xl font-black text-amber-600">{currentTitle}</span>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 block uppercase">Yig'ilgan yulduzlar:</span>
            <span className="font-fredoka text-xl font-black text-amber-500">⭐ {user.stars}</span>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-500 block uppercase">Jami tajriba (XP):</span>
            <span className="font-fredoka text-xl font-black text-indigo-600">✨ {user.xp} XP</span>
          </div>
        </div>

        {/* Course Completion Checklist */}
        <div className="space-y-3">
          <h3 className="font-fredoka text-lg font-bold text-slate-900">
            Darslar va Mavzularni o'zlashtirish:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
            {[
              { id: "l1", title: "1. Aralash kasrni noto'g'ri kasrga aylantirish" },
              { id: "l2", title: "2. Aralash kasrlarni qo'shish va umumiy maxraj" },
              { id: "l3", title: "3. Aralash kasrlarni ayirish va qarz olish" },
              { id: "l4", title: "4. Kasrlarni ko'paytirish va qisqartirish" },
              { id: "l5", title: "5. Kasrlarni bo'lish (Ag'dar va ko'paytir)" }
            ].map(l => {
              const isDone = user.completedLessons.includes(l.id);
              return (
                <div
                  key={l.id}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isDone ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <span>{l.title}</span>
                  {isDone ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] uppercase font-mono">Kutilmoqda</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Exam Status if available */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="font-fredoka text-base font-bold text-slate-900">
              Yakuniy Nazorat Testi Natijasi:
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              20 ta keng qamrovli nazorat savollari asosida baholash
            </p>
          </div>

          <div className="text-right">
            {user.finalExamBestScore ? (
              <div className="flex items-center gap-3">
                <span className="font-fredoka text-3xl font-black text-indigo-700">
                  {user.finalExamBestScore.grade} baho
                </span>
                <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg">
                  {user.finalExamBestScore.percentage}%
                </span>
              </div>
            ) : (
              <span className="text-xs font-bold text-slate-400">Hali topshirilmagan</span>
            )}
          </div>
        </div>

        {/* Badges Earned Section */}
        <div className="space-y-3">
          <h3 className="font-fredoka text-lg font-bold text-slate-900">
            Erishilgan Mahorat Nishonlari:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {allBadgesList.map(b => {
              const isUnlocked = user.unlockedBadges.includes(b.id);
              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-2xl border text-center space-y-1 ${
                    isUnlocked
                      ? 'bg-amber-50 border-amber-300 text-slate-800'
                      : 'bg-slate-100 border-dashed border-slate-300 text-slate-400 opacity-50'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <p className="text-xs font-bold truncate">
                    {t(b.titleKey as any)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Signatures Row */}
        <div className="pt-8 border-t-2 border-slate-200 grid grid-cols-2 gap-8 text-xs font-bold text-slate-700">
          <div>
            <p className="mb-6">{t('teacherSignature')}</p>
            <p className="text-[10px] text-slate-400">Matematika fani o'qituvchisi tasdig'i</p>
          </div>

          <div>
            <p className="mb-6">{t('parentSignature')}</p>
            <p className="text-[10px] text-slate-400">Ota-ona yoki vasiy tasdig'i</p>
          </div>
        </div>
      </div>
    </div>
  );
};
