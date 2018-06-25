// @checkJs: true
// @allowJS: true
// @noEmit: true
// @Filename: bug24754.js
// #24754
const webpack = (function () { return { n: 12 } })()
exports = module.exports = webpack;
exports.version = 1001;

webpack.WebpackOptionsDefaulter = 1111;

// @Filename: use.js
var w = require('./bug24754')
var n = w.version * w.WebpackOptionsDefaulter * w.n
