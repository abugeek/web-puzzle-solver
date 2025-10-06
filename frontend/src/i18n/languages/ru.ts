/**
 * Russian translations
 */
import type { Translation } from './en';

export const ru: Translation = {
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    save: 'Сохранить',
    delete: 'Удалить',
    edit: 'Редактировать',
    create: 'Создать',
    load: 'Загрузить',
  },

  header: {
    title: 'Универсальный Решатель Паттернов',
    subtitle: 'Создавайте собственные головоломки или используйте готовые шаблоны. Находите недостающие цифры с оптимальной вероятностной стратегией.',
    currentPuzzle: 'Текущая Головоломка',
    pattern: 'Паттерн',
  },

  tabs: {
    solve: 'Решить Головоломку',
    create: 'Создать Свою',
    presets: 'Загрузить Шаблон',
    saved: 'Мои Головоломки',
  },

  solver: {
    probabilityAnalysis: 'Анализ Вероятности',
    totalOptions: 'Всего Вариантов',
    remaining: 'Осталось',
    checked: 'Проверено',
    probabilityNext: 'Следующая Попытка',
    probabilityWithin: 'В течение',
    tries: 'попыток',
    expectedAttempts: 'Ожидаемые Попытки',
    bestCase: 'Лучший Случай',
    worstCase: 'Худший Случай',

    optimalStrategy: 'Оптимальная Стратегия',
    priority: 'Приоритет',
    refreshStrategy: 'Обновить Стратегию',
    resetProgress: 'Сбросить Прогресс',
    showAllCombinations: 'Показать Все Комбинации',
    hideAllCombinations: 'Скрыть Комбинации',

    available: 'Доступно',
    alreadyChecked: 'Уже Проверено',
    exportResults: 'Экспортировать Результаты',
  },

  creator: {
    title: 'Создать Свою Головоломку',
    editTitle: 'Редактировать Головоломку',
    editing: 'Редактирование',
    cancelEditing: 'Отменить редактирование',

    puzzleName: 'Название Головоломки',
    puzzleNamePlaceholder: 'например, Найти Номер Друга',
    puzzleNameHint: 'Дайте головоломке запоминающееся название',

    description: 'Описание (необязательно)',
    descriptionPlaceholder: 'например, Поиск недостающих цифр в номере телефона',

    buildPattern: 'Построить Паттерн',
    buildPatternHint: 'Создайте паттерн, добавляя текст и неизвестные части',
    startBuilding: 'Начните строить паттерн →',

    addText: 'Добавить Текст',
    addUnknown: 'Добавить Неизвестное',
    clearAll: 'Очистить Всё',

    preview: 'Предпросмотр',

    addOptionsFor: 'Добавить Варианты для',
    generateOptions: 'Создайте список возможных значений для этой неизвестной части',

    numberRange: 'Диапазон Чисел',
    customList: 'Свой Список',
    pasteList: 'Вставить Список',

    from: 'От',
    to: 'До',
    padWithZeros: 'Дополнить нулями (например, 001, 002, 003)',

    enterValuesComma: 'Введите значения через запятую',
    pasteListHint: 'Вставьте список (одно значение на строку)',

    optionsCount: 'вариантов',
    optionsPreview: 'Варианты появятся здесь...',
    applyOptions: 'Применить Варианты к',

    currentlyApplied: 'Текущие Применённые Варианты',

    createPuzzle: 'Создать Головоломку и Начать Решение',
    saveChanges: 'Сохранить Изменения',

    unknown: 'Неизвестное',
  },

  presets: {
    title: 'Загрузить Готовую Головоломку',
    subtitle: 'Выберите из готовых шаблонов головоломок',
    unknowns: 'неизвестных',
  },

  saved: {
    title: 'Мои Сохранённые Головоломки',
    subtitle: 'Ваши головоломки сохраняются автоматически',
    noPuzzles: 'Пока нет сохранённых головоломок!',
    created: 'Создано',
  },

  messages: {
    success: {
      puzzleCreated: (name: string) => `✅ Головоломка создана: ${name}`,
      puzzleUpdated: (name: string) => `✅ Головоломка обновлена: ${name}`,
      puzzleLoaded: (name: string) => `✅ Загружено: ${name}`,
      puzzleDeleted: '✅ Удалено',
      optionsApplied: (count: number, label: string) => `✅ Добавлено ${count} вариантов в ${label}`,
    },
    error: {
      puzzleNameRequired: 'Пожалуйста, введите название головоломки!',
      patternRequired: 'Пожалуйста, постройте паттерн!',
      unknownRequired: 'Пожалуйста, добавьте хотя бы одну неизвестную часть!',
      optionsRequired: (label: string) => `Пожалуйста, добавьте варианты для ${label}!`,
      selectUnknown: 'Пожалуйста, сначала выберите неизвестную часть!',
      noOptionsGenerated: 'Варианты не созданы!',
      createFailed: 'Не удалось создать головоломку. Проверьте консоль.',
      updateFailed: 'Не удалось обновить головоломку. Проверьте консоль.',
    },
    confirm: {
      clearPattern: 'Очистить весь паттерн?',
      deletePuzzle: 'Удалить эту головоломку?',
    },
    prompt: {
      enterText: 'Введите текст (например, +998):',
    },
  },
};
