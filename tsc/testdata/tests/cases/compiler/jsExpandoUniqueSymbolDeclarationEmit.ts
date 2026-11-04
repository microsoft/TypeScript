// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @module: nodenext
// @outDir: out

// @Filename: index.js
const bar = function () {};
/** @type {unique symbol} */
bar.s = Symbol();
bar.g = () => bar.s;
module.exports = bar;
