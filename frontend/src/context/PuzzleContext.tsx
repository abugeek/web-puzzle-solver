
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Puzzle, Probabilities, Strategy, Combination, Preset } from '../types';
import * as api from '../api/api';

interface PuzzleContextType {
  puzzle: Puzzle | null;
  probabilities: Probabilities | null;
  strategy: Strategy | null;
  combinations: Combination[] | null;
  presets: Preset[] | null;
  savedPuzzles: Puzzle[] | null;
  loading: boolean;
  error: Error | null;
  loadPuzzle: (puzzleId: string) => Promise<void>;
  loadSavedPuzzle: (puzzleId: string) => Promise<void>;
  createPuzzle: (data: { name: string; pattern: string; unknowns: any[] }) => Promise<void>;
  deletePuzzle: (puzzleId: string) => Promise<void>;
  checkCombination: (key: string) => Promise<void>;
  uncheckCombination: (key: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  refreshAll: () => Promise<void>;
}

export const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [probabilities, setProbabilities] = useState<Probabilities | null>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [combinations, setCombinations] = useState<Combination[] | null>(null);
  const [presets, setPresets] = useState<Preset[] | null>(null);
  const [savedPuzzles, setSavedPuzzles] = useState<Puzzle[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshAll = async () => {
    try {
      setLoading(true);
      const [puzzleData, probabilitiesData, strategyData, combinationsData, presetsData, savedPuzzlesData] = await Promise.all([
        api.getCurrentPuzzle(),
        api.getProbabilities(),
        api.getStrategy(),
        api.getCombinations(),
        api.getPresets(),
        api.getSavedPuzzles(),
      ]);
      setPuzzle(puzzleData.puzzle);
      setProbabilities(probabilitiesData);
      setStrategy(strategyData);
      setCombinations(combinationsData.combinations);
      setPresets(presetsData.presets);
      setSavedPuzzles(savedPuzzlesData.puzzles);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const loadPuzzle = async (presetId: string) => {
    try {
      setLoading(true);
      await api.loadPreset(presetId);
      await refreshAll();
    } catch (err) {
      setError(err as Error);
    }
  };

  const loadSavedPuzzle = async (puzzleId: string) => {
    try {
      setLoading(true);
      await api.loadSavedPuzzle(puzzleId);
      await refreshAll();
    } catch (err) {
      setError(err as Error);
    }
  };

  const createPuzzle = async (data: { name: string; pattern: string; unknowns: any[] }) => {
    try {
      setLoading(true);
      await api.createPuzzle(data);
      await refreshAll();
    } catch (err) {
      setError(err as Error);
    }
  };

  const deletePuzzle = async (puzzleId: string) => {
    try {
      setLoading(true);
      await api.deletePuzzle(puzzleId);
      await refreshAll();
    } catch (err) {
      setError(err as Error);
    }
  };

  const checkCombination = async (key: string) => {
    try {
      const { stats } = await api.checkCombination(key);
      setProbabilities(stats);
      if (combinations) {
        setCombinations(combinations.map(c => c.key === key ? { ...c, checked: true } : c));
      }
      const newStrategy = await api.getStrategy();
      setStrategy(newStrategy);
    } catch (err) {
      setError(err as Error);
    }
  };

  const uncheckCombination = async (key: string) => {
    try {
      const { stats } = await api.uncheckCombination(key);
      setProbabilities(stats);
      if (combinations) {
        setCombinations(combinations.map(c => c.key === key ? { ...c, checked: false } : c));
      }
      const newStrategy = await api.getStrategy();
      setStrategy(newStrategy);
    } catch (err) {
      setError(err as Error);
    }
  };

  const resetProgress = async () => {
    try {
      const { stats } = await api.resetProgress();
      setProbabilities(stats);
      if (combinations) {
        setCombinations(combinations.map(c => ({ ...c, checked: false })));
      }
      const newStrategy = await api.getStrategy();
      setStrategy(newStrategy);
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <PuzzleContext.Provider
      value={{
        puzzle,
        probabilities,
        strategy,
        combinations,
        presets,
        savedPuzzles,
        loading,
        error,
        loadPuzzle,
        loadSavedPuzzle,
        createPuzzle,
        deletePuzzle,
        checkCombination,
        uncheckCombination,
        resetProgress,
        refreshAll,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};
