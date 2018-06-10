/// <reference path='fourslash.ts' />

////class C {
////    /** @type {number | null} */
////    p = null
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`class C {
    /** @type {number | null} */
    p: number | null = null
}`,
});
