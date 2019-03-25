/// <reference path='fourslash.ts' />

//// type A<T, U> = () => <T>(v: T) => (v: T) => <T>(v: /*a*/T/*b*/) => U

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType<T> = T;

type A<T, U> = () => <T>(v: T) => (v: T) => <T>(v: NewType<T>) => U`,
});
