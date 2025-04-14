/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: a.js
////type Bar = /*a*/[|string | /* oops */ boolean|]/*b*/;

goTo.file('a.js')
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to typedef",
    actionDescription: "Extract to typedef",
    newContent:
`/**
 * @typedef {string | boolean} /*RENAME*/NewType
 */

type Bar = NewType;`,
});
