/// <reference path='fourslash.ts' />

//// var x: /*a*/string/*b*/ = '';

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = string;

var x: NewType = '';`,
});
