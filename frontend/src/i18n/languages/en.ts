/**
 * English translations - Complete
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
    close: 'Close',
    back: 'Back',
    next: 'Next',
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
  },

  header: {
    title: 'Universal Pattern Puzzle Solver',
    subtitle: 'Create custom puzzles or use presets to find missing patterns in phone numbers and more',
  },

  tabs: {
    solve: 'Solve Puzzle',
    create: 'Create Custom',
    presets: 'Load Preset',
    saved: 'My Puzzles',
  },

  solver: {
    // Probability Analysis Section
    probabilityAnalysis: 'Probability Analysis',
    totalOptions: 'Total Options',
    remaining: 'Remaining',
    checked: 'Checked',
    nextTry: 'Next Try %',

    // Probability Details
    within3Tries: 'Within 3 tries:',
    within5Tries: 'Within 5 tries:',
    within10Tries: 'Within 10 tries:',
    expectedAttempts: 'Expected Attempts:',
    triesAverage: 'tries (average)',

    // Strategy Section
    optimalStrategy: 'Optimal Strategy',
    strategyInfo: 'Try these numbers first for highest efficiency!',
    priority: 'Priority',
    clickHint: 'Click to mark as checked →',
    noStrategy: 'No strategy available',
    allChecked: 'All combinations checked!',

    // Buttons
    resetProgress: 'Reset Progress',
    refreshStrategy: 'Refresh Strategy',
    showAllNumbers: 'Show All Numbers',

    // All Combinations Section
    allPossibleNumbers: 'All Possible Numbers',
    combinationsHint: 'Click any number to toggle checked/unchecked',
    availableStatus: 'Available',
    checkedStatus: 'Checked',
  },

  creator: {
    // Titles
    title: 'Create Custom Puzzle',
    editTitle: 'Edit Puzzle',
    subtitle: 'Build your own pattern puzzle with unknowns',

    // Form Fields
    puzzleName: 'Puzzle Name',
    puzzleNamePlaceholder: 'Enter puzzle name',
    description: 'Description',
    descriptionPlaceholder: 'Optional description',

    // Pattern Builder
    patternBuilder: 'Pattern Builder',
    patternBuilderHint: 'Build your pattern using text and unknowns',
    addText: 'Add Text',
    addUnknown: 'Add Unknown',
    clearAll: 'Clear All',
    preview: 'Preview',
    noPattern: 'No pattern built yet',

    // Options Generator
    optionsGenerator: 'Options Generator',
    rangeTab: 'Range',
    listTab: 'List',
    pasteTab: 'Paste',

    // Range Generator
    from: 'From:',
    to: 'To:',
    zeroPad: 'Zero-pad numbers (e.g., 001, 002)',
    generateRange: 'Generate Range',

    // List Generator
    listLabel: 'List',
    listPlaceholder: 'Enter comma-separated values (e.g., 123, 456, 789)',
    addList: 'Add List',

    // Paste Generator
    pasteLabel: 'Paste',
    pastePlaceholder: 'Paste multiple values (one per line)',
    addPasted: 'Add Pasted',

    // Unknown Configuration
    unknownConfig: 'Unknown Configuration',
    selectUnknown: 'Select an unknown to configure its options',
    currentOptions: 'Current Options',
    optionsCount: (count: number) => `${count} options`,
    noOptions: 'No options yet',
    clearOptions: 'Clear Options',
    unknown: 'Unknown',

    // Buttons
    savePuzzle: 'Save Puzzle',
    updatePuzzle: 'Update Puzzle',
    cancelEdit: 'Cancel Edit',
  },

  presets: {
    title: 'Load Preset Puzzle',
    subtitle: 'Choose from pre-configured puzzles to get started quickly',
    unknowns: 'unknowns',
  },

  saved: {
    title: 'My Saved Puzzles',
    subtitle: 'Load, edit, or delete your custom puzzles',
    noPuzzles: 'No saved puzzles yet. Create one in the "Create Custom" tab!',
    created: 'Created',
  },

  messages: {
    success: {
      puzzleCreated: (name: string) => `✅ Puzzle created: ${name}`,
      puzzleUpdated: (name: string) => `✅ Puzzle updated: ${name}`,
      puzzleLoaded: (name: string) => `✅ Loaded: ${name}`,
      puzzleDeleted: '✅ Puzzle deleted successfully',
      optionsGenerated: (count: number) => `Generated ${count} options`,
      optionsApplied: (count: number, label: string) => `✅ Added ${count} options to ${label}`,
    },
    error: {
      puzzleNameRequired: 'Please enter a puzzle name!',
      patternRequired: 'Please build a pattern first!',
      unknownsRequired: 'Please add at least one unknown with options!',
      allUnknownsNeedOptions: 'All unknowns must have options!',
      invalidRange: 'Invalid range! "From" must be less than "To"',
      noListValues: 'Please enter some comma-separated values',
      noPasteValues: 'Please paste some values (one per line)',
      selectUnknownFirst: 'Please select an unknown part first!',
      noOptionsGenerated: 'No options generated!',
      createFailed: 'Failed to create puzzle',
      updateFailed: 'Failed to update puzzle',
    },
    confirm: {
      resetProgress: 'Reset all progress? This will uncheck all combinations.',
      deletePuzzle: 'Delete this puzzle? This cannot be undone.',
      cancelEdit: 'Cancel editing? Unsaved changes will be lost.',
      clearPattern: 'Clear entire pattern?',
    },
    prompt: {
      enterText: 'Enter text (e.g., +998):',
    },
    info: {
      selectUnknown: 'Click on an unknown in the pattern to configure it',
      previewShowing: (count: number) => `Showing first ${count} options`,
    },
  },
};

export type Translation = typeof en;
