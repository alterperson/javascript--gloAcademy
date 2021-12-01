"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 11;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так";
  }
};

const allServicePrices = function (priceForService1, priceForService2) {
  return priceForService1 + priceForService2;
};

const getFullPrice = function fullPrice(priceForScreen) {
  return priceForScreen + allServicePrices(servicePrice1, servicePrice2);
};

function getTitle(title) {
  return title;
}

const getServicePercentPrices = function servicePercentPrices() {
  return getFullPrice(screenPrice) - servicePercentPrice;
};

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
console.log(screens.split(", "));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());
