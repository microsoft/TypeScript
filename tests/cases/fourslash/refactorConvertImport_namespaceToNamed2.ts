/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true

// @filename: /a.js
/////**
//// * [|@import * as types from "types"|]
//// */
////
/////**
//// * @param { types.A } a
//// * @param { types.B } b
//// */
////function f() { }

goTo.selectRange(test.ranges()[0]);
edit.applyRefactor({
    refactorName: "Convert import",
    actionName: "Convert namespace import to named imports",
    actionDescription: "Convert namespace import to named imports",
    newContent:
`/**
 * @import { A, B } from "types"
 */

/**
 * @param { A } a
 * @param { B } b
 */
function f() { }`,
});
