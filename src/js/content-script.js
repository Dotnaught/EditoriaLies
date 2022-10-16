console.log("content-script.js loaded");

if (typeof init === "undefined") {
  const init = async (options) => {
    //var el = document.querySelector("body");
    //var elements = document.body.getElementsByTagName("*"); //HTMLCollection
    //var elements = document.querySelectorAll("*"); //NodeList, static
    // create a TreeWalker of all text nodes
    var allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT),
      // some temp references for performance
      tmptxt,
      tmpnode,
      // compile the RE and cache the replace string, for performance
      re = new RegExp(`${options.input}`, "g"),
      modifiedText = options.epithet;
    if (modifiedText != "") {
      // iterate through all text nodes
      while (allTextNodes.nextNode()) {
        tmpnode = allTextNodes.currentNode;
        tmptxt = tmpnode.nodeValue;
        tmpnode.nodeValue = tmptxt.replace(re, modifiedText);
      }
    }
    /*
    for (let i = 0; i < elements.length; i++) {
      var e = elements[i];
      for (let j = 0; j < e.childNodes.length; j++) {
        var node = e.childNodes[j];

        if (node.nodeType === 3) {
          //&& checkParent(el, node)
          var text = node.nodeValue; //textContent
          console.log(text);

          var re = new RegExp(`${options.input}`, "g");

          var modifiedText = options.epithet;

          var replacedText = text.replace(re, modifiedText);
          if (replacedText !== text) {
            e.replaceChild(document.createTextNode(replacedText), node);
          }
        } else if (node.nodeType === 1) {
          if (node instanceof HTMLSpanElement) {
            //console.log(`Value of ${node.nodeName}: ${node.nodeValue}<br/>`);
            //console.log(`${node.innerHTML}<br/>`);
          }
        }
      }
    }*/
  };

  function checkParent(parent, child) {
    if (parent.contains(child)) {
      return true;
    } else {
      return false;
    }
  }

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
