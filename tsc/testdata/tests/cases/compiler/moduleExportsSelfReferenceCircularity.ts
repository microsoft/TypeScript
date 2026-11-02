// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @filename: a.js
module.exports = { x: module.exports.y, y: 1 };
exports.z = exports.x;
const self = require("./a");
module.exports.w = self.y;
module.exports.v = module.exports;

// @filename: b.js
const a = require("./a");
exports.q = a.x;
exports.r = module.exports.q;
