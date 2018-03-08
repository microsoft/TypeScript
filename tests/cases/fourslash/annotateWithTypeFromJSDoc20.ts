/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @param {number} a
//// * @param {T} b
//// */
////function /*1*/f<T>(a, b) {
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`/**
 * @param {number} a
 * @param {T} b
 */
function f<T>(a: number, b: T) {
}`,
});
