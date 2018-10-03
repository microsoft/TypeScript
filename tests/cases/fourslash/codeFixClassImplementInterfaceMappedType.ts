/// <reference path='fourslash.ts' />

////interface I<X> {
////    x: { readonly [K in keyof X]: X[K] };
////}
////class C<Y> implements I<Y> {}

verify.codeFix({
    description: "Implement interface 'I<Y>'",
    newFileContent:
`interface I<X> {
    x: { readonly [K in keyof X]: X[K] };
}
class C<Y> implements I<Y> {
    x: { readonly [K in keyof Y]: Y[K]; };
}`,
});
