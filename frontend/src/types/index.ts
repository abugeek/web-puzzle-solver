
export interface Unknown {
  id: string;
  label: string;
  options: string[];
}

export interface Puzzle {
  id: string;
  name: string;
  description: string;
  pattern: string;
  unknowns: Unknown[];
  checked: string[];
  created_at?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  pattern: string;
  unknowns_count: number;
}

export interface Combination {
  value: string;
  key: string;
  combination: { [key: string]: string };
  checked: boolean;
}

export interface Probabilities {
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

export interface Strategy {
  strategy: string;
  recommended: Combination[];
  total_remaining: number;
}
