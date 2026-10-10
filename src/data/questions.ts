import { QuizQuestion } from '../types';

export const predefinedQuestions: QuizQuestion[] = [
  // TOPIC 1: Mixed <-> Improper Fractions
  {
    id: "q1_1",
    topicId: "l1",
    difficulty: "easy",
    type: "multiple_choice",
    question: {
      uz: "2 butun 1/3 aralash kasrini noto'g'ri kasrga aylantiring:",
      ru: "Переведите смешанную дробь 2 1/3 в неправильную дробь:",
      en: "Convert mixed fraction 2 1/3 into an improper fraction:"
    },
    fractionA: { whole: 2, num: 1, den: 3 },
    options: [
      { uz: "7/3", ru: "7/3", en: "7/3", value: "7/3" },
      { uz: "5/3", ru: "5/3", en: "5/3", value: "5/3" },
      { uz: "6/3", ru: "6/3", en: "6/3", value: "6/3" },
      { uz: "7/6", ru: "7/6", en: "7/6", value: "7/6" }
    ],
    correctAnswer: "7/3",
    hint: {
      uz: "Butun sonni maxrajga ko'paytir (2 × 3) va suratni qo'sh (6 + 1)!",
      ru: "Умножь целую часть на знаменатель (2 × 3) и прибавь числитель (6 + 1)!",
      en: "Multiply whole by denominator (2 × 3) and add numerator (6 + 1)!"
    },
    explanation: {
      uz: "2 × 3 + 1 = 7 bo'ladi. Maxraj esa o'zgarmaydi (3). Natija: 7/3.",
      ru: "2 × 3 + 1 = 7. Знаменатель остаётся 3. Итого: 7/3.",
      en: "2 × 3 + 1 = 7. Denominator remains 3. Result: 7/3."
    }
  },
  {
    id: "q1_2",
    topicId: "l1",
    difficulty: "easy",
    type: "input_mixed",
    question: {
      uz: "11/4 noto'g'ri kasrini aralash kasr ko'rinishida yozing (masalan: 2 3/4):",
      ru: "Запишите 11/4 в виде смешанной дроби (например: 2 3/4):",
      en: "Write 11/4 as a mixed fraction (e.g., 2 3/4):"
    },
    correctAnswer: "2 3/4",
    hint: {
      uz: "11 ni 4 ga bo'l: to'liq bo'linma butun qism, qoldiq esa yangi surat bo'ladi!",
      ru: "Раздели 11 на 4: неполное частное — целая часть, остаток — числитель!",
      en: "Divide 11 by 4: the quotient is whole number, remainder is the numerator!"
    },
    explanation: {
      uz: "11 ÷ 4 = 2 (qoldiq 3). Shuning uchun 2 butun 3/4 hosil bo'ladi.",
      ru: "11 ÷ 4 = 2 (остаток 3). Значит, получается 2 целых 3/4.",
      en: "11 ÷ 4 = 2 with remainder 3. Thus, it is 2 3/4."
    }
  },
  {
    id: "q1_3",
    topicId: "l1",
    difficulty: "medium",
    type: "true_false",
    question: {
      uz: "To'g'rimi: 3 butun 2/5 kasri 17/5 ga teng?",
      ru: "Верно ли: 3 целых 2/5 равно 17/5?",
      en: "True or False: 3 2/5 equals 17/5?"
    },
    options: [
      { uz: "To'g'ri (Rost)", ru: "Верно (Истина)", en: "True", value: "true" },
      { uz: "Noto'g'ri (Yolg'on)", ru: "Неверно (Ложь)", en: "False", value: "false" }
    ],
    correctAnswer: "true",
    hint: {
      uz: "3 × 5 + 2 ni hisoblang.",
      ru: "Посчитай 3 × 5 + 2.",
      en: "Calculate 3 × 5 + 2."
    },
    explanation: {
      uz: "Ha! 3 × 5 + 2 = 17. Maxraj 5 qoladi. Demak 17/5 ga teng, bu to'g'ri!",
      ru: "Да! 3 × 5 + 2 = 17. Знаменатель 5. Равно 17/5, это абсолютно верно!",
      en: "Yes! 3 × 5 + 2 = 17. Denominator stays 5. Equal to 17/5, which is true!"
    }
  },
  {
    id: "q1_4",
    topicId: "l1",
    difficulty: "hard",
    type: "fill_blank",
    question: {
      uz: "Tenglikni to'g'ri qiling: 4 butun ?/7 = 31/7. So'roq belgisi o'rnidagi sonni toping:",
      ru: "Заполните пропуск: 4 целых ?/7 = 31/7. Какое число должно стоять вместо знака вопроса?",
      en: "Fill in the blank: 4 ?/7 = 31/7. What number replaces the question mark?"
    },
    correctAnswer: "3",
    hint: {
      uz: "4 × 7 = 28. 31 bo'lishi uchun 28 ga nechani qo'shish kerak?",
      ru: "4 × 7 = 28. Сколько нужно прибавить к 28, чтобы получить 31?",
      en: "4 × 7 = 28. What must be added to 28 to reach 31?"
    },
    explanation: {
      uz: "4 × 7 = 28. 31 - 28 = 3. Demak bo'sh joyda 3 soni bo'lishi kerak!",
      ru: "4 × 7 = 28. 31 - 28 = 3. Значит, пропущен числитель 3!",
      en: "4 × 7 = 28. 31 - 28 = 3. So the numerator is 3!"
    }
  },

  // TOPIC 2: Mixed Addition
  {
    id: "q2_1",
    topicId: "l2",
    difficulty: "easy",
    type: "multiple_choice",
    question: {
      uz: "1 2/5 + 2 1/5 yig'indisini hisoblang:",
      ru: "Вычислите сумму 1 2/5 + 2 1/5:",
      en: "Calculate 1 2/5 + 2 1/5:"
    },
    options: [
      { uz: "3 3/5", ru: "3 3/5", en: "3 3/5", value: "3 3/5" },
      { uz: "3 3/10", ru: "3 3/10", en: "3 3/10", value: "3 3/10" },
      { uz: "4 1/5", ru: "4 1/5", en: "4 1/5", value: "4 1/5" },
      { uz: "2 3/5", ru: "2 3/5", en: "2 3/5", value: "2 3/5" }
    ],
    correctAnswer: "3 3/5",
    hint: {
      uz: "Maxrajlar bir xil (5). Butunlarni butunlarga (1+2), suratlarni suratlarga (2+1) qo'shing!",
      ru: "Знаменатели одинаковые (5). Целые складывай с целыми, числители с числителями!",
      en: "Like denominators (5). Add wholes (1+2) and numerators (2+1)!"
    },
    explanation: {
      uz: "(1 + 2) + (2/5 + 1/5) = 3 + 3/5 = 3 butun 3/5. Maxraj qo'shilmaydi!",
      ru: "(1 + 2) + (2/5 + 1/5) = 3 + 3/5 = 3 целых 3/5.",
      en: "(1 + 2) + (2/5 + 1/5) = 3 3/5. Denominators are not added together!"
    }
  },
  {
    id: "q2_2",
    topicId: "l2",
    difficulty: "medium",
    type: "input_mixed",
    question: {
      uz: "2 1/2 + 1 1/4 ni hisoblang:",
      ru: "Вычислите 2 1/2 + 1 1/4:",
      en: "Calculate 2 1/2 + 1 1/4:"
    },
    correctAnswer: "3 3/4",
    hint: {
      uz: "Maxrajlar 2 va 4. Umumiy maxraj 4 bo'ladi: 1/2 = 2/4!",
      ru: "Общий знаменатель 4: 1/2 = 2/4!",
      en: "Common denominator is 4: 1/2 = 2/4!"
    },
    explanation: {
      uz: "2 2/4 + 1 1/4 = (2 + 1) + (2/4 + 1/4) = 3 butun 3/4.",
      ru: "2 2/4 + 1 1/4 = 3 целых 3/4.",
      en: "2 2/4 + 1 1/4 = 3 3/4."
    }
  },
  {
    id: "q2_3",
    topicId: "l2",
    difficulty: "hard",
    type: "input_mixed",
    question: {
      uz: "1 2/3 + 2 3/4 ni hisoblang (Aralash kasr ko'rinishida):",
      ru: "Вычислите 1 2/3 + 2 3/4 (в виде смешанной дроби):",
      en: "Calculate 1 2/3 + 2 3/4 (as mixed fraction):"
    },
    correctAnswer: "4 5/12",
    hint: {
      uz: "3 va 4 uchun umumiy maxraj 12. 2/3 = 8/12, 3/4 = 9/12. Kasrlar yig'indisi 17/12 dan butun ajrat!",
      ru: "Общий знаменатель 12. 8/12 + 9/12 = 17/12 = 1 5/12. Не забудь добавить 1 к целым!",
      en: "Common denominator 12. 8/12 + 9/12 = 17/12 = 1 5/12. Add 1 to the whole parts!"
    },
    explanation: {
      uz: "1 8/12 + 2 9/12 = 3 + 17/12 = 3 + 1 5/12 = 4 butun 5/12.",
      ru: "1 8/12 + 2 9/12 = 3 + 17/12 = 3 + 1 5/12 = 4 целых 5/12.",
      en: "1 8/12 + 2 9/12 = 3 + 17/12 = 3 + 1 5/12 = 4 5/12."
    }
  },

  // TOPIC 3: Mixed Subtraction with Borrowing
  {
    id: "q3_1",
    topicId: "l3",
    difficulty: "easy",
    type: "multiple_choice",
    question: {
      uz: "3 4/5 - 1 1/5 ni hisoblang:",
      ru: "Вычислите 3 4/5 - 1 1/5:",
      en: "Calculate 3 4/5 - 1 1/5:"
    },
    options: [
      { uz: "2 3/5", ru: "2 3/5", en: "2 3/5", value: "2 3/5" },
      { uz: "2 1/5", ru: "2 1/5", en: "2 1/5", value: "2 1/5" },
      { uz: "4 3/5", ru: "4 3/5", en: "4 3/5", value: "4 3/5" },
      { uz: "1 3/5", ru: "1 3/5", en: "1 3/5", value: "1 3/5" }
    ],
    correctAnswer: "2 3/5",
    hint: {
      uz: "Butunlarni butundan (3 - 1) va kasrlarni kasrdan (4/5 - 1/5) ayiring!",
      ru: "Вычти целые (3 - 1) и вычти дроби (4/5 - 1/5)!",
      en: "Subtract wholes (3 - 1) and fractions (4/5 - 1/5)!"
    },
    explanation: {
      uz: "(3 - 1) + (4/5 - 1/5) = 2 butun 3/5.",
      ru: "(3 - 1) + (4/5 - 1/5) = 2 целых 3/5.",
      en: "(3 - 1) + (4/5 - 1/5) = 2 3/5."
    }
  },
  {
    id: "q3_2",
    topicId: "l3",
    difficulty: "medium",
    type: "input_mixed",
    question: {
      uz: "3 1/4 - 1 3/4 ni hisoblang (Diqqat: qarz olish kerak!):",
      ru: "Вычислите 3 1/4 - 1 3/4 (Внимание: нужен заём!):",
      en: "Calculate 3 1/4 - 1 3/4 (Warning: borrowing required!):"
    },
    correctAnswer: "1 1/2",
    hint: {
      uz: "1/4 dan 3/4 ni ayirib bo'lmaydi. 3 dan 1 qarz oling: 3 1/4 = 2 5/4!",
      ru: "1/4 меньше 3/4. Займи 1 у целой: 3 1/4 = 2 5/4!",
      en: "1/4 is less than 3/4. Borrow 1 from 3: 3 1/4 = 2 5/4!"
    },
    explanation: {
      uz: "3 1/4 = 2 5/4 bo'ladi. 2 5/4 - 1 3/4 = 1 butun 2/4 = 1 butun 1/2!",
      ru: "3 1/4 = 2 5/4. Вычитаем: 2 5/4 - 1 3/4 = 1 целая 2/4 = 1 целая 1/2!",
      en: "3 1/4 = 2 5/4. Subtract: 2 5/4 - 1 3/4 = 1 2/4 = 1 1/2!"
    }
  },
  {
    id: "q3_3",
    topicId: "l3",
    difficulty: "hard",
    type: "input_mixed",
    question: {
      uz: "4 1/3 - 2 1/2 ni hisoblang:",
      ru: "Вычислите 4 1/3 - 2 1/2:",
      en: "Calculate 4 1/3 - 2 1/2:"
    },
    correctAnswer: "1 5/6",
    hint: {
      uz: "Umumiy maxraj 6. 4 2/6 - 2 3/6. Surat 2 dan 3 ni ayirib bo'lmaydi, 4 dan 1 qarz oling: 3 8/6!",
      ru: "Общий знаменатель 6: 4 2/6 - 2 3/6 = 3 8/6 - 2 3/6!",
      en: "Common denominator 6: 4 2/6 - 2 3/6 = 3 8/6 - 2 3/6!"
    },
    explanation: {
      uz: "4 2/6 = 3 8/6. Ayiramiz: 3 8/6 - 2 3/6 = 1 butun 5/6.",
      ru: "4 2/6 = 3 8/6. Вычитаем: 3 8/6 - 2 3/6 = 1 целая 5/6.",
      en: "4 2/6 = 3 8/6. Subtract: 3 8/6 - 2 3/6 = 1 5/6."
    }
  },

  // TOPIC 4: Fraction Multiplication
  {
    id: "q4_1",
    topicId: "l4",
    difficulty: "easy",
    type: "multiple_choice",
    question: {
      uz: "2/3 × 3/5 ko'paytmasini toping:",
      ru: "Найдите произведение 2/3 × 3/5:",
      en: "Find product of 2/3 × 3/5:"
    },
    options: [
      { uz: "2/5", ru: "2/5", en: "2/5", value: "2/5" },
      { uz: "6/15", ru: "6/15", en: "6/15", value: "6/15" },
      { uz: "5/8", ru: "5/8", en: "5/8", value: "5/8" },
      { uz: "1/5", ru: "1/5", en: "1/5", value: "1/5" }
    ],
    correctAnswer: "2/5",
    hint: {
      uz: "Suratni suratga (2×3=6), maxrajni maxrajga (3×5=15). Yoki 3 larni qisqartir!",
      ru: "Числитель на числитель (2×3=6), знаменатель на знаменатель (3×5=15). Сократи на 3!",
      en: "Multiply tops (2×3=6), multiply bottoms (3×5=15). Simplify by 3!"
    },
    explanation: {
      uz: "(2 × 3) / (3 × 5) = 6/15. 3 ga qisqartirsak 2/5 chiqadi.",
      ru: "(2 × 3) / (3 × 5) = 6/15. Сократив на 3, получаем 2/5.",
      en: "(2 × 3) / (3 × 5) = 6/15. Reduced by 3 gives 2/5."
    }
  },
  {
    id: "q4_2",
    topicId: "l4",
    difficulty: "medium",
    type: "input_mixed",
    question: {
      uz: "1 1/2 × 2 2/3 ni hisoblang:",
      ru: "Вычислите 1 1/2 × 2 2/3:",
      en: "Calculate 1 1/2 × 2 2/3:"
    },
    correctAnswer: "4",
    hint: {
      uz: "Avval noto'g'ri kasrga aylantir: 1 1/2 = 3/2, 2 2/3 = 8/3!",
      ru: "Сначала переведи в неправильные: 1 1/2 = 3/2, 2 2/3 = 8/3!",
      en: "First convert to improper: 1 1/2 = 3/2, 2 2/3 = 8/3!"
    },
    explanation: {
      uz: "3/2 × 8/3 = (3 × 8) / (2 × 3) = 24 / 6 = 4 butun son!",
      ru: "3/2 × 8/3 = 24 / 6 = ровно 4 целых!",
      en: "3/2 × 8/3 = 24 / 6 = 4!"
    }
  },
  {
    id: "q4_3",
    topicId: "l4",
    difficulty: "hard",
    type: "true_false",
    question: {
      uz: "To'g'rimi: 2 1/2 × 3 1/2 amalini (2×3) + (1/2×1/2) deb yechish to'g'rimi?",
      ru: "Верно ли: можно ли умножать 2 1/2 × 3 1/2 как (2×3) + (1/2×1/2)?",
      en: "Is it correct to calculate 2 1/2 × 3 1/2 by multiplying (2×3) + (1/2×1/2)?"
    },
    options: [
      { uz: "Noto'g'ri (Katta xato!)", ru: "Неверно (Грубая ошибка!)", en: "False (Huge mistake!)", value: "false" },
      { uz: "To'g'ri", ru: "Верно", en: "True", value: "true" }
    ],
    correctAnswer: "false",
    hint: {
      uz: "Aralash kasrlarni ko'paytirishda doim avval noto'g'ri kasrga aylantirish shart!",
      ru: "При умножении смешанных дробей ОБЯЗАТЕЛЬНО сначала переводить их в неправильные!",
      en: "When multiplying mixed numbers, you MUST always convert them to improper fractions first!"
    },
    explanation: {
      uz: "Yo'q, bu juda keng tarqalgan xato! To'g'ri usul: 5/2 × 7/2 = 35/4 = 8 3/4 bo'ladi, 6 1/4 emas!",
      ru: "Нет, это частая ошибка! Правильно: 5/2 × 7/2 = 35/4 = 8 3/4, а вовсе не 6 1/4!",
      en: "No, that's a common trap! Correct way: 5/2 × 7/2 = 35/4 = 8 3/4, not 6 1/4!"
    }
  },

  // TOPIC 5: Fraction Division
  {
    id: "q5_1",
    topicId: "l5",
    difficulty: "easy",
    type: "multiple_choice",
    question: {
      uz: "3/4 ÷ 1/2 bo'linmasini hisoblang:",
      ru: "Вычислите 3/4 ÷ 1/2:",
      en: "Calculate 3/4 ÷ 1/2:"
    },
    options: [
      { uz: "1 1/2", ru: "1 1/2", en: "1 1/2", value: "1 1/2" },
      { uz: "3/8", ru: "3/8", en: "3/8", value: "3/8" },
      { uz: "2/3", ru: "2/3", en: "2/3", value: "2/3" },
      { uz: "1 1/4", ru: "1 1/4", en: "1 1/4", value: "1 1/4" }
    ],
    correctAnswer: "1 1/2",
    hint: {
      uz: "'Ag'dar va ko'paytir' qoidasi: 1/2 ni to'ntar (2/1) va ko'paytir!",
      ru: "Правило 'Переверни и умножь': переверни 1/2 в 2/1 и умножь!",
      en: "Flip and multiply: invert 1/2 to 2/1 and multiply!"
    },
    explanation: {
      uz: "3/4 × 2/1 = 6/4 = 3/2 = 1 butun 1/2.",
      ru: "3/4 × 2/1 = 6/4 = 3/2 = 1 целая 1/2.",
      en: "3/4 × 2/1 = 6/4 = 3/2 = 1 1/2."
    }
  },
  {
    id: "q5_2",
    topicId: "l5",
    difficulty: "medium",
    type: "input_mixed",
    question: {
      uz: "2 1/4 ÷ 3/4 ni hisoblang:",
      ru: "Вычислите 2 1/4 ÷ 3/4:",
      en: "Calculate 2 1/4 ÷ 3/4:"
    },
    correctAnswer: "3",
    hint: {
      uz: "2 1/4 = 9/4. 9/4 ÷ 3/4 = 9/4 × 4/3!",
      ru: "2 1/4 = 9/4. Умножь 9/4 на 4/3!",
      en: "2 1/4 = 9/4. Multiply 9/4 by 4/3!"
    },
    explanation: {
      uz: "9/4 × 4/3 = (9 × 4) / (4 × 3) = 36 / 12 = 3 butun son!",
      ru: "9/4 × 4/3 = 36 / 12 = ровно 3!",
      en: "9/4 × 4/3 = 36 / 12 = 3!"
    }
  },
  {
    id: "q5_3",
    topicId: "l5",
    difficulty: "hard",
    type: "input_mixed",
    question: {
      uz: "1 5/7 ÷ 2 2/7 ni hisoblang (Oddiy qisqarmas kasr ko'rinishida):",
      ru: "Вычислите 1 5/7 ÷ 2 2/7 (в виде простой дроби):",
      en: "Calculate 1 5/7 ÷ 2 2/7 (as simplified fraction):"
    },
    correctAnswer: "3/4",
    hint: {
      uz: "1 5/7 = 12/7. 2 2/7 = 16/7. 12/7 × 7/16 ni qisqartir!",
      ru: "1 5/7 = 12/7. 2 2/7 = 16/7. Умножаем 12/7 на 7/16 и сокращаем!",
      en: "1 5/7 = 12/7. 2 2/7 = 16/7. Multiply 12/7 by 7/16 and simplify!"
    },
    explanation: {
      uz: "12/7 × 7/16 = 12/16 = 3/4 (surat va maxrajni 4 ga qisqartirdik).",
      ru: "12/7 × 7/16 = 12/16 = 3/4 (сократили на 4).",
      en: "12/7 × 7/16 = 12/16 = 3/4 (divided top and bottom by 4)."
    }
  }
];

export function generateRandomQuestion(topicId?: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): QuizQuestion {
  // Topic selection: 1 to 5
  const topics = ['l1', 'l2', 'l3', 'l4', 'l5'];
  const chosenTopic = topicId && topicId !== 'all' ? topicId : topics[Math.floor(Math.random() * topics.length)];

  if (chosenTopic === 'l1') {
    // Mixed to improper or reverse
    const whole = Math.floor(Math.random() * 4) + 1;
    const den = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
    const num = Math.floor(Math.random() * (den - 1)) + 1;
    const improperNum = whole * den + num;

    const isToImproper = Math.random() > 0.5;
    if (isToImproper) {
      const correct = `${improperNum}/${den}`;
      const wrong1 = `${improperNum + 1}/${den}`;
      const wrong2 = `${improperNum - 1}/${den}`;
      const wrong3 = `${whole * den}/${den}`;

      return {
        id: `rnd_${Date.now()}_${Math.random()}`,
        topicId: 'l1',
        difficulty,
        type: 'multiple_choice',
        question: {
          uz: `${whole} butun ${num}/${den} aralash kasrini noto'g'ri kasrga aylantiring:`,
          ru: `Переведите ${whole} целых ${num}/${den} в неправильную дробь:`,
          en: `Convert ${whole} ${num}/${den} into an improper fraction:`
        },
        options: [
          { uz: correct, ru: correct, en: correct, value: correct },
          { uz: wrong1, ru: wrong1, en: wrong1, value: wrong1 },
          { uz: wrong2, ru: wrong2, en: wrong2, value: wrong2 },
          { uz: wrong3, ru: wrong3, en: wrong3, value: wrong3 }
        ].sort(() => Math.random() - 0.5),
        correctAnswer: correct,
        hint: {
          uz: `Butunni (${whole}) maxrajga (${den}) ko'paytirib, suratni (${num}) qo'shing!`,
          ru: `Умножь целую часть (${whole}) на знаменатель (${den}) и прибавь числитель (${num})!`,
          en: `Multiply whole (${whole}) by denominator (${den}) and add numerator (${num})!`
        },
        explanation: {
          uz: `${whole} × ${den} + ${num} = ${improperNum}. Maxraj ${den} qoladi. Natija: ${improperNum}/${den}.`,
          ru: `${whole} × ${den} + ${num} = ${improperNum}. Знаменатель ${den}. Ответ: ${improperNum}/${den}.`,
          en: `${whole} × ${den} + ${num} = ${improperNum}. Denominator is ${den}. Answer: ${improperNum}/${den}.`
        }
      };
    } else {
      const correct = `${whole} ${num}/${den}`;
      return {
        id: `rnd_${Date.now()}_${Math.random()}`,
        topicId: 'l1',
        difficulty,
        type: 'input_mixed',
        question: {
          uz: `${improperNum}/${den} noto'g'ri kasrini aralash kasr ko'rinishida yozing (masalan: 2 1/3):`,
          ru: `Запишите неправильную дробь ${improperNum}/${den} в виде смешанной дроби (например: 2 1/3):`,
          en: `Write improper fraction ${improperNum}/${den} as a mixed fraction (e.g. 2 1/3):`
        },
        correctAnswer: correct,
        hint: {
          uz: `${improperNum} ni ${den} ga bo'ling: to'liq bo'linma butun son, qoldiq esa surat!`,
          ru: `Раздели ${improperNum} на ${den}: частное — целая часть, остаток — числитель!`,
          en: `Divide ${improperNum} by ${den}: whole number is quotient, remainder is numerator!`
        },
        explanation: {
          uz: `${improperNum} ÷ ${den} = ${whole} butun (qoldiq ${num}). Javob: ${whole} butun ${num}/${den}.`,
          ru: `${improperNum} ÷ ${den} = ${whole} (остаток ${num}). Ответ: ${whole} целых ${num}/${den}.`,
          en: `${improperNum} ÷ ${den} = ${whole} R ${num}. Answer: ${whole} ${num}/${den}.`
        }
      };
    }
  }

  if (chosenTopic === 'l2') {
    // Mixed addition
    const w1 = Math.floor(Math.random() * 3) + 1;
    const w2 = Math.floor(Math.random() * 3) + 1;
    const den = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
    const n1 = 1;
    const n2 = Math.floor(Math.random() * (den - 2)) + 1;
    const sumWhole = w1 + w2;
    const sumNum = n1 + n2;
    const correct = `${sumWhole} ${sumNum}/${den}`;

    return {
      id: `rnd_${Date.now()}_${Math.random()}`,
      topicId: 'l2',
      difficulty,
      type: 'input_mixed',
      question: {
        uz: `${w1} ${n1}/${den} + ${w2} ${n2}/${den} ni hisoblang:`,
        ru: `Вычислите ${w1} ${n1}/${den} + ${w2} ${n2}/${den}:`,
        en: `Calculate ${w1} ${n1}/${den} + ${w2} ${n2}/${den}:`
      },
      correctAnswer: correct,
      hint: {
        uz: `Butunlarni alohida (${w1}+${w2}), suratlarni alohida (${n1}+${n2}) qo'shing!`,
        ru: `Сложи целые (${w1}+${w2}) и числители (${n1}+${n2})!`,
        en: `Add wholes (${w1}+${w2}) and add numerators (${n1}+${n2})!`
      },
      explanation: {
        uz: `(${w1} + ${w2}) + (${n1}/${den} + ${n2}/${den}) = ${sumWhole} butun ${sumNum}/${den}.`,
        ru: `(${w1} + ${w2}) + (${n1}/${den} + ${n2}/${den}) = ${sumWhole} целых ${sumNum}/${den}.`,
        en: `(${w1} + ${w2}) + (${n1}/${den} + ${n2}/${den}) = ${sumWhole} ${sumNum}/${den}.`
      }
    };
  }

  if (chosenTopic === 'l3') {
    // Mixed subtraction with borrowing
    const den = [3, 4, 5][Math.floor(Math.random() * 3)];
    const w1 = 3;
    const w2 = 1;
    const n1 = 1;
    const n2 = 2; // n1 < n2, so borrowing required
    // 3 1/den - 1 2/den = 2 (den+1)/den - 1 2/den = 1 (den - 1)/den
    const resWhole = 1;
    const resNum = den + n1 - n2;
    const correct = `${resWhole} ${resNum}/${den}`;

    return {
      id: `rnd_${Date.now()}_${Math.random()}`,
      topicId: 'l3',
      difficulty,
      type: 'input_mixed',
      question: {
        uz: `${w1} ${n1}/${den} - ${w2} ${n2}/${den} ni hisoblang (Qarz oling!):`,
        ru: `Вычислите ${w1} ${n1}/${den} - ${w2} ${n2}/${den} (С заёмом!):`,
        en: `Calculate ${w1} ${n1}/${den} - ${w2} ${n2}/${den} (Borrowing!):`
      },
      correctAnswer: correct,
      hint: {
        uz: `${n1} dan ${n2} ni ayirib bo'lmaydi. ${w1} dan 1 qarz oling: ${w1 - 1} butun ${den + n1}/${den}!`,
        ru: `Займи 1 у целой части: ${w1 - 1} целых ${den + n1}/${den}!`,
        en: `Borrow 1 from the whole number: ${w1 - 1} and ${den + n1}/${den}!`
      },
      explanation: {
        uz: `${w1} ${n1}/${den} = ${w1 - 1} ${den + n1}/${den}. Ayiramiz: (${w1 - 1} - ${w2}) butun (${den + n1} - ${n2})/${den} = ${correct}.`,
        ru: `${w1} ${n1}/${den} = ${w1 - 1} ${den + n1}/${den}. Вычитаем: ${correct}.`,
        en: `${w1} ${n1}/${den} = ${w1 - 1} ${den + n1}/${den}. Subtract: ${correct}.`
      }
    };
  }

  if (chosenTopic === 'l4') {
    // Multiplication
    const n1 = 2;
    const d1 = 3;
    const n2 = 1;
    const d2 = 4;
    // 2/3 * 1/4 = 2/12 = 1/6
    return {
      id: `rnd_${Date.now()}_${Math.random()}`,
      topicId: 'l4',
      difficulty,
      type: 'multiple_choice',
      question: {
        uz: "2/3 × 1/4 ko'paytmasini toping (qisqartirilgan shakli):",
        ru: "Найдите произведение 2/3 × 1/4 (в сокращённом виде):",
        en: "Find product of 2/3 × 1/4 (simplified):"
      },
      options: [
        { uz: "1/6", ru: "1/6", en: "1/6", value: "1/6" },
        { uz: "2/12", ru: "2/12", en: "2/12", value: "2/12" },
        { uz: "3/7", ru: "3/7", en: "3/7", value: "3/7" },
        { uz: "1/4", ru: "1/4", en: "1/4", value: "1/4" }
      ],
      correctAnswer: "1/6",
      hint: {
        uz: "Surat suratga: 2×1=2. Maxraj maxrajga: 3×4=12. Qisqartiring: 2/12 = 1/6!",
        ru: "2×1=2, 3×4=12. Сократи 2/12 на 2!",
        en: "2×1=2, 3×4=12. Reduce 2/12 by 2!"
      },
      explanation: {
        uz: "(2 × 1) / (3 × 4) = 2/12 = 1/6.",
        ru: "(2 × 1) / (3 × 4) = 2/12 = 1/6.",
        en: "(2 × 1) / (3 × 4) = 2/12 = 1/6."
      }
    };
  }

  // l5: Division
  return {
    id: `rnd_${Date.now()}_${Math.random()}`,
    topicId: 'l5',
    difficulty,
    type: 'multiple_choice',
    question: {
      uz: "1/2 ÷ 1/4 bo'linmasini hisoblang:",
      ru: "Вычислите 1/2 ÷ 1/4:",
      en: "Calculate 1/2 ÷ 1/4:"
    },
    options: [
      { uz: "2", ru: "2", en: "2", value: "2" },
      { uz: "1/8", ru: "1/8", en: "1/8", value: "1/8" },
      { uz: "1/2", ru: "1/2", en: "1/2", value: "1/2" },
      { uz: "4", ru: "4", en: "4", value: "4" }
    ],
    correctAnswer: "2",
    hint: {
      uz: "1/4 ni ag'daring (4/1) va 1/2 ga ko'paytiring!",
      ru: "Переверни 1/4 в 4/1 и умножь на 1/2!",
      en: "Flip 1/4 into 4/1 and multiply by 1/2!"
    },
    explanation: {
      uz: "1/2 × 4/1 = 4/2 = 2 butun!",
      ru: "1/2 × 4/1 = 4/2 = 2 целых!",
      en: "1/2 × 4/1 = 4/2 = 2!"
    }
  };
}
