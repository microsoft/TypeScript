/// <reference path='fourslash.ts' />

//// interface I4 {
////     [x: string, y: number]: number;
//// }
////
//// class C implements I4 {[|  |]}

verify.not.codeFixAvailable();


