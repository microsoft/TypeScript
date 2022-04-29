/// <reference path='fourslash.ts' />

////interface I<X> {
////    x: keyof X;
////}
////class C<Y> implements I<Y> {[| |]}

verify.codeFix({
    description: "Implement interface 'I<Y>'",
    newFileContent:
`interface I<X> {
    x: keyof X;
}
class C<Y> implements I<Y> {
    x: keyof Y;
}`,
});
