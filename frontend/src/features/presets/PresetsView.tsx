import { useEffect, useState } from 'react';
import { puzzleApi } from '../../services/api';
import { usePuzzleStore } from '../../store/puzzleStore';
import { Card } from '../../components/ui';
import type { PresetInfo } from '../../types/puzzle';
import './PresetsView.css';

export const PresetsView = () => {
  const [presets, setPresets] = useState<PresetInfo[]>([]);
  const { setCurrentPuzzle, refreshAll } = usePuzzleStore();

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    const data = await puzzleApi.getPresets();
    setPresets(data);
  };

  const handleLoadPreset = async (presetId: string) => {
    const response = await puzzleApi.loadPreset(presetId);
    if (response.success) {
      setCurrentPuzzle(response.puzzle);
      await refreshAll();
      alert(`✅ Loaded: ${response.puzzle.name}`);
    }
  };

  return (
    <div className="presets-view">
      <Card>
        <h2><span>📋</span> Load Preset Puzzle</h2>
        <p>Choose from pre-configured puzzles to get started quickly</p>

        <div className="presets-grid">
          {presets.map((preset) => (
            <div key={preset.id} className="preset-card" onClick={() => handleLoadPreset(preset.id)}>
              <h3>{preset.name}</h3>
              <p>{preset.description}</p>
              <code className="preset-pattern">{preset.pattern}</code>
              <div className="preset-meta">{preset.unknowns_count} unknowns</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
