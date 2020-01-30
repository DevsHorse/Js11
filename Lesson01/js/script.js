'use strict';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income  = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кафе, такси'), // доп. расходы
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = 100000, // Цель 
    period  = 12;  // месяцев

function start() {
    do{
      money = prompt('Ваш месячный доход?', 50000);
    }
    while (!isNumber(money));
    money = +money;
}

start();
// Показать тип переменной 
function showTypeOf(any) {
  return typeof(any);
}

console.log('Тип money:', showTypeOf(money));
console.log('Тип income:', showTypeOf(income));
console.log('Тип deposit:', showTypeOf(deposit));
console.log('Массив addExpenses: ', addExpenses.toLowerCase().split(', ')); // Вывод возможных расходов

let expenses = [];

//Обязательные расходы за месяц
function getExpensesMonth() {
    let sum = 0,
        amount;
    for (let i = 0; i < 2; i++) {
      do {
      expenses[i] = prompt('Введите обязательную статью расходов?', 'расход');
      } 
      while (expenses[i] === null || expenses[i].trim() === '' || isNumber(expenses[i]));

      do {
        amount = prompt('Во сколько это обойдется?', 1000);
      } 
      while (!isNumber(amount));
      sum += +amount;
    }
    console.log(expenses);
    return sum;
}

let expensesAmount = getExpensesMonth();

// Бюджет на месяц
function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth(), // месячный бюджет 
  budgetDay = accumulatedMonth / 30; // Дневной бюджет

console.log('getExpensesMonth: ', expensesAmount); // Расходы за месяц
console.log('Бюджет на день: ', Math.floor(budgetDay)); // Вывод дневного бюджета 
  
//За сколько будет достигнута цель
function getTargetMonth() {
  let target = Math.ceil(mission / accumulatedMonth);
  if (target < 0) {
    return('Цель не будет достигнута');
  } else {
    return(`Цель будет достигнута за ${target} месяца`);
  }
}

console.log('getTargetMonth: ', getTargetMonth()); //Срок достижения цели

function getStatusIncome() {
 let messege;

  if (budgetDay >= 1200) {
    messege = 'У вас высокий уровень дохода';
  } else if ( budgetDay >= 600 && budgetDay < 1200 ) {
    messege = 'У вас средний уровень дохода';
  } else if ( budgetDay < 600 && budgetDay > 0 ) {
    messege = 'К сожалению у вас уровень дохода ниже среднего';
  } else if ( budgetDay === 0 ) {
    messege = 'У вас отсутствует доход или слишком много расходов';
  } else {
    messege = 'Что то пошло не так';
  }
 return messege;
}

console.log('getStatusIncome: ', getStatusIncome()); // Статус дохода 









