/// <reference path='fourslash.ts' />

//// interface I {
////     [x: number]: I;
//// }
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    [x: number]: I;
`);