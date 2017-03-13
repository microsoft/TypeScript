/// <reference path='fourslash.ts' />

//// interface I<T> {
////    x: { y: T, z: T[] };
//// }
//// 
//// class C implements I<number> {[| |]}

verify.rangeAfterCodeFix(`
    x: { y: number; z: number[]; };
`);
