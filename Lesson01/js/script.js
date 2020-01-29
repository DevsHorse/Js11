'use strict';

let money = +prompt('Ваш месячный доход?', 40000),
  income  = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кафе, такси'), // доп. расходы
  deposit = confirm('Есть ли у вас депозит в банке?'), 
  mission = 100000, // Цель 
  period  = 12;  // месяцев

let expenses1 = prompt('Введите обязательную статью расходов?', 'Машина'),
 amount1 = +prompt('Во сколько это обойдется?', 3000),
 expenses2 = prompt('Введите обязательную статью расходов?', 'Еда'),
 amount2 = +prompt('Во сколько это обойдется?', 7000);


//Обязательные расходы за месяц
function getExpensesMonth() {
  return amount1 + amount2;
};
// Бюджет на месяц
function getAccumulatedMonth() {
  return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth(), // месячный бюджет 
  budgetDay = accumulatedMonth / 30; // Дневной бюджет
  

//За сколько будет достигнута цель
function getTargetMonth() {
  return mission / accumulatedMonth;
};
// Показать тип переменной 
function showTypeOf(variable) {
  return typeof(variable);
};

function getStatusIncome() {
  return income;
};

console.log('Тип money:', showTypeOf(money)); // Вывод типа данных 
console.log('Тип income:', showTypeOf(income));
console.log('Тип deposit:', showTypeOf(deposit));
console.log('getExpensesMonth: ', getExpensesMonth()); // Расходы за месяц
console.log('Массив addExpenses: ', addExpenses.toLowerCase().split(', ')); // Вывод возможных расходов
console.log('getTargetMonth: ', Math.floor(getTargetMonth())); //Срок достижения цели
console.log('Бюджет на день: ', Math.floor(budgetDay)); // Вывод дневного бюджета 
console.log('getStatusIncome: ', getStatusIncome()); // Статус income, не особо понятно что там должно быть =)

//Расчет уровня дохода
if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if ( budgetDay >= 600 && budgetDay < 1200 ) {
  console.log('У вас средний уровень дохода');
} else if ( budgetDay < 600 && budgetDay > 0 ) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if ( budgetDay === 0 ) {
  console.log('У вас отсутствует доход или слишком много расходов');
} else {
  console.log('Что то пошло не так');
}









