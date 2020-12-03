// @checkJs: true
// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: instantiateTemplateTagTypeParameterOnVariableStatement.js
/**
 * @template T
 * @param {T} a
 * @returns {(b: T) => T}
 */
const seq = a => b => b;

const text1 = "hello";
const text2 = "world";

/** @type {string} */
var text3 = seq(text1)(text2);
