/// <reference path='fourslash.ts' />

/////**
//// * @param {?} x
//// * @returns {number}
//// */
////var f = (x) => x

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 0,
    newFileContent:
`/**
 * @param {?} x
 * @returns {number}
 */
var f = (x: any): number => x`,
});
