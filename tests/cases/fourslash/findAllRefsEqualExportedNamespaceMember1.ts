/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /mod.d.ts
//// export = React;
////
//// declare namespace React {
////   function /*1*/lazy(): void;
//// }

// @Filename: /index.ts
//// import { /*2*/lazy } from "./mod"
//// /*3*/lazy();

verify.baselineFindAllReferences("1", "2", "3");
