/// <reference path='fourslash.ts' />

//// type A = { a: string } /*1*/| { b: string } | { c: string }/*2*/;

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
} | {
    c: string;
};

type A = NewType;`,
});
