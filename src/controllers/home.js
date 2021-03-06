const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

module.exports = {
    index: async(req, res) => {
        const images = await Image.find({ username: req.user.email });

        let viewModel = { images: [] };
        viewModel.images = images;
        viewModel = await sidebar(viewModel);
        res.render('index', viewModel);
    },

    home: async(req, res) => {
        const images = await Image.find().sort({ timestamp: -1 });
        let viewModel = { images: [] };
        viewModel.images = images;
        viewModel = await sidebar(viewModel);
        res.render('home', viewModel);
    }
};