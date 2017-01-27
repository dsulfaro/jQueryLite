const DOMNodeCollection = require("./dom_node_collection");

function $l(arg){
  let arr = []
  // CSS Selector
  if (typeof arg === 'string') {
    arr = Array.from(document.querySelectorAll(arg))
  }
  else if (arg instanceof HTMLElement) {
    arr = Array.from(arg)
  }
  return new DOMNodeCollection(arr);
};

window.$l = $l;
