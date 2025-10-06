
import { fetchSavedPuzzles, loadSavedPuzzleApi, deletePuzzleApi } from '../utils/api.js';
import { showSuccess, showError, showTab } from '../utils/dom.js';
import { loadInitialData } from '../main.js';

export function initSavedPuzzles() {
    // No direct event listeners here, as loading is triggered by tab click
}

export async function loadSavedPuzzles() {
    const container = document.getElementById('savedPuzzlesList');
    container.innerHTML = '<div class="loading">Loading saved puzzles...</div>'; // Show loading state

    try {
        const data = await fetchSavedPuzzles();

        if (!data.puzzles || data.puzzles.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No saved puzzles yet!</div>';
            return;
        }

        let html = '';
        data.puzzles.forEach(puzzle => {
            html += `
                <div class="saved-puzzle-item">
                    <div class="saved-puzzle-info">
                        <h4>${puzzle.name}</h4>
                        <p style="font-family: 'Courier New', monospace; color: #764ba2;">${puzzle.pattern}</p>
                        <small>${puzzle.unknowns_count} unknowns • Created: ${new Date(puzzle.created_at).toLocaleDateString()}</small>
                    </div>
                    <div class="saved-puzzle-actions">
                        <button class="btn btn-primary btn-small" data-action="load" data-puzzle-id="${puzzle.id}">📂 Load</button>
                        <button class="btn btn-danger btn-small" data-action="delete" data-puzzle-id="${puzzle.id}">🗑️ Delete</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Attach event listeners using delegation
        container.querySelectorAll('.saved-puzzle-actions button').forEach(button => {
            button.addEventListener('click', (event) => {
                const puzzleId = event.target.dataset.puzzleId;
                const action = event.target.dataset.action;

                if (action === 'load') {
                    loadSavedPuzzle(puzzleId);
                } else if (action === 'delete') {
                    deletePuzzle(puzzleId);
                }
            });
        });

    } catch (error) {
        console.error('Error loading saved puzzles:', error);
        container.innerHTML = '<div class="alert alert-danger">Error loading puzzles. Check console for details.</div>';
    }
}

async function loadSavedPuzzle(puzzleId) {
    try {
        const data = await loadSavedPuzzleApi(puzzleId);

        if (data.success) {
            showSuccess(`✅ Loaded: ${data.puzzle.name}`);
            await loadInitialData(); // Reload current puzzle and stats
            showTab('solve');
        } else {
            showError(data.error || 'Failed to load saved puzzle');
        }
    } catch (error) {
        console.error('Error loading saved puzzle:', error);
        showError('Failed to load saved puzzle');
    }
}

async function deletePuzzle(puzzleId) {
    if (!confirm('Delete this puzzle?')) return;

    try {
        await deletePuzzleApi(puzzleId);
        showSuccess('✅ Deleted');
        await loadSavedPuzzles(); // Refresh the list
    } catch (error) {
        console.error('Error deleting puzzle:', error);
        showError('Failed to delete puzzle');
    }
}
