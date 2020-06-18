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
    // название обязательных расходов
    expensesTitle = document.querySelector('input.expenses-title'),
    // значение обязательных расходов
    expensesAmount = document.querySelector('.expenses-amount'),
    // возможные расходы
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    // цель 
    targetAmount = document.querySelector('.target-amount'),
    // период рассчета
    periodSelect = document.querySelector('.period-select');
