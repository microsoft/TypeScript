/// <reference path='fourslash.ts' />

//// type Item<T> = T extends (infer P)[] ? /*a*/P/*b*/ : never;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<P> = P;

type Item<T> = T extends (infer P)[] ? NewType<P> : never;`,
});
