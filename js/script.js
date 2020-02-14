'use strict';

document.addEventListener('DOMContentLoaded', () => {

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
        depositBank = document.querySelector('.deposit-bank'),
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

        incomeItem = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();

        this.blockInputs();
    
      } else {
        return;
      }
    }
    //Блокировка инпутов
    blockInputs() {
      const leftInputs = document.querySelectorAll('.data input[type="text"]');
      const arrElems = [depositCheckbox, incomePlus, expensesPlus, depositBank];

      const setDisabled = ((arr) => {
        arr.forEach((elem) => elem.disabled = true);
        leftInputs.forEach((item) => item.disabled = true);
      })(arrElems);

      start.style.display = 'none';
      reset.style.display = 'block';
    }
    //Вывод результатов
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
      this.cookieLocal('in');
      });
      this.cookieLocal('in');
    }
    //Все что связано с локал и куки 
    cookieLocal(inOut) {
      const setCookie = (key, value, year, month, day) => {
        let cookieStr = key + '=' + value;
        if ( year ) {
          const expires = new Date(year, month, day);
          cookieStr += '; expires=' + expires.toGMTString();
        }
        document.cookie = cookieStr;
      };

      const setLocal = () => {
        document.querySelectorAll('.result input[type="text"]').forEach((item) => {
          if (inOut === 'in' || inOut === 'out') {
            setCookie(item.className.split(' ')[1], item.value, 2100, 4, 1);
          } else {
            setCookie(item.className.split(' ')[1], item.value, 1900, 4, 1);
          }
          if (inOut === 'in') {
            localStorage.setItem(item.className.split(' ')[1], item.value);
          } else {
            localStorage.removeItem(item.className.split(' ')[1]);
          }
        });  
        if (inOut === 'in') {
          setCookie('isLoad', true, 2100, 4, 4);
        } else if (inOut === 'out') {
          setCookie('isLoad', false, 2100, 4, 4);
        } else {
          setCookie('isLoad', false, 1900, 4, 4);
        }
      };

      setLocal();
    }
    //Добавление полей доходов и расходов
    addExpIncBlock() {
      const addBlock = (arrItems, plus) => {
          const startStr = arrItems[0].className.split('-')[0];
          const cloneItem = arrItems[0].cloneNode(true);

          cloneItem.querySelectorAll('input').forEach((item) => item.value = '');
          arrItems[0].parentNode.insertBefore(cloneItem, plus);

          arrItems = document.querySelectorAll(`.${startStr}-items`);

          this.setValidate();
          
            if (arrItems.length === 3) {
                plus.style.display = 'none';
            }
      };

      if (event.target === expensesPlus) {
        addBlock(expensesItems, expensesPlus);
      } else if (event.target === incomePlus) {
        addBlock(incomeItem, incomePlus);
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

      incomeItem.forEach(count);
      expensesItems.forEach(count);
    
      for (const key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    }
    getAddExpInc() {

      const res = (additional, add) => {
        let changeItem;
        if (additional !== additionalIncomeItems) {
          additional = additional.value.split(',');
        }
          additional.forEach( item => {
            if ( typeof(item) === 'string' ) {
              item = item.trim();
              changeItem  = item;
            } else {
              item.value.trim();
              changeItem = item.value;
            }
            if (changeItem !== '') {
              add.push(changeItem);
            }
        });
      };

      res(additionalExpensesItem, this.addExpenses);
      res(additionalIncomeItems, this.addIncome);

      incomeItem = document.querySelectorAll('.income-items');
      expensesItems = document.querySelectorAll('.expenses-items');
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
      const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
      return Math.floor(this.budgetMonth * periodSelect.value);
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
    // Сброс
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
      
      if (depositCheckbox.checked === true) {
        depositCheckbox.checked = false;
        this.depositHandler();
      }

      depositBank.disabled = false;
      periodSelect.disabled = false;

      function removeItems(items, btn) {  
        let counter = 0;
        items.forEach(function() {
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
    //Ввод депозитовых данных 
    getInfoDeposit() {
      if (this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
    }
    changePercent() {
      const valueSelect = this.value;
      if (valueSelect === 'other') {
        depositPercent.value = '';
        start.disabled = true;
        depositPercent.style.display = 'inline-block';

        depositPercent.addEventListener('input', () => {
          start.disabled = true; 

          if (!isNumber(depositPercent.value)) {
            depositPercent.value = '';
          } else if (depositPercent.value < 0 ||
                    depositPercent.value > 100 || 
                    depositPercent.value === '') {   

            depositPercent.value = '';
            alert('Введите корректное значение в поле проценты!');

          } else {
            start.disabled = false;
          }
        });
      } else {
        start.disabled = false;
        depositPercent.style.display = 'none';
        depositPercent.value = valueSelect;
      }
    }
    depositHandler() {
      if  (depositCheckbox.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
      } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';

        if (depositPercent.style.display === 'inline-block') {
          depositPercent.style.display = 'none';
        }

        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
      }
    }
    eventListeners() {
      this.setValidate();
      start.addEventListener('click', () => this.start());
      reset.addEventListener('click', () => {
        this.reset();
        this.cookieLocal('out');
      });
      expensesPlus.addEventListener('click', () => this.addExpIncBlock());
      incomePlus.addEventListener('click', () => this.addExpIncBlock());
      periodSelect.addEventListener('input', () => periodAmount.textContent = periodSelect.value);
      depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
    }
  }

  const appData = new AppData();
  appData.eventListeners();

  const inputs = document.querySelectorAll('.result input[type="text"]');

  function getLocal() {
    inputs.forEach((item) => {
      let itemClass = item.className.split(' ')[1];
      if (localStorage.getItem(itemClass)) {
        document.querySelector(`.${itemClass}`).value = localStorage.getItem(itemClass);
        appData.blockInputs();
        periodSelect.disabled = true;
      } 
    });
  }

  function isCookieCorrect() {
    function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    if (getCookie('isLoad') === 'true') {
      inputs.forEach((item) => {
      let keyName = item.className.split(' ')[1];
        if (localStorage.getItem(keyName) === getCookie(keyName)) {
          console.log('равны');
        } else {
          appData.cookieLocal('off');
          appData.reset();
          return;
        }
      });
    }
  }
  getLocal();
  isCookieCorrect();
});