/// <reference path='fourslash.ts' />

// @Filename: file1.ts
//// class C1 {
////    /*0*/constructor(x: number, y: string) {}/*1*/
////    public f1(x: string) {}
//// }

verify.codeRefactor({
    description: "Add JSDoc Comments to Constructor",
    expectedFileChanges: [{
    fileName: "file1.ts",
    expectedText: `
class C1 {
    /**
     *
     * @param x
     * @param y
     */
    constructor(x: number, y: string) {}
    public f1(x: string) {}
}
`
}]});