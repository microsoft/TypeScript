/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////** @template T Parameter doc comment */
////function f() {}
////
/////**
//// * Doc
//// * @template T Comment
//// */
////function g() {}
////
/////**
//// * Doc
//// * @template T Comment
//// * @template U Comment
//// */
////function h() {}
////
/////**
//// * Doc
//// * @template T,U Comment
//// */
////function h2() {}
////
/////** @template T Comment @return {void} */
////function i() {}
////
/////**
////Doc
////@template T comment
////@template U comment
////@param {number} x
////*/
////function j(x) { return x; }

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: ts.Diagnostics.Delete_all_unused_declarations.message,
    newFileContent:
`/** */
function f() {}

/**
 * Doc
 * */
function g() {}

/**
 * Doc
 * */
function h() {}

/**
 * Doc
 * */
function h2() {}

/** @return {void} */
function i() {}

/**
Doc
@param {number} x
*/
function j(x) { return x; }`,
});
