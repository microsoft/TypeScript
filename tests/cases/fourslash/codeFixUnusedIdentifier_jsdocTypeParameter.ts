/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////**
//// * @type {<T>() => void}
//// */
////export const x = 0;

verify.codeFix({
    description: "Remove type parameters",
    newFileContent:
`/**
 * @type {() => void}
 */
export const x = 0;`,
});
