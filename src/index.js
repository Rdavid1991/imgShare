require('dotenv').config();

const express = require('express');
const config = require('./server/config');

require('./database');
require('./controllers/local-auth');
require('colors');

const app = config(express());
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`.yellow);
});