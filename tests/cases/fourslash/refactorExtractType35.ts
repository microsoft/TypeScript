/// <reference path='fourslash.ts' />

//// type Union<T, U> = /*a*/U | T/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<U, T> = U | T;

type Union<T, U> = NewType<U, T>;`,
});
