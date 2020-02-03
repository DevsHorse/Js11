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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 5,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {   

      if (confirm('Если ли у Вас дополнительный источник заработка?')) {
        let itemIncome,
            cashIncome;
        do {
          itemIncome = prompt('Какой у вас дополнительный заработок', 'Фриланс');
        }
        while (itemIncome === null || itemIncome.trim() === '' || isNumber(itemIncome));
        do {
          cashIncome = prompt('Сколько в месяц Вы на этом зараатываете?', '10000');
        }
        while (!isNumber(cashIncome));
        
        appData.income[itemIncome] = +cashIncome;
      }

      let addExpenses = prompt('Перечислите возможные расходы через запятую', 'КаФе, тАкси, cАдИк');
          appData.addExpenses = addExpenses.toLowerCase().split(', ');
          appData.deposit = confirm('Есть ли у вас депозит в банке?');
          appData.getInfoDeposit();

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
    getExpensesMonth: function() {
      let sum = 0;
        for (let key in appData.expenses) {
          sum += appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },

    getBudget: function() {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
          } else if ( appData.budgetDay === 0 ) {
            messege = 'У вас отсутствует доход или слишком много расходов';
          } else if (appData.budgetDay < 0 ){
            messege = 'Что то пошло не так';
          } else {
            messege = 'К сожалению у вас уровень дохода ниже среднего';
          } 
       return messege;
    },
    getInfoDeposit: function() {
      if (appData.deposit) {
        do {
          appData.percentDeposit = prompt('Какой годовой процент?', 10);
        }
        while (!isNumber(appData.percentDeposit));
        do {
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
        while (!isNumber(appData.moneyDeposit));
      }
    },
    calcSavedMoney: function() {
      return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы на месяц: ', appData.expensesMonth); // Расходы за месяц
console.log('Срок достижения цели: ', appData.getTargetMonth()); //Срок достижения цели
console.log('Статус дохода: ', appData.getStatusIncome()); // Статус дохода 

for (let key in appData) {
  console.log('Наша программа включает в себя данные: \n' + 
  'Свойство: ' + key + '\n\n Значение: ' + appData[key]);
}


(function getStringOfArr(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length));
  }
 return console.log(newArr.join(', '));
})(appData.addExpenses);








