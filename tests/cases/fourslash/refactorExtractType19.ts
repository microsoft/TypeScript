/// <reference path='fourslash.ts' />

//// type A<B, C, D = B> = /*a*/Partial<C | string | D>/*b*/ & D | C;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<C, D> = Partial<C | string | D>;

type A<B, C, D = B> = NewType<C, D> & D | C;`,
});

