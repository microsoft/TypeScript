// @esModuleInterop: true
// @checkJs: true
// @module: commonjs
// @target: es5
// @outDir: ./out

// @Filename: ./test.js
module.exports = {
   message: ""
}

// @Filename: ./types1.ts
import test from "./test";
export type test

// @Filename: ./types2.ts
import test from "./test";
export type test = 

// @Filename: ./types3.ts
import test from "./test";
export type test = test;
