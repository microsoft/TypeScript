/// <reference path='fourslash.ts' />

// @filename: a.ts
/////**
//// * @param {number} d
//// * @param {number} a
//// * @param {number} b
//// */
////function foo(a: number, b: string, c: string) {
////    a;
////    b;
////    c;
////}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'd'" },
    { description: "Rename '@param' tag name 'd' to 'c'" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Rename_param_tag_name_0_to_1.message, "d", "c"],
    index: 1,
    newFileContent:
`/**
 * @param {number} c
 * @param {number} a
 * @param {number} b
 */
function foo(a: number, b: string, c: string) {
    a;
    b;
    c;
}`
});
