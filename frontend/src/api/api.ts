
import { Preset, Puzzle, Combination, Probabilities, Strategy } from '../types';

const API_URL = '/api';

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (response.headers.get('Content-Type')?.includes('text/plain')) {
    return response.text() as Promise<T>;
  }
  return response.json();
}

export const getPresets = (): Promise<{ presets: Preset[] }> => fetcher(`${API_URL}/presets`);

export const loadPreset = (presetId: string): Promise<{ success: boolean; puzzle: Puzzle }> =>
  fetcher(`${API_URL}/preset/${presetId}`);

export const createPuzzle = (data: { name: string; pattern: string; unknowns: any[] }): Promise<{ success: boolean; puzzle: Puzzle }> =>
  fetcher(`${API_URL}/puzzle/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

export const getCurrentPuzzle = (): Promise<{ puzzle: Puzzle; pattern_display: string }> =>
  fetcher(`${API_URL}/puzzle/current`);

export const getSavedPuzzles = (): Promise<{ puzzles: Puzzle[] }> => fetcher(`${API_URL}/puzzle/saved`);

export const loadSavedPuzzle = (puzzleId: string): Promise<{ success: boolean; puzzle: Puzzle }> =>
  fetcher(`${API_URL}/puzzle/load/${puzzleId}`);

export const deletePuzzle = (puzzleId: string): Promise<{ success: boolean }> =>
  fetcher(`${API_URL}/puzzle/delete/${puzzleId}`, { method: 'DELETE' });

export const getCombinations = (): Promise<{ combinations: Combination[]; total: number }> =>
  fetcher(`${API_URL}/combinations`);

export const getProbabilities = (): Promise<Probabilities> => fetcher(`${API_URL}/probabilities`);

export const getStrategy = (): Promise<Strategy> => fetcher(`${API_URL}/strategy`);

export const checkCombination = (key: string): Promise<{ success: boolean; checked: string[]; stats: Probabilities }> =>
  fetcher(`${API_URL}/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });

export const uncheckCombination = (key: string): Promise<{ success: boolean; checked: string[]; stats: Probabilities }> =>
  fetcher(`${API_URL}/uncheck`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });

export const resetProgress = (): Promise<{ success: boolean; stats: Probabilities }> =>
  fetcher(`${API_URL}/reset`, { method: 'POST' });

export const exportCombinations = (): Promise<string> => fetcher(`${API_URL}/export`);
