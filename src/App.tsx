import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { LessonsView } from './views/LessonsView';
import { PracticeView } from './views/PracticeView';
import { GamesView } from './views/GamesView';
import { CasesView } from './views/CasesView';
import { CalculatorView } from './views/CalculatorView';
import { GlossaryView } from './views/GlossaryView';
import { ProfileReportView } from './views/ProfileReportView';

const MainContent: React.FC = () => {
  const { activeTab, largeText, t } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'lessons':
        return <LessonsView />;
      case 'practice':
        return <PracticeView />;
      case 'games':
        return <GamesView />;
      case 'cases':
        return <CasesView />;
      case 'calc':
        return <CalculatorView />;
      case 'glossary':
        return <GlossaryView />;
      case 'profile':
        return <ProfileReportView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className={`min-h-screen bg-amber-50/40 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col ${largeText ? 'text-lg' : 'text-base'}`}>
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {renderActiveView()}
      </main>

      <footer className="no-print mt-auto border-t border-amber-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
              ½
            </span>
            <span className="font-fredoka font-bold text-slate-700 dark:text-slate-300">
              Kasrlar Olami
            </span>
            <span>— 5-sinf o'quvchilari uchun interaktiv matematika</span>
          </div>

          <p className="font-medium">
            "Kasrlar — butun dunyoning eng totli bo'laklaridir! 🍕"
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
