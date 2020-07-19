function callback() {
  console.log("Bloom Broom execution complete.");
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === "Clear") {
    chrome.browsingData.remove(
      {
        origins: ["https://www.bloomberg.com"],
      },
      {
        cacheStorage: true,
        cookies: true,
        fileSystems: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        serviceWorkers: true,
        webSQL: true,
      },
      callback
    );
  }
  //console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
  sendResponse("BrowsingData cleared.");
});
