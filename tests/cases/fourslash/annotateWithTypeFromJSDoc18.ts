/// <reference path='fourslash.ts' />
////class C {
////    /** @param {number} value */
////    set c(value) { return 12 }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`class C {
    /** @param {number} value */
    set c(value: number) { return 12 }
}`,
});
