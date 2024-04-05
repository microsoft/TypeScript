/// <reference path='fourslash.ts' />

//// type A<T,S> = /*1*/{ a: string } | { b: T } | { c: string }/*2*/ | { d: string } | S;

goTo.select("1", "2");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: 
`type /*RENAME*/NewType<T> = {
    a: string;
} | {
    b: T;
} | {
    c: string;
};

type A<T,S> = NewType<T> | { d: string } | S;`,
});
