
export async function fetchCurrentPuzzle() {
    const response = await fetch('/api/puzzle/current');
    return response.json();
}

export async function fetchProbabilities() {
    const response = await fetch('/api/probabilities');
    return response.json();
}

export async function fetchStrategy() {
    const response = await fetch('/api/strategy');
    return response.json();
}

export async function fetchPresets() {
    const response = await fetch('/api/presets');
    return response.json();
}

export async function loadPresetApi(presetId) {
    const response = await fetch(`/api/preset/${presetId}`);
    return response.json();
}

export async function fetchSavedPuzzles() {
    const response = await fetch('/api/puzzle/saved');
    return response.json();
}

export async function loadSavedPuzzleApi(puzzleId) {
    const response = await fetch(`/api/puzzle/load/${puzzleId}`);
    return response.json();
}

export async function deletePuzzleApi(puzzleId) {
    await fetch(`/api/puzzle/delete/${puzzleId}`, { method: 'DELETE' });
}

export async function checkCombinationApi(key) {
    const response = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key })
    });
    return response.json();
}

export async function toggleCombinationApi(key, isChecked) {
    const endpoint = isChecked ? '/api/uncheck' : '/api/check';
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key })
    });
    return response.json();
}

export async function fetchCombinations() {
    const response = await fetch('/api/combinations');
    return response.json();
}

export async function resetAllApi() {
    await fetch('/api/reset', { method: 'POST' });
}

export function exportDataApi() {
    window.open('/api/export', '_blank');
}

export async function createPuzzleApi(puzzleData) {
    const response = await fetch('/api/puzzle/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(puzzleData)
    });
    return response.json();
}
