import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mascot } from '../components/Mascot';
import {
  BookOpen,
  CheckCircle,
  Gamepad2,
  Briefcase,
  Calculator,
  Bookmark,
  Award,
  Sparkles,
  Flame,
  Star,
  ArrowRight,
  Edit2,
  Check,
  Trophy
} from 'lucide-react';
import { SoundPlayer } from '../utils/sound';
import { allBadgesList } from '../translations';

export const HomeView: React.FC = () => {
  const { user, setName, setActiveTab, t, soundEnabled, lang } = useApp();
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setName(tempName.trim());
      SoundPlayer.playCorrect(soundEnabled);
    }
    setEditingName(false);
  };

  const levelTitles = (t('levels' as keyof typeof import('../translations').translations['uz']) as unknown as string[]) || [];
  const currentLevelTitle = levelTitles[user.level - 1] || `Level ${user.level}`;

  // Next level XP threshold
  const levelThresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200];
  const nextXP = levelThresholds[user.level] || 3200;
  const prevXP = levelThresholds[user.level - 1] || 0;
  const progressPercent = Math.min(100, Math.round(((user.xp - prevXP) / Math.max(1, nextXP - prevXP)) * 100));

  const mainCards = [
    {
      id: 'lessons',
      title: t('cardLessonsTitle'),
      desc: t('cardLessonsDesc'),
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500',
      badge: '5 ta interaktiv dars',
      emoji: '📚'
    },
    {
      id: 'practice',
      title: t('cardPracticeTitle'),
      desc: t('cardPracticeDesc'),
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Blitz + 20 savolli Imtihon',
      emoji: '🎯'
    },
    {
      id: 'games',
      title: t('cardGamesTitle'),
      desc: t('cardGamesDesc'),
      icon: Gamepad2,
      color: 'from-purple-500 to-indigo-500',
      badge: '5 ta qiziqarli o\'yin',
      emoji: '🎮'
    },
    {
      id: 'cases',
      title: t('cardCasesTitle'),
      desc: t('cardCasesDesc'),
      icon: Briefcase,
      color: 'from-rose-500 to-pink-500',
      badge: 'Haqiqiy hayotiy masalalar',
      emoji: '🥧'
    }
  ];

  return (
    <div className="space-y-8 animate-pop">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>5-sinf Matematika Sarguzashti</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-3 py-1 bg-white text-slate-900 rounded-xl font-bold text-xl outline-none ring-2 ring-amber-300"
                    placeholder={t('studentNamePlaceholder')}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <h1 className="font-fredoka text-3xl sm:text-4xl font-black flex items-center gap-2">
                  Salom, {user.name}! 👋
                  <button
                    onClick={() => {
                      SoundPlayer.playClick(soundEnabled);
                      setEditingName(true);
                    }}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition text-sm"
                    title={t('changeName')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </h1>
              )}
            </div>

            <p className="text-white/95 text-base sm:text-lg font-medium leading-relaxed">
              Bugun kasrlar olamiga sayohat qilamiz! Pitsalarni bo'lamiz, misollar yechamiz va
              yulduzlar yig'ib haqiqiy kasrlar qiroliga aylanamiz!
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setActiveTab('lessons');
                }}
                className="px-6 py-3 bg-white text-amber-700 font-black rounded-2xl shadow-lg hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Darslarni boshlash</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setActiveTab('games');
                }}
                className="px-6 py-3 bg-white/20 backdrop-blur-md text-white font-black rounded-2xl hover:bg-white/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>O'yin o'ynash</span>
                <Gamepad2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Mascot presentation */}
          <div className="flex flex-col items-center">
            <Mascot
              mood="cheering"
              size="lg"
              message={t('mascotHello')}
              soundEnabled={soundEnabled}
            />
          </div>
        </div>
      </section>

      {/* Progress & Daily Quest Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Level card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 border-amber-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl">
                🏆
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{t('currentLevel')}</p>
                <h3 className="font-fredoka text-lg font-bold text-slate-800 dark:text-white">
                  {currentLevelTitle}
                </h3>
              </div>
            </div>
            <span className="text-xs font-black bg-amber-500 text-white px-2.5 py-1 rounded-xl">
              {user.xp} / {nextXP} XP
            </span>
          </div>

          <div className="mt-4 space-y-1">
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-right text-xs text-slate-400 font-semibold">
              Keyingi darajagacha {Math.max(0, nextXP - user.xp)} XP
            </p>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 border-orange-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center text-2xl font-black">
            <Flame className="w-7 h-7 fill-orange-500 text-orange-600 animate-pulse" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">{t('streakDays')}</p>
            <h3 className="font-fredoka text-2xl font-black text-slate-800 dark:text-white">
              {user.streak} {t('daysUnit')} 🔥
            </h3>
            <p className="text-xs text-orange-600 dark:text-orange-400 font-bold">
              Har kuni mashq qil va seriyani saqlab qol!
            </p>
          </div>
        </div>

        {/* Daily Challenge Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-950/40 p-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/50 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-indigo-500" /> {t('dailyChallenge')}
              </span>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                +50 XP
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {t('dailyChallengeDesc')}
            </p>
          </div>

          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setActiveTab('practice');
            }}
            className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition cursor-pointer text-center"
          >
            Vazifani bajarish →
          </button>
        </div>
      </section>

      {/* 4 Main Sections Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-fredoka text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span>Bo'limni tanlang</span>
            <span className="text-sm font-normal text-slate-500 dark:text-slate-400">(4 ta yo'nalish)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mainCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setActiveTab(card.id);
                }}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl">{card.emoji}</span>
                  </div>

                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-lg text-amber-700 dark:text-amber-300">
                    {card.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Helpful Tools Strip: Calculator & Glossary shortcuts */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 p-6 rounded-3xl border-2 border-amber-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
            🧮
          </div>
          <div>
            <h4 className="font-fredoka text-lg font-bold text-slate-800 dark:text-white">
              Qo'shimcha foydali yordamchilar
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Misolni tekshirish uchun qadamma-qadam kalkulyator va barcha tushunchalar lug'ati
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setActiveTab('calc');
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 border border-amber-300 dark:border-slate-600 font-bold text-xs text-slate-800 dark:text-white transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>Kalkulyator</span>
          </button>
          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setActiveTab('glossary');
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 border border-amber-300 dark:border-slate-600 font-bold text-xs text-slate-800 dark:text-white transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-indigo-600" />
            <span>Kasr Lug'ati</span>
          </button>
        </div>
      </section>

      {/* Badges showcase teaser */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-fredoka text-lg font-bold text-slate-800 dark:text-white">
              {t('badgesEarned')} ({user.unlockedBadges.length} / 10)
            </h3>
          </div>
          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setActiveTab('profile');
            }}
            className="text-xs font-bold text-amber-600 hover:underline cursor-pointer"
          >
            Barchasini ko'rish →
          </button>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {allBadgesList.map((b) => {
            const isUnlocked = user.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-amber-50 dark:bg-slate-700/60 border-amber-300 dark:border-amber-500/50 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 opacity-40 grayscale'
                }`}
                title={isUnlocked ? t(b.titleKey as any) : "Qulflangan nishon"}
              >
                <span className="text-2xl">{b.icon}</span>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 text-center truncate w-full mt-1">
                  {isUnlocked ? t(b.titleKey as any) : "???"}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
