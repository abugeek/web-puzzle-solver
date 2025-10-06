/**
 * API service layer - all backend communication
 */
import axios from 'axios';
import type {
  Puzzle,
  Combination,
  ProbabilityStats,
  Strategy,
  PresetInfo,
  SavedPuzzleInfo,
} from '../types/puzzle';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const puzzleApi = {
  // Get current puzzle
  getCurrent: async () => {
    const { data } = await api.get<{ puzzle: Puzzle; pattern_display: string }>('/puzzle/current');
    return data;
  },

  // Create custom puzzle
  create: async (puzzleData: Omit<Puzzle, 'id' | 'checked' | 'created_at'>) => {
    const { data } = await api.post<{ success: boolean; puzzle: Puzzle }>('/puzzle/create', puzzleData);
    return data;
  },

  // Get all presets
  getPresets: async () => {
    const { data } = await api.get<{ presets: PresetInfo[] }>('/presets');
    return data.presets;
  },

  // Load preset
  loadPreset: async (presetId: string) => {
    const { data } = await api.get<{ success: boolean; puzzle: Puzzle }>(`/preset/${presetId}`);
    return data;
  },

  // Get saved puzzles
  getSaved: async () => {
    const { data } = await api.get<{ puzzles: SavedPuzzleInfo[] }>('/puzzle/saved');
    return data.puzzles;
  },

  // Load saved puzzle
  loadSaved: async (puzzleId: string) => {
    const { data } = await api.get<{ success: boolean; puzzle: Puzzle }>(`/puzzle/load/${puzzleId}`);
    return data;
  },

  // Delete puzzle
  delete: async (puzzleId: string) => {
    const { data } = await api.delete<{ success: boolean }>(`/puzzle/delete/${puzzleId}`);
    return data;
  },

  // Update puzzle
  update: async (puzzleId: string, puzzleData: Omit<Puzzle, 'id' | 'checked' | 'created_at'>) => {
    const { data } = await api.put<{ success: boolean; puzzle: Puzzle }>(`/puzzle/update/${puzzleId}`, puzzleData);
    return data;
  },

  // Get all combinations
  getCombinations: async () => {
    const { data } = await api.get<{ combinations: Combination[]; total: number }>('/combinations');
    return data;
  },

  // Get probabilities
  getProbabilities: async () => {
    const { data } = await api.get<ProbabilityStats>('/probabilities');
    return data;
  },

  // Get strategy
  getStrategy: async () => {
    const { data } = await api.get<Strategy>('/strategy');
    return data;
  },

  // Mark combination as checked
  check: async (key: string) => {
    const { data } = await api.post<{ success: boolean; checked: string[]; stats: ProbabilityStats }>(
      '/check',
      { key }
    );
    return data;
  },

  // Unmark combination
  uncheck: async (key: string) => {
    const { data} = await api.post<{ success: boolean; checked: string[]; stats: ProbabilityStats }>(
      '/uncheck',
      { key }
    );
    return data;
  },

  // Reset progress
  reset: async () => {
    const { data } = await api.post<{ success: boolean; stats: ProbabilityStats }>('/reset');
    return data;
  },

  // Export combinations
  export: async () => {
    const { data } = await api.get('/export', { responseType: 'text' });
    return data;
  },
};
