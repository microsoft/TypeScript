/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.d.ts
//// export default Outer.Inner;
////
//// declare namespace Outer {
////   namespace Inner {
////     function /*1*/lazy(): void;
////   }
//// }

// @Filename: /index.ts
//// import def from "./mod"
//// def.lazy/*2*/();

verify.baselineFindAllReferences("1", "2");
