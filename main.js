'use strict';

let // кнопка запуска программы
    start = document.getElementById('start'),
    // кнопка добавления возможного дохода
    addIncome = document.getElementsByTagName('button')[0],
    // кнопка добавления возможных расходов
    addExpenses = document.getElementsByTagName('button')[1],
    // чекбокс о наличии депозита
    depositCheck = document.querySelector('#deposit-check'),
    // возможные доходы
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    // поля с выводом значений
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.invome_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    // месячный доход
    salaryAmount = document.querySelector('.salary-amount'),
    // название дополнительного дохода
    incomeTitle = document.querySelector('input.income-title'),
    // значение дополнительного дохода
    incomeAmount = document.querySelector('.income-amount'),
    // возможные расходы
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    // цель 
    targetAmount = document.querySelector('.target-amount'),
    // период рассчета
    periodSelect = document.querySelector('.period-select'),
    expensesItems = document.querySelectorAll('.expenses-items');

    function addError(item) {
        item.classList.add('error');
        // start.setAttribute('disabled', 'disabled');
    }

    function removeError(item) {
        item.classList.remove('error');
        // start.removeAttribute('disabled');
    }

    // для проверки на число
    let isNumber = function(value, item) {
        if( value.trim() === '' || isNaN(value) === true ) {
            addError(item);
            return false;
        } else {
            removeError(item);
            return true;
        }
    };

    // проверка на пустую строку
    let isString = function(string, item) {
        if (string.trim() === '') {
            addError(item);
            return false;
        } else {
            removeError(item);
            return true;
        }
    };

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
    budget: 0,  // месячный заработок
    budgetDay: 0, // дневной бюджет
    budgetMonth: 0,
    expensesMonth: 0,

    start: function() {

        if( isNumber(salaryAmount.value, salaryAmount) ) {
            appData.budget = +salaryAmount.value;
        }    

        appData.getExpenses();

        // appData.asking();
        // appData.getExpensesMonth();
        // appData.getBudget();
    },
    // добавляем поля с обязательными расходами
    addExpensesBlock: function() {
        let clone = expensesItems[0].cloneNode(true);

        addExpenses.before(clone);

        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            addExpenses.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            // название обязательных расходов
            let expensesTitle = item.querySelector('input.expenses-title');
            // значение обязательных расходов
            let expensesAmount = item.querySelector('.expenses-amount');

            if ( isString(expensesTitle.value, expensesTitle) ) {
                if ( isNumber(expensesAmount.value, expensesAmount) ) {
                    appData.expenses[expensesTitle.value] = +expensesAmount.value;
                }            
            }
            
        });

        
    },
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

// старт программы
start.addEventListener('click', appData.start);

addExpenses.addEventListener('click', appData.addExpensesBlock);

// appData.showTargetMonth();

// appData.getInfoDeposit();



// function toUpperCaseFirstLetter(array) {
//     let tempArr = [];

//     array.forEach(function(item, i) {
//         tempArr[i] = item[0].toUpperCase() + item.slice(1);
//     });

//     return tempArr;
// }
