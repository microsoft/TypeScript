/// <reference path='fourslash.ts' />

//// function foo(a: /*a*/{ a: number | string, b: string }/*b*/) { }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to interface",
    actionDescription: "Extract to interface",
    newContent: `interface /*RENAME*/NewType {
    a: number | string;
    b: string;
}

function foo(a: NewType) { }`,
});
