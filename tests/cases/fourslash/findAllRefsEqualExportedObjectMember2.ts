/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.d.ts
//// const obj = {
////   nested: {
////     /*1*/foo: () => "",
////   },
//// };
////
//// export = obj.nested;

// @Filename: /index.ts
//// import { /*2*/foo } from "./mod"
//// /*3*/foo();

verify.baselineFindAllReferences("1", "2", "3");
