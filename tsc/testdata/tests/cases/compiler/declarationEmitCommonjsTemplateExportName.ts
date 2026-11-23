// @allowJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: out

// @filename: a.js
const value = 123;
exports[`class`] = value;
exports[`ordinary`] = value;
exports[`default`] = value;
exports[`a b`] = value;
Object.defineProperty(exports, `a b`, { value });
Object.defineProperty(exports, `other name`, { value });
