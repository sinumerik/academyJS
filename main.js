'use strict';

const week = [
    'Понедельник', 
    'Вторник', 
    'Среда', 
    'Четверг', 
    'Пятница', 
    'Суббота', 
    'Воскресенье'
];
const months = [
    'Январь', 
    'Февраль', 
    'Март', 
    'Апрель', 
    'Май', 
    'Июнь', 
    'Июль', 
    'Август', 
    'Сентябрь', 
    'Октябрь', 
    'Ноябрь', 
    'Декабрь'
];
const opt1 = document.getElementsByClassName('option')[0];
const opt2 = document.getElementsByClassName('option')[1];

const option = [opt1, opt2];
const hoursName = 'час'; // значение по умолчанию для часов

function changeMonthsName(arr) {
    let tempArray = [];
    let tempMonth = '';

    arr.forEach(function(item, i) {
        if (i === 2 || i === 7) {
            tempMonth = item.slice(0, item.length) + 'а';
        } else {
            tempMonth = item.slice(0, item.length - 1) + 'я';
        }

        tempArray[i] = tempMonth;
    });

    return tempArray;
}

function changeHoursName(hour) {
    let tempHours = '';
    if ( (hour > 1 && hour < 5) || (hour > 21 && hour <= 24) ) {
        tempHours = hoursName + 'а';
    } else if (hour >= 5 && hour < 21) {
        tempHours = hoursName + 'ов';
    } else {
        tempHours = hoursName;
    }
    return tempHours;
}

function changeView(data) {
    if (data >= 0 && data < 10) {
        return ('0' + String(data) );
    } else {
        return data;
    }
}

let runTime = function() {
    let date = new Date();

    let year = date.getFullYear(),
      month = changeMonthsName(months)[date.getMonth()],
      dayOfWeek = week[date.getDay() - 1],
      day = date.getDate(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = new Date().getSeconds();

    let options = [
        `Cегодня ${dayOfWeek}, ${day} ${month} ${year} года, ${hours} ${changeHoursName(hours)} ${minutes} минут ${seconds} секунд`,
        `${changeView(day)}.${changeView(date.getMonth())}.${changeView(year)} - ${changeView(hours)}:${changeView(minutes)}:${changeView(seconds)}`
    ];
    option.forEach(function(item, i) {
        item.innerText = options[i];
    });
};

setInterval(runTime, 1000);
