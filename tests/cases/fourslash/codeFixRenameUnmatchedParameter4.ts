/// <reference path='fourslash.ts' />

// @filename: /a.ts
/////**
//// * @param {string} y
//// * @returns
//// */
////export const foo = (x: string) => x;

verify.codeFix({
    description: [ts.Diagnostics.Rename_param_tag_name_0_to_1.message, "y", "x"],
    index: 1,
    newFileContent:
`/**
 * @param {string} x
 * @returns
 */
export const foo = (x: string) => x;`,
});
