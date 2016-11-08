/// <reference path='fourslash.ts' />

//// interface I {
////     x: number;
////     y: number;
//// }
////
//// class C2 implements I {[|
////     x: number;
//// |]}

verify.rangeAfterCodeFix(`
y: number;
x: number;
`);
