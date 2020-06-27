'use strict';

let // кнопка запуска программы
    start = document.getElementById('start'),
    cancel = document.querySelector('#cancel'),
    addButtons = document.querySelectorAll('.btn_plus'),
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
    result = document.querySelector('.result'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

const addError = (item) => {
    item.classList.add('error');
    start.setAttribute('disabled', 'disabled');
};

const removeError = (item) => {
    item.classList.remove('error');
    start.removeAttribute('disabled');
};

// для проверки на число
const isNumber = function(value, item) {
    if( value.trim() === '' || isNaN(value) === true ) {
        addError(item);
        return false;
    } else {
        removeError(item);
        return true;
    }
};

const isNum = (item) => {
    const regexp = /^[0-9]*$/g;

    if (!regexp.test(item.value)) {
        item.value = item.value.substring(0, item.value.length - 1);
    }
};

const isStr = (item) => {
    const reg = /^[а-яё | |.|,]*$/ig;

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

class AppData {
    constructor() {
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
    }

    start() {   
        this.budget = +salaryAmount.value;
    
        this.getExpInc();

        this.getBudget();
        
        this.getAddExpInc();
    
        this.showResult();
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }

        return this.percentDeposit * (this.moneyDeposit / 100);
    }

    changePercent() {
        const valueSelect = this.value;

        console.log(valueSelect);
        
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';

            depositPercent.addEventListener('input', function() {
                if ( !isNumber(this.value, this) ) {
                    this.setAttribute('maxlength', '3');
                    isNum(this);
                } 
                if ( this.value > 100 ) {
                    this.value = '';
                }
            });
        } else {
            depositPercent.value = valueSelect;

            depositPercent.style.display = 'none';
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';

            this.deposit = true;

            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';

            depositBank.value = '';
            depositAmount.value = '';

            this.deposit = false;

            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    addBlock() {
        let str = this.parentNode.getAttribute('class');
        let temp = this.parentNode;
        let items = temp.querySelectorAll(`div[class=${str}-items]`);

        let clone = items[0].cloneNode(true);
        let cloneNodes = clone.querySelectorAll('input');
    
    
        cloneNodes.forEach(function(item) {
            item.value = '';
        });
    
        this.before(clone);
    
        items = temp.querySelectorAll(`div[class=${str}-items]`);
    
        if (items.length === 3) {
            this.style.display = 'none';
        }
    }

    deleteBlock() {
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length > 1 || expensesItems.length > 1) {
            incomeItems.forEach(function(item, i) {
                if (i > 0) {
                    item.remove();
                }
            });
            expensesItems.forEach(function(item, i) {
                if (i > 0) {
                    item.remove();
                }
            });

            addIncome.style.display = 'block';
            addExpenses.style.display = 'block';
        }
    }

    getExpInc() {   

        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');

        const count = (item) => {
            let str = item.getAttribute('class').split('-')[0];

            let itemAmount = item.querySelector(`.${str}-amount`).value;
            let itemTitle = item.querySelector(`input[class=${str}-title]`).value;

            if ( itemTitle.trim() !== '' && itemAmount.trim() !== '' && isNaN(itemAmount) === false ) {
                this[str][itemTitle] = +itemAmount;
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }

        for(let key in this.income) {
            delete this.income[key];
        }
        for(let key in this.expenses) {
            delete this.expenses[key];
        }
    }

    clear() {
        for(let key in this) {
            if (typeof(this[key]) !== 'object') {
                this[key] = 0;
            }
        }
    }

    showResult() {    
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }

    getAddExpInc() { 
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach( (item) => {
            if(item.trim() !== '') {
                this.addExpenses.push(item);
            }
        });

        additionalIncomeItems.forEach( (item) => {
            
            let itemValue = item.value;
            
            if (itemValue.trim() !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + this.getInfoDeposit();
        
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        if (salaryAmount.value === '') {
            return '';
        } else {
            return ( Math.ceil(targetAmount.value / this.budgetMonth) );
        }
    }

    calcSavedMoney() {
        return (this.budgetMonth * periodSelect.value);
    }

    eventListeners() {
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
            incomePeriodValue.value = this.calcSavedMoney();
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    
        start.addEventListener('click', () => {   
    
            this.start();
        
            start.style.display = 'none';
            cancel.style.display = 'block';
        
            let dataCollection = data.querySelectorAll('input');
        
            dataCollection.forEach(function(item) {
                item.setAttribute('disabled', 'disabled');
            });
        
            addIncome.setAttribute('disabled', 'disabled');
            addExpenses.setAttribute('disabled', 'disabled');
        
        });
    
        cancel.addEventListener('click', () => {

            this.clear();
    
            let dataCollection = data.querySelectorAll('input');
        
            dataCollection.forEach(function(item) {
                item.value = '';
                item.removeAttribute('disabled');
            });
        
            periodSelect.value = 1;
            periodAmount.textContent = 1;

            depositCheck.checked = false;

            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';

            depositBank.value = '';
            depositAmount.value = '';

            this.deposit = false;

            this.addIncome.splice(0);
            this.addExpenses.splice(0);

            this.start();
        
            let resultCollection = result.querySelectorAll('input');
        
            resultCollection.forEach(function(item) {
                item.value = '';
            });
        
            addIncome.removeAttribute('disabled');
            addExpenses.removeAttribute('disabled');
        
            this.deleteBlock();
        
            cancel.style.display = 'none';
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
    
        addExpenses.addEventListener('click', this.addBlock);
    
        addIncome.addEventListener('click', this.addBlock);
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
    }
}

const appData = new AppData();

appData.eventListeners();



