/// <reference path='fourslash.ts' />

//// interface I {
////     x: {};
//// }
////
//// class C implements I {[|
////    |]constructor() { }
//// }

verify.rangeAfterCodeFix(`
x: {};
`);
