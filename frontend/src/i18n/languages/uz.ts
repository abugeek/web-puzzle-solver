/**
 * Uzbek translations
 */
import type { Translation } from './en';

export const uz: Translation = {
  common: {
    loading: 'Yuklanmoqda...',
    error: 'Xato',
    success: 'Muvaffaqiyat',
    cancel: 'Bekor qilish',
    save: 'Saqlash',
    delete: 'O\'chirish',
    edit: 'Tahrirlash',
    create: 'Yaratish',
    load: 'Yuklash',
    close: 'Yopish',
    back: 'Orqaga',
    next: 'Keyingi',
    yes: 'Ha',
    no: 'Yo\'q',
    confirm: 'Tasdiqlash',
  },

  header: {
    title: 'Universal Naqsh Topuvchi Dastur',
    subtitle: 'Maxsus topishmoqlar yarating yoki tayyor shablonlardan foydalaning',
  },

  tabs: {
    solve: 'Topishmoqni Yechish',
    create: 'Maxsus Yaratish',
    presets: 'Shablon Yuklash',
    saved: 'Mening Topishmoqlarim',
  },

  solver: {
    // Ehtimollik Tahlili Bo'limi
    probabilityAnalysis: 'Ehtimollik Tahlili',
    totalOptions: 'Jami Variantlar',
    remaining: 'Qolgan',
    checked: 'Tekshirilgan',
    nextTry: 'Keyingi Urinish %',

    // Ehtimollik Tafsilotlari
    within3Tries: '3 urinishda:',
    within5Tries: '5 urinishda:',
    within10Tries: '10 urinishda:',
    expectedAttempts: 'Kutilayotgan Urinishlar:',
    triesAverage: 'urinish (o\'rtacha)',

    // Strategiya Bo'limi
    optimalStrategy: 'Optimal Strategiya',
    strategyInfo: 'Eng yuqori samaradorlik uchun avval shu raqamlarni sinab ko\'ring!',
    priority: 'Ustuvorlik',
    clickHint: 'Tekshirilgan deb belgilash uchun bosing →',
    noStrategy: 'Strategiya mavjud emas',
    allChecked: 'Barcha kombinatsiyalar tekshirildi!',

    // Tugmalar
    resetProgress: 'Jarayonni Tiklash',
    refreshStrategy: 'Strategiyani Yangilash',
    showAllNumbers: 'Barcha Raqamlarni Ko\'rsatish',

    // Barcha Kombinatsiyalar Bo'limi
    allPossibleNumbers: 'Barcha Mumkin Bo\'lgan Raqamlar',
    combinationsHint: 'Tekshirilgan/tekshirilmagan holatini o\'zgartirish uchun istalgan raqamni bosing',
    availableStatus: 'Mavjud',
    checkedStatus: 'Tekshirilgan',
  },

  creator: {
    // Sarlavhalar
    title: 'Maxsus Topishmoq Yaratish',
    editTitle: 'Topishmoqni Tahrirlash',
    subtitle: 'Noma\'lumlar bilan o\'zingizning naqsh topishmoqingizni yarating',

    // Forma Maydonlari
    puzzleName: 'Topishmoq Nomi',
    puzzleNamePlaceholder: 'Topishmoq nomini kiriting',
    description: 'Tavsif',
    descriptionPlaceholder: 'Ixtiyoriy tavsif',

    // Naqsh Quruvchi
    patternBuilder: 'Naqsh Quruvchi',
    patternBuilderHint: 'Matn va noma\'lumlardan foydalanib naqshingizni yarating',
    addText: 'Matn Qo\'shish',
    addUnknown: 'Noma\'lum Qo\'shish',
    clearAll: 'Hammasini Tozalash',
    preview: 'Ko\'rib Chiqish',
    noPattern: 'Hali hech qanday naqsh qurilmagan',

    // Variantlar Generatori
    optionsGenerator: 'Variantlar Generatori',
    rangeTab: 'Oraliq',
    listTab: 'Ro\'yxat',
    pasteTab: 'Joylashtirish',

    // Oraliq Generatori
    from: 'Dan:',
    to: 'Gacha:',
    zeroPad: 'Raqamlarni nol bilan to\'ldirish (masalan, 001, 002)',
    generateRange: 'Oraliq Yaratish',

    // Ro'yxat Generatori
    listLabel: 'Ro\'yxat',
    listPlaceholder: 'Vergul bilan ajratilgan qiymatlarni kiriting (masalan, 123, 456, 789)',
    addList: 'Ro\'yxat Qo\'shish',

    // Joylashtirish Generatori
    pasteLabel: 'Joylashtirish',
    pastePlaceholder: 'Bir nechta qiymatlarni joylashtiring (har bir qiymat alohida qatorda)',
    addPasted: 'Joylashtirilganlarni Qo\'shish',

    // Noma'lum Konfiguratsiya
    unknownConfig: 'Noma\'lum Konfiguratsiyasi',
    selectUnknown: 'Variantlarni sozlash uchun noma\'lumni tanlang',
    currentOptions: 'Joriy Variantlar',
    optionsCount: (count: number) => `${count} ta variant`,
    noOptions: 'Hali hech qanday variant yo\'q',
    clearOptions: 'Variantlarni Tozalash',
    unknown: 'Noma\'lum',

    // Tugmalar
    savePuzzle: 'Topishmoqni Saqlash',
    updatePuzzle: 'Topishmoqni Yangilash',
    cancelEdit: 'Tahrirlashni Bekor Qilish',
  },

  presets: {
    title: 'Tayyor Topishmoqni Yuklash',
    subtitle: 'Oldindan sozlangan topishmoq shablonlaridan tanlang',
    unknowns: 'noma\'lumlar',
  },

  saved: {
    title: 'Saqlangan Topishmoqlarim',
    subtitle: 'Maxsus topishmoqlaringizni yuklang, tahrirlang yoki o\'chiring',
    noPuzzles: 'Hali saqlangan topishmoqlar yo\'q. "Maxsus Yaratish" bo\'limida bitta yarating!',
    created: 'Yaratilgan',
  },

  messages: {
    success: {
      puzzleCreated: (name: string) => `✅ Topishmoq yaratildi: ${name}`,
      puzzleUpdated: (name: string) => `✅ Topishmoq yangilandi: ${name}`,
      puzzleLoaded: (name: string) => `✅ Yuklandi: ${name}`,
      puzzleDeleted: '✅ Topishmoq muvaffaqiyatli o\'chirildi',
      optionsGenerated: (count: number) => `${count} ta variant yaratildi`,
      optionsApplied: (count: number, label: string) => `✅ ${label} uchun ${count} ta variant qo\'shildi`,
    },
    error: {
      puzzleNameRequired: 'Iltimos, topishmoq nomini kiriting!',
      patternRequired: 'Iltimos, avval naqsh yarating!',
      unknownsRequired: 'Iltimos, kamida bitta variantli noma\'lum qo\'shing!',
      allUnknownsNeedOptions: 'Barcha noma\'lumlarda variantlar bo\'lishi kerak!',
      invalidRange: 'Noto\'g\'ri oraliq! "Dan" "Gacha"dan kichik bo\'lishi kerak',
      noListValues: 'Iltimos, vergul bilan ajratilgan qiymatlarni kiriting',
      noPasteValues: 'Iltimos, qiymatlarni joylashtiring (har bir qiymat alohida qatorda)',
      selectUnknownFirst: 'Iltimos, avval noma\'lum qismni tanlang!',
      noOptionsGenerated: 'Hech qanday variant yaratilmadi!',
      createFailed: 'Topishmoq yaratib bo\'lmadi',
      updateFailed: 'Topishmoq yangilanmadi',
    },
    confirm: {
      resetProgress: 'Barcha jarayonni tiklashni xohlaysizmi? Bu barcha kombinatsiyalarni tekshirilmagan holatga qaytaradi.',
      deletePuzzle: 'Bu topishmoqni o\'chirmoqchimisiz? Buni qaytarib bo\'lmaydi.',
      cancelEdit: 'Tahrirlashni bekor qilishni xohlaysizmi? Saqlanmagan o\'zgarishlar yo\'qoladi.',
      clearPattern: 'Butun naqshni tozalashni xohlaysizmi?',
    },
    prompt: {
      enterText: 'Matnni kiriting (masalan, +998):',
    },
    info: {
      selectUnknown: 'Uni sozlash uchun naqshdagi noma\'lumni bosing',
      previewShowing: (count: number) => `Birinchi ${count} ta variant ko\'rsatilmoqda`,
    },
  },
};
