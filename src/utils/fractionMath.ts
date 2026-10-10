import { Fraction } from '../types';

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num, den: 1 };
  const divisor = gcd(num, den);
  let sNum = num / divisor;
  let sDen = den / divisor;
  if (sDen < 0) {
    sNum = -sNum;
    sDen = -sDen;
  }
  return { num: sNum, den: sDen };
}

export function mixedToImproper(f: Fraction): { num: number; den: number } {
  const whole = f.whole || 0;
  const num = f.num;
  const den = f.den || 1;
  const totalNum = whole * den + num;
  return { num: totalNum, den };
}

export function improperToMixed(num: number, den: number): { whole: number; num: number; den: number } {
  if (den === 0) return { whole: 0, num: 0, den: 1 };
  const simple = simplifyFraction(num, den);
  const whole = Math.floor(simple.num / simple.den);
  const remNum = simple.num % simple.den;
  return { whole, num: remNum, den: simple.den };
}

export function fractionToDecimal(f: Fraction): number {
  const whole = f.whole || 0;
  return whole + (f.den ? f.num / f.den : 0);
}

export function areFractionsEqual(f1: Fraction, f2: Fraction): boolean {
  const v1 = fractionToDecimal(f1);
  const v2 = fractionToDecimal(f2);
  return Math.abs(v1 - v2) < 0.0001;
}

export function parseFractionString(input: string): Fraction | null {
  const str = input.trim().replace(/\s+/g, ' ');
  if (!str) return null;

  // Pattern 1: Mixed fraction like "2 1/4" or "2 1 / 4"
  const mixedMatch = str.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) {
    const whole = parseInt(mixedMatch[1], 10);
    const num = parseInt(mixedMatch[2], 10);
    const den = parseInt(mixedMatch[3], 10);
    if (den === 0) return null;
    return { whole, num, den };
  }

  // Pattern 2: Pure fraction like "3/4" or "7/2"
  const fracMatch = str.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (fracMatch) {
    const num = parseInt(fracMatch[1], 10);
    const den = parseInt(fracMatch[2], 10);
    if (den === 0) return null;
    return { whole: 0, num, den };
  }

  // Pattern 3: Integer like "3"
  const intMatch = str.match(/^(\d+)$/);
  if (intMatch) {
    const whole = parseInt(intMatch[1], 10);
    return { whole, num: 0, den: 1 };
  }

  return null;
}

export interface CalculationStep {
  title: { uz: string; ru: string; en: string };
  desc: { uz: string; ru: string; en: string };
  math: string;
}

export interface CalculationResult {
  result: Fraction;
  resultImproper: { num: number; den: number };
  steps: CalculationStep[];
}

export function calculateFractions(f1: Fraction, op: '+' | '-' | '*' | '/', f2: Fraction): CalculationResult {
  const steps: CalculationStep[] = [];
  const imp1 = mixedToImproper(f1);
  const imp2 = mixedToImproper(f2);

  if (op === '+') {
    // Check if both are mixed and can be added whole + whole and fraction + fraction
    const commonDen = lcm(imp1.den, imp2.den);
    const scale1 = commonDen / imp1.den;
    const scale2 = commonDen / imp2.den;
    const adjNum1 = imp1.num * scale1;
    const adjNum2 = imp2.num * scale2;
    const sumNum = adjNum1 + adjNum2;

    steps.push({
      title: {
        uz: '1-qadam: Noto\'g\'ri kasrga aylantirish (yoki maxrajlarni tenglashtirish)',
        ru: 'Шаг 1: Перевод в неправильные дроби (или приведение к общему знаменателю)',
        en: 'Step 1: Convert to improper fractions (or find common denominator)'
      },
      desc: {
        uz: `Birinchi kasr: ${imp1.num}/${imp1.den}, ikkinchi kasr: ${imp2.num}/${imp2.den}`,
        ru: `Первая дробь: ${imp1.num}/${imp1.den}, вторая дробь: ${imp2.num}/${imp2.den}`,
        en: `First fraction: ${imp1.num}/${imp1.den}, second fraction: ${imp2.num}/${imp2.den}`
      },
      math: `${imp1.num}/${imp1.den} + ${imp2.num}/${imp2.den}`
    });

    steps.push({
      title: {
        uz: '2-qadam: Umumiy maxraj topish',
        ru: 'Шаг 2: Нахождение общего знаменателя',
        en: 'Step 2: Finding the common denominator'
      },
      desc: {
        uz: `Maxrajlar (${imp1.den} va ${imp2.den}) uchun EKUK = ${commonDen}. Suratlarni ko'paytiramiz: ${imp1.num}×${scale1} = ${adjNum1}, ${imp2.num}×${scale2} = ${adjNum2}`,
        ru: `Для знаменателей (${imp1.den} и ${imp2.den}) НОК = ${commonDen}. Домножаем числители: ${imp1.num}×${scale1} = ${adjNum1}, ${imp2.num}×${scale2} = ${adjNum2}`,
        en: `For denominators (${imp1.den} and ${imp2.den}) LCM = ${commonDen}. Scale numerators: ${adjNum1} and ${adjNum2}`
      },
      math: `${adjNum1}/${commonDen} + ${adjNum2}/${commonDen} = (${adjNum1} + ${adjNum2}) / ${commonDen} = ${sumNum}/${commonDen}`
    });

    const simple = simplifyFraction(sumNum, commonDen);
    const mixed = improperToMixed(simple.num, simple.den);

    steps.push({
      title: {
        uz: '3-qadam: Qisqartirish va aralash kasrga aylantirish',
        ru: 'Шаг 3: Сокращение и перевод в смешанную дробь',
        en: 'Step 3: Simplify and convert to mixed number'
      },
      desc: {
        uz: mixed.whole > 0 && mixed.num > 0
          ? `${simple.num}/${simple.den} noto'g'ri kasridan butun qismini ajratamiz: ${mixed.whole} butun ${mixed.num}/${mixed.den}`
          : mixed.num === 0
          ? `Natija butun son: ${mixed.whole}`
          : `Natija oddiy qisqarmas kasr: ${simple.num}/${simple.den}`,
        ru: mixed.whole > 0 && mixed.num > 0
          ? `Выделяем целую часть: ${mixed.whole} целых ${mixed.num}/${mixed.den}`
          : mixed.num === 0
          ? `Результат целое число: ${mixed.whole}`
          : `Результат правильная дробь: ${simple.num}/${simple.den}`,
        en: mixed.whole > 0 && mixed.num > 0
          ? `Extract whole part: ${mixed.whole} and ${mixed.num}/${mixed.den}`
          : mixed.num === 0
          ? `Result is integer: ${mixed.whole}`
          : `Result is simplified fraction: ${simple.num}/${simple.den}`
      },
      math: mixed.whole > 0 && mixed.num > 0 ? `${mixed.whole} ${mixed.num}/${mixed.den}` : `${simple.num}/${simple.den}`
    });

    return {
      result: mixed,
      resultImproper: simple,
      steps
    };
  }

  if (op === '-') {
    const commonDen = lcm(imp1.den, imp2.den);
    const scale1 = commonDen / imp1.den;
    const scale2 = commonDen / imp2.den;
    const adjNum1 = imp1.num * scale1;
    const adjNum2 = imp2.num * scale2;
    const diffNum = adjNum1 - adjNum2;

    steps.push({
      title: {
        uz: '1-qadam: Kasrlarni umumiy maxrajga keltirish',
        ru: 'Шаг 1: Приведение дробей к общему знаменателю',
        en: 'Step 1: Convert to common denominator'
      },
      desc: {
        uz: `Noto'g'ri kasrlar: ${imp1.num}/${imp1.den} - ${imp2.num}/${imp2.den}. Umumiy maxraj = ${commonDen}`,
        ru: `Неправильные дроби: ${imp1.num}/${imp1.den} - ${imp2.num}/${imp2.den}. Общий знаменатель = ${commonDen}`,
        en: `Improper fractions: ${imp1.num}/${imp1.den} - ${imp2.num}/${imp2.den}. Common denominator = ${commonDen}`
      },
      math: `${adjNum1}/${commonDen} - ${adjNum2}/${commonDen}`
    });

    steps.push({
      title: {
        uz: '2-qadam: Suratlarni ayirish (yoki butun qismdan qarz olish)',
        ru: 'Шаг 2: Вычитание числителей (или заём у целой части)',
        en: 'Step 2: Subtract numerators (or borrow from whole)'
      },
      desc: {
        uz: `Suratlarni ayiramiz: ${adjNum1} - ${adjNum2} = ${diffNum}`,
        ru: `Вычитаем числители: ${adjNum1} - ${adjNum2} = ${diffNum}`,
        en: `Subtract numerators: ${adjNum1} - ${adjNum2} = ${diffNum}`
      },
      math: `(${adjNum1} - ${adjNum2}) / ${commonDen} = ${diffNum}/${commonDen}`
    });

    const simple = simplifyFraction(diffNum, commonDen);
    const mixed = improperToMixed(simple.num, simple.den);

    steps.push({
      title: {
        uz: '3-qadam: Qisqartirish va yakuniy natija',
        ru: 'Шаг 3: Сокращение и окончательный результат',
        en: 'Step 3: Simplify and final result'
      },
      desc: {
        uz: mixed.whole > 0 && mixed.num > 0
          ? `Aralash kasr shaklida: ${mixed.whole} butun ${mixed.num}/${mixed.den}`
          : mixed.num === 0
          ? `Butun son: ${mixed.whole}`
          : `Oddiy kasr: ${simple.num}/${simple.den}`,
        ru: mixed.whole > 0 && mixed.num > 0
          ? `Смешанная дробь: ${mixed.whole} целых ${mixed.num}/${mixed.den}`
          : mixed.num === 0
          ? `Целое число: ${mixed.whole}`
          : `Простая дробь: ${simple.num}/${simple.den}`,
        en: mixed.whole > 0 && mixed.num > 0
          ? `Mixed fraction: ${mixed.whole} and ${mixed.num}/${mixed.den}`
          : mixed.num === 0
          ? `Integer: ${mixed.whole}`
          : `Proper fraction: ${simple.num}/${simple.den}`
      },
      math: mixed.whole > 0 && mixed.num > 0 ? `${mixed.whole} ${mixed.num}/${mixed.den}` : `${simple.num}/${simple.den}`
    });

    return {
      result: mixed,
      resultImproper: simple,
      steps
    };
  }

  if (op === '*') {
    steps.push({
      title: {
        uz: '1-qadam: Aralash kasrlarni noto\'g\'ri kasrga aylantirish',
        ru: 'Шаг 1: Перевод смешанных дробей в неправильные',
        en: 'Step 1: Convert mixed fractions to improper fractions'
      },
      desc: {
        uz: `Kasr 1: ${imp1.num}/${imp1.den}, Kasr 2: ${imp2.num}/${imp2.den}`,
        ru: `Дробь 1: ${imp1.num}/${imp1.den}, Дробь 2: ${imp2.num}/${imp2.den}`,
        en: `Fraction 1: ${imp1.num}/${imp1.den}, Fraction 2: ${imp2.num}/${imp2.den}`
      },
      math: `(${imp1.num}/${imp1.den}) × (${imp2.num}/${imp2.den})`
    });

    const rawNum = imp1.num * imp2.num;
    const rawDen = imp1.den * imp2.den;

    steps.push({
      title: {
        uz: '2-qadam: Qoida: Suratni suratga, maxrajni maxrajga ko\'paytiramiz!',
        ru: 'Шаг 2: Правило: числитель на числитель, знаменатель на знаменатель!',
        en: 'Step 2: Rule: Multiply numerators and multiply denominators!'
      },
      desc: {
        uz: `Surat: ${imp1.num} × ${imp2.num} = ${rawNum}; Maxraj: ${imp1.den} × ${imp2.den} = ${rawDen}`,
        ru: `Числитель: ${imp1.num} × ${imp2.num} = ${rawNum}; Знаменатель: ${imp1.den} × ${imp2.den} = ${rawDen}`,
        en: `Numerator: ${imp1.num} × ${imp2.num} = ${rawNum}; Denominator: ${imp1.den} × ${imp2.den} = ${rawDen}`
      },
      math: `(${imp1.num} × ${imp2.num}) / (${imp1.den} × ${imp2.den}) = ${rawNum}/${rawDen}`
    });

    const simple = simplifyFraction(rawNum, rawDen);
    const mixed = improperToMixed(simple.num, simple.den);

    steps.push({
      title: {
        uz: '3-qadam: Kasrni qisqartirish',
        ru: 'Шаг 3: Сокращение дроби',
        en: 'Step 3: Simplify fraction'
      },
      desc: {
        uz: `EKUB = ${gcd(rawNum, rawDen)}. Qisqartirilgan natija: ${simple.num}/${simple.den}` + (mixed.whole > 0 && mixed.num > 0 ? ` = ${mixed.whole} butun ${mixed.num}/${mixed.den}` : ''),
        ru: `НОД = ${gcd(rawNum, rawDen)}. Сокращенный результат: ${simple.num}/${simple.den}` + (mixed.whole > 0 && mixed.num > 0 ? ` = ${mixed.whole} целых ${mixed.num}/${mixed.den}` : ''),
        en: `GCD = ${gcd(rawNum, rawDen)}. Simplified: ${simple.num}/${simple.den}` + (mixed.whole > 0 && mixed.num > 0 ? ` = ${mixed.whole} ${mixed.num}/${mixed.den}` : '')
      },
      math: mixed.whole > 0 && mixed.num > 0 ? `${mixed.whole} ${mixed.num}/${mixed.den}` : `${simple.num}/${simple.den}`
    });

    return {
      result: mixed,
      resultImproper: simple,
      steps
    };
  }

  // op === '/'
  steps.push({
    title: {
      uz: '1-qadam: Noto\'g\'ri kasrlarga aylantirish',
      ru: 'Шаг 1: Перевод в неправильные дроби',
      en: 'Step 1: Convert to improper fractions'
    },
    desc: {
      uz: `Kasr 1: ${imp1.num}/${imp1.den}, Kasr 2: ${imp2.num}/${imp2.den}`,
      ru: `Дробь 1: ${imp1.num}/${imp1.den}, Дробь 2: ${imp2.num}/${imp2.den}`,
      en: `Fraction 1: ${imp1.num}/${imp1.den}, Fraction 2: ${imp2.num}/${imp2.den}`
    },
    math: `(${imp1.num}/${imp1.den}) ÷ (${imp2.num}/${imp2.den})`
  });

  steps.push({
    title: {
      uz: '2-qadam: "Ag\'dar va ko\'paytir" oltin qoidasi!',
      ru: 'Шаг 2: Золотое правило: «Переверни и умножь»!',
      en: 'Step 2: Golden rule: "Flip and multiply"!'
    },
    desc: {
      uz: `Bo'lish amalini ikkinchi kasrning teskarisiga (${imp2.den}/${imp2.num}) ko'paytirishga almashtiramiz!`,
      ru: `Заменяем деление на умножение на обратную дробь (${imp2.den}/${imp2.num})!`,
      en: `Replace division with multiplication by the reciprocal fraction (${imp2.den}/${imp2.num})!`
    },
    math: `(${imp1.num}/${imp1.den}) × (${imp2.den}/${imp2.num})`
  });

  const rawNum = imp1.num * imp2.den;
  const rawDen = imp1.den * imp2.num;

  steps.push({
    title: {
      uz: '3-qadam: Ko\'paytirish va qisqartirish',
      ru: 'Шаг 3: Умножение и сокращение',
      en: 'Step 3: Multiply and simplify'
    },
    desc: {
      uz: `Surat: ${imp1.num} × ${imp2.den} = ${rawNum}; Maxraj: ${imp1.den} × ${imp2.num} = ${rawDen}`,
      ru: `Числитель: ${imp1.num} × ${imp2.den} = ${rawNum}; Знаменатель: ${imp1.den} × ${imp2.num} = ${rawDen}`,
      en: `Numerator: ${imp1.num} × ${imp2.den} = ${rawNum}; Denominator: ${imp1.den} × ${imp2.num} = ${rawDen}`
    },
    math: `${rawNum}/${rawDen}`
  });

  const simple = simplifyFraction(rawNum, rawDen);
  const mixed = improperToMixed(simple.num, simple.den);

  return {
    result: mixed,
    resultImproper: simple,
    steps
  };
}
