/// <reference path='fourslash.ts' />

//// interface A<T = /*a*/string/*b*/> {
////     a: boolean
////     b: number
////     c: T
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = string

interface A<T = NewType> {
    a: boolean
    b: number
    c: T
}`,
});
