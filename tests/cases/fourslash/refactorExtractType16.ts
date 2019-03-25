/// <reference path='fourslash.ts' />

//// var x: { a?: /*a*/number/*b*/, b?: string } = { };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = number;

var x: { a?: NewType, b?: string } = { };`,
});
