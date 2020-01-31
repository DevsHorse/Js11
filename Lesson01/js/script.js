'use strict';

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    start = function() {
        do{
          money = prompt('Ваш месячный доход?', 20000);
        }
        while (!isNumber(money));
        money = +money;
      };

  start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 5,
    asking: function() {   
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кафе, такси');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
    
      let expensesKey,
          keyValue;

          for (let i = 0; i < 2; i++) {
              do {
                expensesKey = prompt('Введите обязательную статью расходов?', 'расход');
              } 
              while (expensesKey === null || expensesKey.trim() === '' || isNumber(expensesKey));
              do {
                keyValue = prompt('Во сколько это обойдется?', 1000);
              } 
              while (!isNumber(keyValue));

            appData.expenses[expensesKey] = +keyValue;
          }
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function() {
      let sum = 0;
        for (let key in appData.expenses) {
          sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },

    getBudget: function() {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
    },

    getTargetMonth: function() {
      let target = Math.ceil(appData.mission / appData.budgetMonth);
      if (target < 0) {
        return('Цель не будет достигнута');
      } else {
        return(`Цель будет достигнута за ${target} месяца`);
      }
    },

    getStatusIncome: function() {
      let messege;
          if ( appData.budgetDay >= 1200 ) {
            messege = 'У вас высокий уровень дохода';
          } else if ( appData.budgetDay >= 600 ) {
            messege = 'У вас средний уровень дохода';
          } else if ( appData.budgetDay < 600 ) {
            messege = 'К сожалению у вас уровень дохода ниже среднего';
          } else if ( appData.budgetDay === 0 ) {
            messege = 'У вас отсутствует доход или слишком много расходов';
          } else {
            messege = 'Что то пошло не так';
          }
       return messege;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

console.log('Расходы на месяц: ', appData.expensesMonth); // Расходы за месяц
console.log('Срок достижения цели: ', appData.getTargetMonth()); //Срок достижения цели
console.log('Статус дохода: ', appData.getStatusIncome()); // Статус дохода 

for (let key in appData) {
  console.log('Наша программа включает в себя данные: \n' + 
  'Свойство: ' + key + '\n\n Значение: ' + appData[key]);
}








