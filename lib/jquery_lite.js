/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {

	  constructor(arr) {
	    this.elements = arr;

	    this.attr = this.attr.bind(this);
	    this.empty = this.empty.bind(this);
	  }

	  addClass(newClassName) {
	    this.each(el => el.classList.add(newClassName));
	  }

	  append(children) {
	    if (this.elements.length === 0) return;
	    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
	      children = $l(children);
	    }
	    if (typeof children === "string") {
	      this.each(el => el.innerHTML += children);
	    }
	    else if (children instanceof DOMNodeCollection) {
	      this.each(el => {
	        children.each(childEl => {
	          el.appendChild(childEl.cloneNode(true));
	        })
	      })
	    }
	    console.log("Nada")
	  }

	  attr(key, val) {
	    if (typeof val === "string") { this.each(el => el.setAttribute(key, val)); }
	    else { return this.elements[0].getAttribute(key); }
	  }

	  each(cb) {
	    this.elements.forEach(cb);
	  }

	  empty() {
	    this.html("");
	  }

	  html(html) {
	    if (typeof html === 'string') {
	      this.each(el => el.innerHTML = html );
	    }
	    else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  removeClass(victim) {
	    this.each(el => el.classList.remove(victim));
	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);