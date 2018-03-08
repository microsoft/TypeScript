/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @template T
//// * @param {number} a
//// * @param {T} b
//// */
////function f(a, b) {
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`/**
 * @template T
 * @param {number} a
 * @param {T} b
 */
function f<T>(a: number, b: T) {
}`,
});
