/// <reference path='fourslash.ts' />

//// type Crazy<T> = /*a*/T extends [infer P, ((infer R) extends string ? string : never)] ? P & R : string/*b*/;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType<T> = T extends [infer P, ((infer R) extends string ? string : never)] ? P & R : string;

type Crazy<T> = NewType<T>;`,
});
