/// <reference path='fourslash.ts' />

// @filename: a.ts
/////**
//// * @param {number} n
//// * @returns
//// */
////export const foo = (z: number) => 0;

verify.codeFix({
    description: [ts.Diagnostics.Delete_unused_param_tag_0.message, "n"],
    index: 0,
    newFileContent:
`/**
 * @returns
 */
export const foo = (z: number) => 0;`
});
