/// <reference path='fourslash.ts' />

/////*a*/declare function foo(): void;
////declare function foo(a: string): void;
////declare function foo(a: number, b: number): void;
////declare function foo(...rest: symbol[]): void;/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert overload list to single signature",
    actionName: "Convert overload list to single signature",
    actionDescription: ts.Diagnostics.Convert_overload_list_to_single_signature.message,
    newContent: `declare function foo(...args: [] | [a: string] | [a: number, b: number] | [...rest: symbol[]]): void;`,
});
