/// <reference path='fourslash.ts' />

// @strict: false
/////**
//// * @template T
//// * @param {T} x
//// * @returns {T}
//// */
////var f = /*a*/x/*b*/ => x

verify.codeFix({
    index: 0,
    description: "Annotate with type from JSDoc",
    newFileContent:
`/**
 * @template T
 * @param {T} x
 * @returns {T}
 */
var f = <T>(x: T): T => x`,
});
