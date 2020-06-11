'use strict';

// сравнение введенного числа с рандомным
function compareNumber(random) {
    
    let userNumber = prompt('введи число от 1 до 100', '');

    if ( userNumber !== '' && isNaN(userNumber) === false && userNumber !== null ) {
   
        // преобразуем строку в число для сравнения
        userNumber = +userNumber;

        switch (true) {
            case (userNumber > random && userNumber < 100 && userNumber > 0):
                alert('Загаданное число меньше');
                break;
            case (userNumber < random && userNumber < 100 && userNumber > 0):
                alert('Загаданное число больше');
                break;
            case (userNumber === random):
                alert('Вы угадали число, игра окончена!');
                return false;
            case (userNumber > 100 || userNumber < 1):
                alert('Введите число в диапозоне от 1 до 100');
                break;
            case (userNumber === null):
                alert('Игра закончена!');
                return false;
            default:
                break;
        }
    } else if (userNumber === null) {
        alert('Вы закончили игру!');
        return false;
    } else {
        alert('Введи число!');
    }
    
    compareNumber(random);
}

// игровой бот
function guessNumber() {

    // получаем рандомное число для игры
    let randomNumber = Math.ceil(Math.random() * 100); 

    // выводим число в консоль, для проверки корректной работы на совпадение, после проверки задания - удалить!!!
    console.log(randomNumber);
    
    compareNumber(randomNumber);
}



guessNumber();