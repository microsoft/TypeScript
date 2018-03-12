/// <reference path='fourslash.ts' />
////class C {
////    /** @param {number} value */
////    set c(value) { return value }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`class C {
    /** @param {number} value */
    set c(value: number) { return value }
}`,
});
