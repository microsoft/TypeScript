/// <reference path="fourslash.ts" />

// @experimentalDecorators: true
//// @bar
//// class Foo {
//// }
////
//// function /**/bar() {
////     baz();
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
