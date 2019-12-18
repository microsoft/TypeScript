/// <reference path='fourslash.ts' />

//// type Item<T> = /*a*/T extends (infer P)[] ? P : never/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<T> = T extends (infer P)[] ? P : never;

type Item<T> = NewType<T>;`,
});
