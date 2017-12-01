/// <reference path='fourslash.ts' />

//// interface I<X> {
////     x: keyof X;
//// }
//// class C<Y> implements I<Y> {[| |]}

verify.rangeAfterCodeFix(`
x: keyof Y;
`); 
