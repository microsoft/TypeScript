/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @param {number} a
//// * @param {number} b
//// */
////function foo() {}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'a'" },
    { description: "Disable checking for this file" },
    { description: "Delete unused '@param' tag 'b'" },
    { description: "Disable checking for this file" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Delete_unused_param_tag_0.message, "a"],
    index: 0,
    newFileContent:
`/**
 * @param {number} b
 */
function foo() {}`,
});
