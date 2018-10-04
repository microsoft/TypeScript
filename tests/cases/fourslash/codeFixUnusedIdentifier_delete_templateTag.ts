/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /first.js
/////**
//// * Doc
//// * @template T,U Comment
//// * @param {U} p
//// */
////function first(p) { return p; }

goTo.file("/first.js");
verify.codeFix({
    index: 0,
    description: "Remove declaration for: 'T'",
    newFileContent:
`/**
 * Doc
 * @template U Comment
 * @param {U} p
 */
function first(p) { return p; }`,
});

// @Filename: /second.js
/////**
//// * Doc
//// * @template T,U Comment
//// * @param {T} p
//// */
////function second(p) { return p; }

goTo.file("/second.js");
verify.codeFix({
    description: "Remove declaration for: 'U'",
    index: 0,
    newFileContent:
`/**
 * Doc
 * @template T Comment
 * @param {T} p
 */
function second(p) { return p; }`,
});

// @Filename: /both.js
/////**
//// * @template T,U Comment
//// */
////function both() {}

goTo.file("/both.js");
verify.codeFix({
    description: "Remove template tag",
    newFileContent:
`/**
 * Comment
 */
function both() {}`,
});
