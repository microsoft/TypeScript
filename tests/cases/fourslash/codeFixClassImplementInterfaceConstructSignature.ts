/// <reference path='fourslash.ts' />

//// interface I {
////     new (x: number, b: string);
//// }
//// class C implements I {[| |]}

verify.not.codeFixAvailable();


