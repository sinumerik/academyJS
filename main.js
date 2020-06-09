'use strict';

let money = prompt('Ваш месячный доход?', ''),
    income = 'freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
    deposit = confirm('Есть ли у вас депозит в банке?'), // true/false
    mission = 120000,
    period = 12,
    expenses1 = prompt('Введите обязательную статью расходов?', ''),
    amount1 = prompt('Во сколько это обойдется?', ''), // обязательные расходы №1
    expenses2 = prompt('Введите обязательную статью расходов?', ''),
    amount2 = prompt('Во сколько это обойдется?', ''); // обязательные расходы №2

// сумма расходов за месяц
let getExpensesMonth = (cost1, cost2) => {
    return ( (+cost1) + (+cost2) );
};

// месячный бюджет с учетом обязательных расходов
let getAccumulatedMonth = budget => {
    return ( +budget - getExpensesMonth(amount1, amount2));
};

let accumulatedMonth = getAccumulatedMonth(money);

// период(в месяцах) накопления цели
let getTargetMonth = target => {
    return ( Math.ceil(target / accumulatedMonth) );
};

// типы данных
let getTypeOf = data => {
    return ( console.log(typeof(data)) );
};

getTypeOf(money);
getTypeOf(income);
getTypeOf(deposit);

console.log(`Месячные расходы равны: ${getExpensesMonth(amount1, amount2)} рублей`);

console.log(`Возможные расходы в месяц: ${addExpenses.split(',')}`);

console.log(`Цель будет достигнута за: ${getTargetMonth(mission)} месяцев`);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`дневной бюджет: ${budgetDay} рублей`);

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

 