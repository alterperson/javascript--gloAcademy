"use strict";

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

    do {
      appData.screenPrice = parseFloat(prompt("Сколько будет стоить данная работа?"));
    } while (!this.isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber : function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;
    let sumServices = 0;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
      }
      do {
        sum = prompt("Сколько это будет стоить?");
      } while (!this.isNumber(sum));
      sumServices += +sum;
    }
    return +sumServices;
  },
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrice: function () {
    return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getTitle: function () {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
  },
  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },
  start: function () {
    this.asking()
    this.allServicePrices = this.getAllServicePrices()
    this.fullPrice = this.getFullPrice()
    this.servicePercentPrice = this.getServicePercentPrice()
    this.title = this.getTitle()
    this.logger()
  },
  logger: function () {
    console.log(`fullPrice: ${this.fullPrice}`);
    console.log(`servicePercentPrice: ${this.servicePercentPrice}`);
    for (let key in appData) {
      console.log(key)
    }
  }
}

appData.start();