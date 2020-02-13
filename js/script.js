'use strict';

      // Кнопка старт
const start = document.getElementById('start'),
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
      //Поле 'возможные расходы'
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      //Поле ввода цели
      targetAmount = document.querySelector('.target-amount'),
      //Инпут, и значение периода
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      allInputs = document.querySelectorAll('input');

//Блоки полей Дополнительные доходы и Обязательные расходы
let  incomeItem = document.querySelectorAll('.income-items');
let  expensesItems = document.querySelectorAll('.expenses-items');

//Функция проверки на число
const isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  start() {
    if (salaryAmount.value !== '') {
      this.budget = +salaryAmount.value;
  
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
  
      const leftInputs = document.querySelectorAll('.data input[type="text"]');
      const arrElems = [depositCheckbox, incomePlus, expensesPlus];
  
      const setDisabled = ((arr) => {
        arr.forEach((elem) => elem.disabled = true);
        leftInputs.forEach((item) => item.disabled = true);
      })(arrElems);
  
      start.style.display = 'none';
      reset.style.display = 'block';
  
    } else {
      return;
    }
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => {
    incomePeriodValue.value = this.calcSavedMoney();
    });
  }
  //Метод добавления блоков в (Обязательные расходы)
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach((item) => item.value = '');
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    this.setValidate();
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }
  //Метод добавления блоков в (Дополнительные доходы)
  addIncomeBlock() {
    const cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach((item) => item.value = '');
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItem = document.querySelectorAll('.income-items');
    this.setValidate();
    if (incomeItem.length === 3) {
      incomePlus.style.display = 'none';
    }
  }
  getExpInc() {

    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
  
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
    };
  
    expensesItems.forEach(count);
    incomeItem.forEach(count);
  
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  //Метод записи из инпута (Возможные расходы) в массив addExpenses
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( (item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  //Метод записи из инпутов (Возможные доходы) в массив addIncome
  getAddIncome() {
    additionalIncomeItems.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  //Расчет расходов за месяц
  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  }
  //Расчет Дневного и Месячного бюджета
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  //Расчет срока достижения цели
  getTargetMonth() {
    const target = Math.ceil(targetAmount.value / this.budgetMonth);
    if (target < 0) {
      return ('Цель не будет достигнута');
    } else {
      return (`Цель будет достигнута за ${target} месяца`);
    }
  }
  //Расчет накопленных денег за период
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  //Вывод уровня дохода
  getStatusIncome() {
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
  }
  //Ввод депозитовых данных 
  getInfoDeposit() {
    if (this.deposit) {
        this.deposit = false;
      } else {
        this.deposit = true;
      }
    // if (this.deposit) {
    //   do {
    //     this.percentDeposit = prompt('Какой годовой процент?', 10);
    //   }
    //   while (!isNumber(this.percentDeposit));
    //   do {
    //     this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    //   }
    //   while (!isNumber(this.moneyDeposit));
    // }
  }
  //Валидатор
  setValidate() {
    const inputsName = document.querySelectorAll('input[placeholder="Наименование"]');
    const inputsSum = document.querySelectorAll('input[placeholder="Сумма"]');
    inputsName.forEach((input) => {
      input.addEventListener('input', () => {
        const reg = /^[а-яёА-ЯЁ]/;
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
  }
  
  reset() {
    const leftInputs = document.querySelectorAll('.data input[type="text"]');
    const arrElems = [depositCheckbox, incomePlus, expensesPlus];
    const setDisabled = ((arr) => {
      arr.forEach((elem) => elem.disabled = false);
      leftInputs.forEach((item) => item.disabled = false);
    })(arrElems);
  
    allInputs.forEach((item) => item.value = '');
    periodSelect.value = '1';
    periodAmount.textContent = '1';
    reset.style.display = 'none';
    start.style.display = 'block';
  
    for (let key in this) {
      if (typeof(this[key]) === 'number') {
        this[key] = 0;
      } else if (typeof(this[key]) === 'boolean') {
        this[key] = false;
      } else if (this[key].length >= 0 && typeof(this[key]) !== 'function') {
        this[key] = [];
      } else if (this[key].length === undefined) {
        this[key] = {};
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
  
  eventListeners() {  
    this.setValidate();
    start.addEventListener('click', () => this.start());
    reset.addEventListener('click', () => this.reset());
    expensesPlus.addEventListener('click', () => this.addExpensesBlock());
    incomePlus.addEventListener('click', () => this.addIncomeBlock());
    periodSelect.addEventListener('input', () => periodAmount.textContent = periodSelect.value);
    depositCheckbox.addEventListener('click', () => this.getInfoDeposit());
  }
}

const appData = new AppData();
appData.eventListeners();
