/// <reference path='fourslash.ts' />

////interface I {
////    constructor(): number;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I {
    constructor(): number;
}
class C implements I {
    ["constructor"](): number {
        throw new Error("Method not implemented.");
    }
}`,
});
