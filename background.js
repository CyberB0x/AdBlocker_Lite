chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("enabled", ({ enabled }) => {
    const newState = !enabled;

    chrome.storage.local.set({ enabled: newState }, () => {
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: newState ? ["block_ads"] : [],
        disableRulesetIds: newState ? [] : ["block_ads"]
      });

      if (tab.id) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});
