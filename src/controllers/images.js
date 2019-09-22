const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');

const libs = require('../helpers/libs');
const { Image, Comment } = require('../models');

const ctrl = {};

ctrl.index = async(req, res) => {
    const viewModel ={ image: {},comments:{}};
    const image = await Image.findOne({ filename: { $regex: String(req.params.image_id) } });
    if(image){
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({ image_id: image._id });
        viewModel.comments = comments;
        res.render('image', viewModel);
    }else {
        res.redirect("/");
    }
  
};

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
            const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`);

            console.log(req.file);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImage = new Image({
                    title: req.body.title,
                    filename: imageUrl + ext,
                    description: req.body.description
                });
                const imageSaved = await newImage.save();
                res.redirect('/images/' + imageUrl);
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({ error: 'only images are allowed' });
            }
        }
    };
    saveImage();
};

ctrl.like = (req, res) => {
    res.send('index page');
};

ctrl.comment = async(req, res) => {
    const image = await Image.findOne({ filename: { $regex: String(req.params.images_id) } });
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    }else{
        res.redirect("/");
    }
};

ctrl.remove = (req, res) => {
    res.send('index page');
};

module.exports = ctrl;