/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: a.js
/////**
//// * @type {/*a*/Foo/*b*/}
//// */

goTo.file('a.js')
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to typedef",
    actionDescription: "Extract to typedef",
    newContent:
`/**
 * @typedef {Foo} /*RENAME*/NewType
 */

/**
 * @type {NewType}
 */`,
});
