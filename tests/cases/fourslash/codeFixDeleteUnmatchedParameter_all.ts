/// <reference path='fourslash.ts' />

// @filename: /a.ts
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
////function f2(a: number) {
////    a;
////}
////
/////**
//// * @param {number} a
//// * @param {string} b
//// * @param {number} c
//// */
////function f3(a: number, c: number) {
////    a;
////    c;
////}

goTo.file("/a.ts");
verify.codeFixAll({
    fixId: "deleteUnmatchedParameter",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_param_tags.message,
    newFileContent:
`/** */
function f1() {}

/**
 * @param {number} a
 */
function f2(a: number) {
    a;
}

/**
 * @param {number} a
 * @param {number} c
 */
function f3(a: number, c: number) {
    a;
    c;
}`,
});
