/**
 * English translations
 */
export const en = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    load: 'Load',
  },

  header: {
    title: 'Universal Pattern Puzzle Solver',
    subtitle: 'Create custom puzzles or use presets. Find missing digits with optimal probability strategy.',
    currentPuzzle: 'Current Puzzle',
    pattern: 'Pattern',
  },

  tabs: {
    solve: 'Solve Puzzle',
    create: 'Create Custom',
    presets: 'Load Preset',
    saved: 'My Puzzles',
  },

  solver: {
    probabilityAnalysis: 'Probability Analysis',
    totalOptions: 'Total Options',
    remaining: 'Remaining',
    checked: 'Checked',
    probabilityNext: 'Next Try',
    probabilityWithin: 'Within',
    tries: 'tries',
    expectedAttempts: 'Expected Attempts',
    bestCase: 'Best Case',
    worstCase: 'Worst Case',

    optimalStrategy: 'Optimal Strategy',
    priority: 'Priority',
    refreshStrategy: 'Refresh Strategy',
    resetProgress: 'Reset Progress',
    showAllCombinations: 'Show All Combinations',
    hideAllCombinations: 'Hide All Combinations',

    available: 'Available',
    alreadyChecked: 'Already Checked',
    exportResults: 'Export Results',
  },

  creator: {
    title: 'Create Custom Puzzle',
    editTitle: 'Edit Puzzle',
    editing: 'Editing',
    cancelEditing: 'Cancel editing',

    puzzleName: 'Puzzle Name',
    puzzleNamePlaceholder: 'e.g., Find My Friend\'s Number',
    puzzleNameHint: 'Give your puzzle a memorable name',

    description: 'Description (optional)',
    descriptionPlaceholder: 'e.g., Finding the missing digits in a phone number',

    buildPattern: 'Build Your Pattern',
    buildPatternHint: 'Create your pattern by adding text and unknown parts',
    startBuilding: 'Start building your pattern →',

    addText: 'Add Text',
    addUnknown: 'Add Unknown',
    clearAll: 'Clear All',

    preview: 'Preview',

    addOptionsFor: 'Add Options for',
    generateOptions: 'Generate the list of possible values for this unknown part',

    numberRange: 'Number Range',
    customList: 'Custom List',
    pasteList: 'Paste List',

    from: 'From',
    to: 'To',
    padWithZeros: 'Pad with zeros (e.g., 001, 002, 003)',

    enterValuesComma: 'Enter values separated by commas',
    pasteListHint: 'Paste your list (one value per line)',

    optionsCount: 'options',
    optionsPreview: 'Options will appear here...',
    applyOptions: 'Apply Options to',

    currentlyApplied: 'Currently Applied Options',

    createPuzzle: 'Create Puzzle & Start Solving',
    saveChanges: 'Save Changes',

    unknown: 'Unknown',
  },

  presets: {
    title: 'Load Preset Puzzle',
    subtitle: 'Choose from pre-configured puzzle templates',
    unknowns: 'unknowns',
  },

  saved: {
    title: 'My Saved Puzzles',
    subtitle: 'Your custom puzzles are saved automatically',
    noPuzzles: 'No saved puzzles yet!',
    created: 'Created',
  },

  messages: {
    success: {
      puzzleCreated: (name: string) => `✅ Puzzle created: ${name}`,
      puzzleUpdated: (name: string) => `✅ Puzzle updated: ${name}`,
      puzzleLoaded: (name: string) => `✅ Loaded: ${name}`,
      puzzleDeleted: '✅ Deleted',
      optionsApplied: (count: number, label: string) => `✅ Added ${count} options to ${label}`,
    },
    error: {
      puzzleNameRequired: 'Please enter a puzzle name!',
      patternRequired: 'Please build a pattern!',
      unknownRequired: 'Please add at least one unknown part!',
      optionsRequired: (label: string) => `Please add options for ${label}!`,
      selectUnknown: 'Please select an unknown part first!',
      noOptionsGenerated: 'No options generated!',
      createFailed: 'Failed to create puzzle. Check console for details.',
      updateFailed: 'Failed to update puzzle. Check console for details.',
    },
    confirm: {
      clearPattern: 'Clear entire pattern?',
      deletePuzzle: 'Delete this puzzle?',
    },
    prompt: {
      enterText: 'Enter text (e.g., +998):',
    },
  },
};

export type Translation = typeof en;
