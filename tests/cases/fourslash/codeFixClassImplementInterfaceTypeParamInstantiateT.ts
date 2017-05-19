/// <reference path='fourslash.ts' />

//// interface I<T> {
////    x: T;
//// }
////
//// class C<T> implements I<T> {[| |]} 

verify.rangeAfterCodeFix(`
    x: T;
`);