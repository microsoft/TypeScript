/// <reference path='fourslash.ts' />
////class C {
////    /** @param {number} value */
////    set c(value) { return value }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 0,
    newFileContent:
`class C {
    /** @param {number} value */
    set c(value: number) { return value }
}`,
});
