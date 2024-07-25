/// <reference path='fourslash.ts' />

// @Filename: a.ts
////type Foo<T extends /*a*/{ x: string = a }/*b*/> = T

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent:
`type /*RENAME*/NewType = {
    x: string;
};

type Foo<T extends NewType> = T`,
});
