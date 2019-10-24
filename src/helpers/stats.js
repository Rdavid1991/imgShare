const { Comment, Image } = require('../models');

async function imageCounters() {
    return await Image.countDocuments();
}

async function commentsCounter() {
    return await Comment.countDocuments();
}

async function imageTotalViewsCounters() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);

    if (result.length > 0) {
        return result[0].viewsTotal;
    }
    return 0;
}

async function likesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likestotal: { $sum: '$likes' }
        }
    }]);
    if (result.length > 0) {
        return result[0].likestotal;
    }
    return 0;
}

module.exports = async() => {
    const result = await Promise.all([
        imageCounters(),
        commentsCounter(),
        imageTotalViewsCounters(),
        likesTotalCounter()
    ]);

    return {
        images: result[0],
        comments: result[1],
        views: result[2],
        likes: result[3]
    };
};