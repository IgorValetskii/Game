const express = require('express'), // весь синтаксис nodejs нативный переводит во что-то понятное и читабельное ))) похож на jquery из нативного js
      bodyParser = require('body-parser'), // чтобы корректно воспринимать тело запроса которое приходит на сервер и чтобы nodejs корректно парсил запрос. данные приходят в формате json либо formdata...
      morgan = require('morgan'), // чтобы в терминале адресовывалась инфа о запросах (логирование)
      app = express(); // чтобы express начал работать записываем в переменную app и вызовем работать.

app.use(bodyParser.urlencoded({extended: false})); // приложение будет использовать bodyparser и она будеи корректно принимать данные в формате urlencoded
app.use(bodyParser.json()); // -/- данные в формате urlencoded
app.use(morgan('common')); // логирование (стандартные настройки)
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // 3 строчки используются постоянно в nodejs. прописываются условия для кроссдоменного запроса.
	next(); // мы говорим что продолжаем выполнение любого из запросов.
});

app.use(
	require('./routes/tasks')
);

app.listen(3000, () =>  console.log('Server has been started..')); // указываем на каком порте работает приложение (порт 3000)  и выводит что-нибудь чтобы понять что сервер запустился.