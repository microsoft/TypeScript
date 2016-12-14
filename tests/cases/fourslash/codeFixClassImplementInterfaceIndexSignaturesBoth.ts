/// <reference path='fourslash.ts' />


//// interface I {
////     [x: number]: I;
////     [y: string]: I;
//// }
////
//// class C implements I {[| |]}

verify.rangeAfterCodeFix(`
    [x: number]: I;
    [y: string]: I;
`);