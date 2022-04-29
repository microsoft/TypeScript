/// <reference path='fourslash.ts' />

//// type A<T, U> = () => <T>(v: T) => (v: T) => <T>(v: T) => /*a*/U/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<U> = U;

type A<T, U> = () => <T>(v: T) => (v: T) => <T>(v: T) => NewType<U>;`,
});
