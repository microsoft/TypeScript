/// <reference path='fourslash.ts' />

//// interface I {
////     x: number;
////     y: number;
//// }
////
//// class C2 implements C {[| |]
////     x: number
//// }

verify.rangeAfterCodeFix(`
y: number;
`);
