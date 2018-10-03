/// <reference path="fourslash.ts" />

////class C {
////    "foo bar": number;
////    xyz() {
////        return (/**/)
////    }
////}
////
////function f(this: { x: number }) { /*f*/ }

goTo.marker("");

verify.completionListContains("xyz", "(method) C.xyz(): any", "", "method", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: "this.xyz",
});

verify.completionListContains("foo bar", '(property) C["foo bar"]: number', "", "property", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: 'this["foo bar"]',
});

goTo.marker("f");

verify.completionListContains("x", "(property) x: number", "", "property", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: "this.x",
});
