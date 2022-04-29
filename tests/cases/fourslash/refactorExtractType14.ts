/// <reference path='fourslash.ts' />

//// type A<T = /*a*/boolean/*b*/> = string | number | T;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = boolean;

type A<T = NewType> = string | number | T;`,
});
