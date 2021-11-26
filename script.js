const title = "JavaScript";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 7;
const rollback = 11;
const fullPrice = 99;
const adaptive = true;

alert("Любой текст");
console.log("Любой текст");
console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " долларов" + " и " + "Стоимость разработки сайта " + fullPrice + " долларов");
console.log(screens.toLocaleLowerCase().split(", "));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));
