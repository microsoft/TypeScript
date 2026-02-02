/// <reference path='fourslash.ts' />

// @strict: false
//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     x: number;
//// }
////
//// class C implements I1,I2 {
////     x: number;
//// }

verify.not.codeFixAvailable();
