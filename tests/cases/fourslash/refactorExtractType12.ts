/// <reference path='fourslash.ts' />

//// interface A<T = /*a*/string/*b*/> {
////     a: boolean
////     b: number
////     c: T
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = string;

interface A<T = NewType> {
    a: boolean
    b: number
    c: T
}`,
});
