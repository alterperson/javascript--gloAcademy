"use strict";

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    this.asking()
    this.addPrices()
    this.getFullPrice()
    this.getServicePercentPrice()
    this.getTitle()

    this.logger()
  },
  isNumber : function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  asking: function () {
    do {
      this.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    } while (!isNaN(this.title))


    for (let i = 0; i < 2; i++) {
      let name = '';

      do {
        name = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");
      } while (!isNaN(name))

      let price = 0;

      do {
        price = parseFloat(prompt("Сколько будет стоить данная работа?", 10000));
      } while (!this.isNumber(price));

      this.screens.push({id: i, name: name, price: price});
    }

    for (let i = 0; i < 2; i++) {
      let name = '';

      do {
        name =`${i + 1}. ` + prompt("Какой дополнительный тип услуги нужен?", "Метрика, Адаптив");
      } while (!isNaN(name))

      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", 2000);
      } while (!this.isNumber(price));

      this.services[name] = +price;
    }

    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    for (let key in this.services) {
      this.allServicePrices += this.services[key]
    }
  },
  getFullPrice: function () {
    const screenPrice = this.screens.reduce(function (sum, item) {
      return sum += +item.price
    }, 0)

    this.fullPrice = +screenPrice + this.allServicePrices;
  },
  getServicePercentPrice: function () {
    this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  getTitle: function () {
    this.title = this.title.trim()[0].toUpperCase() + this.title.trim().slice(1).toLowerCase();
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
  logger: function () {
    console.log(`fullPrice: ${this.fullPrice}`);
    console.log(`servicePercentPrice: ${this.servicePercentPrice}`);
    console.log('screens', this.screens);
    console.log('services', this.services);
  }
}

appData.start();