// @declaration: true
// @emitDeclarationOnly: true
// @allowJs: true

// @filename: bug.js
exports[1] = 2;
module.exports[1] = 2;
Object.defineProperty(exports, 1, {});
