/// <reference path='fourslash.ts' />
////class C {
////    /**
////     * @param {number} x - the first parameter
////     */
////    constructor(readonly x) {
////    }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 0,
    newFileContent:
`class C {
    /**
     * @param {number} x - the first parameter
     */
    constructor(readonly x: number) {
    }
}`,
});
