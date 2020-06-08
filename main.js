'use strict';

let money = prompt('Ваш месячный доход?', ''),
    income = 'freelance',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', ''),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 120000,
    period = 12,
    expenses1 = prompt('Введите обязательную статью расходов?', ''),
    amount1 = prompt('Во сколько это обойдется?', ''),
    expenses2 = prompt('Введите обязательную статью расходов?', ''),
    amount2 = prompt('Во сколько это обойдется?', '');

let budgetMonth = Number(money) - Number(amount1) - Number(amount2);

console.log( 'money have type of ' + '"' + typeof(money) + '"' );
console.log( 'income have type of ' + '"' + typeof(income) +'"' );
console.log( 'deposit have type of ' + '"' + typeof(deposit) + '"' );

console.log(`Длина строки addExpenses равна: ${addExpenses.length}`);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log( addExpenses.toLowerCase().split(',') );

console.log(`Бюджет на месяц: ${budgetMonth}`);

console.log(`Цель будет достигнута за: ${Math.ceil(mission / budgetMonth)} месяцев`);

let budgetDay = Math.floor(budgetMonth / 30);
console.log(`дневной бюджет: ${budgetDay} рублей`);

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода!');
} else if ( (budgetDay <= 1200) && (budgetDay > 600) ) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}

 