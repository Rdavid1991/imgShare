const moment = require('moment');

module.exports = helpers = {
    timeago: timestamp =>{
        return moment(timestamp).startOf('minute').fromNow();
    }
}