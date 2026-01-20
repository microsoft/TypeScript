/// <reference path='fourslash.ts' />

// @strict: false
//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     x: string;
//// }
////
//// class C implements I1,I2 {
////     x: string;
//// }

verify.not.codeFixAvailable();
