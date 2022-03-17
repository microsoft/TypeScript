/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @param {number} a
//// * @param {number} c
//// */
////function foo(a, b) {
////    a;
////    b;
////}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'c'" },
    { description: "Rename '@param' tag name 'c' to 'b'" },
    { description: "Disable checking for this file" },
    { description: "Infer parameter types from usage" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Rename_param_tag_name_0_to_1.message, "c", "b"],
    index: 1,
    newFileContent:
`/**
 * @param {number} a
 * @param {number} b
 */
function foo(a, b) {
    a;
    b;
}`
});
