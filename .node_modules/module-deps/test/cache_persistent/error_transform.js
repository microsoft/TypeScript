var through = require('through2');
module.exports = function (file) {
    return through(function (chunk, enc, callback) {
        callback(new Error('rawr'));
    });
};
