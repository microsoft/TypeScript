/// <reference path='fourslash.ts' />

/////**
//// * @param {number} x
//// * @returns {number}
//// */
////function f(x) {
////    return x;
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 0,
    newFileContent:
`/**
 * @param {number} x
 * @returns {number}
 */
function f(x: number): number {
    return x;
}`,
});
