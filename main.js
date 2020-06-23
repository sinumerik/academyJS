'use strict';

const colorValue = document.querySelector('.color-value'),
    colorPicker = document.querySelector('.color-picker'),
    body = document.querySelector('body');

function randomColor() {

    let str = '0123456789abcdef';
    let maxPosition = str.length;
    let result = '';

    for (let i = 0; i < 6; i++) {
        result += str[Math.floor( Math.random() * maxPosition )];
    }

    return '#' + result;
}

colorPicker.addEventListener('click', function() {
    body.style.background = randomColor();

    colorValue.textContent = randomColor().toUpperCase();
});
