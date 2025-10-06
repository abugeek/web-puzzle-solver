import { useEffect, useState } from 'react';
import { usePuzzleStore } from '../../store/puzzleStore';
import { Card, Button, StatCard } from '../../components/ui';
import './SolverView.css';

export const SolverView = () => {
  const {
    probabilities,
    strategy,
    combinations,
    loadProbabilities,
    loadStrategy,
    loadCombinations,
    checkCombination,
    uncheckCombination,
    resetProgress,
  } = usePuzzleStore();

  const [showAllCombinations, setShowAllCombinations] = useState(false);

  useEffect(() => {
    loadProbabilities();
    loadStrategy();
  }, [loadProbabilities, loadStrategy]);

  const handleCheck = async (key: string) => {
    await checkCombination(key);
  };

  const handleUncheck = async (key: string) => {
    await uncheckCombination(key);
  };

  const handleToggleCombination = async (key: string, isChecked: boolean) => {
    if (isChecked) {
      await handleUncheck(key);
    } else {
      await handleCheck(key);
    }
  };

  const handleReset = async () => {
    if (confirm('Reset all progress? This will uncheck all combinations.')) {
      await resetProgress();
    }
  };

  const handleLoadCombinations = async () => {
    await loadCombinations();
    setShowAllCombinations(true);
  };

  return (
    <div className="solver-view">
      <div className="solver-grid">
        {/* Stats Card */}
        <Card>
          <h2><span>📊</span> Probability Analysis</h2>
          
          {probabilities && (
            <>
              <div className="stats-grid">
                <StatCard label="Total Options" value={probabilities.total} />
                <StatCard label="Remaining" value={probabilities.remaining} variant="success" />
                <StatCard label="Checked" value={probabilities.checked} variant="danger" />
                <StatCard label="Next Try %" value={`${probabilities.probability_next}%`} variant="warning" />
              </div>

              <div className="probability-details">
                <div className="prob-row">
                  <span>Within 3 tries:</span>
                  <strong>{probabilities.probability_within_3}%</strong>
                </div>
                <div className="prob-row">
                  <span>Within 5 tries:</span>
                  <strong>{probabilities.probability_within_5}%</strong>
                </div>
                <div className="prob-row">
                  <span>Within 10 tries:</span>
                  <strong>{probabilities.probability_within_10}%</strong>
                </div>
              </div>

              <div className="expected-attempts">
                <strong>Expected Attempts:</strong> {probabilities.expected_attempts} tries (average)
              </div>

              <div className="button-group">
                <Button variant="danger" onClick={handleReset}>
                  🔄 Reset Progress
                </Button>
              </div>
            </>
          )}
        </Card>

        {/* Strategy Card */}
        <Card>
          <h2><span>🎯</span> Optimal Strategy</h2>
          
          <div className="strategy-info">
            Try these numbers first for highest efficiency!
          </div>

          {strategy && strategy.recommended.length > 0 ? (
            <div className="recommended-list">
              {strategy.recommended.map((rec, index) => (
                <div
                  key={rec.key}
                  className="recommended-item"
                  onClick={() => handleCheck(rec.key)}
                >
                  <div className="recommended-content">
                    <span className="priority-badge">Priority {index + 1}</span>
                    <code className="recommended-value">{rec.value}</code>
                  </div>
                  <span className="click-hint">Click to mark as checked →</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-strategy">
              {strategy?.strategy === 'exhausted' ? 'All combinations checked!' : 'No strategy available'}
            </div>
          )}

          <div className="button-group">
            <Button variant="primary" onClick={() => loadStrategy()}>
              🔄 Refresh Strategy
            </Button>
            <Button variant="success" onClick={handleLoadCombinations}>
              📋 Show All Numbers
            </Button>
          </div>
        </Card>
      </div>

      {/* All Combinations */}
      {showAllCombinations && combinations.length > 0 && (
        <Card className="combinations-card">
          <h2><span>📞</span> All Possible Numbers</h2>
          <p className="combinations-hint">Click any number to toggle checked/unchecked</p>

          <div className="combinations-grid">
            {combinations.map((combo) => (
              <div
                key={combo.key}
                className={`combination-item ${combo.checked ? 'checked' : 'unchecked'}`}
                onClick={() => handleToggleCombination(combo.key, combo.checked)}
              >
                <div className="combo-value">{combo.value}</div>
                <div className="combo-status">{combo.checked ? '✗ Checked' : '✓ Available'}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
