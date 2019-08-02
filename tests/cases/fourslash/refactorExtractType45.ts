/// <reference path='fourslash.ts' />

//// type A = /*a*/B.C.D/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = B.C.D;

type A = NewType;`,
});
