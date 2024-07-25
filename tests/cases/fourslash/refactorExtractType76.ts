/// <reference path='fourslash.ts' />

// @Filename: a.ts
////type Deep<T> = /*a*/{ [K in keyof T]: Deep<T[K]> }/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent:
`type /*RENAME*/NewType<T> = {
    [K in keyof T]: Deep<T[K]>;
};

type Deep<T> = NewType<T>`,
});
