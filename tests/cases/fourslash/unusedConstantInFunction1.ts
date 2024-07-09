/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| function f1 () {
////     const x: string = "x";
//// } |]

verify.rangeAfterCodeFix(`function f1 () {
}`);

