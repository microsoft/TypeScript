/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @param c
//// * @param b
//// *
//// * bla bla bla
//// */
////function add(a, b) { }

verify.codeFix({
    description: [ts.Diagnostics.Delete_unused_param_tag_0.message, "c"],
    index: 0,
    newFileContent:
`/**
 * @param b
 *
 * bla bla bla
 */
function add(a, b) { }`
});
