/// <reference path='fourslash.ts' />

////interface I<X> {
////    [Ƚ: string]: X;
////}
////
////class C implements I<number> {}

verify.codeFix({
    description: "Implement interface 'I<number>'",
    newFileContent:
`interface I<X> {
    [Ƚ: string]: X;
}

class C implements I<number> {
    [Ƚ: string]: number;
}`,
});
