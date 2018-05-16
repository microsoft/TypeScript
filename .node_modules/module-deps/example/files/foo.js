var bar = require('./bar');

module.exports = function (n) {
    return n * 111 + bar(n);
};
