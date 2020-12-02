/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: a.js
////function a(/** @type {/*a*/string/*b*/} */ b) {}

goTo.file('a.js')
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to typedef",
    actionDescription: "Extract to typedef",
    newContent: `/**
 * @typedef {string} /*RENAME*/NewType
 */

function a(/** @type {NewType} */ b) {}`,
});
