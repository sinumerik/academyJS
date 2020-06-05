let money = 30000,
    income = 'freelance',
    addExpenses = 'Credit, Utulity Bills, Mobile, Internet',
    deposit = false,
    mission = 120000,
    period = 12;

console.log( 'money have type of ' + '"' + typeof(money) + '"' );
console.log( 'income have type of ' + '"' + typeof(income) +'"' );
console.log( 'deposit have type of ' + '"' + typeof(deposit) + '"' );

console.log(`Длина строки addExpenses равна: ${addExpenses.length}`);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log( addExpenses.toLowerCase().split(', ') );

let budgetDay = money / 30;
console.log(`дневной бюджет: ${budgetDay} рублей`);
