/**
 * Uzbek translations
 */
import type { Translation } from './en';

export const uz: Translation = {
  common: {
    loading: 'Yuklanmoqda...',
    error: 'Xato',
    success: 'Muvaffaqiyatli',
    cancel: 'Bekor qilish',
    save: 'Saqlash',
    delete: 'O\'chirish',
    edit: 'Tahrirlash',
    create: 'Yaratish',
    load: 'Yuklash',
  },

  header: {
    title: 'Universal Naqsh Topuvchi Dastur',
    subtitle: 'Maxsus topishmoqlar yarating yoki tayyor shablon foydalaning. Yo\'qolgan raqamlarni optimal ehtimollik strategiyasi bilan toping.',
    currentPuzzle: 'Joriy Topishmoq',
    pattern: 'Naqsh',
  },

  tabs: {
    solve: 'Topishmoqni Yechish',
    create: 'Maxsus Yaratish',
    presets: 'Shablon Yuklash',
    saved: 'Mening Topishmoqlarim',
  },

  solver: {
    probabilityAnalysis: 'Ehtimollik Tahlili',
    totalOptions: 'Jami Variantlar',
    remaining: 'Qolgan',
    checked: 'Tekshirilgan',
    probabilityNext: 'Keyingi Urinish',
    probabilityWithin: 'Ichida',
    tries: 'urinish',
    expectedAttempts: 'Kutilayotgan Urinishlar',
    bestCase: 'Eng Yaxshi Holat',
    worstCase: 'Eng Yomon Holat',

    optimalStrategy: 'Optimal Strategiya',
    priority: 'Ustunlik',
    refreshStrategy: 'Strategiyani Yangilash',
    resetProgress: 'Jarayonni Tiklash',
    showAllCombinations: 'Barcha Kombinatsiyalarni Ko\'rsatish',
    hideAllCombinations: 'Kombinatsiyalarni Yashirish',

    available: 'Mavjud',
    alreadyChecked: 'Allaqachon Tekshirilgan',
    exportResults: 'Natijalarni Eksport Qilish',
  },

  creator: {
    title: 'Maxsus Topishmoq Yaratish',
    editTitle: 'Topishmoqni Tahrirlash',
    editing: 'Tahrirlanmoqda',
    cancelEditing: 'Tahrirlashni bekor qilish',

    puzzleName: 'Topishmoq Nomi',
    puzzleNamePlaceholder: 'masalan, Do\'stimning Raqamini Topish',
    puzzleNameHint: 'Topishmoqingizga esda qolarli nom bering',

    description: 'Ta\'rif (ixtiyoriy)',
    descriptionPlaceholder: 'masalan, Telefon raqamidagi yo\'qolgan raqamlarni topish',

    buildPattern: 'Naqshingizni Quring',
    buildPatternHint: 'Matn va noma\'lum qismlarni qo\'shib naqsh yarating',
    startBuilding: 'Naqsh qurishni boshlang →',

    addText: 'Matn Qo\'shish',
    addUnknown: 'Noma\'lum Qo\'shish',
    clearAll: 'Hammasini Tozalash',

    preview: 'Ko\'rib chiqish',

    addOptionsFor: 'Variantlar qo\'shing',
    generateOptions: 'Ushbu noma\'lum qism uchun mumkin bo\'lgan qiymatlar ro\'yxatini yarating',

    numberRange: 'Raqamlar Oralig\'i',
    customList: 'Maxsus Ro\'yxat',
    pasteList: 'Ro\'yxatni Joylashtirish',

    from: 'Dan',
    to: 'Gacha',
    padWithZeros: 'Nollar bilan to\'ldirish (masalan, 001, 002, 003)',

    enterValuesComma: 'Vergul bilan ajratilgan qiymatlarni kiriting',
    pasteListHint: 'Ro\'yxatingizni joylashtiring (har bir qator bitta qiymat)',

    optionsCount: 'variant',
    optionsPreview: 'Variantlar shu yerda ko\'rinadi...',
    applyOptions: 'Variantlarni qo\'llash',

    currentlyApplied: 'Hozirgi Qo\'llanilgan Variantlar',

    createPuzzle: 'Topishmoq Yaratish va Yechishni Boshlash',
    saveChanges: 'O\'zgarishlarni Saqlash',

    unknown: 'Noma\'lum',
  },

  presets: {
    title: 'Tayyor Topishmoqni Yuklash',
    subtitle: 'Oldindan sozlangan topishmoq shablonlaridan tanlang',
    unknowns: 'noma\'lumlar',
  },

  saved: {
    title: 'Saqlangan Topishmoqlarim',
    subtitle: 'Maxsus topishmoqlaringiz avtomatik saqlanadi',
    noPuzzles: 'Hali saqlangan topishmoqlar yo\'q!',
    created: 'Yaratilgan',
  },

  messages: {
    success: {
      puzzleCreated: (name: string) => `✅ Topishmoq yaratildi: ${name}`,
      puzzleUpdated: (name: string) => `✅ Topishmoq yangilandi: ${name}`,
      puzzleLoaded: (name: string) => `✅ Yuklandi: ${name}`,
      puzzleDeleted: '✅ O\'chirildi',
      optionsApplied: (count: number, label: string) => `✅ ${count} ta variant ${label} ga qo\'shildi`,
    },
    error: {
      puzzleNameRequired: 'Iltimos, topishmoq nomini kiriting!',
      patternRequired: 'Iltimos, naqsh quring!',
      unknownRequired: 'Iltimos, kamida bitta noma\'lum qism qo\'shing!',
      optionsRequired: (label: string) => `Iltimos, ${label} uchun variantlar qo\'shing!`,
      selectUnknown: 'Iltimos, avval noma\'lum qismni tanlang!',
      noOptionsGenerated: 'Variantlar yaratilmadi!',
      createFailed: 'Topishmoq yaratishda xatolik. Konsolni tekshiring.',
      updateFailed: 'Topishmoqni yangilashda xatolik. Konsolni tekshiring.',
    },
    confirm: {
      clearPattern: 'Butun naqshni tozalashni xohlaysizmi?',
      deletePuzzle: 'Ushbu topishmoqni o\'chirish?',
    },
    prompt: {
      enterText: 'Matn kiriting (masalan, +998):',
    },
  },
};
