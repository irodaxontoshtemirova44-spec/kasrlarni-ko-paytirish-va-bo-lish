import React from 'react';
import { SoundPlayer } from '../utils/sound';

export type MascotMood = 'happy' | 'thinking' | 'excited' | 'cheering' | 'teaching';

interface MascotProps {
  mood?: MascotMood;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  soundEnabled?: boolean;
  onTalk?: () => void;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  message,
  size = 'md',
  soundEnabled = true,
  onTalk
}) => {
  const handleClick = () => {
    SoundPlayer.playClick(soundEnabled);
    if (onTalk) onTalk();
  };

  const dim = {
    sm: { box: 'w-16 h-16', svg: 64, text: 'text-xs' },
    md: { box: 'w-24 h-24', svg: 96, text: 'text-sm' },
    lg: { box: 'w-32 h-32', svg: 128, text: 'text-base' }
  }[size];

  // Mascot colors and facial expressions
  const eyeY = mood === 'thinking' ? 42 : 44;
  const mouthCurve = mood === 'excited' || mood === 'cheering'
    ? "M 38 60 Q 50 74 62 60 Z"
    : mood === 'thinking'
    ? "M 42 62 Q 50 64 58 60"
    : "M 40 60 Q 50 70 60 60";

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        onClick={handleClick}
        className={`${dim.box} relative cursor-pointer group transition-transform hover:scale-105 active:scale-95 animate-float`}
        title="Kasrtoy — Sening mehribon ustozing!"
      >
        <svg
          width={dim.svg}
          height={dim.svg}
          viewBox="0 0 100 100"
          className="drop-shadow-lg"
        >
          {/* Outer glow circle */}
          <circle cx="50" cy="50" r="46" fill="#fef08a" stroke="#f59e0b" strokeWidth="4" />

          {/* Lion Mane / Sun rays */}
          <circle cx="20" cy="25" r="10" fill="#f97316" />
          <circle cx="80" cy="25" r="10" fill="#f97316" />
          <circle cx="15" cy="50" r="10" fill="#f97316" />
          <circle cx="85" cy="50" r="10" fill="#f97316" />
          <circle cx="24" cy="76" r="10" fill="#f97316" />
          <circle cx="76" cy="76" r="10" fill="#f97316" />

          {/* Ears */}
          <circle cx="28" cy="28" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
          <circle cx="28" cy="28" r="8" fill="#f43f5e" />
          <circle cx="72" cy="28" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
          <circle cx="72" cy="28" r="8" fill="#f43f5e" />

          {/* Face */}
          <circle cx="50" cy="50" r="38" fill="#fde047" stroke="#d97706" strokeWidth="3" />

          {/* Antenna / Math Hat */}
          <line x1="50" y1="12" x2="50" y2="2" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="2" r="5" fill="#6366f1" />

          {/* Cheeks */}
          <circle cx="30" cy="54" r="6" fill="#fda4af" opacity="0.8" />
          <circle cx="70" cy="54" r="6" fill="#fda4af" opacity="0.8" />

          {/* Eyes */}
          {mood === 'thinking' ? (
            <>
              <path d="M 32 44 Q 38 40 44 44" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="64" cy={eyeY} r="4" fill="#1e293b" />
            </>
          ) : (
            <>
              <circle cx="36" cy={eyeY} r="4.5" fill="#1e293b" />
              <circle cx="38" cy={eyeY - 1.5} r="1.5" fill="#ffffff" />
              <circle cx="64" cy={eyeY} r="4.5" fill="#1e293b" />
              <circle cx="66" cy={eyeY - 1.5} r="1.5" fill="#ffffff" />
            </>
          )}

          {/* Little Nose */}
          <polygon points="50,50 46,55 54,55" fill="#78350f" />

          {/* Mouth */}
          <path
            d={mouthCurve}
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill={mood === 'excited' || mood === 'cheering' ? '#ef4444' : 'none'}
          />
        </svg>

        {/* Small floating badge badge icon */}
        <span className="absolute -bottom-1 -right-1 text-sm bg-white dark:bg-slate-800 rounded-full p-0.5 shadow-md">
          {mood === 'excited' ? '🎉' : mood === 'cheering' ? '⭐' : mood === 'thinking' ? '💡' : '🦁'}
        </span>
      </div>

      {message && (
        <div className="relative bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2.5 rounded-2xl shadow-md border-2 border-amber-300 dark:border-amber-600/50 max-w-sm text-left">
          {/* Speech bubble pointer */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-amber-300 dark:border-r-amber-600/50" />
          <p className={`${dim.text} font-semibold leading-snug`}>{message}</p>
        </div>
      )}
    </div>
  );
};
