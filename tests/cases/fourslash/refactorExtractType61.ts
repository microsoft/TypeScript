/// <reference path='fourslash.ts' />

//// function foo(a: /*a*/{ a: number | string, b: string } & { c: string } & { d: boolean }/*b*/) { }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to interface",
    actionDescription: "Extract to interface",
    newContent: `interface /*RENAME*/NewType {
    a: number | string;
    b: string;
    c: string;
    d: boolean;
}

function foo(a: NewType) { }`,
});
