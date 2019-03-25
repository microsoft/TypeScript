/// <reference path='fourslash.ts' />

//// var x: /*a*/string | number | boolean/*b*/ = '';

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = string | number | boolean;

var x: NewType = '';`,
});
