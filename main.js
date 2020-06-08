'use strict';

const weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      weekRU = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let lang = 'ru'; // ru/en

if (lang === 'ru') {
    alert(weekRU);
} else {
    alert(weekEN);
}

switch (lang) {
    case ('ru'):
        alert(weekRU);
        break;
    case ('en'):
        alert(weekEN);
        break;
}
    
