/// <reference path='fourslash.ts' />

//// function foo(a: /*a*/number/*b*/, b?: number, ...c: number[]): boolean {
////     return false as boolean;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = number;

function foo(a: NewType, b?: number, ...c: number[]): boolean {
    return false as boolean;
}`,
});
