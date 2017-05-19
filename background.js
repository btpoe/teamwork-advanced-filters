chrome.tabs.onUpdated.addListener((id, info, tab) => {
    if (tab.url && tab.url.indexOf("teamwork") > -1){
        chrome.pageAction.show(tab.id);
    }
});
