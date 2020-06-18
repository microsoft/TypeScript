/// <reference path="fourslash.ts" />

//// function foo() {
////     bar();
//// }
////
//// const /**/bar = () => {
////     baz();
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
