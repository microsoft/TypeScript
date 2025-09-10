/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.ts
//// export default Ns;
////
//// namespace Ns {
////   function /*1*/lazy() {} // this *isn't* exported from the namespace
//// }

// @Filename: /index.ts
//// import def from "./mod"
//// def.lazy/*2*/();

verify.baselineFindAllReferences("1", "2");
