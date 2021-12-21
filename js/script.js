"use strict";

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');
const cmsCheck = document.querySelector('#cms-open');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isError: false,
  init: function () {
    this.addTitle();
    buttonPlus.addEventListener('click', this.addScreenBlock);
    startBtn.addEventListener('click', this.checkValues.bind(this));
    resetBtn.addEventListener('click', this.reset.bind(this));
    inputRange.addEventListener('input', this.changeRangeValue.bind(this));
    cmsCheck.addEventListener('change', this.openCms);
  },
    // Изменение отката
  changeRangeValue: function () {
    inputRangeValue.textContent = `${inputRange.value}%`;
    this.rollback = +inputRange.value;
    this.checkValues();
  },
  // Добавляет заголовок во вкладке
  addTitle: function () {
    document.title = title.textContent;
  },
  // Добавление доп. экранов
  addScreenBlock: function () {
    const screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector('input').value = '';
    screens[screens.length - 1].after(cloneScreen);
  },
  // Проверка наличия значений в полях
  checkValues: function () {
    this.isError = false;
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input[type=text]');

      if (select.value === '' || (input.value === '' && isFinite(input))) {
        this.isError = true;
      }
    })

    if (!this.isError) {
      this.start();
    } else {
      alert('Поля не заполнены')
    }
  },
  // Добавление экранов
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    })
  },
  // Добавление доп. услуг
  addServices: function () {
    otherItemsPercent.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    })

    otherItemsNumber.forEach(item => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  // Подсчёт цены
  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, item) => sum += +item.price, 0)

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + +this.servicePricesNumber + +this.servicePricesPercent;

    this.servicePercentPrice = this.fullPrice - (this.fullPrice * (+this.rollback / 100));
  },
  // Подсчёт экранов
  countScreens: function () {
    const screensInput = document.querySelectorAll('.screen input')
    let count = 0
    screensInput.forEach((item) => {
        count += +item.value;
    })
    return count;
  },
  openCms: function () {
    const cmsHidden = document.querySelector('.hidden-cms-variants');
    const cmsSelect = cmsHidden.querySelector('#cms-select');
    const cmsHiddenInput = cmsHidden.querySelector('.main-controls__input');

    if (cmsCheck.checked) {
      cmsHidden.style.display = 'flex';
    }

    cmsSelect.addEventListener('change', function () {
      if (cmsSelect.value === 'other') {
        cmsHiddenInput.style.display = 'block';
      }
    })
  },
  // Вывод результатов
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.countScreens();
  },
  // Блокировка полей
  disableFields: function () {
    const selects = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type=text]');

    selects.forEach(select => {
      select.setAttribute('disabled', 'disabled');
    })

    inputs.forEach(input => {
      input.setAttribute('disabled', 'disabled');
    })

    startBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  },
  // Разблокировка полей
  enableFields: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen) => {
      const selects = screen.querySelectorAll('select');
      const inputs = screen.querySelectorAll('input');

      selects.forEach(select => {
        select.removeAttribute('disabled')
      })

      inputs.forEach(input => {
        input.removeAttribute('disabled')
      })
    });

    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';
  },
  // Сброс данных
  resetData: function () {
    this.screens = [];
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
  },
  clearServices: function () {
    const checkedInputs = document.querySelectorAll('input[type=checkbox]')

    checkedInputs.forEach(check => {
      check.checked = false;
    })

    // Код для обнуления отката при сбросе
    inputRange.value = 0;
    inputRangeValue.textContent = '0%';
    this.changeRangeValue();

  },
  clearScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen, index) => {
      const selects = screen.querySelectorAll('select');
      const inputs = screen.querySelectorAll('input');

      selects.forEach(select => {
        select.selectedIndex = 0;
        if (index !== 0) {
          select.remove();
        }
      })

      inputs.forEach(input => {
        input.value = '';
        if (index !== 0) {
          input.remove();
        }
      })
    });
  },
  // Метод запуска
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.logger();
    this.showResult();
    this.disableFields();
    this.resetData();
  },
  // Метод сброса(чистки)
  reset: function () {
    this.clearServices();
    this.clearScreens();
    this.resetData();
    this.enableFields();
  },
  // Логирование
  logger: function () {
    console.log(`fullPrice: ${this.fullPrice}`);
    console.log(`servicePercentPrice: ${this.servicePercentPrice}`);
    console.log('screens', this.screens);
  }
}

appData.init();