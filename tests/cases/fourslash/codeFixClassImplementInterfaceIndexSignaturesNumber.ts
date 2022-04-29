/// <reference path='fourslash.ts' />

////interface I {
////    [x: number]: I;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I {
    [x: number]: I;
}
class C implements I {
    [x: number]: I;
}`,
});
