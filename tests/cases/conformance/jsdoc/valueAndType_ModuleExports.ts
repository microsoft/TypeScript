// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: def.js
/** @typedef {number} X */
const X = { a: 1, m: 1 };
module.exports = X;

// @Filename: use.js
const X = require("./def");

/** @type {X} */
const n = 1;
