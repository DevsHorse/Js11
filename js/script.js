'use strict';

const DomElement = function(sel, h, w, bg) {
  this.selector = sel;
  this.height = h;
  this.width = w;
  this.bg = bg;
};

const body = document.querySelector('body');
body.style.position = 'relative';

DomElement.prototype.createElement = function() {
  let element;

  if (this.selector[0] === '.') {
    element =  document.createElement('div');
    element.classList.add(this.selector.substring(1));
  }
  body.appendChild(element);
  element.style.cssText = `
    height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    position: absolute;
    top: 200px;
    left: 800px;
  `;
};

const newObject = new DomElement('.block', 100, 100, '#000');
document.addEventListener('DOMContentLoaded', () => newObject.createElement());

window.addEventListener('keydown', function(event) {
  let square = document.querySelector('.block');

  if (event.keyCode === 40) {

      let top = parseFloat(square.style.top);
      square.style.top = `${top + 10}px`;

  } else if (event.keyCode === 38) {

      let top = parseFloat(square.style.top);
      square.style.top = `${top - 10}px`;

  } else if (event.keyCode === 37) {

      let left = parseFloat(square.style.left);
      square.style.left = `${left - 10}px`;

  } else if (event.keyCode === 39) {

      let left = parseFloat(square.style.left);
      square.style.left = `${left + 10}px`;

  } else {
    return;
  }

});
