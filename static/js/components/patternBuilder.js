
import { getPatternParts, setPatternParts, addPatternPartState, updatePatternPartState, deletePatternPartState, clearPatternPartsState, getUnknownCounter, incrementUnknownCounter, resetUnknownCounter } from '../state.js';
import { showError } from '../utils/dom.js';

export function initPatternBuilder() {
    // Initial render if there are any parts (e.g., from a loaded puzzle)
    renderPatternBuilder();
    updatePatternPreview();

    // Attach event listeners for pattern builder buttons
    document.getElementById('addTextPartBtn').addEventListener('click', () => addPatternPart('text'));
    document.getElementById('addUnknownPartBtn').addEventListener('click', () => addPatternPart('unknown'));
    document.getElementById('clearPatternBtn').addEventListener('click', clearPattern);

    // Event delegation for dynamically added pattern parts
    document.getElementById('patternParts').addEventListener('change', (event) => {
        if (event.target.matches('.pattern-part input')) {
            const index = Array.from(event.target.closest('.pattern-part').parentNode.children).indexOf(event.target.closest('.pattern-part'));
            updatePatternPart(index, event.target.value);
        }
    });
    document.getElementById('patternParts').addEventListener('click', (event) => {
        if (event.target.matches('.pattern-part-delete')) {
            const index = Array.from(event.target.closest('.pattern-part').parentNode.children).indexOf(event.target.closest('.pattern-part'));
            deletePatternPart(index);
        } else if (event.target.closest('.pattern-part.unknown')) {
            const index = Array.from(event.target.closest('.pattern-part').parentNode.children).indexOf(event.target.closest('.pattern-part'));
            editUnknown(index);
        }
    });
}

export function addPatternPart(type) {
    const patternParts = getPatternParts();
    if (type === 'text') {
        addPatternPartState({ type: 'text', value: '' });
    } else {
        const unknownId = `U${incrementUnknownCounter()}`;
        addPatternPartState({
            type: 'unknown',
            id: unknownId,
            label: `Unknown ${getUnknownCounter()}`,
            options: []
        });
    }

    renderPatternBuilder();
    updatePatternPreview();
}

export function renderPatternBuilder() {
    const container = document.getElementById('patternParts');
    const patternParts = getPatternParts();

    if (patternParts.length === 0) {
        container.innerHTML = '<div class="pattern-part" style="opacity: 0.5;">Start building your pattern →</div>';
        return;
    }

    let html = '';
    patternParts.forEach((part, index) => {
        if (part.type === 'text') {
            html += `
                <div class="pattern-part">
                    <input type="text" value="${part.value}"
                           placeholder="Type text..."
                           data-index="${index}">
                    <span class="pattern-part-delete" data-index="${index}">✕</span>
                </div>
            `;
        } else {
            const optionCount = part.options.length;
            const preview = optionCount > 0 ? part.options[0] : 'XX';
            html += `
                <div class="pattern-part unknown" data-index="${index}">
                    ❓ ${preview} (${optionCount} opts)
                    <span class="pattern-part-delete" data-index="${index}">✕</span>
                </div>
            `;
        }
    });

    container.innerHTML = html;
}

export function updatePatternPart(index, value) {
    updatePatternPartState(index, value);
    updatePatternPreview();
}

export function deletePatternPart(index) {
    deletePatternPartState(index);
    renderPatternBuilder();
    updatePatternPreview();
}

export function clearPattern() {
    clearPatternPartsState();
    resetUnknownCounter();
    renderPatternBuilder();
    updatePatternPreview();
}

export function updatePatternPreview() {
    const preview = document.getElementById('patternPreview');
    const patternParts = getPatternParts();

    if (patternParts.length === 0) {
        preview.textContent = '-';
        return;
    }

    let previewText = '';
    patternParts.forEach(part => {
        if (part.type === 'text') {
            previewText += part.value;
        } else {
            if (part.options.length > 0) {
                previewText += 'X'.repeat(part.options[0].length);
            } else {
                previewText += 'XX';
            }
        }
    });

    preview.textContent = previewText || '-';

    updateTotalCombinations();
}

export function updateTotalCombinations() {
    const patternParts = getPatternParts();
    const unknowns = patternParts.filter(p => p.type === 'unknown');

    const countEl = document.getElementById('optionsCount');

    if (unknowns.length === 0 || unknowns.some(u => u.options.length === 0)) {
        if (countEl) countEl.textContent = '0 options';
        return;
    }

    let total = 1;
    unknowns.forEach(u => {
        total *= u.options.length;
    });

    if (countEl) {
        countEl.textContent = `${total} total combinations`;
    }
}

export function editUnknown(index) {
    const patternParts = getPatternParts();
    const part = patternParts[index];

    const currentOptions = part.options.join(', ');
    const input = prompt(
        `Edit options for "${part.label}":\n\nEnter comma-separated values (e.g., 90, 91, 92, 93)`,
        currentOptions
    );

    if (input !== null) {
        part.options = input.split(',')
            .map(v => v.trim())
            .filter(v => v.length > 0);

        renderPatternBuilder();
        updatePatternPreview();
    }
}

export function getLastUnknown() {
    const patternParts = getPatternParts();
    const unknowns = patternParts.filter(p => p.type === 'unknown');
    return unknowns.length > 0 ? unknowns[unknowns.length - 1] : null;
}
