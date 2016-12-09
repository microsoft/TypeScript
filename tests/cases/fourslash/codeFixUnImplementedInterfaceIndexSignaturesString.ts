/// <reference path='fourslash.ts' />

//// interface I {
////     [x: string]: number;
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    [x: string]: number;
`);