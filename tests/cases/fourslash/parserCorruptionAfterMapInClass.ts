/// <reference path="fourslash.ts" />

// @target: esnext
// @lib: es2015
// @strict: true

//// class C {
////     map = new Set<string, number>/*$*/
////
////     foo() {
////
////     }
//// }

goTo.marker('$');
edit.insert('()');
verify.getSyntacticDiagnostics([]);
