/// <reference path="fourslash.ts" />

//// function foo() {
////     new Bar();
//// }
////
//// const /**/Bar = class {
////     constructor() {
////         baz();
////     }
//// }
////
//// function baz() {
//// }

goTo.marker();
verify.baselineCallHierarchy();
