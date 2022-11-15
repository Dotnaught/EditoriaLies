//console.log("content-script.js loaded");

if (typeof init === "undefined") {
  const init = async (options) => {
    var re = new RegExp(`${options.input}`, "g");
    var modifiedText = options.epithet;

    // create a TreeWalker of all text nodes

    var allTextNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var tmptxt;
    var tmpnode;

    if (modifiedText != "") {
      // iterate through all text nodes
      while (allTextNodes.nextNode()) {
        tmpnode = allTextNodes.currentNode;
        tmptxt = tmpnode.nodeValue;
        tmpnode.nodeValue = tmptxt.replace(re, modifiedText);
      }
    }

    //mutation observer
    var observer = new MutationObserver(onMutation);
    observer.observe(document, {
      childList: true, // report added/removed nodes
      subtree: true, // observe any descendant elements
    });

    function onMutation(mutations) {
      //console.log("mutation observed");
      for (var i = 0, len = mutations.length; i < len; i++) {
        var added = mutations[i].addedNodes;
        if (added.length) {
          for (var j = 0, node; (node = added[j]); j++) {
            if (re.test(node.textContent)) {
              //console.log(`found: ${node}`);
              replaceText(node);
            }
          }
        }
      }
    }
    //mutation walker
    function replaceText(el) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      var tnode, ttext;
      //for (let node; (node = walker.nextNode()); ) {
      while (walker.nextNode()) {
        tnode = walker.currentNode;
        ttext = tnode.nodeValue;
        tnode.nodeValue = ttext.replace(re, modifiedText);
      }
    }
    //
  };

  chrome.storage.sync.get("options", (data) => {
    if (Object.keys(data).length === 0) {
      data.options = { input: "", epithet: "" };
      //console.log("no options found, initializing");
    }

    if (data.options.input !== "") {
      //console.log("preparing to replace: ", data.options.input);
      init(data.options);
    }
  });
}
