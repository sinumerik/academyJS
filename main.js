'use strict';

let // кнопка запуска программы
    start = document.getElementById('start'),
    cancel = document.querySelector('#cancel'),
    // кнопка добавления возможного дохода
    addIncome = document.getElementsByTagName('button')[0],
    // кнопка добавления возможных расходов
    addExpenses = document.getElementsByTagName('button')[1],
    // чекбокс о наличии депозита
    depositCheck = document.querySelector('#deposit-check'),
    // возможные доходы
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    additionalIncomeItem1 = additionalIncomeItems[0],
    additionalIncomeItem2 = additionalIncomeItems[1],
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
    expenceTitle = document.querySelector('input.expenses-title'),
    expenseAmount = document.querySelector('.expenses-amount'),
    // цель 
    targetAmount = document.querySelector('.target-amount'),
    // период рассчета
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    data = document.querySelector('.data'),
    result = document.querySelector('.result');

function addError(item) {
    item.classList.add('error');
    start.setAttribute('disabled', 'disabled');
}

function removeError(item) {
    item.classList.remove('error');
    start.removeAttribute('disabled');
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

let isNum = function(item) {
    let regexp = /^[0-9]*$/g;

    if (!regexp.test(item.value)) {
        item.value = item.value.substring(0, item.value.length - 1);
    }
};

let isStr = function(item) {
    let reg = /^[а-яё | |.|,]*$/ig;

    if(!reg.test(item.value)) {
        item.value = item.value.substring(0, item.value.length - 1);
    }
};

if ( salaryAmount.value !== '' ) {
    // старт программы
    start.removeAttribute('disabled');
} else {
    start.setAttribute('disabled', 'disabled');
}

let AppData = function() {
    this.income = {};
    this.addIncome = [];
    // обязательные расходы
    this.expenses = {};
    // возможные расходы
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false; // депозит в банке
    this.percentDeposit = 0; // процент по депозиту
    this.moneyDeposit = 0; //сумма депозита
    this.budget = 0;  // месячный заработок
    this.budgetDay = 0; // дневной бюджет
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.start = function() {   

    this.budget = +salaryAmount.value;

    this.getBudget();
    
    this.getExpenses();  

    this.getIncome();
    this.getExpensesMonth();
    
    
    this.getAddExpenses();
    this.getAddIncome();

    this.showResult();
};
AppData.prototype.addIncomeBlock = function() {
    let clone = incomeItems[0].cloneNode(true);
    let cloneNodes = clone.querySelectorAll('input');


    cloneNodes.forEach(function(item) {
        item.value = '';
    });

    addIncome.before(clone);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        addIncome.style.display = 'none';
    }
};
AppData.prototype.deleteIncomeBlock = function() {
    if (incomeItems.length > 1) {
        incomeItems.forEach(function(item, i) {
            if (i > 0) {
                item.remove();
            }
        });

        addIncome.style.display = 'block';
    }
};
AppData.prototype.addExpensesBlock =  function() {
    let clone = expensesItems[0].cloneNode(true);
    let cloneNodes = clone.querySelectorAll('input');

    cloneNodes.forEach(function(item) {
        item.value = '';
    });

    addExpenses.before(clone);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        addExpenses.style.display = 'none';
    }
};
AppData.prototype.deleteExpensesBlock = function() {
    if (expensesItems.length > 1) {
        expensesItems.forEach(function(item, i) {
            if (i > 0) {
                item.remove();
            }
        });

        addExpenses.style.display = 'block';
    }
};
AppData.prototype.getExpenses = function() {
    let _this = this;

    for(let key in this.expenses) {
        delete this.expenses[key];
    }

    expensesItems.forEach(function(item) {
        // название обязательных расходов
        let expensesTitle = item.querySelector('input.expenses-title');
        // значение обязательных расходов
        let expensesAmount = item.querySelector('.expenses-amount');

        if ( expensesTitle.value.trim() !== '' && expensesAmount.value.trim() !== '' && isNaN(expensesAmount.value) === false ) {
            _this.expenses[expensesTitle.value] = +expensesAmount.value;
        }
        
    }); 
};
AppData.prototype.getIncome = function() {
    let _this = this;

    for(let key in this.income) {
        delete this.income[key];
    }

    let sum = 0;

    incomeItems.forEach(function(item) {
        let incomeTitle = item.querySelector('input.income-title');
        let incomeAmount = item.querySelector('.income-amount');

        if ( incomeTitle.value.trim() !== '' && incomeAmount.value.trim() !== '' && isNaN(incomeAmount.value) === false ) {
            _this.income[incomeTitle.value] = +incomeAmount.value;

            sum += +incomeAmount.value;
        } 
    });

    this.incomeMonth = sum;
};
AppData.prototype.showResult = function() {
    let _this = this;

    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('input', function() {
        periodAmount.textContent = this.value;
        incomePeriodValue.value = _this.calcSavedMoney();
    });
};
AppData.prototype.getAddExpenses = function() {
    let _this = this;

    this.addExpenses.splice(0, this.addExpenses.length);

    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function(item) {
        if(item.trim() !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    let _this = this;

    this.addIncome.splice(0, this.addIncome.length);

    additionalIncomeItems.forEach(function(item) {
        
        let itemValue = item.value;
        
        if (itemValue.trim() !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function() {
    let sum = 0;

    for (let key in this.expenses) {
        sum += +this.expenses[key];
    }

    this.expensesMonth = sum;
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    if (salaryAmount.value === '') {
        return '';
    } else {
        return ( Math.ceil(targetAmount.value / this.budgetMonth) );
    }
};
AppData.prototype.calcSavedMoney = function() {
    return (this.budgetMonth * periodSelect.value);
};

AppData.prototype.eventListeners = function() {

    let _this = this;

    periodSelect.addEventListener('input', function() {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = _this.calcSavedMoney();
    });

    start.addEventListener('click', function() {   

        _this.start();
    
        this.style.display = 'none';
        cancel.style.display = 'block';
    
        let dataCollection = data.querySelectorAll('input');
    
        dataCollection.forEach(function(item) {
            item.setAttribute('disabled', 'disabled');
        });
    
        addIncome.setAttribute('disabled', 'disabled');
        addExpenses.setAttribute('disabled', 'disabled');
    
    });

    cancel.addEventListener('click', function() {

        let dataCollection = data.querySelectorAll('input');
    
        dataCollection.forEach(function(item) {
            item.value = '';
            item.removeAttribute('disabled');
        });
    
        periodSelect.value = 1;
        periodAmount.textContent = 1;
    
        let resultCollection = result.querySelectorAll('input');
    
        resultCollection.forEach(function(item) {
            item.value = '';
        });
    
        addIncome.removeAttribute('disabled');
        addExpenses.removeAttribute('disabled');
    
        // _this.start();
    
        _this.deleteIncomeBlock();
        _this.deleteExpensesBlock();
    
        this.style.display = 'none';
        start.style.display = 'block';
    
        start.setAttribute('disabled', 'disabled'); 
    });

    salaryAmount.addEventListener('input', function() {

        isNum(this);
    
        if( isNumber(this.value, this) ) {
            // старт программы
            start.removeAttribute('disabled');
        } else {
            start.setAttribute('disabled', 'disabled');
        }
    });

    addExpenses.addEventListener('click', this.addExpensesBlock);

    addIncome.addEventListener('click', this.addIncomeBlock);
    incomeTitle.addEventListener('input', function() {
        isStr(incomeTitle);
    });
    
    additionalIncomeItem1.addEventListener('input', function() {
        isStr(additionalIncomeItem1);
    });
    
    additionalIncomeItem2.addEventListener('input', function() {
        isStr(additionalIncomeItem2);
    });
    
    expenceTitle.addEventListener('input', function() {
        isStr(expenceTitle);
    });
    
    incomeAmount.addEventListener('input', function() {
        isNum(incomeAmount);
    });
    
    expenseAmount.addEventListener('input', function() {
        isNum(expenseAmount);
    });
    
    targetAmount.addEventListener('input', function() {
        isNum(targetAmount);
    });
};

const appData = new AppData();

appData.eventListeners();



