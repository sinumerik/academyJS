'use strict';

document.addEventListener('DOMContentLoaded', function() {
    let body = document.querySelector('body');

    body.style.cssText = `width: 100vw;
        height: 100vh;
        margin: 0;`;

    let DomElement = function(width, height, bg) { 
        this.height = height;
        this.width = width;
        this.bg = bg; 
    };

    DomElement.prototype.createElem = function() {
        let div = document.createElement('div');

        div.style.cssText = `height: ${this.height}px;
            width: ${this.width}px;
            background: ${this.bg};
            position: absolute;
            top: 0;
            left: 0;`;
        
        body.append(div);
    };

    let obj = new DomElement('100', '100', '#30f093');
    obj.createElem();

    document.addEventListener('keydown', function(event) {
        let div = document.querySelector('div');

        let computed = getComputedStyle(div);

        if (event.code === 'ArrowUp') {

            let temp = computed.top;
            temp = +temp.substr(0, temp.length - 2);

            temp -= 10;

        div.style.top = temp + 'px';
        }
        if (event.code === 'ArrowRight') {

            let temp = computed.left;
            temp = +temp.substr(0, temp.length - 2);

            temp += 10;

        div.style.left = temp + 'px';
        }
        if (event.code === 'ArrowDown') {

            let temp = computed.top;
            temp = +temp.substr(0, temp.length - 2);

            temp += 10;

        div.style.top = temp + 'px';
        }
        if (event.code === 'ArrowLeft') {

            let temp = computed.left;
            temp = +temp.substr(0, temp.length - 2);

            temp -= 10;

        div.style.left = temp + 'px';
        }
        
    });
});




