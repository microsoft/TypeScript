/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @param {number} notDefined1
//// * @param {number} notDefined2
//// * @param {number} a
//// * @param {number} b
//// */
////function foo(a, b, typo1, typo2) {
////    a;
////    b;
////    typo1;
////    typo2;
////}

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'notDefined1'" },
    { description: "Rename '@param' tag name 'notDefined1' to 'typo1'" },
    { description: "Disable checking for this file" },
    { description: "Delete unused '@param' tag 'notDefined2'" },
    { description: "Rename '@param' tag name 'notDefined2' to 'typo1'" },
    { description: "Disable checking for this file" },
    { description: "Infer parameter types from usage" },
    { description: "Infer parameter types from usage" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Rename_param_tag_name_0_to_1.message, "notDefined1", "typo1"],
    index: 1,
    newFileContent:
`/**
 * @param {number} typo1
 * @param {number} notDefined2
 * @param {number} a
 * @param {number} b
 */
function foo(a, b, typo1, typo2) {
    a;
    b;
    typo1;
    typo2;
}`,
    applyChanges: true
});

verify.codeFixAvailable([
    { description: "Delete unused '@param' tag 'notDefined2'" },
    { description: "Rename '@param' tag name 'notDefined2' to 'typo2'" },
    { description: "Disable checking for this file" },
    { description: "Infer parameter types from usage" },
]);

verify.codeFix({
    description: [ts.Diagnostics.Rename_param_tag_name_0_to_1.message, "notDefined2", "typo2"],
    index: 1,
    newFileContent:
`/**
 * @param {number} typo1
 * @param {number} typo2
 * @param {number} a
 * @param {number} b
 */
function foo(a, b, typo1, typo2) {
    a;
    b;
    typo1;
    typo2;
}`,
});
