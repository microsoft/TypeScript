/// <reference path="fourslash.ts" />

//// interface I {
////     /**/foo(): void;
//// }
////
//// const obj: I = { foo() {} };
////
//// obj.foo();

goTo.marker();
verify.baselineCallHierarchy();
