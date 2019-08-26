const path = require('path');
const fs = require('fs-extra');

const libs = require('../helpers/libs')
const { Image } = require('../models');

const ctrl = {};

ctrl.index = (req, res) => {
    res.send('index page')
}

ctrl.create = (req, res) => {
    //this function create images

    const saveImage = async() => {
        const imageUrl = libs.randomNumber();
        const images = Image.find({ filename: imageUrl });

        if (images.length > 0) {
            saveImage();
        } else {

            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`)

            console.log(req.file);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImage = new Image({
                    title: req.body.title,
                    filename: imageUrl + ext,
                    description: req.body.description
                })
                const imageSaved = await newImage.save();
                res.send('works')
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({ error: 'only images are allowed' })
            }
        }
    }
    saveImage();
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