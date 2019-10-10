require('colors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    // eslint-disable-next-line no-unused-vars
    .then(db => console.log('DB is connect'.yellow))
    .catch(err => console.error('DataBase is not connect for ', err));