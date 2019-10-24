const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const images = require('../controllers/images');
const auth = require('../controllers/auth');

module.exports = app => {

    router.get('/', home.index);
    router.get('/images/:image_id', images.index);
    router.post('/images', images.create);
    router.post('/images/:images_id/like', images.like);
    router.post('/images/:images_id/comment', images.comment);
    router.delete('/images/:images_id', images.remove);

    router.get('/signup', auth.signup);
    router.post('/signup', auth.signupCreate);

    router.get('/signin', auth.signin);
    router.post('/signin', auth.signinLogin);
    router.get('/logout', auth.logout);

    router.get('/profile', auth.profile);

    app.use(router);
};