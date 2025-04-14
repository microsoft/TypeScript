/// <reference path='fourslash.ts' />

// @Filename: a.ts
////type Expand<T> = T extends any
////    ? /*a*/{ [K in keyof T]: Expand<T[K]> }/*b*/
////    : never;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent:
`type /*RENAME*/NewType<T> = {
    [K in keyof T]: Expand<T[K]>;
};

type Expand<T> = T extends any
    ? NewType<T>
    : never;`,
});
