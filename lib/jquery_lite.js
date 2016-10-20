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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection{

	  constructor(array){
	    this.array = array;
	  }

	  html(arg){
	    if (arg !== undefined){
	      this.array.forEach( e => (e.innerHTML = arg));
	    }
	    else {
	      return this.array[0].innerHTML;
	    }
	  }

	  empty(){
	    this.html("");
	  }

	  append(args){
	    if(args instanceof DOMNodeCollection){
	      let inner = args.html();
	      let outer = this.html();
	      this.html(outer + inner);
	    }
	    else{
	      let inner = this.html();
	      this.html(inner + args);
	    }
	  }

	  attr(name, val){
	    if(val === undefined){
	      return this.array[0].getAtrribute(name);
	    } else{
	      this.array.forEach(e => (e.setAttribute(name, val)));
	    }
	  }

	  addClass(value){
	    this.attr('class', value);
	  }

	  removeClass(value){
	    if (value === undefined){
	      this.addClass("");
	    }
	    else {
	      let c = this.array[0].getAttribute('class');
	      c = c.split(" ");
	      let v = value.split(" ");
	      c.forEach((e, i, a) => {
	        if (v.includes(e)){
	          a[i] = "";
	        }
	      });
	      c = c.join(" ");
	      this.addClass(c);
	    }
	  }

	  children(){
	    let array = [];

	    this.array.forEach(e => array.push(e.children));

	    return new DOMNodeCollection(array);
	  }

	  parent(){
	    let array = [];

	    this.array.forEach(e => array.push(e.parentElement));

	    return new DOMNodeCollection(this.flatten(array));
	  }

	  find(name){
	    let array = [];
	    this.array.forEach( e => {
	      let query = e.querySelectorAll(name);
	      if (query){
	        array.push(query);
	      }
	    });
	    return new DOMNodeCollection(this.flatten(array));
	  }

	  flatten(array){
	    return array.reduce((a, b) => Array.from(a).concat(Array.from(b)));
	  }

	  remove(el){

	  }

	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);