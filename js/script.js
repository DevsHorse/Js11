'use strict';

// Кнопка старт
let start = document.getElementById('start'),
  reset = document.getElementById('cancel'),
  //Кнопки + 
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  //Чекокс депозита
  depositCheckbox = document.querySelector('#deposit-check'),
  //Поля депозита
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  //Поля возможных доходов
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  //Поля вывода результатов
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  //Месячный доход
  salaryAmount = document.querySelector('.salary-amount'),
  //Блоки полей Дополнительные доходы и Обязательные расходы
  incomeItem = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  //Поле 'возможные расходы'
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  //Поле ввода цели
  targetAmount = document.querySelector('.target-amount'),
  //Инпут, и значение периода
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  allInputs = document.querySelectorAll('input');
let dat = document.querySelector('.data');

//Функция проверки на число
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  //Запуск программы
  start: function () {
    if (salaryAmount.value !== '') {
      this.budget = +salaryAmount.value;

      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();

      let leftInputs = document.querySelectorAll('.data input[type="text"]');
      let arrElems = [depositCheckbox, incomePlus, expensesPlus];

      let setDisabled = (function (arr) {
        arr.forEach((elem) => elem.disabled = true);
        leftInputs.forEach((item) => item.disabled = true);
      })(arrElems);

      start.style.display = 'none';
      reset.style.display = 'block';

    } else {
      return;
    }
  },
  //Метод вывода результатов
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  //Метод добавления блоков в (Обязательные расходы)
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach((item) => item.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    appData.setValidate();
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  //Метод получение значений обязательных расходов из инпутов в обьект 
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    }, this);
  },
  //Метод добавления блоков в (Дополнительные доходы)
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach((item) => item.value = '');
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItem = document.querySelectorAll('.income-items');
    appData.setValidate();
    if (incomeItem.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  //Метод получение значений дополнительных доходов из инпутов в обьект 
  getIncome: function () {
    incomeItem.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    }, this);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  //Метод записи из инпута (Возможные расходы) в массив addExpenses
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  },
  //Метод записи из инпутов (Возможные доходы) в массив addIncome
  getAddIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  },
  //Расчет расходов за месяц
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  },
  //Расчет Дневного и Месячного бюджета
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  //Расчет срока достижения цели
  getTargetMonth: function () {
    let target = Math.ceil(targetAmount.value / this.budgetMonth);
    if (target < 0) {
      return ('Цель не будет достигнута');
    } else {
      return (`Цель будет достигнута за ${target} месяца`);
    }
  },
  //Расчет накопленных денег за период
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  //Вывод уровня дохода
  getStatusIncome: function () {
    let messege;
    if (this.budgetDay >= 1200) {
      messege = 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600) {
      messege = 'У вас средний уровень дохода';
    } else if (this.budgetDay === 0) {
      messege = 'У вас отсутствует доход или слишком много расходов';
    } else if (this.budgetDay < 0) {
      messege = 'Что то пошло не так';
    } else {
      messege = 'К сожалению у вас уровень дохода ниже среднего';
    }
    return messege;
  },
  //Ввод депозитовых данных 
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(this.moneyDeposit));
    }
  },
  //Валидатор
  setValidate: function () {
    let inputsName = document.querySelectorAll('input[placeholder="Наименование"]');
    let inputsSum = document.querySelectorAll('input[placeholder="Сумма"]');

    inputsName.forEach((input) => {
      input.addEventListener('input', () => {
        let reg = /^[а-яёА-ЯЁ]/;
        if (!isNumber(input.value)) {
          for (let i = 0; i < input.value.length; i++) {
            if (!reg.test(input.value[i]) &&
              input.value[i] !== ' ' &&
              input.value[i] !== ',' &&
              input.value[i] !== '-' &&
              input.value[i] !== '.') {
              input.value = '';
            }
          }
          return;
        } else {
          input.value = '';
        }
      });
    });

    inputsSum.forEach((input) => {
      input.addEventListener('input', () => {
        if (!isNumber(input.value)) {
          input.value = '';
        } else {
          return;
        }
      });
    });
  },
  reset: function () {
    let leftInputs = document.querySelectorAll('.data input[type="text"]');
    let arrElems = [depositCheckbox, incomePlus, expensesPlus];
    let setDisabled = (function (arr) {
      arr.forEach((elem) => elem.disabled = false);
      leftInputs.forEach((item) => item.disabled = false);
    })(arrElems);

    allInputs.forEach((item) => item.value = '');
    periodSelect.value = '1';
    periodAmount.textContent = '1';
    reset.style.display = 'none';
    start.style.display = 'block';

    for (let key in appData) {
      if (typeof(appData[key]) === 'number') {
        appData[key] = 0;
        console.log('Удалил число');
      } else if (typeof(appData[key]) === 'boolean') {
        appData[key] = false;
      } else if (appData[key].length >= 0 && typeof(appData[key]) !== 'function') {
        appData[key] = [];
      } else if (appData[key].length === undefined) {
        appData[key] = {};
      }
    }
    
    function removeItems(items, btn) {
      let counter = 0;
      items.forEach(() => {
        counter++;
      });
      for (let i = 1; counter > i; i++) {
        items[i].remove();
      }
      if (btn.style.display === 'none') {
        btn.style.display = 'block';
      }
    }
    removeItems(incomeItem, incomePlus);
    removeItems(expensesItems, expensesPlus);
  }
};


appData.setValidate();
/* Слушатели событий  ----------------------------------------------------------------------------*/
start.addEventListener('click', appData.start.bind(appData));
reset.addEventListener('click', appData.reset.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => periodAmount.textContent = periodSelect.value);
/* --------------------------------------------------------------------------------------------  */