'use strict';

const weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      weekRU = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

let lang = prompt('Введите язык вывода дней недели(возмодные значения "ru" или "en")'); // ru/en

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
    default: 
        break;
}

const multiArray = [weekRU, weekEN];

const language = {
    ru: 0,
    en: 1
};

alert( multiArray[language[lang]] );

let namePerson = prompt('Введите имя');

let status = (namePerson === 'Артем') ? 'Директор' : ( (namePerson === 'Максим') ? 'Преподователь' : 'Ученик' );

console.log(status);
    
