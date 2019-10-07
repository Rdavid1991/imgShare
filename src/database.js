require('colors');
const mongoose = require('mongoose');

//keys for connect to online services.
const { database } = require('./key');

mongoose.connect(database.URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connect'.yellow))
    .catch(err => console.error('DataBase is not connect for ', err));