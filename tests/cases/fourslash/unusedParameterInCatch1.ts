/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true
//// function f1() {
//// try {} catch(ex) {}
//// }

verify.codeFixAtPosition(`
function f1() {
try {} catch() {}
}
`);
