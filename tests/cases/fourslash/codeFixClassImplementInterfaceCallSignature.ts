/// <reference path='fourslash.ts' />

//// interface I {
////     (x: number, b: string): number;
//// }
//// class C implements I {[| |]}

verify.not.codeFixAvailable();


