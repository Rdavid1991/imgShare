const express = require('express');
const router = express.Router();

const home = require('../controllers/home')
const images = require('../controllers/images')

module.exports = app => {

    router.get('/', home.index);
    router.get('/images/:image_id', images.index);
    router.post('/images', images.create);
    router.post('/images/:images_id/like', images.like);
    router.post('/images/:images_id/comment', images.comment);
    router.delete('/images/:images_id', images.remove);
    

    app.use(router);
}