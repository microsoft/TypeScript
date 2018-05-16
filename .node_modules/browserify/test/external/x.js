var fl = require('freelist');

module.exports = function (n) { return fl(n) + 10 };
