/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number & { __iBrand: any };
//// }
////
//// class C1 implements I1 {[|
//// |]}

verify.rangeAfterCodeFix(`
x: number & { __iBrand: any; };
`);
