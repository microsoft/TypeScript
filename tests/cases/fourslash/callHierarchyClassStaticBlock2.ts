/// <reference path="fourslash.ts" />

//// class C {
////     /**/static {
////         function foo() {
////             bar();
////         }
////
////         function bar() {
////             baz();
////             quxx();
////             baz();
////         }
////
////         foo();
////     }
//// }
////
//// function baz() {
//// }
////
//// function quxx() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
