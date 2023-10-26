// cd 
// npm init
// npm i (install) express nodemon cors


import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import fs from 'fs' //file system
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));


let app = express();

app.use(cors())
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});


app.get('/overview.css', function(req, res) {
  res.sendFile(__dirname + "/static/css/overview.css");
});
app.get('/script.js', function(req, res) {
    res.sendFile(__dirname + "/" + "script.js");
    });


app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname })
  });
app.get('/overview', function(req, res) {
  res.render('overview.ejs')
  });

  app.get('/contact', function(req, res) {
    res.render('contact.ejs')
    });


// Установка шаблонизатора EJS
app.set('view engine', 'ejs');

// Указываем путь к папке с шаблонами представлений
app.set('views', path.join(__dirname, 'views'));

// Эндпоинт /details/:id
app.get('/details/:id', (req, res) => {
  // Получаем значение параметра id из URL
  const id = req.params.id;

  // Здесь вы можете использовать полученный идентификатор (id), чтобы получить данные о товаре из базы данных или любого другого источника.

  // Ваши данные о товаре
  let data2
  fetch(`https://dummyjson.com/products/${id}`)
  .then((data)=> (data.json()))
  .then((json)=> {
    data2 = json;
      res.render('details', { data2 });
  })

  // Рендеринг шаблона с данными
});

// git send files -> cloud
// install login

// git add .
// git commit -m "c"
// git push -u origin main


app.listen(3000)
//  http://localhost:3000/details/12