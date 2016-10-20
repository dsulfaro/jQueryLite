const DOMNodeCollection = require('./dom_node_collection.js');


window.$l = (arg) => {
  if (typeof arg === 'string'){
    let elementList = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.from(elementList));
  }
  else if (arg instanceof "HTMLElement"){
    return new DOMNodeCollection(Array.from(arg));
  }
};

let $l = window.$l;
