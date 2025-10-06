
export function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    const tabId = 'tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1);
    const tab = document.getElementById(tabId);
    if (tab) {
        tab.classList.add('active');
    }
}

export function showSuccess(message) {
    alert(message);
}

export function showError(message) {
    alert('❌ ' + message);
}
