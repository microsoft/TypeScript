/// <reference path='fourslash.ts' />

// @strict: false
//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     y: number;
//// }
////
//// class C implements I1,I2 {[|
////     |]y: number;
//// }

verify.rangeAfterCodeFix(`
x: number;
`);

verify.not.codeFixAvailable();
