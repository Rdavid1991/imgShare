const path = require('path');
const fs = require('fs-extra');

const libs = require('../helpers/libs')
const { Image } = require('../models');

const ctrl = {};

ctrl.index = (req, res) => {
    res.send('index page')
}

ctrl.create = async (req, res) => {
    //this function create images
    const imageUrl = libs.randomNumber();
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`)
    
    console.log(req.file);

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
        new Image({
            title: req.body.title,
            filename: imageUrl + ext,
            description: req.body.description
        })
    }

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