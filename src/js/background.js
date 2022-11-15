chrome.runtime.onInstalled.addListener((r) => {
  if (r.reason === "install") {
    showReadme();
  }
});

function showReadme() {
  let url = chrome.runtime.getURL("html/onboarding-page.html");
  chrome.tabs.create({ url });
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && !tab.url.includes("chrome://")) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["js/content-script.js"],
      },
      async () => {
        try {
          //callback
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
          }
          chrome.storage.sync.get("options", (data) => {
            if (Object.keys(data).length !== 0) {
              let textBadge = data.options.input;
              chrome.action.setBadgeText({
                text: textBadge,
                tabId: tabId,
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    );
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    setBadgeText("");
  } catch (error) {
    console.log(error);
  }
});

async function getTab() {
  let e = chrome.runtime.lastError;
  if (e === undefined) {
    try {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab;
    } catch (error) {
      console.log(error);
    }
  }
}

async function setBadgeText(text) {
  try {
    let tab = await getTab();
    if (tab.id) {
      chrome.action.setBadgeText({
        text: text,
        tabId: tab.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function reload() {
  try {
    let tab = await getTab();
    if (tab) {
      chrome.tabs.reload(tab.id);
    }
  } catch (error) {
    console.log(error);
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === "clear") {
    try {
      setBadgeText("");
      reload();
      sendResponse({ clear: "done" });
    } catch (error) {
      console.log(error);
    }
    return true;
  }
});
