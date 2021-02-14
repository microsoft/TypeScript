/// <reference path='fourslash.ts' />

////interface I<X> {
////    x: { readonly [K in keyof X]: X[K] };
////}
////class C<Y> implements I<Y> {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I<Y>"],
    index: 1,
    newFileContent:
`interface I<X> {
    x: { readonly [K in keyof X]: X[K] };
}
class C<Y> implements I<Y> {
    x: { readonly [K in keyof Y]: Y[K]; };
}`,
});
