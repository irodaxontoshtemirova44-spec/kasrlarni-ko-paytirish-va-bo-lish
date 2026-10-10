import React from 'react';
import { Fraction } from '../types';

interface FractionDisplayProps {
  fraction?: Fraction;
  rawString?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabels?: boolean;
}

export const FractionDisplay: React.FC<FractionDisplayProps> = ({
  fraction,
  rawString,
  size = 'md',
  showLabels = false
}) => {
  let whole = fraction?.whole;
  let num = fraction?.num;
  let den = fraction?.den;

  if (rawString) {
    const mixedMatch = rawString.trim().match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
    if (mixedMatch) {
      whole = parseInt(mixedMatch[1], 10);
      num = parseInt(mixedMatch[2], 10);
      den = parseInt(mixedMatch[3], 10);
    } else {
      const fracMatch = rawString.trim().match(/^(\d+)\s*\/\s*(\d+)$/);
      if (fracMatch) {
        whole = 0;
        num = parseInt(fracMatch[1], 10);
        den = parseInt(fracMatch[2], 10);
      } else {
        const intMatch = rawString.trim().match(/^(\d+)$/);
        if (intMatch) {
          whole = parseInt(intMatch[1], 10);
          num = 0;
          den = 1;
        }
      }
    }
  }

  const sizeClasses = {
    sm: {
      whole: 'text-lg font-bold',
      numDen: 'text-xs font-bold',
      line: 'w-full h-0.5',
      container: 'gap-1'
    },
    md: {
      whole: 'text-2xl font-black',
      numDen: 'text-sm font-bold',
      line: 'w-full h-0.5',
      container: 'gap-1.5'
    },
    lg: {
      whole: 'text-4xl font-black',
      numDen: 'text-lg font-extrabold',
      line: 'w-full h-1',
      container: 'gap-2'
    },
    xl: {
      whole: 'text-5xl font-black',
      numDen: 'text-2xl font-black',
      line: 'w-full h-1',
      container: 'gap-2.5'
    }
  }[size];

  // Pure integer case
  if (num === 0 || !den || den === 1) {
    return (
      <span className={`inline-flex items-center text-amber-600 dark:text-amber-400 ${sizeClasses.whole} font-fredoka`}>
        {whole || 0}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center align-middle font-fredoka ${sizeClasses.container} select-none`}>
      {whole && whole > 0 ? (
        <span className={`text-amber-600 dark:text-amber-400 ${sizeClasses.whole} leading-none`}>
          {whole}
        </span>
      ) : null}

      <span className="inline-flex flex-col items-center justify-center leading-none">
        <span
          className={`text-indigo-600 dark:text-indigo-400 ${sizeClasses.numDen} px-1`}
          title={showLabels ? "Surat (Numerator)" : undefined}
        >
          {num}
        </span>
        <span className={`bg-slate-700 dark:bg-slate-300 ${sizeClasses.line} rounded-full`} />
        <span
          className={`text-rose-600 dark:text-rose-400 ${sizeClasses.numDen} px-1`}
          title={showLabels ? "Maxraj (Denominator)" : undefined}
        >
          {den}
        </span>
      </span>
    </span>
  );
};
