// @checkJs: true

// @Filename: bar.js
module.exports = function () {};
 exports.blah = exports.unknown;

// @Filename: foo.js
var bar = require("./bar");
bar.nonexistentProperty;