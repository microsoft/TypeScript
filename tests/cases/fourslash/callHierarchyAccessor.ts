/// <reference path="fourslash.ts" />

//// function foo() {
////     new C().bar;
//// }
////
//// class C {
////     get /**/bar() {
////         return baz();
////     }
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
