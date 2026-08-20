// @declaration: true
// @emitDeclarationOnly: true
// @allowJs: true
// @checkJs: true
// @module: commonjs
// @target: es6
// @filename: file.js
const customSymbol = Symbol("custom");

// This is a common pattern in Node’s built-in modules:
module.exports = {
    customSymbol,
};

exports.customSymbol2 = Symbol("custom");