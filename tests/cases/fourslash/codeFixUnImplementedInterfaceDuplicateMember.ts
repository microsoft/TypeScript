/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     x: number;
//// }
////
//// class C1 implements I1,I2 {[|
//// |]}

verify.rangeAfterCodeFix(`
x: number;
`);
verify.not.codeFixAvailable();