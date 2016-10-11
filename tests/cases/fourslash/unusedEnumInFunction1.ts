/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| function f1 () {
////     enum Directions { Up, Down}
//// } |]

verify.codeFixAtPosition(`function f1 () {
}
`);

