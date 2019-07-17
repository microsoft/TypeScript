/// <reference path='fourslash.ts' />

//// type A<B, C, D = B> = /*a*/Partial<C | string>/*b*/ & D | C;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<C> = Partial<C | string>;

type A<B, C, D = B> = NewType<C> & D | C;`,
});

