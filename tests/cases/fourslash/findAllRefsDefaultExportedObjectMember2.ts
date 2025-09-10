/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.ts
//// const obj = {
////   nested: {
////     /*1*/foo: () => "",
////   },
//// };
////
//// export default obj.nested;

// @Filename: /index.ts
//// import def from "./mod"
//// def.foo/*2*/();

verify.baselineFindAllReferences("1", "2");
