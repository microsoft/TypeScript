/// <reference path='fourslash.ts' />

//// type A<T> = /*a*/B.C.D<T>/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<T> = B.C.D<T>;

type A<T> = NewType<T>;`,
});
