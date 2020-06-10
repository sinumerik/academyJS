'use strict';

// для проверки на число
let isNumber = function(num) {
    return ( isNaN(parseFloat(num)) );
};

let money,
    income = 'freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
    deposit = confirm('Есть ли у вас депозит в банке?'), // true/false
    mission = 120000,
    period = 12,
    expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход?', '');
    } while( isNumber(money) );
};

start();

// сумма обязательных расходов за месяц
let getExpensesMonth = () => {

    let sum = 0;

    for(let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?', '');

        // временная переменная, для проверки на число
        let temp = prompt('Во сколько это обойдется?', '');

        while ( isNumber(temp) ) {
            temp = prompt('Во сколько это обойдется?', '');
        }

        sum += +temp;
    }

    return sum;
};

let expensesAmount = getExpensesMonth();

// месячный бюджет с учетом обязательных расходов
let getAccumulatedMonth = budget => {
    return ( +budget - expensesAmount);
};

let accumulatedMonth = getAccumulatedMonth(money);

// период(в месяцах) накопления цели
let getTargetMonth = target => {
    return ( Math.ceil(target / accumulatedMonth) );
};

let targetMonth = getTargetMonth(mission);

// вывод срока выполнения цели
let showTargetMonth = function() {
    if ( targetMonth > 0 ) {
        console.log(`Цель будет достигнута за: ${targetMonth} месяцев`);
    } else {
        console.log('Цель не будет достигнута');
    }
};

// типы данных
let showTypeOf = data => {
    return ( console.log(typeof(data)) );
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Месячные расходы равны: ${expensesAmount} рублей`);

console.log(`Возможные расходы в месяц: ${addExpenses.split(',')}`);

showTargetMonth();

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`дневной бюджет: ${budgetDay} рублей`);

// получение статуса с учетом заработка и расходов
let getStatusIncome = (budget) => {
    if (budget > 1200) {
        return ('У вас высокий уровень дохода!');
    } else if ( (budget <= 1200) && (budget > 600) ) {
        return ('У вас средний уровень дохода');
    } else if (budget <= 600 && budget >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
        return ('Что то пошло не так');
    }
};

console.log(getStatusIncome(budgetDay));

 