/// <reference path='fourslash.ts' />

//// type B = string;
//// type C = number;
//// type A = { a: string } | /*1*/B | C/*2*/;

goTo.select("1", "2");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: 
`type B = string;
type C = number;
type /*RENAME*/NewType = B | C;

type A = { a: string } | NewType;`,
});
