/// <reference path='fourslash.ts' />

////interface I<X> {
////    [Ƚ: string]: X;
////}
////
////class C implements I<number> {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I<number>"],
    index: 1,
    newFileContent:
`interface I<X> {
    [Ƚ: string]: X;
}

class C implements I<number> {
    [Ƚ: string]: number;
}`,
});
