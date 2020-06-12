'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let date = new Date();

function getDayOfWeek() {
    return date.getDay();
}

week.forEach(function(item, index, arr) {
    if ( (index === arr.length - 1) || (index === arr.length - 2) ) {
        if (index === getDayOfWeek()) {
            console.log('%c' + item, 'color: red; font-style: italic');
        } else {
            console.log('%c' + item, 'color: red');
        }
    } else {
        if (index === getDayOfWeek()) {
            console.log('%c' + item, 'font-style: italic');
        } else {
            console.log(item);
        }
        
    }
});

