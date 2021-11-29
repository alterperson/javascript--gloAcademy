"use strict";

console.log("=================== Lesson 01 ===================");

let title = "JavaScript";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 7;
let rollback = 11;
let fullPrice = 99;
let adaptive = true;

console.log("=================== Lesson 02 ===================");

alert("Любой текст");
console.log("Любой текст");
console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " долларов" + " и " + "Стоимость разработки сайта " + fullPrice + " долларов");
console.log(screens.toLocaleLowerCase().split(", "));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));

console.log("=================== Lesson 03 ===================");

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
