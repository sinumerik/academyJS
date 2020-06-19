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
    incomePeriodValue = document.querySelector('.income_period-value'),
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
    periodAmount = document.querySelector('.period-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

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

    let regexp = /\d/ig;

    let isNum = function(input) {

        if (regexp.test(input.value)) {
            console.log('num');
            input.value.replace(regexp, '');
        } else {
            console.log('alpha');
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
    incomeMonth: 0,
    deposit: false, // депозит в банке
    percentDeposit: 0, // процент по депозиту
    moneyDeposit: 0, //сумма депозита
    budget: 0,  // месячный заработок
    budgetDay: 0, // дневной бюджет
    budgetMonth: 0,
    expensesMonth: 0,

    start: function() {    

        appData.getExpenses();  
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.showResult();
    },
    addIncomeBlock: function() {
        let clone = incomeItems[0].cloneNode(true);
        let cloneNodes = clone.childNodes;

        cloneNodes.forEach(function(item) {
            item.value = '';
        })

        addIncome.before(clone);

        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            addIncome.style.display = 'none';
        }
    },
    // добавляем поля с обязательными расходами
    addExpensesBlock: function() {
        let clone = expensesItems[0].cloneNode(true);
        let cloneNodes = clone.childNodes;

        cloneNodes.forEach(function(item) {
            item.value = '';
        })

        addExpenses.before(clone);

        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            addExpenses.style.display = 'none';
        }
    },
    // заполняем оъект expenses
    getExpenses: function() {
        for(let key in appData.expenses) {
            delete appData.expenses[key];
        }

        expensesItems.forEach(function(item) {
            // название обязательных расходов
            let expensesTitle = item.querySelector('input.expenses-title');
            // значение обязательных расходов
            let expensesAmount = item.querySelector('.expenses-amount');

            if ( expensesTitle.value.trim() !== '' && expensesAmount.value.trim() !== '' && isNaN(expensesAmount.value) === false ) {
                appData.expenses[expensesTitle.value] = +expensesAmount.value;
            }
            
        }); 
    },
    getIncome: function() {
        for(let key in appData.income) {
            delete appData.income[key];
        }

        let sum = 0;

        incomeItems.forEach(function(item) {
            let incomeTitle = item.querySelector('input.income-title');
            let incomeAmount = item.querySelector('.income-amount');

            if ( incomeTitle.value.trim() !== '' && incomeAmount.value.trim() !== '' && isNaN(incomeAmount.value) === false ) {
                appData.income[incomeTitle.value] = +incomeAmount.value;

                sum += +incomeAmount.value;
            } 
        });

        appData.incomeMonth = sum;
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener('input', function() {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    getAddExpenses: function() {
        appData.addExpenses.splice(0, appData.addExpenses.length);

        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function(item) {
            if(item.trim() !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        appData.addIncome.splice(0, appData.addIncome.length);

        additionalIncomeItems.forEach(function(item) {
            let itemValue = item.value;
            
            if (itemValue.trim() !== '') {
                appData.addIncome.push(itemValue);
            }
        });
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
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    // период(в месяцах) накопления цели
    getTargetMonth: function() {
        return ( Math.ceil(targetAmount.value / appData.budgetMonth) );
    },
    // вывод срока выполнения цели
    showTargetMonth: function() {
        if ( appData.getTargetMonth() > 0 ) {
            console.log(`Цель будет достигнута за: ${appData.getTargetMonth()} месяцев`);
        } else {
            console.log('Цель не будет достигнута');
        }
    },
    calcSavedMoney: function() {
        return (appData.budgetMonth * periodSelect.value);
    }
};

start.addEventListener('click', function() {
    start.setAttribute('disabled', 'disabled');

    if (start.hasAttribute('disabled') === true) {
        if( isNumber(salaryAmount.value, salaryAmount) ) {   
            start.removeAttribute('disabled');
            start.addEventListener('click', appData.start);
            
            appData.budget = +salaryAmount.value;
        }
    }
});

salaryAmount.addEventListener('input', function() {

    isNum(salaryAmount);

    if( isNumber(salaryAmount.value, salaryAmount) ) {
        // старт программы
        start.removeAttribute('disabled');
    } else {
        start.setAttribute('disabled', 'disabled');
    }
})

addExpenses.addEventListener('click', appData.addExpensesBlock);

addIncome.addEventListener('click', appData.addIncomeBlock);

