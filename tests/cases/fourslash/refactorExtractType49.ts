/// <reference path='fourslash.ts' />

//// type A<T extends string> = T;
//// type B<T extends string> = /*a*/A<T>/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type A<T extends string> = T;
type /*RENAME*/NewType<T extends string> = A<T>;

type B<T extends string> = NewType<T>;`,
});
