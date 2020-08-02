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

// @filename: index.js
import Blah from "./blah";
import { util1, util2 } from "./utils";
