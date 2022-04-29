/// <reference path='fourslash.ts' />

//// var x: 1 | /*a*/2/*b*/ = 1;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = 2;

var x: 1 | NewType = 1;`,
});
