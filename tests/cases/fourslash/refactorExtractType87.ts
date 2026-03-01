/// <reference path='fourslash.ts' />

//// type A = /*1*/{ a: string } | { b: string } |/*2*/ { c: string };

goTo.select("1", "2");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: 
`type /*RENAME*/NewType = {
    a: string;
} | {
    b: string;
};

type A = NewType | { c: string };`,
});
