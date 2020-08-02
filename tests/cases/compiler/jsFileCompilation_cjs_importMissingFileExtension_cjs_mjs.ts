// @allowJs: true
// @checkJs: true
// @noEmit: true
// @target: es6

// @filename: blah.mjs
export default class Blah {}

// @filename: utils.cjs
function util1() {}
function util2() {}
module.exports = { util1, util2 };

// @filename: index.cjs
const Blah = require("./blah");
const { util1, util2 } = require("./utils");
