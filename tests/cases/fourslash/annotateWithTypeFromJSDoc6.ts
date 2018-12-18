/// <reference path='fourslash.ts' />

////declare class C {
////    /** @type {number | null} */
////    p;
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 0,
    newFileContent:
`declare class C {
    /** @type {number | null} */
    p: number | null;
}`,
});
