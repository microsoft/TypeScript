/// <reference path='fourslash.ts' />

/////*a*/function foo(): void;
////function foo(a: string): void;
////function foo(a: number, b: number): void;
////function foo(...rest: symbol[]): void;/*b*/
////function foo(...args: any[]): void {
////  // body
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert overload list to single signature",
    actionName: "Convert overload list to single signature",
    actionDescription: ts.Diagnostics.Convert_overload_list_to_single_signature.message,
    newContent: `function foo(...args: [] | [a: string] | [a: number, b: number] | [...rest: symbol[]]): void {
    // body
}`,
});
