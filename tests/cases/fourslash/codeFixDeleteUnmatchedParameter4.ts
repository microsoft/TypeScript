/// <reference path='fourslash.ts' />

// @filename: a.ts
/////**
//// * @param {number} a
//// */
////function foo() {}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'a'" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Delete_unused_param_tag_0.message, "a"],
    index: 0,
    newFileContent:
`/** */
function foo() {}`
});
