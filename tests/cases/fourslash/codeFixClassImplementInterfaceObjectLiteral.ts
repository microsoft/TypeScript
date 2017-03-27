/// <reference path='fourslash.ts' />

//// interface I {
////     z: { __iBrand: any };
//// }
////
//// class C implements I {[|   |]}

verify.rangeAfterCodeFix(`
z: { __iBrand: any; };
`);
