/// <reference path='fourslash.ts' />

//// type A = (v: string | number) => v is /*a*/string/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = string;

type A = (v: string | number) => v is NewType;`,
});
