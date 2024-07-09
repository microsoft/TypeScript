/// <reference path="fourslash.ts" />

//// function foo() {
////     bar();
//// }
////
//// function /**/bar() {
////     new Baz();
//// }
////
//// class Baz {
//// }

goTo.marker();
verify.baselineCallHierarchy();
