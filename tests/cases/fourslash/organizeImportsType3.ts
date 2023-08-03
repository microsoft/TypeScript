/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true
// @moduleResolution: node
// @noUnusedLocals: true
// @target: es2018

//// import { A } from "foo";
//// import { type B } from "foo";
//// import { C } from "foo";
//// import { type E } from "foo";
//// import { D } from "foo";
////
//// console.log(A, B, C, D, E);

verify.organizeImports(
`import { A, C, D, type B, type E } from "foo";

console.log(A, B, C, D, E);`,
    undefined, 
    { organizeImportsTypeOrder : "last" }
);