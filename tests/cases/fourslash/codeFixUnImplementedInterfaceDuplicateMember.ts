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

verify.not.codeFixAvailable();

// TODO: (arozga) Get members from multiple interfaces.
/*
verify.rangeAfterCodeFix(`
x: number;
`);
*/