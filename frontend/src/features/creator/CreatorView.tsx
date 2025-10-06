import { useState, useEffect } from 'react';
import { usePuzzleStore } from '../../store/puzzleStore';
import { puzzleApi } from '../../services/api';
import { Card, Button, Input } from '../../components/ui';
import type { Unknown } from '../../types/puzzle';
import { FORM, LIMITS, MESSAGES, PATTERN_PART_TYPES } from '../../config/constants';
import './CreatorView.css';

interface PatternPart {
  type: 'text' | 'unknown';
  id: string;
  value?: string;
  label?: string;
  options?: string[];
}

export const CreatorView = () => {
  const { setCurrentPuzzle, refreshAll, editingPuzzle, setEditingPuzzle } = usePuzzleStore();
  const [puzzleName, setPuzzleName] = useState('');
  const [puzzleDescription, setPuzzleDescription] = useState('');
  const [patternParts, setPatternParts] = useState<PatternPart[]>([]);
  const [unknownCounter, setUnknownCounter] = useState(0);
  const [selectedUnknownId, setSelectedUnknownId] = useState<string | null>(null);

  // Options generator state
  const [generatorTab, setGeneratorTab] = useState<'range' | 'list' | 'paste'>(FORM.DEFAULT_GENERATOR_TAB);
  const [rangeFrom, setRangeFrom] = useState<string>(FORM.DEFAULT_RANGE.FROM);
  const [rangeTo, setRangeTo] = useState<string>(FORM.DEFAULT_RANGE.TO);
  const [rangePad, setRangePad] = useState(false);
  const [listValues, setListValues] = useState('');
  const [pasteValues, setPasteValues] = useState('');

  // Load puzzle data when editing
  useEffect(() => {
    if (editingPuzzle) {
      setPuzzleName(editingPuzzle.name);
      setPuzzleDescription(editingPuzzle.description || '');

      // Parse pattern and rebuild pattern parts
      const parts: PatternPart[] = [];
      const pattern = editingPuzzle.pattern;
      let currentText = '';
      let i = 0;

      while (i < pattern.length) {
        if (pattern[i] === '{') {
          // Save any accumulated text
          if (currentText) {
            parts.push({ type: 'text', id: Date.now().toString() + parts.length, value: currentText });
            currentText = '';
          }

          // Find closing brace
          const closeIndex = pattern.indexOf('}', i);
          const unknownId = pattern.substring(i + 1, closeIndex);

          // Find the unknown data
          const unknownData = editingPuzzle.unknowns.find(u => u.id === unknownId);
          if (unknownData) {
            parts.push({
              type: 'unknown',
              id: unknownData.id,
              label: unknownData.label,
              options: unknownData.options,
            });
          }

          i = closeIndex + 1;
        } else {
          currentText += pattern[i];
          i++;
        }
      }

      // Save any remaining text
      if (currentText) {
        parts.push({ type: 'text', id: Date.now().toString() + parts.length, value: currentText });
      }

      setPatternParts(parts);

      // Set unknown counter to highest U number
      const unknownNumbers = editingPuzzle.unknowns
        .map(u => parseInt(u.id.replace('U', '')))
        .filter(n => !isNaN(n));
      const maxUnknown = unknownNumbers.length > 0 ? Math.max(...unknownNumbers) : 0;
      setUnknownCounter(maxUnknown);
    }
  }, [editingPuzzle]);

  const addTextPart = () => {
    const value = prompt(MESSAGES.PROMPT.ENTER_TEXT);
    if (value) {
      setPatternParts([...patternParts, { type: PATTERN_PART_TYPES.TEXT, id: Date.now().toString(), value }]);
    }
  };

  const addUnknownPart = () => {
    const newCounter = unknownCounter + 1;
    const newPart: PatternPart = {
      type: PATTERN_PART_TYPES.UNKNOWN,
      id: `${FORM.UNKNOWN_ID_PREFIX}${newCounter}`,
      label: `Unknown ${newCounter}`,
      options: [],
    };
    setPatternParts([...patternParts, newPart]);
    setUnknownCounter(newCounter);
    setSelectedUnknownId(newPart.id);
  };

  const deletePart = (id: string) => {
    setPatternParts(patternParts.filter(p => p.id !== id));
    if (selectedUnknownId === id) {
      setSelectedUnknownId(null);
    }
  };

  const clearPattern = () => {
    if (confirm(MESSAGES.CONFIRM.CLEAR_PATTERN)) {
      setPatternParts([]);
      setSelectedUnknownId(null);
    }
  };

  const selectUnknown = (id: string) => {
    setSelectedUnknownId(id);
  };

  const generateOptions = (): string[] => {
    if (generatorTab === FORM.GENERATOR_TABS.RANGE) {
      const from = parseInt(rangeFrom);
      const to = parseInt(rangeTo);
      const options: string[] = [];

      for (let i = from; i <= to; i++) {
        const value = rangePad ? i.toString().padStart(rangeFrom.length, '0') : i.toString();
        options.push(value);
      }

      return options;
    } else if (generatorTab === FORM.GENERATOR_TABS.LIST) {
      return listValues.split(',').map(v => v.trim()).filter(v => v);
    } else {
      return pasteValues.split('\n').map(v => v.trim()).filter(v => v);
    }
  };

  const applyOptionsToSelected = () => {
    if (!selectedUnknownId) {
      alert(MESSAGES.ERROR.SELECT_UNKNOWN);
      return;
    }

    const options = generateOptions();

    if (options.length === 0) {
      alert(MESSAGES.ERROR.NO_OPTIONS_GENERATED);
      return;
    }

    setPatternParts(patternParts.map(part => {
      if (part.id === selectedUnknownId && part.type === PATTERN_PART_TYPES.UNKNOWN) {
        return { ...part, options };
      }
      return part;
    }));

    const partLabel = patternParts.find(p => p.id === selectedUnknownId)?.label || '';
    alert(MESSAGES.SUCCESS.OPTIONS_APPLIED(options.length, partLabel));
  };

  const deleteOption = (unknownId: string, optionToDelete: string) => {
    setPatternParts(patternParts.map(part => {
      if (part.id === unknownId && part.type === PATTERN_PART_TYPES.UNKNOWN) {
        const updatedOptions = (part.options || []).filter(opt => opt !== optionToDelete);
        return { ...part, options: updatedOptions };
      }
      return part;
    }));
  };

  const buildPattern = (): string => {
    return patternParts.map(part => {
      if (part.type === PATTERN_PART_TYPES.TEXT) {
        return part.value;
      } else {
        return `{${part.id}}`;
      }
    }).join('');
  };

  const buildPreview = (): string => {
    return patternParts.map(part => {
      if (part.type === PATTERN_PART_TYPES.TEXT) {
        return part.value;
      } else {
        const optionLength = part.options && part.options.length > 0
          ? part.options[0].length
          : LIMITS.OPTIONS_DISPLAY_UNKNOWN;
        return 'X'.repeat(optionLength);
      }
    }).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!puzzleName) {
      alert(MESSAGES.ERROR.PUZZLE_NAME_REQUIRED);
      return;
    }

    if (patternParts.length === 0) {
      alert(MESSAGES.ERROR.PATTERN_REQUIRED);
      return;
    }

    const unknowns: Unknown[] = patternParts
      .filter(p => p.type === PATTERN_PART_TYPES.UNKNOWN)
      .map(p => ({
        id: p.id,
        label: p.label || p.id,
        options: p.options || [],
      }));

    if (unknowns.length === 0) {
      alert(MESSAGES.ERROR.UNKNOWN_REQUIRED);
      return;
    }

    const missingOptions = unknowns.find(u => u.options.length === 0);
    if (missingOptions) {
      alert(MESSAGES.ERROR.OPTIONS_REQUIRED(missingOptions.label));
      return;
    }

    try {
      const puzzleData = {
        name: puzzleName,
        description: puzzleDescription,
        pattern: buildPattern(),
        unknowns,
      };

      if (editingPuzzle) {
        // Update existing puzzle
        const response = await puzzleApi.update(editingPuzzle.id, puzzleData);

        if (response.success) {
          setCurrentPuzzle(response.puzzle);
          await refreshAll();
          alert(MESSAGES.SUCCESS.PUZZLE_UPDATED(puzzleName));
          setEditingPuzzle(null);
        }
      } else {
        // Create new puzzle
        const response = await puzzleApi.create(puzzleData);

        if (response.success) {
          setCurrentPuzzle(response.puzzle);
          await refreshAll();
          alert(MESSAGES.SUCCESS.PUZZLE_CREATED(puzzleName));
        }
      }

      // Reset form
      setPuzzleName('');
      setPuzzleDescription('');
      setPatternParts([]);
      setUnknownCounter(0);
      setSelectedUnknownId(null);
    } catch (error) {
      const errorMessage = editingPuzzle
        ? MESSAGES.ERROR.UPDATE_FAILED
        : MESSAGES.ERROR.CREATE_FAILED;
      alert(`❌ ${errorMessage}`);
      console.error(error);
    }
  };

  const currentOptions = generateOptions();
  const selectedPart = patternParts.find(p => p.id === selectedUnknownId);

  return (
    <div className="creator-view">
      <Card>
        <h2>
          <span>{editingPuzzle ? '✏️' : '➕'}</span> {editingPuzzle ? 'Edit Puzzle' : 'Create Custom Puzzle'}
        </h2>
        {editingPuzzle && (
          <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fef3c7', borderRadius: '0.5rem', border: '2px solid #d97706' }}>
            <strong>Editing:</strong> {editingPuzzle.name} | <button type="button" onClick={() => { setEditingPuzzle(null); setPuzzleName(''); setPuzzleDescription(''); setPatternParts([]); setUnknownCounter(0); setSelectedUnknownId(null); }} style={{ background: 'none', border: 'none', color: '#d97706', textDecoration: 'underline', cursor: 'pointer' }}>Cancel editing</button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Name & Description */}
          <Input
            label="📝 Puzzle Name"
            placeholder="e.g., Find My Friend's Number"
            value={puzzleName}
            onChange={(e) => setPuzzleName(e.target.value)}
            hint="Give your puzzle a memorable name"
            required
          />

          <Input
            label="📄 Description (optional)"
            placeholder="e.g., Finding the missing digits in a phone number"
            value={puzzleDescription}
            onChange={(e) => setPuzzleDescription(e.target.value)}
          />

          {/* Step 2: Pattern Builder */}
          <div className="form-group">
            <label className="form-label">🔧 Build Your Pattern</label>
            <div className="form-hint">Create your pattern by adding text and unknown parts</div>

            <div className="pattern-builder">
              <div className="pattern-parts">
                {patternParts.length === 0 ? (
                  <div className="pattern-placeholder">
                    Start building your pattern →
                  </div>
                ) : (
                  patternParts.map((part) => (
                    <div
                      key={part.id}
                      className={`pattern-part ${part.type} ${selectedUnknownId === part.id ? 'selected' : ''}`}
                      onClick={() => part.type === 'unknown' && selectUnknown(part.id)}
                    >
                      {part.type === 'text' ? (
                        <span>{part.value}</span>
                      ) : (
                        <span>{part.label} ({part.options?.length || 0} opts)</span>
                      )}
                      <span className="pattern-part-delete" onClick={() => deletePart(part.id)}>
                        ×
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="add-part-buttons">
                <Button type="button" variant="primary" size="small" onClick={addTextPart}>
                  ➕ Add Text
                </Button>
                <Button type="button" variant="warning" size="small" onClick={addUnknownPart}>
                  ❓ Add Unknown
                </Button>
                <Button type="button" variant="danger" size="small" onClick={clearPattern}>
                  🗑️ Clear All
                </Button>
              </div>

              {patternParts.length > 0 && (
                <div className="pattern-preview">
                  <div className="pattern-preview-label">Preview:</div>
                  <div className="pattern-preview-text">{buildPreview()}</div>
                  <div className="pattern-preview-label" style={{ marginTop: '0.5rem' }}>
                    Pattern: <code>{buildPattern()}</code>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Options Generator */}
          {selectedPart && (
            <div className="form-group">
              <label className="form-label">
                🔢 Add Options for: {selectedPart.label}
              </label>
              <div className="form-hint">
                Generate the list of possible values for this unknown part
              </div>

              <div className="options-generator">
                <div className="generator-tabs">
                  <div
                    className={`generator-tab ${generatorTab === 'range' ? 'active' : ''}`}
                    onClick={() => setGeneratorTab('range')}
                  >
                    📊 Number Range
                  </div>
                  <div
                    className={`generator-tab ${generatorTab === 'list' ? 'active' : ''}`}
                    onClick={() => setGeneratorTab('list')}
                  >
                    📝 Custom List
                  </div>
                  <div
                    className={`generator-tab ${generatorTab === 'paste' ? 'active' : ''}`}
                    onClick={() => setGeneratorTab('paste')}
                  >
                    📄 Paste List
                  </div>
                </div>

                {generatorTab === 'range' && (
                  <div className="generator-content">
                    <div className="range-inputs">
                      <Input
                        label="From:"
                        type="number"
                        value={rangeFrom}
                        onChange={(e) => setRangeFrom(e.target.value)}
                      />
                      <Input
                        label="To:"
                        type="number"
                        value={rangeTo}
                        onChange={(e) => setRangeTo(e.target.value)}
                      />
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                      <label>
                        <input
                          type="checkbox"
                          checked={rangePad}
                          onChange={(e) => setRangePad(e.target.checked)}
                        />
                        {' '}Pad with zeros (e.g., 001, 002, 003)
                      </label>
                    </div>
                  </div>
                )}

                {generatorTab === 'list' && (
                  <div className="generator-content">
                    <Input
                      placeholder="e.g., 010, 112, 113, 342, 345"
                      value={listValues}
                      onChange={(e) => setListValues(e.target.value)}
                      hint="Enter values separated by commas"
                    />
                  </div>
                )}

                {generatorTab === 'paste' && (
                  <div className="generator-content">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="010&#10;112&#10;113&#10;342&#10;345"
                      value={pasteValues}
                      onChange={(e) => setPasteValues(e.target.value)}
                    />
                    <div className="form-hint">Paste your list (one value per line)</div>
                  </div>
                )}

                {/* Options Preview */}
                <div className="options-preview">
                  <div className="options-count">{currentOptions.length} options</div>
                  <div className="options-list">
                    {currentOptions.length === 0 ? (
                      <div style={{ color: 'var(--gray-500)' }}>{MESSAGES.PLACEHOLDER.OPTIONS_PREVIEW}</div>
                    ) : (
                      currentOptions.slice(0, LIMITS.PREVIEW_OPTIONS).map((opt, i) => (
                        <div key={i} className="option-tag">{opt}</div>
                      ))
                    )}
                    {currentOptions.length > LIMITS.PREVIEW_OPTIONS && (
                      <div className="option-tag">... and {currentOptions.length - LIMITS.PREVIEW_OPTIONS} more</div>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="success"
                  onClick={applyOptionsToSelected}
                  style={{ marginTop: '1rem' }}
                >
                  ✅ Apply Options to {selectedPart.label}
                </Button>

                {/* Currently Applied Options */}
                {selectedPart.options && selectedPart.options.length > 0 && (
                  <div className="applied-options-section">
                    <div className="applied-options-header">
                      <strong>Currently Applied Options ({selectedPart.options.length}):</strong>
                    </div>
                    <div className="applied-options-list">
                      {selectedPart.options.map((opt, index) => (
                        <div key={index} className="applied-option-tag">
                          <span>{opt}</span>
                          <span
                            className="applied-option-delete"
                            onClick={() => deleteOption(selectedPart.id, opt)}
                            title="Delete this option"
                          >
                            ×
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="button-group">
            <Button type="submit" variant="success">
              {editingPuzzle ? '💾 Save Changes' : '✅ Create Puzzle & Start Solving'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
