// @declaration: true
// @declarationOut: bin/declaration.out.d.ts
// @module: commonjs
// @out: bin/out.js

// @filename: declarationOut/fileA.ts
// Shold emit to "declatation.out.d.ts" and not "out.d.ts"
var A = 0;

// @filename: declarationOut/fileB.ts
var B = 0;

// @filename: declarationOut/fileC.ts
var C = 0;

