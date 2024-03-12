/// <reference path='fourslash.ts' />

//// type A = { a: string } & /*1*/{ b: string } & { c: string }/*2*/;

goTo.select("1", "2");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to interface",
    actionDescription: "Extract to interface",
    newContent: 
`interface /*RENAME*/NewType {
    b: string;
    c: string;
}

type A = { a: string } & NewType;`,
});
