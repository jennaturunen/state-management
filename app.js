'use strict';
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

const username = 'foo';
const password = 'bar';

app.use(session({
  secret: 'salainen kissa',
  resave: false,
  saveUninitialized: true,
}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr).send('cookie set');
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('cookie color cleared');
});

app.get('/form', (req, res) => {
  res.render('form');
});

// jos kirjautuminen onnistuu, kirjaudutaan sisään, muuten pysytään formissa
app.get('/secret', (req, res) => {
  if (req.session.logged) {
    res.render('secret');
  } else {
    res.redirect('/form');
  }
});

app.post('/login', (req, res) => {
  if (username === req.body.username && password === req.body.password) {
    req.session.logged = true;
    res.redirect('/secret');
  } else {
    req.session.logged = false;
    res.redirect('/form');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));