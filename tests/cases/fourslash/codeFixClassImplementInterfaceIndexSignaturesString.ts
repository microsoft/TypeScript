/// <reference path='fourslash.ts' />

//// interface I<X> {
////     [Ƚ: string]: X;
//// }
////
//// class C implements I<number> {[| |]}

verify.rangeAfterCodeFix(`
    [Ƚ: string]: number;
`);