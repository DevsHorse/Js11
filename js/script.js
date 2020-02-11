'use strict';

const DomElement = function(sel, h, w, bg, fz, text) {
  this.selector = sel;
  this.height = h;
  this.width = w;
  this.bg = bg;
  this.fontSize = fz;
  this.text = text;
};

const body = document.querySelector('body');

DomElement.prototype.createElement = function() {
  let element;

  if (this.selector[0] === '.') {
    element =  document.createElement('div');
    element.classList.add(this.selector.substring(1));
  } else if (this.selector[0] === '#') {
    element= document.createElement('p');
    element.id = this.selector.substring(1);
  }

  element.textContent = this.text;
  body.appendChild(element);

  element.style.cssText = `
    height: ${this.height}px;
    width: ${this.width}px;
    background: ${this.bg};
    font-size: ${this.fontSize}px;
    text-align: center;
  `;
};

const newObject = new DomElement('.block', 100, 200, '#666', 22, 'ЭТО НОВЫЙ ОБЬЕКТ');

newObject.createElement();