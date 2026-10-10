import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FractionDisplay } from '../components/FractionDisplay';
import { FractionVisualizer } from '../components/FractionVisualizer';
import { Mascot } from '../components/Mascot';
import { SoundPlayer } from '../utils/sound';
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const LessonsView: React.FC = () => {
  const { lang, t, completeLesson, user, soundEnabled } = useApp();
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  // Interactive slider controls for the live visualizer inside lessons
  const [sliderWhole, setSliderWhole] = useState(2);
  const [sliderNum, setSliderNum] = useState(1);
  const [sliderDen, setSliderDen] = useState(4);
  const [visType, setVisType] = useState<'pizza' | 'chocolate'>('pizza');

  // Step-by-step solve walkthrough index
  const [walkthroughStep, setWalkthroughStep] = useState(0);

  // Quick check quiz state for current lesson
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<number, boolean>>({});

  const lessonsData = [
    {
      id: "l1",
      title: {
        uz: "1-dars: Aralash kasr ⇄ Noto'g'ri kasr",
        ru: "Урок 1: Смешанная дробь ⇄ Неправильная дробь",
        en: "Lesson 1: Mixed ⇄ Improper Fractions"
      },
      subtitle: {
        uz: "Butun va bo'laklarni bir-biriga aylantirishning sehrli siri",
        ru: "Секрет превращения целых и долей друг в друга",
        en: "The secret formula to convert between wholes and slices"
      },
      intro: {
        uz: "Tasavvur qil: stol ustida 2 ta butun pitsa va yana 1/4 pitsa bor. Bu — aralash kasr: 2 1/4. Agar barcha butun pitsalarni ham 4 bo'lakka bo'lib chiqsak, jami nechta bo'lak bo'ladi? 2 × 4 = 8 ta, yana 1 ta bo'lak qo'shilsa = 9 ta bo'lak, ya'ni 9/4 bo'ladi!",
        ru: "Представь: на столе 2 целые пиццы и ещё 1/4 пиццы. Это смешанная дробь: 2 1/4. Если разрезать каждую целую на 4 части, сколько долек получится? 2 × 4 = 8 долек, плюс ещё одна = 9 долек, то есть 9/4!",
        en: "Imagine: 2 whole pizzas and 1/4 of a pizza on the table. That is a mixed number: 2 1/4. If we slice both whole pizzas into 4 quarters, we get 2 × 4 = 8 slices, plus 1 more = 9 slices, or 9/4!"
      },
      rule: {
        uz: "Oltin formula: Butun qismni maxrajga ko'paytir va suratni qo'sh! a b/c = (a × c + b) / c. Maxraj HECH QACHON o'zgarmaydi!",
        ru: "Золотая формула: Умножь целую часть на знаменатель и прибавь числитель! a b/c = (a × c + b) / c. Знаменатель НЕ меняется!",
        en: "Golden Rule: Multiply whole by denominator and add numerator! a b/c = (a × c + b) / c. The denominator NEVER changes!"
      },
      mistake: {
        uz: "Maxrajni ham ko'paytirib yuborish (masalan 2 1/4 ni 9/8 deb yozish). Esingda tutsin: pitsa bo'lagining o'lchami o'zgarmaydi, shuning uchun maxraj o'sha-o'sha qoladi!",
        ru: "Умножать и знаменатель (например писать 9/8 вместо 9/4). Размер кусочка не меняется, поэтому знаменатель остаётся прежним!",
        en: "Multiplying the denominator too (writing 9/8 instead of 9/4). The slice size does not change, so denominator stays constant!"
      },
      walkthrough: [
        {
          step: {
            uz: "1-qadam: Misol berilgan: 3 butun 2/5 ni noto'g'ri kasrga aylantiramiz.",
            ru: "Шаг 1: Пример: переведём 3 целых 2/5 в неправильную дробь.",
            en: "Step 1: Example: Convert 3 2/5 into an improper fraction."
          },
          math: "3 2/5"
        },
        {
          step: {
            uz: "2-qadam: Butun son (3) ni maxraj (5) ga ko'paytiramiz: 3 × 5 = 15.",
            ru: "Шаг 2: Умножаем целую часть (3) на знаменатель (5): 3 × 5 = 15.",
            en: "Step 2: Multiply whole (3) by denominator (5): 3 × 5 = 15."
          },
          math: "3 × 5 = 15"
        },
        {
          step: {
            uz: "3-qadam: Chiqqan songa surat (2) ni qo'shamiz: 15 + 2 = 17.",
            ru: "Шаг 3: Прибавляем числитель (2): 15 + 2 = 17.",
            en: "Step 3: Add numerator (2): 15 + 2 = 17."
          },
          math: "15 + 2 = 17 (Yangi surat)"
        },
        {
          step: {
            uz: "4-qadam: Maxraj o'zgarmasdan 5 qoladi. Natija: 17/5!",
            ru: "Шаг 4: Знаменатель 5 остаётся без изменений. Ответ: 17/5!",
            en: "Step 4: Denominator stays 5. Final Answer: 17/5!"
          },
          math: "17/5"
        }
      ],
      quizzes: [
        {
          q: { uz: "2 butun 3/4 ning noto'g'ri kasr shakli qanday?", ru: "Какая неправильная дробь для 2 3/4?", en: "What is 2 3/4 as improper fraction?" },
          options: ["11/4", "9/4", "11/8", "7/4"],
          ans: "11/4"
        },
        {
          q: { uz: "13/5 aralash kasrga aylantirilsa nima bo'ladi?", ru: "Чему равно 13/5 в виде смешанной дроби?", en: "What is 13/5 as a mixed fraction?" },
          options: ["2 3/5", "3 1/5", "2 1/5", "1 8/5"],
          ans: "2 3/5"
        },
        {
          q: { uz: "Aralash kasrni noto'g'ri kasrga aylantirganda maxraj o'zgaradimi?", ru: "Меняется ли знаменатель при переводе?", en: "Does denominator change when converting?" },
          options: ["Yo'q, o'zgarmaydi", "Ha, ko'payadi", "Ha, bo'linadi", "Faqat 0 bo'ladi"],
          ans: "Yo'q, o'zgarmaydi"
        }
      ]
    },

    {
      id: "l2",
      title: {
        uz: "2-dars: Aralash kasrlarni qo'shish",
        ru: "Урок 2: Сложение смешанных дробей",
        en: "Lesson 2: Adding Mixed Fractions"
      },
      subtitle: {
        uz: "Butunlarni butunlarga, kasrlarni umumiy maxraj bilan qo'shamiz",
        ru: "Целые с целыми, а дроби через общий знаменатель",
        en: "Add wholes together, find common denominator for fractions"
      },
      intro: {
        uz: "Aralash kasrlarni qo'shishda eng muhim qoida: butun narsalar bilan bo'laklarni aralashtirib yubormaslik! 1 ta butun pitsa va yana 2 ta butun pitsa = 3 ta butun pitsa. Kasr bo'laklarini esa umumiy maxrajga keltirib qo'shamiz.",
        ru: "Главное правило сложения смешанных дробей: складывай целое с целым, а доли с долями! 1 целая пицца + 2 целых = 3 целых. А кусочки складывай через общий знаменатель.",
        en: "The key rule in adding mixed numbers: keep wholes with wholes, and parts with parts! 1 whole pizza + 2 wholes = 3 wholes. Then bring fraction parts to a common denominator."
      },
      rule: {
        uz: "3 oddiy qadam: 1) Butun qismlarni qo'shamiz; 2) Kasr qismlari uchun umumiy maxraj topib qo'shamiz; 3) Agar kasr qism 1 dan katta bo'lib qolsa (noto'g'ri kasr), undan butun qismni ajratib olamiz!",
        ru: "3 простых шага: 1) Сложи целые части; 2) Приведи дроби к общему знаменателю и сложи; 3) Если дробь стала неправильной, выдели целую часть!",
        en: "3 simple steps: 1) Add whole parts; 2) Bring fractions to common denominator and add; 3) If fractional sum is improper, extract another whole number!"
      },
      mistake: {
        uz: "Maxrajlarni bir-biriga shunchaki qo'shib yuborish! 1/2 + 1/3 ni 2/5 deb hisoblash — eng xavfli xato! Umumiy maxraj 6 bo'lishi kerak: 3/6 + 2/6 = 5/6!",
        ru: "Складывать знаменатели между собой! 1/2 + 1/3 ≠ 2/5! Общий знаменатель 6: 3/6 + 2/6 = 5/6!",
        en: "Adding denominators together! 1/2 + 1/3 is NOT 2/5! The common denominator is 6: 3/6 + 2/6 = 5/6!"
      },
      walkthrough: [
        {
          step: {
            uz: "1-qadam: Misol: 2 1/4 + 1 2/4 ni hisoblaymiz.",
            ru: "Шаг 1: Пример: решим 2 1/4 + 1 2/4.",
            en: "Step 1: Calculate 2 1/4 + 1 2/4."
          },
          math: "2 1/4 + 1 2/4"
        },
        {
          step: {
            uz: "2-qadam: Butun qismlarni qo'shamiz: 2 + 1 = 3.",
            ru: "Шаг 2: Складываем целые: 2 + 1 = 3.",
            en: "Step 2: Add whole numbers: 2 + 1 = 3."
          },
          math: "2 + 1 = 3"
        },
        {
          step: {
            uz: "3-qadam: Kasr qismlarni qo'shamiz (maxraj 4 bir xil): 1/4 + 2/4 = 3/4.",
            ru: "Шаг 3: Складываем дроби: 1/4 + 2/4 = 3/4.",
            en: "Step 3: Add fractions (denominator 4 is same): 1/4 + 2/4 = 3/4."
          },
          math: "1/4 + 2/4 = 3/4"
        },
        {
          step: {
            uz: "4-qadam: Butun va kasrni birlashtiramiz: 3 butun 3/4!",
            ru: "Шаг 4: Объединяем результат: 3 целых 3/4!",
            en: "Step 4: Combine result: 3 3/4!"
          },
          math: "3 3/4"
        }
      ],
      quizzes: [
        {
          q: { uz: "1 2/7 + 3 4/7 yig'indisi nechaga teng?", ru: "Чему равно 1 2/7 + 3 4/7?", en: "What is 1 2/7 + 3 4/7?" },
          options: ["4 6/7", "4 6/14", "5 1/7", "3 6/7"],
          ans: "4 6/7"
        },
        {
          q: { uz: "1 1/2 + 2 1/4 ni hisoblashda umumiy maxraj necha?", ru: "Какой общий знаменатель для 1 1/2 + 2 1/4?", en: "Common denominator for 1 1/2 + 2 1/4?" },
          options: ["4", "2", "6", "8"],
          ans: "4"
        },
        {
          q: { uz: "2 3/5 + 1 4/5 = 3 7/5 bo'lsa, to'g'ri yakuniy javob qanday?", ru: "Если 2 3/5 + 1 4/5 = 3 7/5, какой правильный окончательный ответ?", en: "If 2 3/5 + 1 4/5 = 3 7/5, what is the final simplified answer?" },
          options: ["4 2/5", "3 2/5", "4 1/5", "5 2/5"],
          ans: "4 2/5"
        }
      ]
    },

    {
      id: "l3",
      title: {
        uz: "3-dars: Aralash kasrlarni ayirish (Qarz olish!)",
        ru: "Урок 3: Вычитание смешанных дробей (Заём у целой!)",
        en: "Lesson 3: Subtracting Mixed Fractions (Borrowing!)"
      },
      subtitle: {
        uz: "Birinchi kasrning surati kichik bo'lganda nima qilish kerak?",
        ru: "Что делать, если числитель уменьшаемого меньше вычитаемого?",
        en: "What to do when the first numerator is smaller than the second?"
      },
      intro: {
        uz: "Masalan: 3 butun 1/4 dan 1 butun 3/4 ni ayirish kerak. Butunlar 3 - 1 = 2 bo'ladi, lekin 1/4 dan 3/4 ni qanday ayiramiz? 1 dan 3 ni ayirib bo'lmaydi-ku! Yechim: 3 ta butun pitsaning 1 tasini ochib, uni 4/4 bo'lak qilib maydalaymiz! Shunda 2 butun va 5/4 bo'ladi!",
        ru: "Например: надо вычесть 1 3/4 из 3 1/4. Из 1/4 нельзя вычесть 3/4! Выход: берём 1 целую пиццу и разрезаем на 4/4. Получаем 2 целых и 5/4, теперь легко вычесть!",
        en: "Example: 3 1/4 - 1 3/4. We cannot subtract 3/4 from 1/4! Solution: borrow 1 whole from 3 and turn it into 4/4. Then 3 1/4 becomes 2 5/4, and subtraction is a breeze!"
      },
      rule: {
        uz: "Qarz olish usuli: 1 butun = maxraj/maxraj. Masalan: 5 1/3 = 4 + 3/3 + 1/3 = 4 4/3 bo'ladi! Endi bemalol ayirsa bo'ladi!",
        ru: "Правило заёма: 1 целая = знаменатель/знаменатель. Например: 5 1/3 = 4 + 3/3 + 1/3 = 4 4/3!",
        en: "Borrowing rule: 1 whole = den/den. Example: 5 1/3 = 4 + 3/3 + 1/3 = 4 4/3!"
      },
      mistake: {
        uz: "Kichik suratdan katta suratni ayirib bo'lmaganda, teskarisiga ayirib qo'yish (3/4 - 1/4 = 2/4 deb yozish). Matematikada bunday o'zboshimchalik qilib bo'lmaydi!",
        ru: "Вычитать задом наперёд (из 3/4 вычесть 1/4). В математике менять местами уменьшаемое и вычитаемое нельзя!",
        en: "Subtracting backwards (subtracting 1/4 from 3/4). You cannot swap numbers arbitrarily!"
      },
      walkthrough: [
        {
          step: {
            uz: "1-qadam: Misol: 4 1/5 - 2 3/5 ni hisoblaymiz.",
            ru: "Шаг 1: Пример: 4 1/5 - 2 3/5.",
            en: "Step 1: Calculate 4 1/5 - 2 3/5."
          },
          math: "4 1/5 - 2 3/5"
        },
        {
          step: {
            uz: "2-qadam: 1/5 dan 3/5 ni ayirib bo'lmaydi. 4 dan 1 qarz olamiz: 4 1/5 = 3 + 5/5 + 1/5 = 3 6/5 bo'ladi.",
            ru: "Шаг 2: Занимаем 1 у 4: 4 1/5 = 3 + 5/5 + 1/5 = 3 6/5.",
            en: "Step 2: Borrow 1 from 4: 4 1/5 = 3 6/5."
          },
          math: "4 1/5 ➔ 3 6/5"
        },
        {
          step: {
            uz: "3-qadam: Endi ayiramiz: (3 - 2) butun va (6/5 - 3/5) kasr.",
            ru: "Шаг 3: Теперь вычитаем: (3 - 2) целых и (6/5 - 3/5).",
            en: "Step 3: Now subtract: (3 - 2) wholes and (6/5 - 3/5)."
          },
          math: "3 6/5 - 2 3/5 = 1 3/5"
        },
        {
          step: {
            uz: "4-qadam: Natija: 1 butun 3/5!",
            ru: "Шаг 4: Ответ: 1 целая 3/5!",
            en: "Step 4: Answer: 1 3/5!"
          },
          math: "1 3/5"
        }
      ],
      quizzes: [
        {
          q: { uz: "3 1/3 dan 1 butun 'qarz' olsak, qanday kasr hosil bo'ladi?", ru: "Если занять 1 у 3 1/3, что получится?", en: "If we borrow 1 from 3 1/3, what fraction results?" },
          options: ["2 4/3", "2 2/3", "3 4/3", "2 1/3"],
          ans: "2 4/3"
        },
        {
          q: { uz: "2 1/4 - 1 3/4 ni hisoblang:", ru: "Вычислите 2 1/4 - 1 3/4:", en: "Calculate 2 1/4 - 1 3/4:" },
          options: ["2/4 (yoki 1/2)", "1 2/4", "1 1/4", "3/4"],
          ans: "2/4 (yoki 1/2)"
        },
        {
          q: { uz: "4 - 1 2/5 ayirmasini hisoblashda 4 ni qanday yozib olamiz?", ru: "Как записать 4 для вычисления 4 - 1 2/5?", en: "How to rewrite 4 to solve 4 - 1 2/5?" },
          options: ["3 5/5", "4 5/5", "3 1/5", "4 0/5"],
          ans: "3 5/5"
        }
      ]
    },

    {
      id: "l4",
      title: {
        uz: "4-dars: Kasrlarni ko'paytirish",
        ru: "Урок 4: Умножение дробей",
        en: "Lesson 4: Multiplying Fractions"
      },
      subtitle: {
        uz: "Surat suratga, maxraj esa maxrajga ko'payadi!",
        ru: "Числитель на числитель, знаменатель на знаменатель!",
        en: "Multiply numerators and multiply denominators!"
      },
      intro: {
        uz: "Kasrlarni ko'paytirish — arifmetikaning eng sodda va chiroyli amallaridan biri! Hech qanday umumiy maxraj qidirish shart emas! Suratni suratga ko'paytiramiz, maxrajni esa maxrajga. Agar aralash kasr bo'lsa, avval uni ALBATTA noto'g'ri kasrga aylantiramiz!",
        ru: "Умножение дробей — одно из самых простых действий! Общий знаменатель искать НЕ НУЖНО! Просто числитель на числитель, знаменатель на знаменатель. А смешанные дроби сначала переводим в неправильные!",
        en: "Multiplying fractions is very simple! You do NOT need to find a common denominator! Just multiply tops together and bottoms together. If numbers are mixed, ALWAYS convert to improper first!"
      },
      rule: {
        uz: "Qoida: (a/b) × (c/d) = (a × c) / (b × d). Ko'paytirishdan oldin sonlarni qisqartirish hisobni juda oson qiladi!",
        ru: "Правило: (a/b) × (c/d) = (a × c) / (b × d). Сокращение перед умножением сильно упрощает счёт!",
        en: "Rule: (a/b) × (c/d) = (a × c) / (b × d). Simplifying before multiplying makes it super fast!"
      },
      mistake: {
        uz: "Aralash kasrlarda butunni butunga, kasrni kasrga ko'paytirish (masalan 1 1/2 × 2 1/2 ni 2 1/4 deb yozish). Bu juda qo'pol xato! Avval 3/2 × 5/2 = 15/4 = 3 3/4 bo'lishi kerak!",
        ru: "Умножать целые на целые, а дроби на дроби (1 1/2 × 2 1/2 ≠ 2 1/4). Нужно: 3/2 × 5/2 = 15/4 = 3 3/4!",
        en: "Multiplying wholes by wholes and fractions by fractions. Always convert to improper fractions first!"
      },
      walkthrough: [
        {
          step: {
            uz: "1-qadam: Misol: 2/3 × 3/4 ni hisoblaymiz.",
            ru: "Шаг 1: Пример: 2/3 × 3/4.",
            en: "Step 1: Calculate 2/3 × 3/4."
          },
          math: "2/3 × 3/4"
        },
        {
          step: {
            uz: "2-qadam: Suratni suratga, maxrajni maxrajga ko'paytiramiz: (2 × 3) / (3 × 4).",
            ru: "Шаг 2: Числитель на числитель, знаменатель на знаменатель: (2 × 3) / (3 × 4).",
            en: "Step 2: Multiply tops and bottoms: (2 × 3) / (3 × 4)."
          },
          math: "(2 × 3) / (3 × 4) = 6/12"
        },
        {
          step: {
            uz: "3-qadam: 6/12 kasrini 6 ga qisqartiramiz: 6 ÷ 6 = 1, 12 ÷ 6 = 2.",
            ru: "Шаг 3: Сокращаем 6/12 на 6: 1/2.",
            en: "Step 3: Simplify 6/12 by 6: 1/2."
          },
          math: "6/12 = 1/2"
        },
        {
          step: {
            uz: "4-qadam: Natija: 1/2 (yoki yarim)!",
            ru: "Шаг 4: Ответ: 1/2!",
            en: "Step 4: Answer: 1/2!"
          },
          math: "1/2"
        }
      ],
      quizzes: [
        {
          q: { uz: "3/5 × 2/7 ko'paytmasi nechaga teng?", ru: "Чему равно 3/5 × 2/7?", en: "What is 3/5 × 2/7?" },
          options: ["6/35", "5/12", "6/12", "5/35"],
          ans: "6/35"
        },
        {
          q: { uz: "1/2 × 4 ko'paytmasi nechaga teng?", ru: "Чему равно 1/2 × 4?", en: "What is 1/2 × 4?" },
          options: ["2", "4/8", "1/8", "4 1/2"],
          ans: "2"
        },
        {
          q: { uz: "Kasrlarni ko'paytirishda umumiy maxraj topish shartmi?", ru: "Нужно ли искать общий знаменатель при умножении?", en: "Do we need common denominator for multiplication?" },
          options: ["Shart emas (kerak emas)", "Albatta shart", "Faqat juft sonlarda", "Faqat aralash kasrlarda"],
          ans: "Shart emas (kerak emas)"
        }
      ]
    },

    {
      id: "l5",
      title: {
        uz: "5-dars: Kasrlarni bo'lish (Ag'dar va ko'paytir!)",
        ru: "Урок 5: Деление дробей (Переверни и умножь!)",
        en: "Lesson 5: Dividing Fractions (Flip & Multiply!)"
      },
      subtitle: {
        uz: "Teskari kasrga ko'paytirishning sehrli usuli",
        ru: "Волшебный метод умножения на обратную дробь",
        en: "The magical reciprocal flip technique"
      },
      intro: {
        uz: "Kasrni kasrga qanday bo'lish mumkin? Juda oson! Matematiklar buning ajoyib usulini topganlar: bo'lish amalini ko'paytirishga almashtirish! Buning uchun ikkinchi kasrni oyoqlarini osmonga qilib 'ag'daramiz' (teskarisiga o'giramiz) va oddiy ko'paytiramiz!",
        ru: "Как разделить дробь на дробь? Математики придумали гениальный трюк: заменить деление на умножение! Для этого вторую дробь переворачиваем вверх тормашками и просто перемножаем!",
        en: "How do you divide a fraction by a fraction? Easily! Mathematicians found a smart shortcut: replace division with multiplication! Just flip the second fraction upside down and multiply!"
      },
      rule: {
        uz: "'Ag'dar va ko'paytir' oltin qoidasi: (a/b) ÷ (c/d) = (a/b) × (d/c). Faqat ikkinchi kasr (bo'luvchi) ag'dariladi!",
        ru: "Золотое правило «Переверни и умножь»: (a/b) ÷ (c/d) = (a/b) × (d/c). Переворачиваем ТОЛЬКО вторую дробь!",
        en: "Flip and Multiply Golden Rule: (a/b) ÷ (c/d) = (a/b) × (d/c). ONLY flip the second fraction!"
      },
      mistake: {
        uz: "Birinchi kasrni ham ag'darib yuborish yoki ikkala kasrni ham to'ntarish. Esingda bo'lsin: birinchi kasr o'z joyida xotirjam turadi, faqat ikkinchisi to'ntariladi!",
        ru: "Переворачивать первую дробь или обе дроби. Первая всегда остаётся на месте!",
        en: "Flipping both fractions or the first fraction. Keep the first fraction unchanged!"
      },
      walkthrough: [
        {
          step: {
            uz: "1-qadam: Misol: 3/4 ÷ 2/5 bo'linmasini hisoblaymiz.",
            ru: "Шаг 1: Пример: 3/4 ÷ 2/5.",
            en: "Step 1: Calculate 3/4 ÷ 2/5."
          },
          math: "3/4 ÷ 2/5"
        },
        {
          step: {
            uz: "2-qadam: Ikkinchi kasr (2/5) ning teskarisini topamiz: 5/2.",
            ru: "Шаг 2: Переворачиваем вторую дробь (2/5): 5/2.",
            en: "Step 2: Flip the second fraction (2/5): 5/2."
          },
          math: "2/5 ➔ 5/2"
        },
        {
          step: {
            uz: "3-qadam: Bo'lishni ko'paytirishga almashtiramiz: 3/4 × 5/2 = (3 × 5) / (4 × 2) = 15/8.",
            ru: "Шаг 3: Умножаем: 3/4 × 5/2 = 15/8.",
            en: "Step 3: Multiply: 3/4 × 5/2 = 15/8."
          },
          math: "15/8"
        },
        {
          step: {
            uz: "4-qadam: Noto'g'ri kasrdan butun qismini ajratamiz: 15/8 = 1 butun 7/8!",
            ru: "Шаг 4: Выделяем целую часть: 15/8 = 1 целая 7/8!",
            en: "Step 4: Extract whole part: 15/8 = 1 7/8!"
          },
          math: "1 7/8"
        }
      ],
      quizzes: [
        {
          q: { uz: "2/3 kasrining teskari (ag'darilgan) shakli qanday?", ru: "Какая обратная дробь для 2/3?", en: "What is the reciprocal of 2/3?" },
          options: ["3/2", "2/3", "-2/3", "1/3"],
          ans: "3/2"
        },
        {
          q: { uz: "1/2 ÷ 1/2 bo'linmasi nechaga teng?", ru: "Чему равно 1/2 ÷ 1/2?", en: "What is 1/2 ÷ 1/2?" },
          options: ["1", "1/4", "2", "0"],
          ans: "1"
        },
        {
          q: { uz: "3/4 ÷ 3 amalini yechishda 3 qanday ag'dariladi?", ru: "Как переворачивается число 3 при делении 3/4 ÷ 3?", en: "How is 3 inverted when calculating 3/4 ÷ 3?" },
          options: ["1/3", "3/1", "0/3", "3"],
          ans: "1/3"
        }
      ]
    }
  ];

  const currentLesson = lessonsData[currentLessonIdx];
  const isLessonCompleted = user.completedLessons.includes(currentLesson.id);

  const handleQuizSelect = (qIdx: number, selectedOpt: string) => {
    SoundPlayer.playClick(soundEnabled);
    setQuizAnswers(prev => ({ ...prev, [qIdx]: selectedOpt }));

    const isCorrect = selectedOpt === currentLesson.quizzes[qIdx].ans;
    setQuizFeedback(prev => ({ ...prev, [qIdx]: isCorrect }));

    if (isCorrect) {
      SoundPlayer.playCorrect(soundEnabled);
    } else {
      SoundPlayer.playWrong(soundEnabled);
    }

    // Check if all 3 questions answered correctly
    const updatedFeedback = { ...quizFeedback, [qIdx]: isCorrect };
    const allAnswered = currentLesson.quizzes.every((_, idx) => updatedFeedback[idx] === true);
    if (allAnswered && !isLessonCompleted) {
      completeLesson(currentLesson.id);
    }
  };

  return (
    <div className="space-y-8 animate-pop">
      {/* Lesson Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {lessonsData.map((l, idx) => {
          const isActive = idx === currentLessonIdx;
          const isDone = user.completedLessons.includes(l.id);
          return (
            <button
              key={l.id}
              onClick={() => {
                SoundPlayer.playClick(soundEnabled);
                setCurrentLessonIdx(idx);
                setWalkthroughStep(0);
                setQuizAnswers({});
                setQuizFeedback({});
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{idx + 1}-dars</span>
              {isDone && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Lesson Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-8">
        {/* Lesson Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full">
                {currentLessonIdx + 1}-mavzu
              </span>
              {isLessonCompleted && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Bajarildi
                </span>
              )}
            </div>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {currentLesson.title[lang]}
            </h2>
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">
              {currentLesson.subtitle[lang]}
            </p>
          </div>

          <Mascot
            mood="teaching"
            size="sm"
            message="Diqqat bilan o'qi, bu juda qiziq!"
            soundEnabled={soundEnabled}
          />
        </div>

        {/* Lesson Intro Explanation */}
        <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-slate-700/50 border border-amber-200 dark:border-slate-600">
          <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {currentLesson.intro[lang]}
          </p>
        </div>

        {/* Interactive Visualizer Playground */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50/60 via-amber-50/60 to-yellow-50/60 dark:from-slate-800/90 dark:to-slate-900 border-2 border-dashed border-amber-300 dark:border-amber-600/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="font-fredoka text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span>🍕 Interaktiv Kasr Laboratoriyasi</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Slayderlarni surib, butun va bo'laklar qanday o'zgarishini o'z ko'zing bilan ko'r!
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setVisType('pizza')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  visType === 'pizza'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🍕 Pitsa
              </button>
              <button
                onClick={() => setVisType('chocolate')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  visType === 'chocolate'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🍫 Shokolad
              </button>
            </div>
          </div>

          {/* Visual Display */}
          <div className="flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-slate-800/70 rounded-2xl backdrop-blur-sm border border-amber-200/50">
            <FractionVisualizer
              whole={sliderWhole}
              num={sliderNum}
              den={sliderDen}
              type={visType}
              size={130}
            />

            <div className="mt-4 flex items-center gap-4 bg-amber-100/70 dark:bg-slate-700 px-5 py-2.5 rounded-2xl">
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Aralash kasr</span>
                <FractionDisplay
                  fraction={{ whole: sliderWhole, num: sliderNum, den: sliderDen }}
                  size="md"
                />
              </div>

              <span className="text-xl font-black text-slate-400">=</span>

              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Noto'g'ri kasr</span>
                <FractionDisplay
                  fraction={{ whole: 0, num: sliderWhole * sliderDen + sliderNum, den: sliderDen }}
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Butun pitsalar soni:</span>
                <span className="text-amber-600 font-extrabold">{sliderWhole} ta</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                value={sliderWhole}
                onChange={(e) => setSliderWhole(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Bo'laklar (Surat):</span>
                <span className="text-indigo-600 font-extrabold">{sliderNum} ta</span>
              </div>
              <input
                type="range"
                min="1"
                max={sliderDen - 1}
                value={sliderNum}
                onChange={(e) => setSliderNum(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Bo'lingan qismlar (Maxraj):</span>
                <span className="text-rose-600 font-extrabold">{sliderDen} ta</span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={sliderDen}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSliderDen(val);
                  if (sliderNum >= val) setSliderNum(val - 1);
                }}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* "Misolni birga yechamiz" (Solve Together) Step-by-Step */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-fredoka text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>✍️ Misolni birga yechamiz!</span>
            </h3>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
              Qadam {walkthroughStep + 1} / {currentLesson.walkthrough.length}
            </span>
          </div>

          <div className="space-y-3">
            {currentLesson.walkthrough.slice(0, walkthroughStep + 1).map((w, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 animate-pop"
              >
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {w.step[lang]}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono font-black text-base">
                  {w.math}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {walkthroughStep > 0 && (
              <button
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setWalkthroughStep(prev => Math.max(0, prev - 1));
                }}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                Orqaga
              </button>
            )}

            {walkthroughStep < currentLesson.walkthrough.length - 1 ? (
              <button
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setWalkthroughStep(prev => prev + 1);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md flex items-center gap-2 transition cursor-pointer"
              >
                <span>Keyingi qadam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  SoundPlayer.playClick(soundEnabled);
                  setWalkthroughStep(0);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytadan ko'rish</span>
              </button>
            )}
          </div>
        </div>

        {/* 2 Rules Boxes: "Eslab qol!" & "Ko'p uchraydigan xato" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Remember Box */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700/60 flex items-start gap-3">
            <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-sm">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-fredoka text-base font-bold text-emerald-900 dark:text-emerald-300">
                {t('ruleRemember')}
              </h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed font-semibold">
                {currentLesson.rule[lang]}
              </p>
            </div>
          </div>

          {/* Common Mistake Box */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-700/60 flex items-start gap-3">
            <div className="p-2 bg-rose-500 text-white rounded-xl shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-fredoka text-base font-bold text-rose-900 dark:text-rose-300">
                {t('commonMistake')}
              </h4>
              <p className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed font-semibold">
                {currentLesson.mistake[lang]}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Check Quiz Section (3 questions) */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-700/40 border-2 border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-fredoka text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚡ Tezkor Tekshiruv (3 ta savol)</span>
            </h3>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Darsni muvaffaqiyatli yakunlash uchun to'g'ri javob ber!
            </span>
          </div>

          <div className="space-y-5">
            {currentLesson.quizzes.map((quiz, qIdx) => {
              const selected = quizAnswers[qIdx];
              const isCorrect = quizFeedback[qIdx];

              return (
                <div key={qIdx} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {qIdx + 1}. {quiz.q[lang]}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quiz.options.map((opt) => {
                      const isChosen = selected === opt;
                      let btnClass = "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-amber-100 dark:hover:bg-slate-600";
                      if (isChosen) {
                        btnClass = isCorrect
                          ? "bg-emerald-500 text-white ring-2 ring-emerald-300 font-black"
                          : "bg-rose-500 text-white ring-2 ring-rose-300 font-black animate-shake";
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleQuizSelect(qIdx, opt)}
                          className={`p-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-center ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {selected && (
                    <div className="text-xs font-bold pt-1">
                      {isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Barakalla! To'g'ri topding!
                        </span>
                      ) : (
                        <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Qaytadan o'ylab ko'r! To'g'ri javob: {quiz.ans}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation: Next / Prev lesson buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setCurrentLessonIdx(prev => Math.max(0, prev - 1));
              setWalkthroughStep(0);
              setQuizAnswers({});
              setQuizFeedback({});
            }}
            disabled={currentLessonIdx === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
              currentLessonIdx === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Oldingi dars</span>
          </button>

          <button
            onClick={() => {
              SoundPlayer.playClick(soundEnabled);
              setCurrentLessonIdx(prev => Math.min(lessonsData.length - 1, prev + 1));
              setWalkthroughStep(0);
              setQuizAnswers({});
              setQuizFeedback({});
            }}
            disabled={currentLessonIdx === lessonsData.length - 1}
            className={`px-6 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition cursor-pointer ${
              currentLessonIdx === lessonsData.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
            }`}
          >
            <span>Keyingi dars</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
