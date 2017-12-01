/// <reference path='fourslash.ts' />

//// interface I<T> {
////    x: T;
//// }
////
//// class C implements I<number> {[| |]} 

verify.rangeAfterCodeFix(`
    x: number;
`);