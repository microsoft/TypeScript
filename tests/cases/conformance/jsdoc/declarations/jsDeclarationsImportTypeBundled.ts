// @allowJs: true
// @checkJs: true
// @outFile: out.js
// @module: amd
// @declaration: true
// @filename: folder/mod1.js
/**
 * @typedef {{x: number}} Item
 */
/**
 * @type {Item};
 */
const x = {x: 12};
module.exports = x;
// @filename: index.js

/** @type {(typeof import("./folder/mod1"))[]} */
const items = [{x: 12}];
module.exports = items;