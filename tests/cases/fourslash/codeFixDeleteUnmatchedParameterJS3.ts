/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @param {number} a
//// * @param {string} b
//// * @param {number} c
//// */
////function foo(a, c) {
////    a;
////    c;
////}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'b'" },
    { description: "Disable checking for this file" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Delete_unused_param_tag_0.message, "b"],
    index: 0,
    newFileContent:
`/**
 * @param {number} a
 * @param {number} c
 */
function foo(a, c) {
    a;
    c;
}`
});
