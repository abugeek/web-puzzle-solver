import { fetchProbabilities, fetchStrategy, checkCombinationApi, toggleCombinationApi, fetchCombinations, resetAllApi, exportDataApi } from '../utils/api.js';
import { showSuccess, showError } from '../utils/dom.js';
import { getCurrentPuzzle } from '../state.js';

export function initPuzzleSolver() {
    // Initial display updates
    updateProbabilitiesDisplay();
    updateStrategyDisplay();

    // Event listeners for buttons
    document.getElementById('resetProgressBtn').addEventListener('click', resetAll);
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('refreshStrategyBtn').addEventListener('click', updateStrategyDisplay);
    document.getElementById('toggleCombinationsBtn').addEventListener('click', toggleAllCombinations);

    // Event delegation for recommended numbers
    document.getElementById('recommendedNumbers').addEventListener('click', (event) => {
        const item = event.target.closest('.recommended-item');
        if (item) {
            const key = item.dataset.key;
            const value = item.dataset.value;
            checkCombination(key, value);
        }
    });

    // Event delegation for phone grid combinations
    document.getElementById('phoneGrid').addEventListener('click', (event) => {
        const item = event.target.closest('.phone-item');
        if (item) {
            const key = item.dataset.key;
            toggleCombination(key);
        }
    });
}

export async function updateProbabilitiesDisplay() {
    try {
        const stats = await fetchProbabilities();

        document.getElementById('totalCount').textContent = stats.total;
        document.getElementById('remainingCount').textContent = stats.remaining;
        document.getElementById('probNext').textContent = stats.probability_next + '%';
        document.getElementById('probWithin5').textContent = stats.probability_within_5 + '%';
        document.getElementById('expectedAttempts').textContent = stats.expected_attempts;

        const checkedPercent = stats.total > 0 ? (stats.checked / stats.total) * 100 : 0;
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = checkedPercent + '%';
        progressBar.textContent = Math.round(checkedPercent) + '% Checked';
    } catch (error) {
        console.error('Error updating probabilities:', error);
    }
}

export async function updateStrategyDisplay() {
    try {
        const container = document.getElementById('recommendedNumbers');
        container.innerHTML = '<div class="loading">Loading strategy...</div>'; // Show loading state

        const strategy = await fetchStrategy();

        if (strategy.strategy === 'exhausted') {
            container.innerHTML = '<div class="alert alert-info">🎉 All possibilities checked!</div>';
            return;
        }

        let html = '';
        strategy.recommended.forEach((item, index) => {
            html += `
                <div class="recommended-item" data-key="${item.key}" data-value="${item.value}">
                    <div>
                        <div style="font-size: 1.2em;">${item.value}</div>
                    </div>
                    <div class="priority-badge">Priority ${index + 1}</div>
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading strategy:', error);
        container.innerHTML = '<div class="alert alert-danger">Error loading strategy.</div>';
    }
}

async function checkCombination(key, value) {
    if (!confirm(`Mark ${value} as checked?`)) return;

    try {
        const result = await checkCombinationApi(key);

        if (result.success) {
            const isCorrect = confirm('Was this CORRECT? ✅');

            if (isCorrect) {
                showSuccess(`🎉 Found it!\n\nCorrect: ${value}\nAttempts: ${result.stats.checked}`);
            }

            await updateProbabilitiesDisplay();
            await updateStrategyDisplay();

            const card = document.getElementById('combinationsCard');
            if (card.style.display !== 'none') {
                await loadCombinations();
            }
        }
    } catch (error) {
        console.error('Error checking combination:', error);
    }
}

async function toggleCombination(key) {
    const item = document.querySelector(`[data-key="${key}"]`);
    const isChecked = item.classList.contains('checked');

    try {
        const result = await toggleCombinationApi(key, isChecked);

        if (result.success) {
            item.classList.toggle('checked');
            item.classList.toggle('unchecked');
            item.querySelector('.phone-status').textContent = isChecked ? '✓ Unchecked' : '✗ Checked';

            await updateProbabilitiesDisplay();
            await updateStrategyDisplay();
        }
    } catch (error) {
        console.error('Error toggling combination:', error);
    }
}

async function loadCombinations() {
    try {
        const grid = document.getElementById('phoneGrid');
        grid.innerHTML = '<div class="loading">Loading combinations...</div>'; // Show loading state

        const data = await fetchCombinations();

        let html = '';
        data.combinations.forEach(combo => {
            const checkedClass = combo.checked ? 'checked' : 'unchecked';
            const statusText = combo.checked ? '✗ Checked' : '✓ Unchecked';

            html += `
                <div class="phone-item ${checkedClass}" data-key="${combo.key}">
                    <div class="phone-number">${combo.value}</div>
                    <div class="phone-status">${statusText}</div>
                </div>
            `;
        });

        grid.innerHTML = html;
    } catch (error) {
        console.error('Error loading combinations:', error);
        document.getElementById('phoneGrid').innerHTML = '<div class="alert alert-danger">Error loading combinations.</div>';
    }
}

async function toggleAllCombinations() {
    const card = document.getElementById('combinationsCard');

    if (card.style.display === 'none') {
        card.style.display = 'block';
        await loadCombinations();
        card.scrollIntoView({ behavior: 'smooth' });
    } else {
        card.style.display = 'none';
    }
}

async function resetAll() {
    if (!confirm('Reset all progress?')) return;

    try {
        await resetAllApi();
        showSuccess('✅ Reset complete!');
        await updateProbabilitiesDisplay();
        await updateStrategyDisplay();

        const card = document.getElementById('combinationsCard');
        if (card.style.display !== 'none') {
            await loadCombinations();
        }
    } catch (error) {
        console.error('Error resetting progress:', error);
    }
}

function exportData() {
    exportDataApi();
}
