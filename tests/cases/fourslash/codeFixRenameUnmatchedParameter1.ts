/// <reference path='fourslash.ts' />

// @filename: a.ts
/////**
//// * @param {number} a
//// * @param {number} c
//// */
////function foo(a: number, b: string) {
////    a;
////    b;
////}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'c'" },
    { description: "Rename '@param' tag name 'c' to 'b'" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Rename_param_tag_name_0_to_1.message, "c", "b"],
    index: 1,
    newFileContent:
`/**
 * @param {number} a
 * @param {number} b
 */
function foo(a: number, b: string) {
    a;
    b;
}`
});
