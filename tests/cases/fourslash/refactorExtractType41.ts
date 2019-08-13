/// <reference path='fourslash.ts' />

//// type A = /*a*/(v: string | number) => typeof v/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = (v: string | number) => typeof v;

type A = NewType`,
});

