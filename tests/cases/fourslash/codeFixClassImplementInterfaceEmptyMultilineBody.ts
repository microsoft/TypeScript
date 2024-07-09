/// <reference path='fourslash.ts' />

// @lib: es2017

////interface I {
////    x: number;
////    y: number;
////}
////class C implements I {
////}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I {
    x: number;
    y: number;
}
class C implements I {
    x: number;
    y: number;
}`,
});
