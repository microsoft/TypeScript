/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     y: number;
//// }
////
//// class C implements I1,I2 {[|
////     |]x: number;
//// }

verify.rangeAfterCodeFix(`
y: number;
`);

verify.not.codeFixAvailable();
