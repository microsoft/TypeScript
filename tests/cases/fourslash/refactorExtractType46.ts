/// <reference path='fourslash.ts' />

//// namespace A { export const b = 1; }
//// function a(b: string): /*a*/typeof A.b/*b*/ { return 1; }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `namespace A { export const b = 1; }
type /*RENAME*/NewType = typeof A.b;

function a(b: string): NewType { return 1; }`,
});
