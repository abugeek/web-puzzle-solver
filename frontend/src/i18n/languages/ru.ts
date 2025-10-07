/**
 * Russian translations - Complete / Русские переводы - Полные
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
    close: 'Закрыть',
    back: 'Назад',
    next: 'Далее',
    yes: 'Да',
    no: 'Нет',
    confirm: 'Подтвердить',
  },

  header: {
    title: 'Универсальный Решатель Паттернов',
    subtitle: 'Создавайте собственные головоломки или используйте готовые шаблоны',
  },

  tabs: {
    solve: 'Решить Головоломку',
    create: 'Создать Свою',
    presets: 'Загрузить Шаблон',
    saved: 'Мои Головоломки',
  },

  solver: {
    // Раздел Анализа Вероятности
    probabilityAnalysis: 'Анализ Вероятности',
    totalOptions: 'Всего Вариантов',
    remaining: 'Осталось',
    checked: 'Проверено',
    nextTry: 'Следующая Попытка %',

    // Детали Вероятности
    within3Tries: 'В течение 3 попыток:',
    within5Tries: 'В течение 5 попыток:',
    within10Tries: 'В течение 10 попыток:',
    expectedAttempts: 'Ожидаемые Попытки:',
    triesAverage: 'попыток (в среднем)',

    // Раздел Стратегии
    optimalStrategy: 'Оптимальная Стратегия',
    strategyInfo: 'Попробуйте эти номера первыми для максимальной эффективности!',
    priority: 'Приоритет',
    clickHint: 'Нажмите, чтобы отметить как проверенное →',
    noStrategy: 'Стратегия недоступна',
    allChecked: 'Все комбинации проверены!',

    // Кнопки
    resetProgress: 'Сбросить Прогресс',
    refreshStrategy: 'Обновить Стратегию',
    showAllNumbers: 'Показать Все Номера',

    // Раздел Всех Комбинаций
    allPossibleNumbers: 'Все Возможные Номера',
    combinationsHint: 'Нажмите на любой номер, чтобы переключить проверено/не проверено',
    availableStatus: 'Доступно',
    checkedStatus: 'Проверено',
  },

  creator: {
    // Заголовки
    title: 'Создать Свою Головоломку',
    editTitle: 'Редактировать Головоломку',
    subtitle: 'Создайте собственную головоломку с неизвестными',

    // Поля Формы
    puzzleName: 'Название Головоломки',
    puzzleNamePlaceholder: 'Введите название головоломки',
    description: 'Описание',
    descriptionPlaceholder: 'Необязательное описание',

    // Конструктор Паттернов
    patternBuilder: 'Конструктор Паттернов',
    patternBuilderHint: 'Создайте свой паттерн, используя текст и неизвестные',
    addText: 'Добавить Текст',
    addUnknown: 'Добавить Неизвестное',
    clearAll: 'Очистить Всё',
    preview: 'Просмотр',
    noPattern: 'Паттерн ещё не создан',

    // Генератор Вариантов
    optionsGenerator: 'Генератор Вариантов',
    rangeTab: 'Диапазон',
    listTab: 'Список',
    pasteTab: 'Вставить',

    // Генератор Диапазона
    from: 'От:',
    to: 'До:',
    zeroPad: 'Заполнить нулями (например, 001, 002)',
    generateRange: 'Создать Диапазон',

    // Генератор Списка
    listLabel: 'Список',
    listPlaceholder: 'Введите значения через запятую (например, 123, 456, 789)',
    addList: 'Добавить Список',

    // Генератор Вставки
    pasteLabel: 'Вставить',
    pastePlaceholder: 'Вставьте несколько значений (каждое на отдельной строке)',
    addPasted: 'Добавить Вставленные',

    // Конфигурация Неизвестного
    unknownConfig: 'Конфигурация Неизвестного',
    selectUnknown: 'Выберите неизвестное для настройки его вариантов',
    currentOptions: 'Текущие Варианты',
    optionsCount: (count: number) => `${count} вариантов`,
    noOptions: 'Пока нет вариантов',
    clearOptions: 'Очистить Варианты',
    unknown: 'Неизвестное',

    // Кнопки
    savePuzzle: 'Сохранить Головоломку',
    updatePuzzle: 'Обновить Головоломку',
    cancelEdit: 'Отменить Редактирование',
  },

  presets: {
    title: 'Загрузить Готовую Головоломку',
    subtitle: 'Выберите из готовых головоломок для быстрого старта',
    unknowns: 'неизвестных',
  },

  saved: {
    title: 'Мои Сохраненные Головоломки',
    subtitle: 'Загружайте, редактируйте или удаляйте свои головоломки',
    noPuzzles: 'Пока нет сохранённых головоломок. Создайте одну в разделе "Создать Свою"!',
    created: 'Создано',
  },

  messages: {
    success: {
      puzzleCreated: (name: string) => `✅ Головоломка создана: ${name}`,
      puzzleUpdated: (name: string) => `✅ Головоломка обновлена: ${name}`,
      puzzleLoaded: (name: string) => `✅ Загружено: ${name}`,
      puzzleDeleted: '✅ Головоломка успешно удалена',
      optionsGenerated: (count: number) => `Создано ${count} вариантов`,
      optionsApplied: (count: number, label: string) => `✅ Добавлено ${count} вариантов для ${label}`,
    },
    error: {
      puzzleNameRequired: 'Пожалуйста, введите название головоломки!',
      patternRequired: 'Пожалуйста, сначала создайте паттерн!',
      unknownsRequired: 'Пожалуйста, добавьте хотя бы одно неизвестное с вариантами!',
      allUnknownsNeedOptions: 'Все неизвестные должны иметь варианты!',
      invalidRange: 'Неверный диапазон! "От" должно быть меньше "До"',
      noListValues: 'Пожалуйста, введите значения через запятую',
      noPasteValues: 'Пожалуйста, вставьте значения (каждое на отдельной строке)',
      selectUnknownFirst: 'Пожалуйста, сначала выберите неизвестную часть!',
      noOptionsGenerated: 'Варианты не созданы!',
      createFailed: 'Не удалось создать головоломку',
      updateFailed: 'Не удалось обновить головоломку',
    },
    confirm: {
      resetProgress: 'Сбросить весь прогресс? Это снимет отметки со всех комбинаций.',
      deletePuzzle: 'Удалить эту головоломку? Это действие нельзя отменить.',
      cancelEdit: 'Отменить редактирование? Несохранённые изменения будут потеряны.',
      clearPattern: 'Очистить весь паттерн?',
    },
    prompt: {
      enterText: 'Введите текст (например, +7):',
    },
    info: {
      selectUnknown: 'Нажмите на неизвестное в паттерне, чтобы настроить его',
      previewShowing: (count: number) => `Показаны первые ${count} вариантов`,
    },
  },
};
