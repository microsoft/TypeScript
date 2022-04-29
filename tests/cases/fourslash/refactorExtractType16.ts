/// <reference path='fourslash.ts' />

//// var x: { a?: /*a*/number/*b*/, b?: string } = { };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = number;

var x: { a?: NewType, b?: string } = { };`,
});
