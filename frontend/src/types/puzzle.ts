/**
 * Core type definitions for the puzzle solver application
 */

export interface Unknown {
  id: string;
  label: string;
  options: string[];
}

export interface Puzzle {
  id: string;
  name: string;
  description?: string;
  pattern: string;
  unknowns: Unknown[];
  checked: string[];
  created_at?: string;
}

export interface Combination {
  value: string;
  key: string;
  combination: Record<string, string>;
  checked: boolean;
}

export interface ProbabilityStats {
  total: number;
  remaining: number;
  checked: number;
  probability_next: number;
  probability_within_3: number;
  probability_within_5: number;
  probability_within_10: number;
  expected_attempts: number;
  best_case: number;
  worst_case: number;
}

export interface StrategyRecommendation {
  value: string;
  key: string;
  combination: Record<string, string>;
}

export interface Strategy {
  strategy: 'optimal' | 'exhausted';
  recommended: StrategyRecommendation[];
  total_remaining: number;
}

export interface PresetInfo {
  id: string;
  name: string;
  description: string;
  pattern: string;
  unknowns_count: number;
}

export interface SavedPuzzleInfo {
  id: string;
  name: string;
  description: string;
  pattern: string;
  unknowns_count: number;
  created_at: string;
}
