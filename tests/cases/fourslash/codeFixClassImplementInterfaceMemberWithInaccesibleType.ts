/// <reference path='fourslash.ts' />

//// namespace N {
////     interface I {
////         x?: I;
////     }
////     export interface I2{
////         i: I;
////     }
//// }
////
//// class C implements N.I2 {[|  |]}

verify.not.codeFixAvailable();
