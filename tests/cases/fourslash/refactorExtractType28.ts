/// <reference path='fourslash.ts' />

//// type Item<T> = /*a*/T/*b*/ extends (infer P)[] ? P : never;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<T> = T;

type Item<T> = NewType<T> extends (infer P)[] ? P : never;`,
});
