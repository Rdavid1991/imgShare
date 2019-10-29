require('dotenv').config();

const express = require('express');
const arte = require('figlet');
const config = require('./server/config');
const app = config(express());

require('./database');
require('./controllers/local-auth');
require('colors');

console.log(arte.textSync("Hola Mundo", "Sub-Zero").blue)

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`.yellow);
});