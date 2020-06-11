'use strict';

// запуск игры заново или выход
function tryAgain(choice) {
    if (choice) {
        guessNumber();
    } else {
        return false;
    }
}

// сравнение введенного числа с рандомным
function compareNumber(random, attempts) {
    
    let userNumber = prompt(`введи число от 1 до 100, попыток ${attempts}`, '');

    if ( userNumber !== '' && isNaN(userNumber) === false && userNumber !== null ) {
   
        // преобразуем строку в число для сравнения
        userNumber = +userNumber;

        switch (true) {
            case (userNumber > random && userNumber < 100 && userNumber > 0):
                alert(`Загаданное число меньше, осталось ${--attempts} попыток`);
                break;
            case (userNumber < random && userNumber < 100 && userNumber > 0):
                alert(`Загаданное число больше, осталось ${--attempts} попыток`);
                break;
            case (userNumber === random):
                let success = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
                 return tryAgain(success);
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

    if (attempts === 0) {
        let again = confirm('Попытки закончились, хотите сыграть еще?');
        return tryAgain(again);
    }
    
    compareNumber(random, attempts);
}

// игровой бот
function guessNumber() {

    // получаем рандомное число для игры
    let randomNumber = Math.ceil(Math.random() * 100),
        numberAttempts = 10; 

    // выводим число в консоль, для проверки корректной работы на совпадение, после проверки задания - удалить!!!
    console.log(randomNumber);
    
    compareNumber(randomNumber, numberAttempts);
}

guessNumber();