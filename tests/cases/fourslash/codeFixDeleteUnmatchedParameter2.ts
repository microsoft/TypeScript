/// <reference path='fourslash.ts' />

// @filename: a.ts
/////**
//// * @param {number} a
//// * @param {string} b
//// */
////function foo(a: number) {
////    a;
////}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'b'" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Delete_unused_param_tag_0.message, "b"],
    index: 0,
    newFileContent:
`/**
 * @param {number} a
 */
function foo(a: number) {
    a;
}`
});
