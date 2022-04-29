/// <reference path='fourslash.ts' />

//// function foo(a: number, b?: number, ...c: /*a*/number[]/*b*/): boolean {
////     return false as boolean;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = number[];

function foo(a: number, b?: number, ...c: NewType): boolean {
    return false as boolean;
}`,
});
