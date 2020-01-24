let money = 600,
  income  = 'Продажа пирожков',
  addExpenses = 'Кафе, Такси, Телефон, Интернет', // доп. расходы
  deposit = true, 
  mission = 2000,
  period  = 12,  // месяцев
  budgetDay = money / 30; // Дневной бюджет

// Вывод типа данных 
console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
// Длина строки
console.log(addExpenses.length);
// Вывод текста и переменных (Конкатинация)
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' $.');
// Приведение строки к нижнему регистру и разбитие на массив 
console.log(addExpenses.toLowerCase().split(', '));
// Вывод дневного бюджета 
console.log(budgetDay);

