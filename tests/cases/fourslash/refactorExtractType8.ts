/// <reference path='fourslash.ts' />

//// function foo(a: number, b?: /*a*/number/*b*/, ...c: number[]): boolean {
////     return false as boolean;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract to type alias",
    actionDescription: "Extract to type alias",
    newContent: `type /*RENAME*/NewType = number;

function foo(a: number, b?: NewType, ...c: number[]): boolean {
    return false as boolean;
}`,
});
