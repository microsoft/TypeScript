/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: a.js
//// /**
////  * @template {number} T
////  * @template {string} U
////  * @param {T} b 
////  * @param {U} c
////  * @returns {/*a*/T | U/*b*/}
////  */
//// function a(b, c) {}

goTo.file('a.js')
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to typedef",
    actionDescription: "Extract to typedef",
    newContent: `/**
 * @template {number} T
 * @template {string} U
 * @typedef {T | U} /*RENAME*/NewType
 */

/**
 * @template {number} T
 * @template {string} U
 * @param {T} b 
 * @param {U} c
 * @returns {NewType<T, U>}
 */
function a(b, c) {}`,
});
