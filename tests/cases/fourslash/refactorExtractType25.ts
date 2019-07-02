/// <reference path='fourslash.ts' />

//// type A<T, U> = () => <T>(v: T) => /*a*/(v: T) => <T>(v: T) => U/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<T, U> = (v: T) => <T>(v: T) => U;

type A<T, U> = () => <T>(v: T) => NewType<T, U>;`,
});
