const path = require('path');
const libs = require('../helpers/libs')

const ctrl = {};

ctrl.index = (req, res) => {
    res.send('index page')
}

ctrl.create = (req, res) => {
    //this function create images
    const imageUrl = libs.randomNumber();
    const constimageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`/src/public/upload/${imageUrl}${ext}`)
    console.log(req.file);
    res.send('works')
}

ctrl.like = (req, res) => {
    res.send('index page')
}

ctrl.comment = (req, res) => {
    res.send('index page')
}

ctrl.remove = (req, res) => {
    res.send('index page')
}

module.exports = ctrl;