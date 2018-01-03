/// <reference path='fourslash.ts' />

////interface I<X> {
////    x: { readonly [K in keyof X]: X[K] };
////}
////class C<Y> implements I<Y> {}

<<<<<<< HEAD
verify.rangeAfterCodeFix(`
x: { readonly [K in keyof Y]: Y[K]; };
`); 
=======
verify.codeFix({
    description: "Implement interface 'I<Y>'",
    // TODO: GH#18445
    newFileContent:
`interface I<X> {
    x: { readonly [K in keyof X]: X[K] };
}
class C<Y> implements I<Y> {\r
    x: { readonly [K in keyof X]: Y[K]; };\r
}`,
});
>>>>>>> master
