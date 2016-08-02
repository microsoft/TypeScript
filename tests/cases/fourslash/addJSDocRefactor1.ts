/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// class C1 {
////    /*0*/public f1(x: string) {}/*1*/
//// }

verify.codeRefactor({
    description: "Add JSDoc Comments to Method",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
class C1 {
    /**
     *
     * @param x
     */
    public f1(x: string) {}
}
`
}]});