/// <reference path='fourslash.ts' />

//// type A<T, U> = () => <T>(v: /*a*/T/*b*/) => (v: T) => <T>(v: T) => U;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<T> = T;

type A<T, U> = () => <T>(v: NewType<T>) => (v: T) => <T>(v: T) => U;`,
});
