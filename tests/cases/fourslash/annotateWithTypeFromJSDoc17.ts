/// <reference path='fourslash.ts' />
////class C {
////    /**
////     * @param {number} x - the first parameter
////     */
////    constructor(x) {
////    }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`class C {
    /**
     * @param {number} x - the first parameter
     */
    constructor(x: number) {
    }
}`,
});
