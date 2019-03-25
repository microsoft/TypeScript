/// <reference path='fourslash.ts' />

//// type Item<T> = T extends (infer P)[] ? /*a*/P/*b*/ : never

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType<P> = P;

type Item<T> = T extends (infer P)[] ? NewType<P> : never`,
});
