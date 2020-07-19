chrome.runtime.sendMessage({ text: "Clear" }, function (response) {
  console.log("Response: ", response);
});
