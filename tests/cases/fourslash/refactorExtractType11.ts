/// <reference path='fourslash.ts' />

//// function foo(a: number, b?: number, ...c: number[]): boolean {
////     return false as /*a*/boolean/*b*/
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract type",
    actionName: "Extract type",
    actionDescription: "Extract type",
    newContent: `function foo(a: number, b?: number, ...c: number[]): boolean {
    type /*RENAME*/NewType = boolean;

    return false as NewType
}`,
});
