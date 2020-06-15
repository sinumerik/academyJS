'use strict';

// для проверки на число
let isNumber = function(num) {
    if ( isNaN(num) === true || num === null || num === 0 ) {
        return true;
    } else {
        return false;
    }
};

let money,
    start = function() {
        do {
            money = +prompt('Ваш месячный доход?', '');
        } while( isNumber(money) );
};

start();

let appData = {
    // дополнительные доходы
    income: {},
    addIncome: [],
    // обязательные расходы
    expenses: {},
    // возможные расходы
    addExpenses: [],
    deposit: false, // депозит в банке
    percentDeposit: 0, // процент по депозиту
    moneyDeposit: 0, //сумма депозита
    mission: 60000, // цель, сумма, которую хотим собрать 
    period: 12, // рассчетный период сбора цели
    budget: money,  // месячный заработок
    budgetDay: 0, // дневной бюджет
    budgetMonth: 0,
    expensesMonth: 0,

    // спрашиваем пользователя о возможных расходах и наличии депозита
    asking: function() {

        if (confirm('Есть ли у Вас дополнительный заработок?')) {
            let itemIncome = '',
                cashIncome = 0;

            do {
                itemIncome = prompt('Какой у Вас дополнительный заработок?', '');
            } while (itemIncome === '' || itemIncome === null || +itemIncome === 0);

            do {
                cashIncome = +prompt('Сколько на этом зарабатываете?', '');
            } while( isNumber(cashIncome) );

            appData.income[itemIncome] = cashIncome;
        }


        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?'); // true/false

        for(let i = 0; i < 2; i++) {

            let ask = '', // переменная для хранения ответа пользователя
                temp = 0; // временная переменная, для проверки на число
            do {
                ask = prompt('Введите обязательную статью расходов?', '');
            } while (ask === '' || ask === null || +ask === 0);

            do {
                temp = +prompt('Во сколько это обойдется?', '');
            } while( isNumber(temp) );

            // создаем "ключ: значение" из ответов пользователя
            appData.expenses[ask] = temp;
        }
    },

    // сумма обязательных расходов за месяц
    getExpensesMonth: function() {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }

        appData.expensesMonth = sum;
    },
    // месячный и дневной бюджет с учетом обязательных расходов
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // период(в месяцах) накопления цели
    getTargetMonth: function() {
        return ( Math.ceil(appData.mission / appData.budgetMonth) );
    },
    // вывод срока выполнения цели
    showTargetMonth: function() {
        if ( appData.getTargetMonth() > 0 ) {
            console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} месяцев`);
        } else {
            console.log('Цель не будет достигнута');
        }
    },
    // получение статуса с учетом заработка и расходов
    getStatusIncome: function() {
        if (appData.budgetDay > 1200) {
            return ('У вас высокий уровень дохода!');
        } else if ( (appData.budgetDay <= 1200) && (appData.budgetDay > 600) ) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
    },
    // получение информации о депозите
    getInfoDeposit: function() {
        do {
            appData.percentDeposit = +prompt('Под какой процент положен депозит?', '');
        } while ( isNumber(appData.percentDeposit) );
        
        do {
            appData.moneyDeposit = +prompt('Какая сумма депозита?', '');
        } while( isNumber(appData.moneyDeposit) );
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Месячные расходы равны: ${appData.expensesMonth} рублей`);

appData.showTargetMonth();

console.log(appData.getStatusIncome());

appData.getInfoDeposit();

console.log(appData.addExpenses.join(', '));

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//     console.log(`ключ:${key} is ${appData[key]}`);
// }

 