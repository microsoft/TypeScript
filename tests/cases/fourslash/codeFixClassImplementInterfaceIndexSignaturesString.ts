/// <reference path='fourslash.ts' />

////interface I<X> {
////    [Ƚ: string]: X;
////}
////
////class C implements I<number> {}

verify.codeFix({
    description: "Implement interface 'I<number>'",
    // TODO: GH#18445
    newFileContent:
`interface I<X> {
    [Ƚ: string]: X;
}

class C implements I<number> {\r
    [Ƚ: string]: number;\r
}`,
});
