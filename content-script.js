//console.log("content-script.js loaded");

if (typeof init === "undefined") {
  const init = async (options) => {
    var elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
      var e = elements[i];
      for (let j = 0; j < e.childNodes.length; j++) {
        var node = e.childNodes[j];

        if (node.nodeType === 3) {
          var text = node.nodeValue;
          //console.log(text);

          var re = new RegExp(`${options.input}`, "g");

          var modifiedText = options.epithet;

          var replacedText = text.replace(re, modifiedText);
          if (replacedText !== text) {
            e.replaceChild(document.createTextNode(replacedText), node);
          }
        }
      }
    }
  };
  chrome.storage.sync.get("options", (data) => {
    if (Object.keys(data).length === 0) {
      data.options = { input: "", epithet: "" };
      console.log("no options found, initializing");
    }

    if (data.options.input !== "") {
      //console.log("preparing to replace: ", data.options.input);
      init(data.options);
    }
  });
} else {
  console.log("init already defined");
}
