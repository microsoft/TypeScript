/// <reference path='fourslash.ts' />

//// function foo<T>(a: T) {
////     abstract class C<U> {
////         abstract a: T | U;
////     }
////     return C;
//// }
////
//// class B extends foo("s")<number> {[|  |]}

verify.rangeAfterCodeFix(`
a: string | number;
`);