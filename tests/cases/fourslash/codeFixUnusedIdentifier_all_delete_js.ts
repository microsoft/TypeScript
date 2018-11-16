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
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`/** Parameter doc comment */
function f() {}

/**
 * Doc
 * Comment
 */
function g() {}

/**
 * Doc
 * Comment
 * Comment
 */
function h() {}

/**
 * Doc
 * Comment
 */
function h2() {}

/** Comment @return {void} */
function i() {}

/**
Doc
comment
comment
@param {number} x
*/
function j(x) { return x; }`,
});
