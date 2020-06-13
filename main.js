'use strict';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']; 

const block = document.getElementById('block');

const date = new Date();

week.forEach(function(item, i, arr) {
    let day = document.createElement('span');

    day.innerText = item;

    if (i === arr.length - 1 || i === arr.length - 2) {
        day.classList.add('weekend');
    }

    if (date.getDay() - 1 === i) {
        day.classList.add('current');
    }

    block.append(day);
});










// let date = new Date();

// function getDayOfWeek() {
//     return date.getDay();
// }

// week.forEach(function(item, index, arr) {
//     if ( (index === arr.length - 1) || (index === arr.length - 2) ) {
//         if (index === getDayOfWeek()) {
//             console.log('%c' + item, 'color: red; font-style: italic');
//         } else {
//             console.log('%c' + item, 'color: red');
//         }
//     } else {
//         if (index === getDayOfWeek()) {
//             console.log('%c' + item, 'font-style: italic');
//         } else {
//             console.log(item);
//         }
        
//     }
// });

