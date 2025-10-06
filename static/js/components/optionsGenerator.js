import { getLastUnknown, renderPatternBuilder, updatePatternPreview } from './patternBuilder.js';

export function initOptionsGenerator() {
    // Attach event listeners for generator tabs
    document.getElementById('genRangeTab').addEventListener('click', () => showGenerator('range'));
    document.getElementById('genListTab').addEventListener('click', () => showGenerator('list'));
    document.getElementById('genUploadTab').addEventListener('click', () => showGenerator('upload'));

    // Attach event listeners for range inputs
    document.getElementById('rangeFrom').addEventListener('change', generateRangeOptions);
    document.getElementById('rangeTo').addEventListener('change', generateRangeOptions);
    document.getElementById('rangePad').addEventListener('change', generateRangeOptions);

    // Attach event listeners for list and upload inputs
    document.getElementById('listValues').addEventListener('change', generateListOptions);
    document.getElementById('uploadValues').addEventListener('change', generateUploadOptions);
}

export function showGenerator(type) {
    document.querySelectorAll('.generator-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`gen${type.charAt(0).toUpperCase() + type.slice(1)}Tab`).classList.add('active');

    document.querySelectorAll('.generator-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('gen' + type.charAt(0).toUpperCase() + type.slice(1)).classList.add('active');

    // Trigger generation when switching tabs to update preview
    if (type === 'range') generateRangeOptions();
    else if (type === 'list') generateListOptions();
    else if (type === 'upload') generateUploadOptions();
}

export function generateRangeOptions() {
    const from = parseInt(document.getElementById('rangeFrom').value);
    const to = parseInt(document.getElementById('rangeTo').value);
    const pad = document.getElementById('rangePad').checked;

    if (isNaN(from) || isNaN(to) || from > to) return;

    const padLength = to.toString().length;
    const options = [];

    for (let i = from; i <= to && i < from + 1000; i++) { // Limit to 1000 for performance
        let value = i.toString();
        if (pad) {
            value = value.padStart(padLength, '0');
        }
        options.push(value);
    }

    applyOptionsToLastUnknown(options);
}

export function generateListOptions() {
    const input = document.getElementById('listValues').value;
    const options = input.split(',')
        .map(v => v.trim())
        .filter(v => v.length > 0);

    applyOptionsToLastUnknown(options);
}

export function generateUploadOptions() {
    const input = document.getElementById('uploadValues').value;
    const options = input.split('\n')
        .map(v => v.trim())
        .filter(v => v.length > 0);

    applyOptionsToLastUnknown(options);
}

function applyOptionsToLastUnknown(options) {
    const lastUnknown = getLastUnknown();
    if (lastUnknown) {
        lastUnknown.options = options;
        renderPatternBuilder(); // Re-render to show updated option count
        updatePatternPreview(); // Update total combinations
    }
    renderOptionsPreview(options);
}

function renderOptionsPreview(options) {
    const optionsPreviewEl = document.getElementById('optionsPreview');
    const optionsCountEl = document.getElementById('optionsCount');

    if (options.length === 0) {
        optionsPreviewEl.innerHTML = '<div style="color: #6c757d;">Options will appear here...</div>';
        optionsCountEl.textContent = '0 options';
        return;
    }

    optionsCountEl.textContent = `${options.length} options`;
    optionsPreviewEl.innerHTML = options.map(option => `<span class="option-tag">${option}</span>`).join('');
}