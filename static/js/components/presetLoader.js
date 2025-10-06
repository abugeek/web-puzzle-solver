
import { fetchPresets, loadPresetApi } from '../utils/api.js';
import { showSuccess, showError, showTab } from '../utils/dom.js';
import { loadInitialData } from '../main.js';

export function initPresetLoader() {
    // No direct event listeners here, as loading is triggered by tab click
}

export async function loadPresets() {
    const grid = document.getElementById('presetsGrid');
    grid.innerHTML = '<div class="loading">Loading presets...</div>'; // Show loading state

    try {
        const data = await fetchPresets();

        if (!data.presets || data.presets.length === 0) {
            grid.innerHTML = '<div class="alert alert-info">No presets available.</div>';
            return;
        }

        let html = '';
        data.presets.forEach(preset => {
            html += `
                <div class="preset-card" data-preset-id="${preset.id}">
                    <h3>${preset.name}</h3>
                    <p>${preset.description}</p>
                    <div class="preset-pattern">${preset.pattern}</div>
                </div>
            `;
        });

        grid.innerHTML = html;

        // Attach event listeners to newly rendered preset cards
        grid.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', (event) => {
                const presetId = event.currentTarget.dataset.presetId;
                loadPreset(presetId);
            });
        });

    } catch (error) {
        console.error('Error loading presets:', error);
        grid.innerHTML = '<div class="alert alert-danger">Error loading presets.</div>';
    }
}

async function loadPreset(presetId) {
    try {
        const data = await loadPresetApi(presetId);

        if (data.success) {
            showSuccess(`✅ Loaded: ${data.puzzle.name}`);
            await loadInitialData(); // Reload current puzzle and stats
            showTab('solve');
        } else {
            showError(data.error || 'Failed to load preset');
        }
    } catch (error) {
        console.error('Error loading preset:', error);
        showError('Failed to load preset');
    }
}
