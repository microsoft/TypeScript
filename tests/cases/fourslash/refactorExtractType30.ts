/// <reference path='fourslash.ts' />

//// type Item<T> = T extends (infer P)[] ? P : /*a*/never/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = never;

type Item<T> = T extends (infer P)[] ? P : NewType`,
});
