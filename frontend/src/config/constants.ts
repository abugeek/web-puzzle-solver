/**
 * Application Constants
 * Centralized configuration for the entire application
 */

// UI Constants
export const UI = {
  TABS: {
    SOLVE: 'solve',
    CREATE: 'create',
    PRESETS: 'presets',
    SAVED: 'saved',
  },
  DEFAULT_TAB: 'solve' as const,
} as const;

// Form Constants
export const FORM = {
  GENERATOR_TABS: {
    RANGE: 'range',
    LIST: 'list',
    PASTE: 'paste',
  },
  DEFAULT_GENERATOR_TAB: 'range' as const,
  DEFAULT_RANGE: {
    FROM: '100',
    TO: '200',
  },
  UNKNOWN_ID_PREFIX: 'U',
} as const;

// Display Limits
export const LIMITS = {
  PREVIEW_OPTIONS: 20,
  OPTIONS_DISPLAY_UNKNOWN: 2,
} as const;

// Messages
export const MESSAGES = {
  SUCCESS: {
    PUZZLE_CREATED: (name: string) => `✅ Puzzle created: ${name}`,
    PUZZLE_UPDATED: (name: string) => `✅ Puzzle updated: ${name}`,
    PUZZLE_LOADED: (name: string) => `✅ Loaded: ${name}`,
    PUZZLE_DELETED: '✅ Deleted',
    OPTIONS_APPLIED: (count: number, label: string) => `✅ Added ${count} options to ${label}`,
  },
  ERROR: {
    PUZZLE_NAME_REQUIRED: 'Please enter a puzzle name!',
    PATTERN_REQUIRED: 'Please build a pattern!',
    UNKNOWN_REQUIRED: 'Please add at least one unknown part!',
    OPTIONS_REQUIRED: (label: string) => `Please add options for ${label}!`,
    SELECT_UNKNOWN: 'Please select an unknown part first!',
    NO_OPTIONS_GENERATED: 'No options generated!',
    CREATE_FAILED: 'Failed to create puzzle. Check console for details.',
    UPDATE_FAILED: 'Failed to update puzzle. Check console for details.',
  },
  CONFIRM: {
    CLEAR_PATTERN: 'Clear entire pattern?',
    DELETE_PUZZLE: 'Delete this puzzle?',
  },
  PROMPT: {
    ENTER_TEXT: 'Enter text (e.g., +998):',
  },
  PLACEHOLDER: {
    NO_PUZZLES: 'No saved puzzles yet!',
    START_BUILDING: 'Start building your pattern →',
    OPTIONS_PREVIEW: 'Options will appear here...',
  },
} as const;

// Pattern Part Types
export const PATTERN_PART_TYPES = {
  TEXT: 'text',
  UNKNOWN: 'unknown',
} as const;

export type PatternPartType = typeof PATTERN_PART_TYPES[keyof typeof PATTERN_PART_TYPES];
