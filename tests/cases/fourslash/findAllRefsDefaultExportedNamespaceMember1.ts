/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.d.ts
//// export default React;
////
//// declare namespace React {
////   function /*1*/lazy(): void;
//// }

// @Filename: /index.ts
//// import def from "./mod"
//// def.lazy/*2*/();

verify.baselineFindAllReferences("1", "2");
