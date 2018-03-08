/// <reference path='fourslash.ts' />
////class C {
////    /** @return {number} */
////    get c() { return 12 }
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`class C {
    /** @return {number} */
    get c(): number { return 12 }
}`,
});
