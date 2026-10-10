import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  BookOpen,
  CheckCircle,
  Gamepad2,
  Briefcase,
  Calculator,
  Bookmark,
  Award,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Flame,
  Star,
  Type
} from 'lucide-react';
import { SoundPlayer } from '../utils/sound';

export const Navbar: React.FC = () => {
  const {
    lang,
    setLang,
    darkMode,
    setDarkMode,
    soundEnabled,
    setSoundEnabled,
    user,
    activeTab,
    setActiveTab,
    t,
    largeText,
    setLargeText
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Sparkles },
    { id: 'lessons', label: t('navLessons'), icon: BookOpen },
    { id: 'practice', label: t('navPractice'), icon: CheckCircle },
    { id: 'games', label: t('navGames'), icon: Gamepad2 },
    { id: 'cases', label: t('navCases'), icon: Briefcase },
    { id: 'calc', label: t('navCalc'), icon: Calculator },
    { id: 'glossary', label: t('navGlossary'), icon: Bookmark },
    { id: 'profile', label: t('navProfile'), icon: Award }
  ];

  const handleTabChange = (id: string) => {
    SoundPlayer.playClick(soundEnabled);
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  const handleLangChange = (newLang: Language) => {
    SoundPlayer.playClick(soundEnabled);
    setLang(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b-2 border-amber-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform text-2xl font-black text-white">
              ½
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-fredoka text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                  {t('appName')}
                </span>
                <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-extrabold px-2 py-0.5 rounded-full border border-amber-300/60">
                  5-sinf
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                {t('appTagline')}
              </p>
            </div>
          </div>

          {/* Quick stats on desktop */}
          <div className="hidden lg:flex items-center gap-2.5 bg-amber-50/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-2xl border border-amber-200/80 dark:border-slate-700">
            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-black text-sm px-1.5" title="Yulduzlar">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{user.stars}</span>
            </div>
            {/* XP */}
            <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-black text-sm px-1.5 border-l border-slate-200 dark:border-slate-700" title="XP Ballar">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>{user.xp} XP</span>
            </div>
            {/* Streak */}
            <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-black text-sm px-1.5 border-l border-slate-200 dark:border-slate-700" title="Kunlik seriya">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-600 animate-pulse" />
              <span>{user.streak} {t('daysUnit')}</span>
            </div>
            {/* Level */}
            <div className="text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-0.5 rounded-xl ml-1 shadow-sm">
              Lv.{user.level}
            </div>
          </div>

          {/* Controls: Audio, Theme, TextSize, Language */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={() => {
                SoundPlayer.playClick(!soundEnabled);
                setSoundEnabled(!soundEnabled);
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title={soundEnabled ? t('soundOn') : t('soundOff')}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-500" /> : <VolumeX className="w-5 h-5 text-rose-400" />}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                SoundPlayer.playClick(soundEnabled);
                setDarkMode(!darkMode);
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title={darkMode ? t('lightMode') : t('darkMode')}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>

            {/* Accessibility text resize */}
            <button
              onClick={() => {
                SoundPlayer.playClick(soundEnabled);
                setLargeText(!largeText);
              }}
              className={`p-2 rounded-xl border transition-colors ${
                largeText
                  ? 'bg-amber-100 border-amber-300 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent'
              }`}
              title="Shrift hajmi (A+)"
              aria-label="Font size"
            >
              <Type className="w-5 h-5" />
            </button>

            {/* Language Switcher Buttons */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {(['uz', 'ru', 'en'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`px-2 py-1 text-xs font-black rounded-lg uppercase transition-all ${
                    lang === l
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 ml-1"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800 hover:text-amber-700 dark:hover:text-amber-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-500 dark:text-amber-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b-2 border-amber-300 dark:border-slate-700 px-4 py-4 space-y-2 animate-pop">
          {/* Mobile stats row */}
          <div className="flex items-center justify-around bg-amber-50 dark:bg-slate-800 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 mb-3">
            <span className="flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" /> {user.stars}
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" /> {user.xp} XP
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-orange-600 dark:text-orange-400">
              <Flame className="w-4 h-4 fill-orange-500" /> {user.streak} {t('daysUnit')}
            </span>
            <span className="text-xs font-black bg-amber-500 text-white px-2 py-0.5 rounded-md">
              Lv.{user.level}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-left text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-100/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
