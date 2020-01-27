'use strict';

let money = +prompt('Ваш месячный доход?'),
  income  = 'Фриланс',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), // доп. расходы
  deposit = confirm('Есть ли у вас депозит в банке?'), 
  mission = 100000,
  period  = 12;  // месяцев

let expenses1 = prompt('Введите обязательную статью расходов?'),
 amount1 = prompt('Во сколько это обойдется?'),
 expenses2 = prompt('Введите обязательную статью расходов?'),
 amount2 = prompt('Во сколько это обойдется?'),
 budgetMonth = money - amount1 - amount2, // Месячный бюджет
 budgetDay = budgetMonth / 30, // Дневной бюджет
 missionSuccess = mission / budgetMonth; // За сколько месяцев соберется mission


// Вывод типа данных 
console.log('Тип money:', typeof(money));
console.log('Тип income:', typeof(income));
console.log('Тип deposit:', typeof(deposit));
// Длина строки
console.log('Длина строки addExpenses: ',addExpenses.length);
// Вывод текста и переменных (Конкатинация)
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' рублей.');
// Приведение строки к нижнему регистру и разбитие на массив 
console.log('Массив addExpenses: ', addExpenses.toLowerCase().split(', '));
// Вывод месячного бюджета
console.log('Бюджет на месяц: ', budgetMonth);
// Вывод дневного бюджета 
console.log('Бюджет на день: ', Math.floor(budgetDay));
// За сколько месяцев будет достигнута цель
console.log('Месяцев до достижения цели: ', Math.ceil(missionSuccess));

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