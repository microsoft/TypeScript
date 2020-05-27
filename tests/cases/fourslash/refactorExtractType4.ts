/// <reference path='fourslash.ts' />

//// var x: /*a*/1/*b*/ = 1;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = 1;

var x: NewType = 1;`,
});
