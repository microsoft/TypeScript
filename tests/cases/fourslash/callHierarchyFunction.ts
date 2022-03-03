/// <reference path="fourslash.ts" />

//// function foo() {
////     bar();
//// }
////
//// function /**/bar() {
////     baz();
////     quxx();
////     baz();
//// }
////
//// function baz() {
//// }
////
//// function quxx() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
