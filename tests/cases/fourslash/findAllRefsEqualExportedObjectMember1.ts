/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.ts
//// const obj = {
////   /*1*/foo: () => "",
//// };
////
//// export = obj;

// @Filename: /index.ts
//// import { /*2*/foo } from "./mod"
//// /*3*/foo();

verify.baselineFindAllReferences("1", "2", "3");
