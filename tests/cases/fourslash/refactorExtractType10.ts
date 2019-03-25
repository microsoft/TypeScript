/// <reference path='fourslash.ts' />

//// function foo(a: number, b?: number, ...c: number[]): /*a*/boolean/*b*/ {
////     return false as boolean
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = boolean;

function foo(a: number, b?: number, ...c: number[]): NewType {
    return false as boolean
}`,
});
