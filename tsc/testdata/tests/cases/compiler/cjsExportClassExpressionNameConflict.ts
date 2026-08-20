// @allowJs: true
// @checkJs: true
// @target: es2015
// @outDir: ./out
// @declaration: true

// @filename: index.js
module.exports.A = class B {f1 = 1; self = new B();}
module.exports.B = class B {f1 = "ok"; self = new B();}
