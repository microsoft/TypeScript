/// <reference path='fourslash.ts' />

//// type A<T = boolean> = string | number | /*a*/T/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType<T> = T;

type A<T = boolean> = string | number | NewType<T>`,
});
