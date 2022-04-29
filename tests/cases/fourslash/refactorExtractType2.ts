/// <reference path='fourslash.ts' />

//// var x: /*a*/string/*b*/ = '';

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = string;

var x: NewType = '';`,
});
