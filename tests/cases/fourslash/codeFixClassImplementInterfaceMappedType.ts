/// <reference path='fourslash.ts' />

//// interface I<X> {
////     x: { readonly [K in keyof X]: X[K] };
//// }
//// class C<Y> implements I<Y> {[| |]}

verify.rangeAfterCodeFix(`
x: { readonly [K in keyof X]: Y[K]; };
`); 
