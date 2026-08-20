// @allowJs: true
// @checkJs: true
// @target: es2015
// @outDir: ./out
// @declaration: true

// @filename: index.js
// Named class expression exports without module.exports assignment.
// The class expression name B should be preserved via namespace isolation
// even without a module.exports = ... in the file.
module.exports.A = class B {f1 = 1; self = new B();}
