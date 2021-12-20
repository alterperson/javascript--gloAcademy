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
    appData.addTitle();
    buttonPlus.addEventListener('click', appData.addScreenBlock);
    startBtn.addEventListener('click', appData.checkValues);
    inputRange.addEventListener('input', appData.changeRangeValue);
  },
    // Изменение отката
  changeRangeValue: function () {
    inputRangeValue.textContent = `${inputRange.value}%`;
    appData.rollback = +inputRange.value;
    appData.checkValues();
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
    appData.isError = false;
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input[type=text]');

      if (select.value === '' || (input.value === '' && isFinite(input))) {
        appData.isError = true;
      }
    })

    if (!appData.isError) {
      appData.start();
    } else {
      alert('Поля не заполнены')
    }
  },
  // Добавление экранов
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    })
  },
  // Добавление доп. услуг
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    })

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  // Подсчёт цены
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum += +item.price
    }, 0)

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + +appData.servicePricesNumber + +appData.servicePricesPercent;

    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (+appData.rollback / 100));
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
  // Вывод результатов
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    totalFullCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.countScreens();
  },
  // Сброс данных
  resetData: function () {
    appData.screens = [];
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
  },
  // Метод запуска
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.logger();
    appData.showResult();
    appData.resetData();
  },
  // Логирование
  logger: function () {
    console.log(`fullPrice: ${appData.fullPrice}`);
    console.log(`servicePercentPrice: ${appData.servicePercentPrice}`);
    console.log('screens', appData.screens);
  }
}

appData.init();