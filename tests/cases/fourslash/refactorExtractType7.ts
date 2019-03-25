/// <reference path='fourslash.ts' />

//// function foo(a: /*a*/number/*b*/, b?: number, ...c: number[]): boolean {
////     return false as boolean
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = number;

function foo(a: NewType, b?: number, ...c: number[]): boolean {
    return false as boolean
}`,
});
