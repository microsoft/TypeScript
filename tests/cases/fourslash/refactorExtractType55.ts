/// <reference path='fourslash.ts' />

//// interface I { f: /*a*/(this: O, b: number) => typeof this["a"]/*b*/ };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = (this: O, b: number) => typeof this["a"];

interface I { f: NewType };`,
});
