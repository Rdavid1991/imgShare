const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');

const libs = require('../helpers/libs');
const { Image, Comment, UserLike } = require('../models');
const sidebar = require('../helpers/sidebar');

module.exports = {
    index: async(req, res) => {
        let viewModel = { image: {}, comments: {} };
        const image = await Image.findOne({ filename: { $regex: String(req.params.image_id) } });
        if (image) {
            image.views = image.views + 1;
            viewModel.image = image;
            await image.save();
            const comments = await Comment.find({ image_id: image._id });
            viewModel.comments = comments;
            viewModel = await sidebar(viewModel);
            res.render('image', viewModel);
        } else {
            res.redirect("/");
        }
    },

    create: (req, res) => {
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
                        description: req.body.description,
                        username: req.user.email
                    });
                    // eslint-disable-next-line no-unused-vars
                    const imageSaved = await newImage.save();
                    res.redirect('/images/' + imageUrl);
                } else {
                    await fs.unlink(imageTempPath);
                    res.status(500).json({ error: 'only images are allowed' });
                }
            }
        };
        saveImage();
    },

    like: async(req, res) => {

        if (req.user.email !== undefined) {
            const img = await Image.findOne({ filename: { $regex: String(req.params.images_id) } });
            const user = await UserLike.findOne({ user: req.user.email });
            if (user) {
                if (img) {
                    if (user.imgId == img._id && user.status === true) {
                        img.likes = img.likes - 1;
                        user.status = false;
                    } else if (user.imgId == img._id && user.status === false) {
                        img.likes = img.likes + 1;
                        user.status = true;
                    }
                } else {
                    res.status(500).json({ error: 'internal error' });
                }
                await user.save();
                await img.save();
                res.json({ like: img.likes });
            } else {
                const newuser = new UserLike({
                    imgId: img._id,
                    user: req.user.email,
                    status: true,
                });
                newuser.save();
                img.likes = img.likes + 1;
            }
        }
    },

    comment: async(req, res) => {
        const image = await Image.findOne({ filename: { $regex: String(req.params.images_id) } });
        if (image) {
            const newComment = new Comment(req.body);
            newComment.gravatar = md5(newComment.email);
            newComment.image_id = image._id;
            await newComment.save();
            res.redirect('/images/' + image.uniqueId);
        } else {
            res.redirect("/");
        }
    },

    remove: async(req, res) => {
        const image = await Image.findOne({ filename: { $regex: String(req.params.images_id) } }, { username: req.user.email });
        if (image) {
            await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
            await Comment.deleteOne({ image_id: image._id });
            await image.remove();
            res.json(true);
        }
    }
};