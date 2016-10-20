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

  remove(){
    this.array.forEach( e => e.remove());
    this.array = [];
  }

  on($event, callback){
    this.array.forEach(e => (e.addEventListener($event, callback)));
  }

  off($event, callback){
    this.array.forEach(e => (e.removeEventListener($event, callback)));
  }




}

module.exports = DOMNodeCollection;
