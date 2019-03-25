/// <reference path='fourslash.ts' />

//// function foo(a: number, b?: number, ...c: /*a*/number[]/*b*/): boolean {
////     return false as boolean
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `type /*RENAME*/NewType = number[];

function foo(a: number, b?: number, ...c: NewType): boolean {
    return false as boolean
}`,
});
