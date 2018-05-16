var through = require('through2');
var readonly = require('../');

module.exports = function () {
    var stream = through();
    stream.end('wooooo\n');
    return readonly(stream);
};
