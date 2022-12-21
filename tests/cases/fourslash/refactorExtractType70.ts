/// <reference path='fourslash.ts' />

////type Foo<T1, T2, T3> = {
////    fn: /*a*/(a: T1, b: T2, c: T3, a1: T1, a2: T2, a3: T3) => void;/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: [
        "type /*RENAME*/NewType<T1, T2, T3> = (a: T1, b: T2, c: T3, a1: T1, a2: T2, a3: T3) => void;",
        "",
        "type Foo<T1, T2, T3> = {",
        "    fn: NewType<T1, T2, T3>;",
        "}"
    ].join("\n"),
});
