// @filename: typedefModuleExportsIndirect3.js
// @checkJs: true
// @strict: true
// @outdir: dist
// @declaration: true
/** @typedef {{ a: 1, m: 1 }} C */
const o = {};
module.exports = o;
// @filename: use.js
/** @typedef {import('./typedefModuleExportsIndirect3').C} C */
/** @type {C} */
var c
