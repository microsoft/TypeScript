/// <reference path='fourslash.ts' />

//// type A = (v: /*a*/string | number/*b*/) => v is string;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = string | number;

type A = (v: NewType) => v is string;`,
});

