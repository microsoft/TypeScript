/// <reference path='fourslash.ts' />

/////**
//// * @param {?} x
//// * @returns {number}
//// */
////var f = (x) => x

verify.codeFix({
    index: 0,
    description: "Annotate with type from JSDoc",
    newFileContent:
`/**
 * @param {?} x
 * @returns {number}
 */
var f = (x: any): number => x`,
});
