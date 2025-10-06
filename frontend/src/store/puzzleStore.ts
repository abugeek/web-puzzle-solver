/**
 * Global state management with Zustand
 */
import { create } from 'zustand';
import type { Puzzle, ProbabilityStats, Strategy, Combination } from '../types/puzzle';
import { puzzleApi } from '../services/api';

interface PuzzleState {
  currentPuzzle: Puzzle | null;
  probabilities: ProbabilityStats | null;
  strategy: Strategy | null;
  combinations: Combination[];
  loading: boolean;
  error: string | null;
  editingPuzzle: Puzzle | null;
  loadCurrentPuzzle: () => Promise<void>;
  loadProbabilities: () => Promise<void>;
  loadStrategy: () => Promise<void>;
  loadCombinations: () => Promise<void>;
  checkCombination: (key: string) => Promise<void>;
  uncheckCombination: (key: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  setCurrentPuzzle: (puzzle: Puzzle) => void;
  setEditingPuzzle: (puzzle: Puzzle | null) => void;
  refreshAll: () => Promise<void>;
}

export const usePuzzleStore = create<PuzzleState>((set, get) => ({
  currentPuzzle: null,
  probabilities: null,
  strategy: null,
  combinations: [],
  loading: false,
  error: null,
  editingPuzzle: null,

  loadCurrentPuzzle: async () => {
    set({ loading: true, error: null });
    try {
      const data = await puzzleApi.getCurrent();
      set({ currentPuzzle: data.puzzle, loading: false });
    } catch (error) {
      set({ error: 'Failed to load puzzle', loading: false });
    }
  },

  loadProbabilities: async () => {
    try {
      const stats = await puzzleApi.getProbabilities();
      set({ probabilities: stats });
    } catch (error) {
      console.error('Failed to load probabilities:', error);
    }
  },

  loadStrategy: async () => {
    try {
      const strategy = await puzzleApi.getStrategy();
      set({ strategy });
    } catch (error) {
      console.error('Failed to load strategy:', error);
    }
  },

  loadCombinations: async () => {
    try {
      const data = await puzzleApi.getCombinations();
      set({ combinations: data.combinations });
    } catch (error) {
      console.error('Failed to load combinations:', error);
    }
  },

  checkCombination: async (key: string) => {
    try {
      const data = await puzzleApi.check(key);
      set({ probabilities: data.stats });
      await get().loadStrategy();
      await get().loadCombinations();
    } catch (error) {
      console.error('Failed to check combination:', error);
    }
  },

  uncheckCombination: async (key: string) => {
    try {
      const data = await puzzleApi.uncheck(key);
      set({ probabilities: data.stats });
      await get().loadStrategy();
      await get().loadCombinations();
    } catch (error) {
      console.error('Failed to uncheck combination:', error);
    }
  },

  resetProgress: async () => {
    try {
      const data = await puzzleApi.reset();
      set({ probabilities: data.stats });
      await get().refreshAll();
    } catch (error) {
      console.error('Failed to reset progress:', error);
    }
  },

  setCurrentPuzzle: (puzzle: Puzzle) => {
    set({ currentPuzzle: puzzle });
  },

  setEditingPuzzle: (puzzle: Puzzle | null) => {
    set({ editingPuzzle: puzzle });
  },

  refreshAll: async () => {
    await Promise.all([
      get().loadCurrentPuzzle(),
      get().loadProbabilities(),
      get().loadStrategy(),
    ]);
  },
}));
