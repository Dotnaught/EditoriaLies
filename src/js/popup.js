let submitButton = document.getElementById("submit");
let clearButton = document.getElementById("clear");
let input = document.getElementById("input");
let epithet = document.getElementById("epithet");

// set default values for local page values
let options = { input: "", epithet: "" };

// Initialize the form with stored option settings
chrome.storage.sync.get("options", (data) => {
  if (Object.keys(data).length !== 0) {
    //console.log("assigning options", data.options);
    Object.assign(options, data.options);
    input.setAttribute("value", options.input);
    epithet.setAttribute("value", options.epithet);
  } else {
    //console.log("no options found, initializing storage");
    chrome.storage.sync.set({ options });
  }
});

submitButton.addEventListener("click", async (evt) => {
  evt.preventDefault(); // prevents `submit` event from reloading the popup
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const text = document.getElementById("input").value || "";
  const revisedText = document.getElementById("epithet").value || "";

  options.input = text;
  options.epithet = revisedText;
  chrome.storage.sync.set({ options });
  /*
  chrome.runtime.sendMessage(text, (response) => {
    console.log(`received response: ${response}`);
  });
  */

  if (text !== "" && revisedText !== "") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
  }
  window.close();
});

clearButton.addEventListener("click", async (evt) => {
  evt.preventDefault(); // prevents `submit` event from reloading the popup
  options.input = "";
  options.epithet = "";
  chrome.storage.sync.set({ options });
  input.setAttribute("value", options.input);
  epithet.setAttribute("value", options.epithet);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.runtime.sendMessage("clear", (response) => {
    console.log(`received response: ${response}`);
    window.close();
  });
});

window.onload = async (event) => {
  //get selected text on current tab and append it to the input field
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  input.focus();
  let result;
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => getSelection().toString(),
    });

    chrome.storage.sync.get("options", (data) => {
      if (Object.keys(data).length === 0) {
        data.options = { input: "", epithet: "" };
      }
      //console.log(data);

      if (data.options.input !== "" && result === "") {
        document.getElementById("input").value = data.options.input;
        document.getElementById("epithet").value = data.options.epithet;
      } else {
        //overwrite the default values with selected text
        document.getElementById("input").value = result;
        document.getElementById("epithet").value = data.options.epithet;
      }
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
};
