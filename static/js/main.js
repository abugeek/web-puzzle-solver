
import { showTab, showSuccess, showError } from './utils/dom.js';
import { fetchCurrentPuzzle } from './utils/api.js';
import { setCurrentPuzzle } from './state.js';
import { initPatternBuilder } from './components/patternBuilder.js';
import { initOptionsGenerator } from './components/optionsGenerator.js';
import { initPuzzleCreator } from './components/puzzleCreator.js';
import { initPuzzleSolver, updateProbabilitiesDisplay, updateStrategyDisplay } from './components/puzzleSolver.js';
import { initPresetLoader, loadPresets } from './components/presetLoader.js';
import { initSavedPuzzles, loadSavedPuzzles } from './components/savedPuzzles.js';


document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Universal Pattern Puzzle Solver initialized');
    loadInitialData();
    setupEventListeners();
    initPatternBuilder();
    initOptionsGenerator();
    initPuzzleCreator();
    initPuzzleSolver();
    initPresetLoader();
    initSavedPuzzles();
});

export async function loadInitialData() {
    try {
        const puzzleData = await fetchCurrentPuzzle();
        setCurrentPuzzle(puzzleData.puzzle);
        document.getElementById('currentPuzzleName').textContent = puzzleData.puzzle.name;
        document.getElementById('currentPuzzlePattern').textContent = puzzleData.pattern_display;

        await updateProbabilitiesDisplay();
        await updateStrategyDisplay();

    } catch (error) {
        console.error('Error loading initial data:', error);
        showError('Failed to load initial data.');
    }
}

function setupEventListeners() {
    // Tab switching
    document.getElementById('solveTabBtn').addEventListener('click', () => showTab('solve'));
    document.getElementById('createTabBtn').addEventListener('click', () => showTab('create'));
    document.getElementById('presetsTabBtn').addEventListener('click', () => {
        showTab('presets');
        loadPresets();
    });
    document.getElementById('savedTabBtn').addEventListener('click', () => {
        showTab('saved');
        loadSavedPuzzles();
    });

    // Other event listeners will be added here as components are integrated
}
