/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @param {number} a
//// * @param {T} b
//// */
////function f<T>(a, b) {
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    errorCode: 80004, // ignore 'unused T'
    newFileContent:
`/**
 * @param {number} a
 * @param {T} b
 */
function f<T>(a: number, b: T) {
}`,
});
