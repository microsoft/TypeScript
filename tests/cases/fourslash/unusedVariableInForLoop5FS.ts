/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     for (const elem in ["a", "b", "c"]) {
////
////     }
//// }

verify.codeFixAtPosition(`
function f1 () {
     for (const {} in ["a", "b", "c"]) {
     }
}
`);

