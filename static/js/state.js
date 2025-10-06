
let currentPuzzle = null;
let patternParts = [];
let unknownCounter = 0;

export function getCurrentPuzzle() {
    return currentPuzzle;
}

export function setCurrentPuzzle(puzzle) {
    currentPuzzle = puzzle;
}

export function getPatternParts() {
    return patternParts;
}

export function setPatternParts(parts) {
    patternParts = parts;
}

export function addPatternPartState(part) {
    patternParts.push(part);
}

export function updatePatternPartState(index, value) {
    patternParts[index].value = value;
}

export function deletePatternPartState(index) {
    patternParts.splice(index, 1);
}

export function clearPatternPartsState() {
    patternParts = [];
}

export function getUnknownCounter() {
    return unknownCounter;
}

export function incrementUnknownCounter() {
    unknownCounter++;
    return unknownCounter;
}

export function resetUnknownCounter() {
    unknownCounter = 0;
}
