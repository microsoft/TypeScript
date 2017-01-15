/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| function f1 () {
////     enum Directions { Up, Down}
//// } |]

verify.rangeAfterCodeFix(`function f1 () {
}
`);

