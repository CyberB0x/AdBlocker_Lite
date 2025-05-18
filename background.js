chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ enabled: true });
});

chrome.action.onClicked.addListener((tab) => {
   chrome.storage.local.get("enabled",({ enabled }) =>{
      const newState = !enabled;

      chrome.storage.local.set({enabled: newState}, () => {
          chrome.declarativeNetRequest.updateEnabledRequests({

             enabledRulesIds: newState ? ["block_ads"] : [],
             disabledRulesIds: newState ? [] : ["block_ads"]
          });

          if (tab.id) {
             chrome.tabs.reload(tab.id);
          }
      });
   });
});