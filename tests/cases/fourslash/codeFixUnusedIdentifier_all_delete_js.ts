/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////** @template T */
////function f() {}
////
/////**
//// * Doc
//// * @template T
//// */
////function g() {}
////
/////**
//// * Doc
//// * @template T
//// * @template U
//// */
////function h() {}

verify.codeFixAll({
    fixId: "unusedIdentifier_delete",
    fixAllDescription: "Delete all unused declarations",
    newFileContent:
`
function f() {}

/**
 * Doc
 */
function g() {}

/**
 * Doc
 */
function h() {}`,
});
