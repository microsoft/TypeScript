/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: a.js
////type Foo = /*a*/[|{
////    oops: string;
////    /**
////     *
////     */
////}|]/*b*/;

goTo.file('a.js')
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to typedef",
    actionDescription: "Extract to typedef",
    newContent:
`/**
 * @typedef {{
    oops: string;
}} /*RENAME*/NewType
 */

type Foo = NewType;`,
});
