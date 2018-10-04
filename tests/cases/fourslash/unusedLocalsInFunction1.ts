/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| function greeter() {
////    var x = 0;
////} |]

verify.rangeAfterCodeFix(`
function greeter() {
}`);
