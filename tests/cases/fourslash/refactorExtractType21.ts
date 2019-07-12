/// <reference path='fourslash.ts' />

//// type A<T, U> = () => <T>(v: T) => (v: /*a*/T/*b*/) => <T>(v: T) => U;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<T> = T;

type A<T, U> = () => <T>(v: T) => (v: NewType<T>) => <T>(v: T) => U;`,
});
