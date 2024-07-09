/// <reference path='fourslash.ts' />

////interface A {
////    /*a*/new (): void;
////    new (a: string): void;
////    new (a: number, b: number): void;
////    new (...rest: symbol[]): void;/*b*/
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert overload list to single signature",
    actionName: "Convert overload list to single signature",
    actionDescription: ts.Diagnostics.Convert_overload_list_to_single_signature.message,
    newContent: `interface A {
    new(...args: [] | [a: string] | [a: number, b: number] | [...rest: symbol[]]): void;
}`,
});
