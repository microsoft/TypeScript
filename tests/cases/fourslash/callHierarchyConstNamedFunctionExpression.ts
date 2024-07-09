/// <reference path="fourslash.ts" />

//// function foo() {
////     bar();
//// }
////
//// const /**/bar = function () {
////     baz();
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
