// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: file.js
exports.foo = 42
exports.foo = "hello"
exports.foo = true

// @filename: file2.js
exports.foo = 42
/** @type {string} */
exports.foo = "hello"
/** @type {boolean} */
exports.foo = true