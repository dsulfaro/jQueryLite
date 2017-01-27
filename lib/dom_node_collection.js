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
