/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.d.ts
//// export = Outer.Inner;
////
//// declare namespace Outer {
////   namespace Inner {
////     function /*1*/lazy(): void;
////   }
//// }

// @Filename: /index.ts
//// import { /*2*/lazy } from "./mod"
//// /*3*/lazy();

verify.baselineFindAllReferences("1", "2", "3");
