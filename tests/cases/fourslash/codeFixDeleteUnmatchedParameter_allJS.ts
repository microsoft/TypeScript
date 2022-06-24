/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @filename: /a.js
/////**
//// * @param {number} a
//// * @param {number} b
//// */
////function f1() {}
////
/////**
//// * @param {number} a
//// * @param {string} b
//// */
////function f2(a) {
////    a;
////}
////
/////**
//// * @param {number} a
//// * @param {string} b
//// * @param {number} c
//// */
////function f3(a, c) {
////    a;
////    c;
////}

goTo.file("/a.js");
verify.codeFixAll({
    fixId: "deleteUnmatchedParameter",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_param_tags.message,
    newFileContent:
`/** */
function f1() {}

/**
 * @param {number} a
 */
function f2(a) {
    a;
}

/**
 * @param {number} a
 * @param {number} c
 */
function f3(a, c) {
    a;
    c;
}`,
});
