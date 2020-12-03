/// <reference path="fourslash.ts" />

//// function foo() {
////     bar();
//// }
////
//// const bar = function () {
////     baz();
//// }
////
//// function baz() {
//// }
////
//// /**/bar()
goTo.marker();
verify.baselineCallHierarchy();
