import { Language } from '../types';

export interface CaseStudy {
  id: string;
  icon: string;
  topic: string;
  title: Record<Language, string>;
  story: Record<Language, string>;
  given: Record<Language, string[]>;
  question: Record<Language, string>;
  operationType: '-' | '+' | '*' | '/';
  expression: string;
  correctAnswer: string;
  solutionSteps: Record<Language, string[]>;
  checkNote: Record<Language, string>;
  reflectionPrompt: Record<Language, string>;
  reflectionAnswer: Record<Language, string>;
}

export const realLifeCases: CaseStudy[] = [
  {
    id: "case-kitchen",
    icon: "🥧",
    topic: "mixed-subtraction",
    title: {
      uz: "Oshxona keysi: Mazali pirog uchun un",
      ru: "Кулинарный кейс: Мука для вкусного пирога",
      en: "Kitchen Case: Flour for a Delicious Pie"
    },
    story: {
      uz: "Madina onasiga olma pirog tayyorlashda yordam bermoqda. Retsept bo'yicha jami 2 1/2 stakan un kerak. Idishda esa atigi 3/4 stakan un qolgan ekan. Pirog uchun yana qancha un kerak?",
      ru: "Мадина помогает маме печь яблочный пирог. По рецепту требуется 2 1/2 стакана муки. Но на полке нашлось только 3/4 стакана. Сколько муки ещё не хватает?",
      en: "Madina is helping her mother bake an apple pie. The recipe requires 2 1/2 cups of flour. However, there is only 3/4 cup of flour in the jar. How much more flour is needed?"
    },
    given: {
      uz: [
        "Retseptga kerak: 2 1/2 stakan un",
        "Mavjud un miqdori: 3/4 stakan",
        "Topish kerak: Yetishmayotgan un miqdori"
      ],
      ru: [
        "Нужно по рецепту: 2 1/2 стакана",
        "В наличии: 3/4 стакана",
        "Найти: Сколько муки не хватает"
      ],
      en: [
        "Recipe requires: 2 1/2 cups",
        "Currently available: 3/4 cup",
        "To find: How much flour is missing"
      ]
    },
    question: {
      uz: "Yetishmayotgan un miqdorini hisoblang (2 1/2 - 3/4):",
      ru: "Вычислите недостающее количество муки (2 1/2 - 3/4):",
      en: "Calculate the missing amount of flour (2 1/2 - 3/4):"
    },
    operationType: '-',
    expression: "2 1/2 - 3/4",
    correctAnswer: "1 3/4",
    solutionSteps: {
      uz: [
        "1. Maxrajlarni umumiy maxrajga (4) keltiramiz: 2 1/2 = 2 2/4 bo'ladi.",
        "2. Suratlarni qaraymiz: 2 dan 3 ni ayirib bo'lmaydi! Demak, 1 ta butundan 'qarz' olamiz: 2 2/4 = 1 + 1 2/4 = 1 + 6/4 = 1 6/4.",
        "3. Endi ayiramiz: 1 6/4 - 3/4 = 1 butun (6 - 3)/4 = 1 3/4 stakan!"
      ],
      ru: [
        "1. Приводим к общему знаменателю (4): 2 1/2 = 2 2/4.",
        "2. В числителе 2 < 3, вычесть нельзя. Занимаем 1 у целой части: 2 2/4 = 1 6/4.",
        "3. Вычитаем: 1 6/4 - 3/4 = 1 целая (6 - 3)/4 = 1 3/4 стакана!"
      ],
      en: [
        "1. Convert to common denominator (4): 2 1/2 = 2 2/4.",
        "2. 2 is smaller than 3, so we borrow 1 from the whole number: 2 2/4 = 1 6/4.",
        "3. Subtract: 1 6/4 - 3/4 = 1 (6 - 3)/4 = 1 3/4 cups!"
      ]
    },
    checkNote: {
      uz: "Tekshirish: Bor bo'lgan 3/4 stakanga topilgan 1 3/4 ni qo'shamiz: 3/4 + 1 3/4 = 1 4/4 = 2 1/2 stakan. Javob to'g'ri!",
      ru: "Проверка: К имеющимся 3/4 прибавим найденные 1 3/4: 3/4 + 1 3/4 = 1 4/4 = 2 1/2 стакана. Всё сходится!",
      en: "Verification: Add the remaining 3/4 cup with the calculated 1 3/4: 3/4 + 1 3/4 = 1 4/4 = 2 1/2 cups. Spot on!"
    },
    reflectionPrompt: {
      uz: "Ushbu keysdan hayot uchun qanday xulosa chiqarding?",
      ru: "Какой жизненный вывод ты сделал из этого кейса?",
      en: "What takeaway did you gain from this real scenario?"
    },
    reflectionAnswer: {
      uz: "Oshxonada taom tayyorlashda kasrlarni to'g'ri ayirish va butundan qarz olish aniq retseptga rioya qilishda juda muhim!",
      ru: "На кухне при выпечке точное вычитание дробей и навык заёма помогают строго следовать рецепту!",
      en: "In baking, precise fraction subtraction and borrowing ensure ingredients match the recipe perfectly!"
    }
  },

  {
    id: "case-garden",
    icon: "🌹",
    topic: "fraction-multiplication",
    title: {
      uz: "Bog'dorchilik keysi: Atirgullar maydoni",
      ru: "Садоводческий кейс: Площадь алых роз",
      en: "Garden Case: The Rose Garden Patch"
    },
    story: {
      uz: "Maktab hovlisidagi bog'ning 3/4 qismiga gullar ekilgan. Shu gulzorning 2/3 qismini esa xushbo'y atirgullar egallagan. Atirgullar butun bog' maydonining qancha qismini tashkil qiladi?",
      ru: "В школьном дворе 3/4 площади сада отвели под клумбы. При этом 2/3 всей площади клумб занимают розы. Какую часть площади всего сада занимают розы?",
      en: "In a school yard, 3/4 of the entire garden is planted with flowering plants. Roses occupy 2/3 of this flower section. What fraction of the entire garden is occupied by roses?"
    },
    given: {
      uz: [
        "Gulzor maydoni: butun bog'ning 3/4 qismi",
        "Atirgullar: gulzorning 2/3 qismi",
        "Topish kerak: 3/4 ning 2/3 qismi qancha bo'ladi?"
      ],
      ru: [
        "Площадь цветов: 3/4 всего сада",
        "Розы: 2/3 цветочной зоны",
        "Найти: Сколько составляет 2/3 от 3/4 всего сада?"
      ],
      en: [
        "Flower garden patch: 3/4 of entire garden",
        "Roses: 2/3 of the flower patch",
        "To find: What is 2/3 of 3/4?"
      ]
    },
    question: {
      uz: "Kasrlarni ko'paytiring (3/4 × 2/3):",
      ru: "Перемножьте дроби (3/4 × 2/3):",
      en: "Multiply the fractions (3/4 × 2/3):"
    },
    operationType: '*',
    expression: "3/4 * 2/3",
    correctAnswer: "1/2",
    solutionSteps: {
      uz: [
        "1. Biror narsaning 'ulushidan ulush' topish — bu ko'paytirish demakdir: 3/4 × 2/3.",
        "2. Suratni suratga, maxrajni maxrajga ko'paytiramiz: (3 × 2) / (4 × 3) = 6/12.",
        "3. Hosil bo'lgan kasrni 6 ga qisqartiramiz: 6/12 = 1/2! Demak, atirgullar butun bog'ning yarmini (1/2 qismini) tashkil qiladi."
      ],
      ru: [
        "1. Найти 'дробь от дроби' — это умножение: 3/4 × 2/3.",
        "2. Числитель на числитель, знаменатель на знаменатель: (3 × 2) / (4 × 3) = 6/12.",
        "3. Сокращаем на 6: 6/12 = 1/2! Розы занимают ровно половину сада."
      ],
      en: [
        "1. Finding a 'fraction of a fraction' means multiplication: 3/4 × 2/3.",
        "2. Multiply numerators and denominators: (3 × 2) / (4 × 3) = 6/12.",
        "3. Simplify by 6: 6/12 = 1/2! Roses occupy exactly half of the total garden."
      ]
    },
    checkNote: {
      uz: "Tekshirish: Ko'paytirishdan oldin 3 larni qisqartirsak: 2/4 = 1/2 qoladi. Javob to'liq to'g'ri!",
      ru: "Проверка: Если сократить тройки до умножения: остаётся 2/4 = 1/2. Всё верно!",
      en: "Verification: Cancelling out 3s prior to multiplication gives 2/4 = 1/2. Perfectly confirmed!"
    },
    reflectionPrompt: {
      uz: "Nega bu yerda qo'shish emas, aynan ko'paytirish ishlatildi?",
      ru: "Почему здесь нужно было умножать, а не складывать?",
      en: "Why do we multiply fractions when finding a part of a part?"
    },
    reflectionAnswer: {
      uz: "Chunki biz butun bog'dan emas, balki gulzorning (3/4 ning) 2/3 bo'lagini topdik. Ulushning ulushi har doim ko'paytiriladi!",
      ru: "Потому что мы брали долю не от целого, а от другой доли (2/3 от 3/4). Доля от доли всегда находится умножением!",
      en: "Because we were finding a portion of another portion (2/3 of 3/4). Part of a part is always calculated by multiplying!"
    }
  },

  {
    id: "case-chocolate",
    icon: "🍫",
    topic: "fraction-division",
    title: {
      uz: "Shirinlik keysi: Do'stona shokolad ulashish",
      ru: "Шоколадный кейс: Дружеское угощение",
      en: "Chocolate Case: Fair Sweet Sharing"
    },
    story: {
      uz: "Akmalda katta shokoladning 3/4 qismi bor edi. U bu shokoladni o'zi va 2 nafar do'stiga (jami 3 bolaga) teng bo'lib berishga qaror qildi. Har bir bolaga shokoladning qancha qismi tegadi?",
      ru: "У Акмаля было 3/4 большой плитки шоколада. Он решил поровну разделить её между собой и двумя друзьями (всего 3 человека). Какая часть достанется каждому?",
      en: "Akmal had 3/4 of a giant chocolate bar. He decided to split it equally among himself and 2 best friends (3 kids in total). What fraction does each friend receive?"
    },
    given: {
      uz: [
        "Mavjud shokolad: 3/4 qism",
        "Bolalar soni: 3 nafar",
        "Topish kerak: 3/4 bo'lingan 3"
      ],
      ru: [
        "Шоколада: 3/4 плитки",
        "Детей: 3 человека",
        "Найти: 3/4 разделить на 3"
      ],
      en: [
        "Available chocolate: 3/4 of a bar",
        "Total children: 3 kids",
        "To find: 3/4 divided by 3"
      ]
    },
    question: {
      uz: "Kasrni butun songa bo'ling (3/4 ÷ 3):",
      ru: "Разделите дробь на целое число (3/4 ÷ 3):",
      en: "Divide fraction by whole number (3/4 ÷ 3):"
    },
    operationType: '/',
    expression: "3/4 / 3",
    correctAnswer: "1/4",
    solutionSteps: {
      uz: [
        "1. Butun son 3 ni 3/1 ko'rinishida yozamiz: 3/4 ÷ 3/1.",
        "2. 'Ag'dar va ko'paytir' qoidasini qo'llaymiz: 3/1 ning teskarisi 1/3 dir. 3/4 × 1/3 bo'ladi.",
        "3. Suratlarni va maxrajlarni ko'paytiramiz: (3 × 1) / (4 × 3) = 3/12. Qisqartiramiz: 3/12 = 1/4!",
        "4. Har bir bolaga shokoladning 1/4 qismi tegadi."
      ],
      ru: [
        "1. Запишем 3 как 3/1: 3/4 ÷ 3/1.",
        "2. Правило «Переверни и умножь»: взаимно обратная дробь для 3/1 — это 1/3. Получаем 3/4 × 1/3.",
        "3. Перемножаем: (3 × 1) / (4 × 3) = 3/12. Сокращаем на 3: 1/4!",
        "4. Каждому достанется ровно 1/4 часть шоколада."
      ],
      en: [
        "1. Represent 3 as 3/1: 3/4 ÷ 3/1.",
        "2. Flip and multiply: reciprocal of 3/1 is 1/3. We get 3/4 × 1/3.",
        "3. Multiply: (3 × 1) / (4 × 3) = 3/12. Simplify: 1/4!",
        "4. Each child receives 1/4 of the chocolate bar."
      ]
    },
    checkNote: {
      uz: "Tekshirish: 1/4 + 1/4 + 1/4 = 3/4. Do'stlar shokoladni to'liq va adolatli bo'lishib olishdi!",
      ru: "Проверка: 1/4 + 1/4 + 1/4 = 3/4. Шоколад разделён абсолютно честно!",
      en: "Verification: 1/4 + 1/4 + 1/4 = 3/4. Fairly and accurately divided!"
    },
    reflectionPrompt: {
      uz: "Bo'lish amalida teskari kasr nima uchun kerak bo'ladi?",
      ru: "Зачем нужно переворачивать вторую дробь при делении?",
      en: "Why is the reciprocal fraction essential in fraction division?"
    },
    reflectionAnswer: {
      uz: "Chunki biror songa bo'lish — bu uning teskarisiga ko'paytirish bilan bir xil ma'noni anglatadi!",
      ru: "Потому что деление на число равносильно умножению на его обратную величину!",
      en: "Because dividing by a quantity is identical to multiplying by its reciprocal fraction!"
    }
  },

  {
    id: "case-sports",
    icon: "🏃",
    topic: "mixed-addition",
    title: {
      uz: "Sport keysi: Marafonchi yugurish masofasi",
      ru: "Спортивный кейс: Дистанция бегуна",
      en: "Sports Case: Runner's Daily Distance"
    },
    story: {
      uz: "Jasur sport musobaqasiga tayyorlanmoqda. U ertalab 1 3/4 km, kechqurun esa 2 1/2 km yugurdi. Jasur bir kunda jami necha kilometr yugurdi?",
      ru: "Жасур готовится к школьному легкоатлетическому забегу. Утром он пробежал 1 3/4 км, а вечером 2 1/2 км. Какую общую дистанцию преодолел Жасур за день?",
      en: "Jasur is training for a cross-country race. In the morning he jogged 1 3/4 km, and in the evening he ran 2 1/2 km. What total distance did Jasur run today?"
    },
    given: {
      uz: [
        "Ertalabki masofa: 1 3/4 km",
        "Kechki masofa: 2 1/2 km",
        "Topish kerak: Jami masofa (yig'indi)"
      ],
      ru: [
        "Утренняя дистанция: 1 3/4 км",
        "Вечерняя дистанция: 2 1/2 км",
        "Найти: Общее расстояние"
      ],
      en: [
        "Morning run: 1 3/4 km",
        "Evening run: 2 1/2 km",
        "To find: Total distance run"
      ]
    },
    question: {
      uz: "Aralash kasrlarni qo'shing (1 3/4 + 2 1/2):",
      ru: "Сложите смешанные дроби (1 3/4 + 2 1/2):",
      en: "Add the mixed numbers (1 3/4 + 2 1/2):"
    },
    operationType: '+',
    expression: "1 3/4 + 2 1/2",
    correctAnswer: "4 1/4",
    solutionSteps: {
      uz: [
        "1. Maxrajlarni umumiy maxrajga (4) keltiramiz: 2 1/2 = 2 2/4.",
        "2. Butun qismlarni alohida qo'shamiz: 1 + 2 = 3.",
        "3. Kasr qismlarni qo'shamiz: 3/4 + 2/4 = 5/4.",
        "4. 5/4 noto'g'ri kasr, undan 1 butunni ajratamiz: 5/4 = 1 1/4.",
        "5. Butunlarga qo'shamiz: 3 + 1 1/4 = 4 1/4 km!"
      ],
      ru: [
        "1. Приводим к общему знаменателю (4): 2 1/2 = 2 2/4.",
        "2. Складываем целые части: 1 + 2 = 3.",
        "3. Складываем дробные части: 3/4 + 2/4 = 5/4.",
        "4. 5/4 — неправильная дробь, выделяем целую часть: 5/4 = 1 1/4.",
        "5. Итог: 3 + 1 1/4 = 4 1/4 км!"
      ],
      en: [
        "1. Common denominator (4): 2 1/2 = 2 2/4.",
        "2. Add whole parts: 1 + 2 = 3.",
        "3. Add fractions: 3/4 + 2/4 = 5/4.",
        "4. 5/4 is improper, extract whole number: 5/4 = 1 1/4.",
        "5. Combine: 3 + 1 1/4 = 4 1/4 km!"
      ]
    },
    checkNote: {
      uz: "Tekshirish: 4 1/4 km dan kechki 2 1/2 (2 2/4) km ni ayirsak: 4 1/4 - 2 2/4 = 3 5/4 - 2 2/4 = 1 3/4 km. Barchasi to'g'ri!",
      ru: "Проверка: 4 1/4 - 2 2/4 = 3 5/4 - 2 2/4 = 1 3/4 км. Решение абсолютно верно!",
      en: "Verification: 4 1/4 - 2 2/4 = 3 5/4 - 2 2/4 = 1 3/4 km. Verified!"
    },
    reflectionPrompt: {
      uz: "Kasr qo'shganda natijada noto'g'ri kasr chiqsa nima qilish kerak?",
      ru: "Что делать, если сумма дробных частей получилась неправильной дробью?",
      en: "What should you do when the fractional sum yields an improper fraction?"
    },
    reflectionAnswer: {
      uz: "Albatta butun qismini ajratib, umumiy butunlar soniga qo'shib qo'yish kerak!",
      ru: "Обязательно выделить целую часть и прибавить её к сумме целых!",
      en: "Extract the whole number part and add it to the sum of whole numbers!"
    }
  },

  {
    id: "case-construction",
    icon: "🪵",
    topic: "mixed-operations",
    title: {
      uz: "Qurilish keysi: Ustaning taxta bo'lagi",
      ru: "Строительный кейс: Доска мастера",
      en: "Craftsman Case: Cutting Timber Boards"
    },
    story: {
      uz: "Usta Rustam amaki uzunligi 4 1/2 metr bo'lgan yog'och taxtani oldi. U kitob javoni uchun 1 3/4 metr, stul oyog'i uchun esa 1 1/4 metr kesib oldi. Taxtadan qancha qism ortib qoldi?",
      ru: "Мастер Рустам взял доску длиной 4 1/2 метра. Для книжной полки он отпилил 1 3/4 метра, а для ножки стула — 1 1/4 метра. Сколько метров доски осталось?",
      en: "Master Rustam had a wooden board 4 1/2 meters long. He cut off 1 3/4 meters for a bookshelf and 1 1/4 meters for a stool leg. How many meters of timber remain?"
    },
    given: {
      uz: [
        "Boshlang'ich taxta uzunligi: 4 1/2 metr",
        "Kesib olingan bo'laklar: 1 3/4 metr va 1 1/4 metr",
        "Topish kerak: Qolgan taxta uzunligi"
      ],
      ru: [
        "Начальная длина: 4 1/2 метра",
        "Отрезанные части: 1 3/4 м и 1 1/4 м",
        "Найти: Оставшуюся длину"
      ],
      en: [
        "Initial board length: 4 1/2 meters",
        "Cut pieces: 1 3/4 meters and 1 1/4 meters",
        "To find: Remaining timber length"
      ]
    },
    question: {
      uz: "Qolgan qismini toping: 4 1/2 - (1 3/4 + 1 1/4):",
      ru: "Найдите остаток: 4 1/2 - (1 3/4 + 1 1/4):",
      en: "Find remaining length: 4 1/2 - (1 3/4 + 1 1/4):"
    },
    operationType: '-',
    expression: "4 1/2 - (1 3/4 + 1 1/4)",
    correctAnswer: "1 1/2",
    solutionSteps: {
      uz: [
        "1. Avval kesilgan jami uzunlikni qo'shamiz: 1 3/4 + 1 1/4 = (1 + 1) + (3/4 + 1/4) = 2 + 4/4 = 3 metr kesilgan.",
        "2. Boshlang'ich uzunlikdan kesilganini ayiramiz: 4 1/2 - 3 = 1 1/2 metr.",
        "3. Javob: Ustada yana 1 1/2 metr taxta qoldi!"
      ],
      ru: [
        "1. Сначала суммируем длину отрезанных частей: 1 3/4 + 1 1/4 = 2 + 4/4 = 3 метра.",
        "2. Вычитаем из общей длины: 4 1/2 - 3 = 1 1/2 метра.",
        "3. Ответ: Осталось 1 1/2 метра доски!"
      ],
      en: [
        "1. Sum up the used timber: 1 3/4 + 1 1/4 = 2 + 4/4 = 3 meters.",
        "2. Subtract from total length: 4 1/2 - 3 = 1 1/2 meters.",
        "3. Answer: Exactly 1 1/2 meters remain!"
      ]
    },
    checkNote: {
      uz: "Tekshirish: 1 1/2 + 3 = 4 1/2 metr. Boshlang'ich uzunlik hosil bo'ldi!",
      ru: "Проверка: 1 1/2 + 3 = 4 1/2 метра. Всё сходится точно!",
      en: "Verification: 1 1/2 + 3 = 4 1/2 meters. Matches original length!"
    },
    reflectionPrompt: {
      uz: "Bunday amallarda qavslar va qulay usul qanday yordam beradi?",
      ru: "Как скобки и группировка облегчают вычисления?",
      en: "How do grouping and parenthesis streamline real-life problem solving?"
    },
    reflectionAnswer: {
      uz: "Bir xil maxrajli bo'laklarni (1 3/4 va 1 1/4) birinchi qo'shib butun son olish hisoblashni juda osonlashtiradi!",
      ru: "Сложение частей с одинаковыми знаменателями даёт целое число 3, что делает вычитание мгновенным!",
      en: "Adding fractions with like denominators first yields whole integer 3, making final subtraction effortless!"
    }
  }
];
