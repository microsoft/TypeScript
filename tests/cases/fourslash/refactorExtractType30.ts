/// <reference path='fourslash.ts' />

//// type Item<T> = T extends (infer P)[] ? P : /*a*/never/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = never;

type Item<T> = T extends (infer P)[] ? P : NewType;`,
});
