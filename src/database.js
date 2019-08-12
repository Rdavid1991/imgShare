require('colors');
const {database} = require('./key')
const mongoose = require('mongoose');

mongoose.connect(database.URI,{useNewUrlParser: true })
    .then(db => console.log('DB is connect'.yellow))
    .catch(err => console.error(err))

