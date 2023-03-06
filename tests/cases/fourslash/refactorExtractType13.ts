/// <reference path='fourslash.ts' />

//// interface A<T = string> {
////     a: /*a*/boolean/*b*/
////     b: number
////     c: T
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = boolean

interface A<T = string> {
    a: NewType
    b: number
    c: T
}`,
});
