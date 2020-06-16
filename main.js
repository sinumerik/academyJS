'use strict';

let // кнопка запуска программы
    start = document.getElementById('start'),
    //
    addIncome = document.getElementsByTagName('button')[0],
    //
    addExpenses = document.getElementsByTagName('button')[1],
    //
    depositCheck = document.querySelector('#deposit-check'),
    //
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    //
    values = document.querySelectorAll('[class$="-value"]'),
    //
    salary = document.querySelector('.salary-amount'),
    //
    incomeTitle = document.querySelector('.income-title'),
    //
    incomeAmount = document.querySelector('.income-amount'),
    //
    expensesTitle = document.querySelector('.expenses-title'),
    //
    expensesAmount = document.querySelector('.expenses-amount'),
    //
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    //
    targetAmount = document.querySelector('.target-amount'),
    //
    periodSelect = document.querySelector('.period-select');
