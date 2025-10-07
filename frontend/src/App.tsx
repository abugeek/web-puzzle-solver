/**
 * Main App Component - Tab-based navigation
 */
import { useEffect, useState } from 'react';
import { usePuzzleStore } from './store/puzzleStore';
import { useTranslation } from './i18n';
import { Button } from './components/ui';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { SolverView } from './features/solver/SolverView';
import { CreatorView } from './features/creator/CreatorView';
import { PresetsView } from './features/presets/PresetsView';
import { SavedView } from './features/saved/SavedView';
import { UI } from './config/constants';
import './App.css';

type TabType = typeof UI.TABS[keyof typeof UI.TABS];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>(UI.DEFAULT_TAB);
  const { currentPuzzle, editingPuzzle, refreshAll } = usePuzzleStore();
  const { t } = useTranslation();

  useEffect(() => {
    refreshAll();
  }, []);

  // Switch to Create tab when editingPuzzle is set
  useEffect(() => {
    if (editingPuzzle) {
      setActiveTab(UI.TABS.CREATE);
    }
  }, [editingPuzzle]);

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h1>📱 {t.header.title}</h1>
              <p>{t.header.subtitle}</p>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Navigation Tabs */}
          <div className="nav-tabs">
            <Button
              variant={activeTab === UI.TABS.SOLVE ? 'primary' : 'info'}
              onClick={() => setActiveTab(UI.TABS.SOLVE)}
            >
              🎯 {t.tabs.solve}
            </Button>
            <Button
              variant={activeTab === UI.TABS.CREATE ? 'success' : 'info'}
              onClick={() => setActiveTab(UI.TABS.CREATE)}
            >
              ➕ {t.tabs.create}
            </Button>
            <Button
              variant={activeTab === UI.TABS.PRESETS ? 'info' : 'info'}
              onClick={() => setActiveTab(UI.TABS.PRESETS)}
            >
              📋 {t.tabs.presets}
            </Button>
            <Button
              variant={activeTab === UI.TABS.SAVED ? 'warning' : 'info'}
              onClick={() => setActiveTab(UI.TABS.SAVED)}
            >
              💾 {t.tabs.saved}
            </Button>
          </div>

          {/* Current Puzzle Info */}
          {currentPuzzle && (
            <div className="current-puzzle-info">
              <strong>Current Puzzle:</strong> {currentPuzzle.name}<br />
              <strong>Pattern:</strong> <code>{currentPuzzle.pattern}</code>
            </div>
          )}
        </header>

        {/* Tab Content */}
        <main className="tab-content">
          {activeTab === UI.TABS.SOLVE && <SolverView />}
          {activeTab === UI.TABS.CREATE && <CreatorView />}
          {activeTab === UI.TABS.PRESETS && <PresetsView />}
          {activeTab === UI.TABS.SAVED && <SavedView />}
        </main>
      </div>
    </div>
  );
}

export default App;
