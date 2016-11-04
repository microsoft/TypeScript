/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
////
//// class C1 implements I1 {[|
//// |]}

verify.rangeAfterCodeFix(`x: number;
`);
