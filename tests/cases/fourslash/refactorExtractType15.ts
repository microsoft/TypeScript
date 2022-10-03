/// <reference path='fourslash.ts' />

//// type A<T = boolean> = /*a*/string/*b*/ | number | T;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = string;

type A<T = boolean> = NewType | number | T;`,
});
