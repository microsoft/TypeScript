// @noemit: true
// @allowjs: true
// @checkjs: true
// @strict: true
// @Filename: paren.js
/** @type {function((string), function((string)): string): string} */
var x = (s, id) => id(s)
