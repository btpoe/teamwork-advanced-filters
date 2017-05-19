const input = document.querySelector('input');
input.addEventListener('input', e => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { filters: e.target.value }, (response) => {
            console.log(response);
        });
    });
});
