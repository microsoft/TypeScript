/// <reference path='fourslash.ts' />

// @filename: a.ts
/////**
//// * @param {number} a
//// * @param {number} b
//// */
////function foo() {}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'a'" },
    { description: "Delete unused '@param' tag 'b'" },
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
