export const translations = {
  uz: {
    // Navigation & header
    appName: "Kasrlar Olami",
    appTagline: "5-sinf matematika: Aralash va oddiy kasrlarni o'rganamiz!",
    navHome: "Bosh sahifa",
    navLessons: "Darslar",
    navPractice: "Mashq va Testlar",
    navGames: "O'yinlar",
    navCases: "Hayotiy Keyslar",
    navCalc: "Kasr Kalkulyatori",
    navGlossary: "Kasr Lug'ati",
    navProfile: "Natijalarim",

    // Mascot
    mascotName: "Kasrtoy",
    mascotHello: "Salom do'stim! Men Kasrtoyman. Bugun kasrlar sirlarini birgalikda o'rganamiz!",
    mascotEncourage: "Ajoyib ketyapsan! Har bir qadam seni haqiqiy matematik qiladi!",
    mascotMistake: "Xavotir olma! Xatolar — eng yaxshi o'qituvchidir. Qaytadan urinib ko'ramiz!",
    mascotVictory: "Barakalla! Sen kasrlar bo'yicha tengsizsan!",

    // Student profile & stats
    studentNamePlaceholder: "Ismingni kirit...",
    changeName: "O'zgartirish",
    starsCount: "Yulduzlar",
    xpPoints: "XP Ballar",
    currentLevel: "Daraja",
    streakDays: "Kunlik seriya",
    daysUnit: "kun",
    dailyChallenge: "Kunlik vazifa",
    dailyChallengeDesc: "Bugun kamida 5 ta misol yech va 50 XP ol!",
    dailyChallengeDone: "Bugungi vazifa bajarildi! Qoyil!",

    // 10 Levels
    levels: [
      "1. Yangi boshlovchi",
      "2. Pitsa qirquvchi",
      "3. Maxraj qidiruvchi",
      "4. Suratlar do'sti",
      "5. Kasr kashfiyotchisi",
      "6. Qarz oluvchi usta",
      "7. Ko'paytirish ustasi",
      "8. Bo'lish bo'roni",
      "9. Kasrlar professori",
      "10. Kasrlar qiroli"
    ],

    // Common Buttons & Labels
    start: "Boshlash",
    next: "Keyingi",
    prev: "Oldingi",
    check: "Tekshirish",
    hint: "Maslahat",
    solveTogether: "Birga yechamiz",
    reset: "Qaytadan",
    correct: "To'g'ri!",
    incorrect: "Xato bo'ldi!",
    explanation: "Tushuntirish:",
    ruleRemember: "Eslab qol!",
    commonMistake: "Ko'p uchraydigan xato!",
    score: "Ball",
    time: "Vaqt",
    finish: "Yakunlash",
    printReport: "Hisobotni chop etish",
    retry: "Qayta urinish",
    viewSteps: "Bosqichlarni ko'rish",

    // Section cards on home
    cardLessonsTitle: "Interaktiv Darslar",
    cardLessonsDesc: "5 ta asosiy mavzuni pitsa va shokoladlar orqali bosqichma-bosqich o'rgan!",
    cardPracticeTitle: "Mashq va Testlar",
    cardPracticeDesc: "3 ta qiyinlik darajasi, Blitz test va 20 savolli Yakuniy Imtihon!",
    cardGamesTitle: "Quvnoq O'yinlar",
    cardGamesDesc: "Pitsa ustaxonasi, Kasr poygasi, Xotira kartalari va Kasr detektivi!",
    cardCasesTitle: "Hayotiy Keyslar",
    cardCasesDesc: "Oshxona, bog'dorchilik, sport va qurilishdagi haqiqiy masalalar!",

    // Lessons View
    lessonsTitle: "5-sinf Kasrlar Bo'yicha Interaktiv Darslar",
    lessonList: [
      {
        id: "l1",
        title: "1-dars: Aralash kasr ⇄ Noto'g'ri kasr",
        subtitle: "Butun va bo'laklarni bir-biriga aylantirish siri",
        rule: "Aralash kasrni noto'g'ri kasrga aylantirish uchun: Butun qismni maxrajga ko'paytirib, suratni qo'shamiz! Suratga yozamiz, maxraj esa o'zgarmaydi: a b/c = (a×c + b)/c",
        mistake: "Maxrajni ham ko'paytirib yuborish! Esingda tut: bo'laklar soni (maxraj) o'zgarmaydi!",
      },
      {
        id: "l2",
        title: "2-dars: Aralash kasrlarni qo'shish",
        subtitle: "Butunlarni butunlarga, kasrlarni esa umumiy maxraj bilan qo'shamiz",
        rule: "Aralash kasrlarni qo'shishda: 1) Butun qismlarni o'zaro qo'shamiz; 2) Kasr qismlarining umumiy maxrajini topamiz va suratlarni qo'shamiz; 3) Agar hosil bo'lgan kasr noto'g'ri bo'lsa, butun qismini ajratamiz!",
        mistake: "Maxrajlarni bir-biriga shunchaki qo'shib qo'yish (masalan 1/2 + 1/3 = 2/5 deb yozish — bu katta xato!). Har doim umumiy maxraj topish shart!",
      },
      {
        id: "l3",
        title: "3-dars: Aralash kasrlarni ayirish (Qarz olish!)",
        subtitle: "Birinchi kasrning surati kichik bo'lganda nima qilamiz?",
        rule: "Agar birinchi kasrning surati ikkinchisinikidan kichik bo'lsa, butun qismdan 1 ta butun 'qarz' olamiz. Masalan: 3 butun 1/4 = 2 butun 5/4 bo'ladi (chunki 1 butun = 4/4)!",
        mistake: "Kichik suratdan katta suratni ayirib bo'lmaganda teskarisiga ayirish (masalan 1/4 dan 3/4 ni ayirish o'rniga 3/4 dan 1/4 ni ayirib qo'yish). Qarz olishni unutmang!",
      },
      {
        id: "l4",
        title: "4-dars: Kasrlarni ko'paytirish",
        subtitle: "Suratni suratga, maxrajni maxrajga ko'paytiramiz!",
        rule: "Oltin qoida: Surat suratga ko'payadi, maxraj maxrajga ko'payadi! Aralash kasr bo'lsa, avval uni ALBATTA noto'g'ri kasrga aylantirish shart!",
        mistake: "Aralash kasrlarni ko'paytirishda butunni butunga, kasrni kasrga ko'paytirib qo'yish (2 1/2 × 3 1/2 ≠ 6 1/4). Avval noto'g'ri kasrga aylantir!",
      },
      {
        id: "l5",
        title: "5-dars: Kasrlarni bo'lish (Ag'dar va ko'paytir!)",
        subtitle: "Teskari kasrga ko'paytirish sehrli usuli",
        rule: "Kasrni kasrga bo'lish uchun: Birinchi kasrni o'zgarishsiz qoldirib, ikkinchi kasrni to'ntaramiz (surat va maxrajining o'rnini almashtiramiz) va ularni ko'paytiramiz!",
        mistake: "Birinchi kasrni ham ag'darib yuborish yoki amallarni noto'g'ri bajarish. Faqat ikkinchi kasr (bo'luvchi) teskari ag'dariladi!",
      }
    ],

    // Practice
    practiceTitle: "Mashq va Testlar Markazi",
    practiceSubtitle: "Bilimingni mustahkamla, yulduzlar yig' va darajangni ko'tar!",
    difficultyEasy: "Oson",
    difficultyMedium: "O'rta",
    difficultyHard: "Qiyin",
    blitzMode: "⚡ Blitz Test (60 soniya)",
    finalExam: "🎓 Yakuniy Nazorat Testi (20 ta savol)",
    normalPractice: "Mavzuli Mashqlar",
    selectTopic: "Mavzuni tanla:",
    allTopics: "Barcha mavzular aralash",
    enterMixedPlaceholder: "Masalan: 2 1/4 yoki 3/5 yoki 4",
    submitAnswer: "Javobni tasdiqlash",
    hintUsedText: "Maslahatdan foydalanding (-1 yulduz)",
    blitzTimer: "Qolgan vaqt",
    examResultTitle: "Yakuniy Nazorat Natijasi",
    examGrade: "Baho",
    examAccuracy: "Aniqlik",
    strengthsTitle: "Kuchli tomonlaring:",
    weaknessesTitle: "Mashq qilish kerak bo'lgan tomonlar:",
    recommendationTitle: "O'qituvchi tavsiyasi:",

    // Games
    gamesTitle: "Matematik O'yinlar Parki",
    gamesSubtitle: "O'yna, zavqlan va kasrlarni ko'z ochib yumguncha hisobla!",
    gamePizzaTitle: "1. Pitsa Ustaxonasi",
    gamePizzaDesc: "Mijozning buyurtmasiga mos pitsalarni yig'!",
    gameBuilderTitle: "2. Kasr Quruvchi",
    gameBuilderDesc: "Noto'g'ri va aralash kasr qismlarini birlashtir!",
    gameMemoryTitle: "3. Xotira Kartalari",
    gameMemoryDesc: "Ekvivalent kasrlar va misol-yechim juftlarini top!",
    gameRaceTitle: "4. Kasr Poygasi",
    gameRaceDesc: "To'g'ri javob ber va marraga birinchi bo'lib yetib kel!",
    gameDetectiveTitle: "5. Kasr Detektivi",
    gameDetectiveDesc: "Misoldagi xato qadamni aniqla va detektiv nishonini ol!",
    comboText: "KOMBO",

    // Cases
    casesTitle: "Hayotiy Matematik Keyslar",
    casesSubtitle: "Matematika darslikdan tashqarida — haqiqiy hayotda qanday ishlaydi?",
    caseReadStep: "1. Masalani o'qish",
    casePlanStep: "2. Reja tuzish",
    caseSolveStep: "3. Yechish",
    caseCheckStep: "4. Tekshirish",
    caseReflectionStep: "5. Nima o'rganding?",

    // Calculator & Glossary
    calculatorTitle: "Interaktiv Kasr Kalkulyatori",
    calcSubtitle: "Faqat javobni emas, barcha yechim qadamlarini o'rgatadi!",
    calculateBtn: "Bosqichma-bosqich hisoblash",
    firstFraction: "1-kasr (masalan 2 1/3 yoki 5/6):",
    secondFraction: "2-kasr (masalan 1 1/2 yoki 3/4):",
    operationLabel: "Amal:",
    glossaryTitle: "Kasrlar Lug'ati",
    glossarySubtitle: "Matematik atamalar va ularning sodda izohi",

    // Profile & Report
    profileTitle: "Mening Yutuqlarim va Hisobot",
    printReportBtn: "Chop etish (Ota-ona / O'qituvchi uchun)",
    completedLessonsText: "Tugallangan darslar",
    badgesEarned: "Erishilgan nishonlar",
    recentAttempts: "So'nggi mashqlar tarixi",
    teacherSignature: "O'qituvchi imzosi: _____________",
    parentSignature: "Ota-ona imzosi: _____________",
    soundOn: "Ovoz yoniq",
    soundOff: "Ovoz o'chiq",
    darkMode: "Tungi rejim",
    lightMode: "Kunduzgi rejim",

    // Badges
    badgeFirstStep: "Birinchi qadam",
    badgeFirstStepDesc: "Birinchi mashqni muvaffaqiyatli yakunlading!",
    badgeLessonMaster: "Darslar ustasi",
    badgeLessonMasterDesc: "Barcha 5 ta interaktiv darsni tugatding!",
    badgeStreak3: "Olov seriya",
    badgeStreak3Desc: "Ketma-ket kunlar o'qishda davom etyapsan!",
    badgeBlitzChamp: "Blitz chempioni",
    badgeBlitzChampDesc: "60 soniyali Blitz testda ajoyib natija ko'rsatding!",
    badgePizzaChef: "Pitsa oshpazi",
    badgePizzaChefDesc: "Pitsa ustaxonasida 500 dan ortiq ball to'plading!",
    badgeDetective: "Kasr detektivi",
    badgeDetectiveDesc: "Misollardagi barcha yashirin xatolarni fosh qilding!",
    badgeSpeedRacer: "Tezkor poygachi",
    badgeSpeedRacerDesc: "Kasr poygasida marraga birinchi yetib kelding!",
    badgePerfect10: "10 ketma-ket to'g'ri",
    badgePerfect10Desc: "Ketma-ket 10 ta savolga xatosiz javob berding!",
    badgeExamHero: "Imtihon qahramoni",
    badgeExamHeroDesc: "Yakuniy nazorat testida 5 baho olding!",
    badgeFractionKing: "Kasrlar qiroli",
    badgeFractionKingDesc: "10-darajaga erishding va kasrlar qiroli bo'lding!"
  },

  ru: {
    // Navigation & header
    appName: "Мир Дробей",
    appTagline: "Математика 5 класс: Смешанные и обыкновенные дроби легко и весело!",
    navHome: "Главная",
    navLessons: "Уроки",
    navPractice: "Практика и Тесты",
    navGames: "Игры",
    navCases: "Жизненные Кейсы",
    navCalc: "Калькулятор Дробей",
    navGlossary: "Словарь Дробей",
    navProfile: "Мои Результаты",

    // Mascot
    mascotName: "Дробчик",
    mascotHello: "Привет, друг! Я Дробчик. Сегодня мы вместе раскроем все секреты дробей!",
    mascotEncourage: "Отлично получается! Каждый шаг делает тебя настоящим математиком!",
    mascotMistake: "Не переживай! Ошибки — наши лучшие учителя. Давай попробуем снова!",
    mascotVictory: "Молодец! Ты настоящий мастер дробей!",

    // Student profile & stats
    studentNamePlaceholder: "Введите ваше имя...",
    changeName: "Изменить",
    starsCount: "Звёзды",
    xpPoints: "Очки XP",
    currentLevel: "Уровень",
    streakDays: "Серия дней",
    daysUnit: "дн.",
    dailyChallenge: "Дневное задание",
    dailyChallengeDesc: "Реши сегодня хотя бы 5 примеров и получи 50 XP!",
    dailyChallengeDone: "Задание на сегодня выполнено! Браво!",

    // 10 Levels
    levels: [
      "1. Начинающий",
      "2. Нарезчик пиццы",
      "3. Искатель знаменателей",
      "4. Друг числителей",
      "5. Исследователь дробей",
      "6. Мастер заёма",
      "7. Мастер умножения",
      "8. Шторм деления",
      "9. Профессор дробей",
      "10. Король дробей"
    ],

    // Common Buttons & Labels
    start: "Начать",
    next: "Далее",
    prev: "Назад",
    check: "Проверить",
    hint: "Подсказка",
    solveTogether: "Решим вместе",
    reset: "Сначала",
    correct: "Верно!",
    incorrect: "Ошибка!",
    explanation: "Объяснение:",
    ruleRemember: "Запомни!",
    commonMistake: "Частая ошибка!",
    score: "Счёт",
    time: "Время",
    finish: "Завершить",
    printReport: "Печать отчёта",
    retry: "Попробовать снова",
    viewSteps: "Показать шаги",

    // Section cards on home
    cardLessonsTitle: "Интерактивные Уроки",
    cardLessonsDesc: "Изучи 5 главных тем с пиццей и шоколадками шаг за шагом!",
    cardPracticeTitle: "Практика и Тесты",
    cardPracticeDesc: "3 уровня сложности, Блиц-тест и Итоговый Экзамен из 20 вопросов!",
    cardGamesTitle: "Весёлые Игры",
    cardGamesDesc: "Пиццерия, Дробе-строитель, Гонка дробей и Дроби-детектив!",
    cardCasesTitle: "Жизненные Кейсы",
    cardCasesDesc: "Реальные задачи на кухне, в саду, в спорте и на стройке!",

    // Lessons View
    lessonsTitle: "Интерактивные Уроки по Дробям для 5 класса",
    lessonList: [
      {
        id: "l1",
        title: "Урок 1: Смешанная дробь ⇄ Неправильная дробь",
        subtitle: "Секрет превращения целых и долей друг в друга",
        rule: "Чтобы перевести смешанную дробь в неправильную: умножь целую часть на знаменатель и прибавь числитель! Знаменатель остаётся прежним: a b/c = (a×c + b)/c",
        mistake: "Умножать и знаменатель! Помни: размер долей (знаменатель) не меняется!",
      },
      {
        id: "l2",
        title: "Урок 2: Сложение смешанных дробей",
        subtitle: "Целые складываем с целыми, а дроби приводим к общему знаменателю",
        rule: "При сложении: 1) Складываем целые части; 2) Находим общий знаменатель для дробных частей и складываем числители; 3) Если получилась неправильная дробь, выделяем целую часть!",
        mistake: "Просто складывать знаменатели между собой (например 1/2 + 1/3 = 2/5 — грубейшая ошибка!). Обязательно находим общий знаменатель!",
      },
      {
        id: "l3",
        title: "Урок 3: Вычитание смешанных дробей (Заём у целой части!)",
        subtitle: "Что делать, если числитель уменьшаемого меньше?",
        rule: "Если числитель первой дроби меньше числителя второй, «занимаем» 1 у целой части. Например: 3 1/4 = 2 5/4 (так как 1 целая = 4/4)!",
        mistake: "Вычитать наоборот из большей части меньшую (например, вместо 1/4 - 3/4 вычитать 3/4 - 1/4). Не забывай занимать у целой части!",
      },
      {
        id: "l4",
        title: "Урок 4: Умножение дробей",
        subtitle: "Числитель умножаем на числитель, знаменатель на знаменатель!",
        rule: "Золотое правило: Числитель на числитель, знаменатель на знаменатель! Если дробь смешанная, СНАЧАЛА переведи её в неправильную!",
        mistake: "При умножении смешанных дробей умножать отдельно целые и отдельно дроби (2 1/2 × 3 1/2 ≠ 6 1/4). Всегда сначала переводи в неправильную дробь!",
      },
      {
        id: "l5",
        title: "Урок 5: Деление дробей (Переверни и умножь!)",
        subtitle: "Волшебный способ умножения на обратную дробь",
        rule: "Чтобы разделить дробь на дробь: первую дробь оставляем как есть, вторую переворачиваем (меняем местами числитель и знаменатель) и перемножаем!",
        mistake: "Переворачивать обе дроби или первую дробь. Переворачивается ТОЛЬКО вторая дробь (делитель)!",
      }
    ],

    // Practice
    practiceTitle: "Центр Практики и Тестирования",
    practiceSubtitle: "Закрепляй знания, собирай звёзды и повышай уровень!",
    difficultyEasy: "Легкий",
    difficultyMedium: "Средний",
    difficultyHard: "Сложный",
    blitzMode: "⚡ Блиц-тест (60 секунд)",
    finalExam: "🎓 Итоговый Контрольный Тест (20 вопросов)",
    normalPractice: "Тематическая практика",
    selectTopic: "Выберите тему:",
    allTopics: "Все темы вперемешку",
    enterMixedPlaceholder: "Например: 2 1/4 или 3/5 или 4",
    submitAnswer: "Подтвердить ответ",
    hintUsedText: "Использована подсказка (-1 звезда)",
    blitzTimer: "Осталось времени",
    examResultTitle: "Результат Итогового Теста",
    examGrade: "Оценка",
    examAccuracy: "Точность",
    strengthsTitle: "Твои сильные стороны:",
    weaknessesTitle: "Темы, требующие повторения:",
    recommendationTitle: "Совет учителя:",

    // Games
    gamesTitle: "Парк Математических Игр",
    gamesSubtitle: "Играй, веселись и считай дроби с молниеносной скоростью!",
    gamePizzaTitle: "1. Пиццерия Дробей",
    gamePizzaDesc: "Собери кусочки пиццы по заказу клиента!",
    gameBuilderTitle: "2. Дробе-строитель",
    gameBuilderDesc: "Соединяй неправильные и смешанные дроби!",
    gameMemoryTitle: "3. Карточки Памяти",
    gameMemoryDesc: "Найди эквивалентные дроби и пары «пример-ответ»!",
    gameRaceTitle: "4. Гонка Дробей",
    gameRaceDesc: "Отвечай правильно и приведи машинку к финишу первым!",
    gameDetectiveTitle: "5. Дробный Детектив",
    gameDetectiveDesc: "Найди ошибку в решении и получи значок детектива!",
    comboText: "КОМБО",

    // Cases
    casesTitle: "Жизненные Математические Кейсы",
    casesSubtitle: "Как математика работает за пределами учебника — в реальной жизни?",
    caseReadStep: "1. Чтение задачи",
    casePlanStep: "2. План решения",
    caseSolveStep: "3. Решение",
    caseCheckStep: "4. Проверка",
    caseReflectionStep: "5. Чему ты научился?",

    // Calculator & Glossary
    calculatorTitle: "Интерактивный Калькулятор Дробей",
    calcSubtitle: "Не просто даёт ответ, а наглядно показывает все шаги вычисления!",
    calculateBtn: "Пошаговое решение",
    firstFraction: "1-я дробь (например 2 1/3 или 5/6):",
    secondFraction: "2-я дробь (например 1 1/2 или 3/4):",
    operationLabel: "Действие:",
    glossaryTitle: "Словарь Дробей",
    glossarySubtitle: "Математические термины простыми и понятными словами",

    // Profile & Report
    profileTitle: "Мои Достижения и Отчёт",
    printReportBtn: "Распечатать отчёт (Для родителей / учителя)",
    completedLessonsText: "Завершённые уроки",
    badgesEarned: "Полученные значки",
    recentAttempts: "История недавних упражнений",
    teacherSignature: "Подпись учителя: _____________",
    parentSignature: "Подпись родителей: _____________",
    soundOn: "Звук вкл.",
    soundOff: "Звук выкл.",
    darkMode: "Тёмная тема",
    lightMode: "Светлая тема",

    // Badges
    badgeFirstStep: "Первый шаг",
    badgeFirstStepDesc: "Ты успешно завершил своё первое упражнение!",
    badgeLessonMaster: "Мастер уроков",
    badgeLessonMasterDesc: "Завершил все 5 интерактивных уроков!",
    badgeStreak3: "Огненная серия",
    badgeStreak3Desc: "Учишься несколько дней подряд без перерыва!",
    badgeBlitzChamp: "Чемпион Блица",
    badgeBlitzChampDesc: "Отличный результат в 60-секундном Блиц-тесте!",
    badgePizzaChef: "Шеф Пиццы",
    badgePizzaChefDesc: "Набрал более 500 очков в Пиццерии дробей!",
    badgeDetective: "Дробный Детектив",
    badgeDetectiveDesc: "Разоблачил все скрытые ошибки в решениях!",
    badgeSpeedRacer: "Скоростной гонщик",
    badgeSpeedRacerDesc: "Финишировал первым в Гонке дробей!",
    badgePerfect10: "10 подряд верно",
    badgePerfect10Desc: "10 правильных ответов подряд без единой ошибки!",
    badgeExamHero: "Герой экзамена",
    badgeExamHeroDesc: "Получил высшую оценку 5 на Итоговом Экзамене!",
    badgeFractionKing: "Король дробей",
    badgeFractionKingDesc: "Достиг 10-го уровня и стал Королём Дробей!"
  },

  en: {
    // Navigation & header
    appName: "Fraction World",
    appTagline: "Grade 5 Math: Master Mixed and Simple Fractions the Fun Way!",
    navHome: "Home",
    navLessons: "Lessons",
    navPractice: "Practice & Tests",
    navGames: "Games",
    navCases: "Real-Life Cases",
    navCalc: "Fraction Calculator",
    navGlossary: "Glossary",
    navProfile: "My Progress",

    // Mascot
    mascotName: "Fracty",
    mascotHello: "Hey friend! I'm Fracty. Today we will unlock all the secrets of fractions together!",
    mascotEncourage: "You're doing amazing! Every step brings you closer to being a math wizard!",
    mascotMistake: "No worries! Mistakes are how our brain grows. Let's try once more!",
    mascotVictory: "Hooray! You are a true champion of fractions!",

    // Student profile & stats
    studentNamePlaceholder: "Enter your name...",
    changeName: "Save",
    starsCount: "Stars",
    xpPoints: "XP Points",
    currentLevel: "Level",
    streakDays: "Daily streak",
    daysUnit: "days",
    dailyChallenge: "Daily Quest",
    dailyChallengeDesc: "Solve at least 5 math tasks today and earn 50 XP!",
    dailyChallengeDone: "Today's quest completed! Brilliant!",

    // 10 Levels
    levels: [
      "1. Fraction Beginner",
      "2. Pizza Slicer",
      "3. Denominator Hunter",
      "4. Numerator Friend",
      "5. Fraction Explorer",
      "6. Master of Borrowing",
      "7. Multiplication Ace",
      "8. Division Dynamo",
      "9. Fraction Professor",
      "10. King of Fractions"
    ],

    // Common Buttons & Labels
    start: "Start",
    next: "Next",
    prev: "Back",
    check: "Check",
    hint: "Hint",
    solveTogether: "Solve Together",
    reset: "Restart",
    correct: "Correct!",
    incorrect: "Not quite!",
    explanation: "Explanation:",
    ruleRemember: "Remember!",
    commonMistake: "Common mistake!",
    score: "Score",
    time: "Time",
    finish: "Finish",
    printReport: "Print Report",
    retry: "Try Again",
    viewSteps: "Show Steps",

    // Section cards on home
    cardLessonsTitle: "Interactive Lessons",
    cardLessonsDesc: "Master 5 core topics step-by-step using interactive pizzas and chocolate bars!",
    cardPracticeTitle: "Practice & Tests",
    cardPracticeDesc: "3 difficulty tiers, 60s Blitz mode, and a 20-question comprehensive Final Exam!",
    cardGamesTitle: "Fun Math Games",
    cardGamesDesc: "Pizza Workshop, Fraction Builder, Memory Cards, and Fraction Detective!",
    cardCasesTitle: "Real-Life Cases",
    cardCasesDesc: "Solve real culinary, garden, sports, and building fraction dilemmas!",

    // Lessons View
    lessonsTitle: "Interactive Fraction Lessons for 5th Grade",
    lessonList: [
      {
        id: "l1",
        title: "Lesson 1: Mixed ⇄ Improper Fractions",
        subtitle: "The secret to converting wholes and pieces back and forth",
        rule: "To convert a mixed fraction into an improper fraction: Multiply the whole number by the denominator, then add the numerator! Keep the denominator the same: a b/c = (a×c + b)/c",
        mistake: "Multiplying the denominator too! Remember: the size of slices (denominator) never changes!",
      },
      {
        id: "l2",
        title: "Lesson 2: Adding Mixed Fractions",
        subtitle: "Add whole numbers together, and find common denominators for the fractions",
        rule: "When adding mixed fractions: 1) Add the whole numbers; 2) Find a common denominator and add the numerators; 3) If the result is improper, extract another whole number!",
        mistake: "Adding denominators together (e.g., 1/2 + 1/3 = 2/5 is a huge mistake!). Always find the common denominator!",
      },
      {
        id: "l3",
        title: "Lesson 3: Subtracting Mixed Fractions (Borrowing!)",
        subtitle: "What to do when the first numerator is smaller than the second?",
        rule: "If the first numerator is smaller than the second, 'borrow' 1 from the whole number. Example: 3 1/4 = 2 5/4 (since 1 whole = 4/4)!",
        mistake: "Subtracting the smaller from the larger backwards (e.g., doing 3/4 - 1/4 instead of borrowing). Don't forget to borrow from the whole!",
      },
      {
        id: "l4",
        title: "Lesson 4: Multiplying Fractions",
        subtitle: "Multiply numerator by numerator, denominator by denominator!",
        rule: "Golden Rule: Numerator times numerator, denominator times denominator! If there are mixed numbers, ALWAYS convert them to improper fractions first!",
        mistake: "Multiplying wholes by wholes and fractions by fractions (2 1/2 × 3 1/2 ≠ 6 1/4). Always convert to improper fractions first!",
      },
      {
        id: "l5",
        title: "Lesson 5: Dividing Fractions (Flip & Multiply!)",
        subtitle: "The magic reciprocal technique",
        rule: "To divide fractions: Keep the first fraction the same, flip the second fraction upside down (reciprocal), and multiply them!",
        mistake: "Flipping both fractions or flipping the first one. ONLY flip the second fraction (the divisor)!",
      }
    ],

    // Practice
    practiceTitle: "Practice & Testing Center",
    practiceSubtitle: "Strengthen your skills, collect stars, and level up!",
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
    blitzMode: "⚡ Blitz Test (60s timer)",
    finalExam: "🎓 Final Comprehensive Exam (20 questions)",
    normalPractice: "Topic Practice",
    selectTopic: "Choose a topic:",
    allTopics: "All Topics Shuffled",
    enterMixedPlaceholder: "e.g. 2 1/4 or 3/5 or 4",
    submitAnswer: "Submit Answer",
    hintUsedText: "Hint was used (-1 star)",
    blitzTimer: "Time remaining",
    examResultTitle: "Final Exam Result",
    examGrade: "Grade",
    examAccuracy: "Accuracy",
    strengthsTitle: "Your Strengths:",
    weaknessesTitle: "Areas to Practice More:",
    recommendationTitle: "Teacher Recommendation:",

    // Games
    gamesTitle: "Math Games Arcade",
    gamesSubtitle: "Play, enjoy, and master fractions in the blink of an eye!",
    gamePizzaTitle: "1. Pizza Workshop",
    gamePizzaDesc: "Assemble pizza slices matching the customer's fraction order!",
    gameBuilderTitle: "2. Fraction Builder",
    gameBuilderDesc: "Connect matching improper and mixed fractions!",
    gameMemoryTitle: "3. Memory Cards",
    gameMemoryDesc: "Match equivalent fractions and problem-solution pairs!",
    gameRaceTitle: "4. Fraction Race",
    gameRaceDesc: "Answer correctly to accelerate your race car to victory!",
    gameDetectiveTitle: "5. Fraction Detective",
    gameDetectiveDesc: "Spot the sneaky mistake in solved steps and earn a detective badge!",
    comboText: "COMBO",

    // Cases
    casesTitle: "Real-Life Math Dilemmas",
    casesSubtitle: "How fractions power real decisions in cooking, gardening, and building!",
    caseReadStep: "1. Read Problem",
    casePlanStep: "2. Formulate Plan",
    caseSolveStep: "3. Solve Step-by-Step",
    caseCheckStep: "4. Verify Answer",
    caseReflectionStep: "5. What did you learn?",

    // Calculator & Glossary
    calculatorTitle: "Interactive Fraction Calculator",
    calcSubtitle: "Doesn't just give the answer — breaks down every step visually!",
    calculateBtn: "Calculate Step-by-Step",
    firstFraction: "1st fraction (e.g. 2 1/3 or 5/6):",
    secondFraction: "2nd fraction (e.g. 1 1/2 or 3/4):",
    operationLabel: "Operation:",
    glossaryTitle: "Fraction Glossary",
    glossarySubtitle: "Every math term explained simply with vivid visual examples",

    // Profile & Report
    profileTitle: "My Achievements & Progress Report",
    printReportBtn: "Print Report (For Parents / Teachers)",
    completedLessonsText: "Completed Lessons",
    badgesEarned: "Badges Earned",
    recentAttempts: "Recent Practice History",
    teacherSignature: "Teacher Signature: _____________",
    parentSignature: "Parent Signature: _____________",
    soundOn: "Sound ON",
    soundOff: "Sound OFF",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",

    // Badges
    badgeFirstStep: "First Step",
    badgeFirstStepDesc: "Successfully completed your first exercise!",
    badgeLessonMaster: "Lesson Master",
    badgeLessonMasterDesc: "Finished all 5 interactive lessons!",
    badgeStreak3: "Streak Fire",
    badgeStreak3Desc: "Practicing multiple days consistently!",
    badgeBlitzChamp: "Blitz Champion",
    badgeBlitzChampDesc: "Outstanding performance in 60s Blitz mode!",
    badgePizzaChef: "Pizza Master",
    badgePizzaChefDesc: "Scored over 500 points in the Pizza Workshop!",
    badgeDetective: "Fraction Detective",
    badgeDetectiveDesc: "Exposed all hidden calculation errors!",
    badgeSpeedRacer: "Speed Racer",
    badgeSpeedRacerDesc: "Crossed the finish line first in Fraction Race!",
    badgePerfect10: "10-in-a-Row",
    badgePerfect10Desc: "Answered 10 consecutive questions correctly!",
    badgeExamHero: "Exam Hero",
    badgeExamHeroDesc: "Achieved top grade 5 on the Final Exam!",
    badgeFractionKing: "Fraction King",
    badgeFractionKingDesc: "Reached Level 10 and conquered fractions!"
  }
};

export const glossaryItems = [
  {
    term: {
      uz: "Surat (Numerator)",
      ru: "Числитель (Numerator)",
      en: "Numerator"
    },
    definition: {
      uz: "Kasr chizig'ining tepasidagi son. Butun narsadan qancha bo'lak olinganini yoki borligini ko'rsatadi.",
      ru: "Число над дробной чертой. Показывает, сколько равных долей взято или рассматривается.",
      en: "The top number of a fraction. It shows how many equal parts are taken or counted."
    },
    example: "3/4 da 3 — suratdir."
  },
  {
    term: {
      uz: "Maxraj (Denominator)",
      ru: "Знаменатель (Denominator)",
      en: "Denominator"
    },
    definition: {
      uz: "Kasr chizig'ining ostidagi son. Butun narsa jami nechta teng bo'lakka bo'linganini bildiradi. Maxraj hech qachon 0 bo'lolmaydi!",
      ru: "Число под дробной чертой. Показывает, на сколько равных долей разделено целое. Знаменатель не может быть нулём!",
      en: "The bottom number of a fraction. It indicates into how many equal parts the whole is divided. Denominator can never be 0!"
    },
    example: "3/4 da 4 — maxrajdir."
  },
  {
    term: {
      uz: "Aralash kasr (Mixed Fraction)",
      ru: "Смешанная дробь (Mixed Fraction)",
      en: "Mixed Number / Fraction"
    },
    definition: {
      uz: "Butun son va to'g'ri kasrning yig'indisi ko'rinishida yozilgan kasr. Masalan, 2 ta butun pitsa va 1/4 pitsa = 2 1/4 pitsa.",
      ru: "Дробь, содержащая целую часть и правильную дробную часть. Например: 2 целых и 1/4 = 2 1/4.",
      en: "A number made up of a whole number and a proper fraction. E.g., 2 whole pizzas and 1/4 pizza = 2 1/4."
    },
    example: "2 1/4, 5 3/8"
  },
  {
    term: {
      uz: "Noto'g'ri kasr (Improper Fraction)",
      ru: "Неправильная дробь (Improper Fraction)",
      en: "Improper Fraction"
    },
    definition: {
      uz: "Surati maxrajiga teng yoki undan katta bo'lgan kasr. U har doim 1 ga teng yoki 1 dan katta bo'ladi.",
      ru: "Дробь, у которой числитель больше знаменателя или равен ему. Она всегда больше или равна 1.",
      en: "A fraction where the numerator is greater than or equal to the denominator. It is always >= 1."
    },
    example: "9/4, 7/3, 5/5"
  },
  {
    term: {
      uz: "Umumiy maxraj (Common Denominator)",
      ru: "Общий знаменатель (Common Denominator)",
      en: "Common Denominator"
    },
    definition: {
      uz: "Ikki yoki undan ortiq kasrlarning maxrajlariga bo'linadigan bir xil son. Kasrlarni qo'shish va ayirishda albatta umumiy maxraj topiladi (EKUK).",
      ru: "Общее число, которое делится на знаменатели складываемых или вычитаемых дробей (НОК).",
      en: "A shared multiple of the denominators of several fractions, required for adding and subtracting."
    },
    example: "1/2 va 1/3 uchun umumiy maxraj 6 dir."
  },
  {
    term: {
      uz: "Kasrni qisqartirish (Simplifying / Reducing)",
      ru: "Сокращение дроби (Simplifying / Reducing)",
      en: "Simplifying / Reducing"
    },
    definition: {
      uz: "Kasrning surati va maxrajini ularning 1 dan farqli bir xil umumiy bo'luvchisiga (EKUB) bo'lish.",
      ru: "Деление числителя и знаменателя на их общий делитель (НОД), отличный от 1.",
      en: "Dividing both numerator and denominator by their greatest common divisor."
    },
    example: "4/8 = 1/2 (har ikkalasini 4 ga bo'ldik)"
  },
  {
    term: {
      uz: "Teskari kasr (Reciprocal)",
      ru: "Взаимно обратная дробь (Reciprocal)",
      en: "Reciprocal"
    },
    definition: {
      uz: "Surati va maxrajining o'rni almashtirilgan kasr. Kasrni uning teskarisiga ko'paytirganda 1 hosil bo'ladi. Kasrlarni bo'lishda ishlatiladi!",
      ru: "Дробь, у которой числитель и знаменатель поменялись местами. Произведение взаимно обратных дробей равно 1.",
      en: "A fraction flipped upside down. Multiplying a fraction by its reciprocal yields 1."
    },
    example: "3/5 ning teskarisi 5/3 dir."
  }
];

export const allBadgesList = [
  { id: "b1", icon: "🌱", titleKey: "badgeFirstStep", descKey: "badgeFirstStepDesc" },
  { id: "b2", icon: "⭐", titleKey: "badgeLessonMaster", descKey: "badgeLessonMasterDesc" },
  { id: "b3", icon: "🔥", titleKey: "badgeStreak3", descKey: "badgeStreak3Desc" },
  { id: "b4", icon: "⚡", titleKey: "badgeBlitzChamp", descKey: "badgeBlitzChampDesc" },
  { id: "b5", icon: "🍕", titleKey: "badgePizzaChef", descKey: "badgePizzaChefDesc" },
  { id: "b6", icon: "🔍", titleKey: "badgeDetective", descKey: "badgeDetectiveDesc" },
  { id: "b7", icon: "🏎️", titleKey: "badgeSpeedRacer", descKey: "badgeSpeedRacerDesc" },
  { id: "b8", icon: "🎯", titleKey: "badgePerfect10", descKey: "badgePerfect10Desc" },
  { id: "b9", icon: "🎓", titleKey: "badgeExamHero", descKey: "badgeExamHeroDesc" },
  { id: "b10", icon: "👑", titleKey: "badgeFractionKing", descKey: "badgeFractionKingDesc" },
];
