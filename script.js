"use strict";

console.log("=================== Lesson 01 ===================");

/*
let title = "JavaScript";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 7;
let rollback = 11;
let fullPrice = 99;
let adaptive = true;
*/

console.log("=================== Lesson 02 ===================");

/*
alert("Любой текст");
console.log("Любой текст");
console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " долларов" + " и " + "Стоимость разработки сайта " + fullPrice + " долларов");
console.log(screens.toLocaleLowerCase().split(", "));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));
*/

console.log("=================== Lesson 03 ===================");

/*
title = prompt("Как называется ваш проект?");
screens = prompt("Какие типы экранов нужно разработать?");
screenPrice = parseInt(prompt("Сколько будет стоить данная работа?"));
adaptive = confirm("Нужен ли адаптив на сайте?");

const title2 = prompt("Как называется ваш проект?");
const screens2 = prompt("Какие типы экранов нужно разработать?");
const screenPrice2 = parseInt(prompt("Сколько будет стоить данная работа?"));
const adaptive2 = confirm("Нужен ли адаптив на сайте?");

fullPrice = screenPrice + screenPrice2;

const servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

console.log(servicePercentPrice);

if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 || fullPrice === 0) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что то пошло не так");
}
*/

console.log("=================== Lesson 04 ===================");

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
