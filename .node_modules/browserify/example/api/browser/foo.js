var bar = require('./bar');

module.exports = function (n) {
    return n * bar(n);
};
