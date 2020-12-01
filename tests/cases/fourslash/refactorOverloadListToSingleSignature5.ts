/// <reference path='fourslash.ts' />

////class A {
////    /*a*/constructor();
////    constructor(a: string);
////    constructor(a: number, b: number);
////    constructor(...rest: symbol[]);/*b*/
////    constructor(...args: any[]) {
////      // body
////    }
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert overload list to single signature",
    actionName: "Convert overload list to single signature",
    actionDescription: ts.Diagnostics.Convert_overload_list_to_single_signature.message,
    newContent: `class A {
    constructor(...args: [] | [a: string] | [a: number, b: number] | [...rest: symbol[]]) {
        // body
    }
}`,
});
