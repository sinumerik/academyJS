'use strict';

let body = document.querySelector('body'),
    button = document.querySelector('.button');

let DomElement = function(selector, height, width, bg, fontSize) {
    this.selector = selector; 
    this.height = height;
    this.width = width;
    this.bg = bg; 
    this.fontSize = fontSize; 
};

DomElement.prototype.createElem = function() {
    let div = document.createElement('div');
    let span = document.createElement('span');

    span.textContent = `Вы создали блок ${this.selector}`;

    if (this.selector[0] === '.') {
        div.classList.add(this.selector.slice(1));
    } 
    if (this.selector[0] === '#') {
        div.setAttribute('id', this.selector.slice(1));
    }

    div.style.cssText = `height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        color: #fff;`;

    span.style.cssText = `font-size: ${this.fontSize}px;
        text-align: center;`;

    div.append(span);
    
    body.append(div);
};

button.addEventListener('click', function() {

    let type = document.getElementById('type').value,
        width = document.getElementById('width').value,
        height = document.getElementById('height').value,
        bg = document.getElementById('bg').value,
        fontSize = document.getElementById('fontSize').value;

    let obj = new DomElement(type, width, height, bg, fontSize);
    obj.createElem();
});



