import { Language } from '../types';

export interface DetectiveCase {
  id: string;
  problem: string;
  correctSolution: string;
  steps: {
    stepNum: number;
    text: Record<Language, string>;
    math: string;
    isFlawed: boolean;
    flawExplanation: Record<Language, string>;
  }[];
}

export const detectiveCases: DetectiveCase[] = [
  {
    id: "det-1",
    problem: "1/2 + 1/3 = ?",
    correctSolution: "5/6",
    steps: [
      {
        stepNum: 1,
        text: {
          uz: "1-qadam: Kasrlarning suratlari va maxrajlariga qaraymiz.",
          ru: "Шаг 1: Смотрим на числители и знаменатели дробей.",
          en: "Step 1: Inspect numerators and denominators."
        },
        math: "1/2 + 1/3",
        isFlawed: false,
        flawExplanation: { uz: "", ru: "", en: "" }
      },
      {
        stepNum: 2,
        text: {
          uz: "2-qadam: Suratlarni suratga, maxrajlarni esa maxrajga qo'shamiz: (1+1)/(2+3).",
          ru: "Шаг 2: Складываем числители и знаменатели вместе: (1+1)/(2+3).",
          en: "Step 2: Add numerators together and denominators together: (1+1)/(2+3)."
        },
        math: "(1 + 1) / (2 + 3) = 2/5",
        isFlawed: true,
        flawExplanation: {
          uz: "Xato shu yerda! Maxrajlarni hech qachon shunchaki qo'shib bo'lmaydi! Avval umumiy maxraj (6) topish kerak edi!",
          ru: "Ошибка здесь! Знаменатели нельзя просто складывать! Сначала нужно было найти общий знаменатель 6!",
          en: "Error spotted! You can never add denominators together! You must find common denominator 6 first!"
        }
      },
      {
        stepNum: 3,
        text: {
          uz: "3-qadam: Javobni yozamiz: 2/5.",
          ru: "Шаг 3: Записываем ответ: 2/5.",
          en: "Step 3: Write down answer: 2/5."
        },
        math: "= 2/5",
        isFlawed: false,
        flawExplanation: { uz: "", ru: "", en: "" }
      }
    ]
  },
  {
    id: "det-2",
    problem: "2 1/4 - 1 3/4 = ?",
    correctSolution: "1/2 (yoki 2/4)",
    steps: [
      {
        stepNum: 1,
        text: {
          uz: "1-qadam: Butun qismlarni ayiramiz: 2 - 1 = 1.",
          ru: "Шаг 1: Вычитаем целые части: 2 - 1 = 1.",
          en: "Step 1: Subtract whole parts: 2 - 1 = 1."
        },
        math: "2 - 1 = 1",
        isFlawed: false,
        flawExplanation: { uz: "", ru: "", en: "" }
      },
      {
        stepNum: 2,
        text: {
          uz: "2-qadam: 1/4 dan 3/4 ni ayirib bo'lmagani uchun, kattasidan kichigini ayiramiz: 3/4 - 1/4 = 2/4.",
          ru: "Шаг 2: Так как из 1/4 нельзя вычесть 3/4, вычтем наоборот: 3/4 - 1/4 = 2/4.",
          en: "Step 2: Since 1/4 < 3/4, subtract backwards: 3/4 - 1/4 = 2/4."
        },
        math: "3/4 - 1/4 = 2/4",
        isFlawed: true,
        flawExplanation: {
          uz: "Xato! Matematikada kamayuvchi va ayriluvchini teskari qilib bo'lmaydi! 2 butundan 1 qarz olib 1 5/4 qilish kerak edi!",
          ru: "Ошибка! Нельзя менять местами уменьшаемое и вычитаемое! Нужно было занять 1 у целой части!",
          en: "Error! You cannot reverse the order of subtraction! You had to borrow 1 from the whole number!"
        }
      },
      {
        stepNum: 3,
        text: {
          uz: "3-qadam: Natija: 1 2/4 = 1 1/2 deb yozildi.",
          ru: "Шаг 3: Получили ответ: 1 2/4 = 1 1/2.",
          en: "Step 3: Concluded answer: 1 2/4 = 1 1/2."
        },
        math: "= 1 1/2",
        isFlawed: false,
        flawExplanation: { uz: "", ru: "", en: "" }
      }
    ]
  },
  {
    id: "det-3",
    problem: "3/4 ÷ 2/3 = ?",
    correctSolution: "9/8 = 1 1/8",
    steps: [
      {
        stepNum: 1,
        text: {
          uz: "1-qadam: Bo'lish amalini ko'rishimiz bilan har ikkala kasrni ham teskari ag'daramiz.",
          ru: "Шаг 1: При делении переворачиваем обе дроби.",
          en: "Step 1: Invert both fractions for division."
        },
        math: "4/3 × 3/2",
        isFlawed: true,
        flawExplanation: {
          uz: "Katta xato! Faqat IKКINCHI kasr (bo'luvchi) ag'dariladi! Birinchi kasr 3/4 o'zgarishsiz qolishi shart edi!",
          ru: "Ошибка! Переворачивается ТОЛЬКО вторая дробь! Первая должна была остаться 3/4!",
          en: "Error! ONLY the second fraction is flipped! The first fraction must remain 3/4!"
        }
      },
      {
        stepNum: 2,
        text: {
          uz: "2-qadam: Ko'paytiramiz: 4×3 / 3×2 = 12/6.",
          ru: "Шаг 2: Перемножаем: 4×3 / 3×2 = 12/6.",
          en: "Step 2: Multiply: 4×3 / 3×2 = 12/6."
        },
        math: "12 / 6 = 2",
        isFlawed: false,
        flawExplanation: { uz: "", ru: "", en: "" }
      }
    ]
  }
];
