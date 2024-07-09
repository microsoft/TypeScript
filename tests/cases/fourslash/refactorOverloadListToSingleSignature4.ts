/// <reference path='fourslash.ts' />

////class A {
////    /*a*/foo(): void;
////    foo(a: string): void;
////    foo(a: number, b: number): void;
////    foo(...rest: symbol[]): void;/*b*/
////    foo(...args: any[]): void {
////      // body
////    }
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert overload list to single signature",
    actionName: "Convert overload list to single signature",
    actionDescription: ts.Diagnostics.Convert_overload_list_to_single_signature.message,
    newContent: `class A {
    foo(...args: [] | [a: string] | [a: number, b: number] | [...rest: symbol[]]): void {
        // body
    }
}`,
});
