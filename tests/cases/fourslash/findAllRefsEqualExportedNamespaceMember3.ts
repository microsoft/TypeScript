/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.ts
//// export = Ns;
////
//// namespace Ns {
////   function /*1*/lazy() {} // this *isn't* exported from the namespace
//// }

// @Filename: /index.ts
//// import { /*2*/lazy } from "./mod"
//// /*3*/lazy();

verify.baselineFindAllReferences("1", "2", "3");
