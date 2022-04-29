/// <reference path='fourslash.ts' />

//// const a = 1;
//// type A = (v: string | number) => /*a*/typeof a/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `const a = 1;
type /*RENAME*/NewType = typeof a;

type A = (v: string | number) => NewType;`,
});
