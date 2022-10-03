/// <reference path='fourslash.ts' />

//// function foo<U>(a: /*a*/{ a: string } & { b: U }/*b*/) { }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to interface",
    actionDescription: "Extract to interface",
    newContent: `interface /*RENAME*/NewType<U> {
    a: string;
    b: U;
}

function foo<U>(a: NewType<U>) { }`,
});
