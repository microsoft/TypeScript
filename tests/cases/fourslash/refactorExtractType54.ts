/// <reference path='fourslash.ts' />

//// interface I { f: /*a*/(this: O, b: number) => this/*b*/ };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = (this: O, b: number) => this;

interface I { f: NewType };`,
});
