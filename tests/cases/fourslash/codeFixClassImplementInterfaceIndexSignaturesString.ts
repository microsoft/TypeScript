/// <reference path='fourslash.ts' />

//// interface I<X> {
////     [x: string]: X;
//// }
////
//// class C implements I<number> {[| |]}

verify.rangeAfterCodeFix(`
    [x: string]: number;
`);