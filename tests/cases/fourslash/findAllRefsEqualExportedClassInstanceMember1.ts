/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.ts
//// class Cls {
////   /*1*/foo() {}
//// };
////
//// export = new Cls();

// @Filename: /index.ts
//// import { /*2*/foo } from "./mod"
//// /*3*/foo();

verify.baselineFindAllReferences("1", "2", "3");
