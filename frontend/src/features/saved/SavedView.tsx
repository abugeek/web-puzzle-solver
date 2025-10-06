import { useEffect, useState } from 'react';
import { puzzleApi } from '../../services/api';
import { usePuzzleStore } from '../../store/puzzleStore';
import { useTranslation } from '../../i18n';
import { Card, Button } from '../../components/ui';
import type { SavedPuzzleInfo } from '../../types/puzzle';
import './SavedView.css';

export const SavedView = () => {
  const [savedPuzzles, setSavedPuzzles] = useState<SavedPuzzleInfo[]>([]);
  const { setCurrentPuzzle, refreshAll, setEditingPuzzle } = usePuzzleStore();
  const { t } = useTranslation();

  useEffect(() => {
    loadSavedPuzzles();
  }, []);

  const loadSavedPuzzles = async () => {
    const data = await puzzleApi.getSaved();
    setSavedPuzzles(data);
  };

  const handleLoad = async (puzzleId: string) => {
    const response = await puzzleApi.loadSaved(puzzleId);
    if (response.success) {
      setCurrentPuzzle(response.puzzle);
      await refreshAll();
      alert(t.messages.success.puzzleLoaded(response.puzzle.name));
    }
  };

  const handleEdit = async (puzzleId: string) => {
    const response = await puzzleApi.loadSaved(puzzleId);
    if (response.success) {
      setEditingPuzzle(response.puzzle);
    }
  };

  const handleDelete = async (puzzleId: string) => {
    if (confirm(t.messages.confirm.deletePuzzle)) {
      await puzzleApi.delete(puzzleId);
      await loadSavedPuzzles();
      alert(t.messages.success.puzzleDeleted);
    }
  };

  return (
    <div className="saved-view">
      <Card>
        <h2><span>💾</span> {t.saved.title}</h2>
        <p>{t.saved.subtitle}</p>

        {savedPuzzles.length === 0 ? (
          <div className="no-puzzles">{t.saved.noPuzzles}</div>
        ) : (
          <div className="saved-list">
            {savedPuzzles.map((puzzle) => (
              <div key={puzzle.id} className="saved-item">
                <div className="saved-info">
                  <h4>{puzzle.name}</h4>
                  <p><code>{puzzle.pattern}</code></p>
                  <small>{puzzle.unknowns_count} {t.presets.unknowns} • {t.saved.created}: {new Date(puzzle.created_at).toLocaleDateString()}</small>
                </div>
                <div className="saved-actions">
                  <Button size="small" variant="primary" onClick={() => handleLoad(puzzle.id)}>
                    📂 {t.common.load}
                  </Button>
                  <Button size="small" variant="warning" onClick={() => handleEdit(puzzle.id)}>
                    ✏️ {t.common.edit}
                  </Button>
                  <Button size="small" variant="danger" onClick={() => handleDelete(puzzle.id)}>
                    🗑️ {t.common.delete}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
