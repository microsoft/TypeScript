/// <reference path='fourslash.ts' />

//// function foo(a: number, b?: number, ...c: number[]): /*a*/boolean/*b*/ {
////     return false as boolean
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = boolean;

function foo(a: number, b?: number, ...c: number[]): NewType {
    return false as boolean
}`,
});
