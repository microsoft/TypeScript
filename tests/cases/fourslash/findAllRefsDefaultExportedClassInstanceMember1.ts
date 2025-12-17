/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.ts
//// class Cls {
////   /*1*/foo() {}
//// };
////
//// export default new Cls();

// @Filename: /index.ts
//// import def from "./mod"
//// def.foo/*2*/();

verify.baselineFindAllReferences("1", "2");
