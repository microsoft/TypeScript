/// <reference path="fourslash.ts" />

////class Foo {
////    private static _prop = 1;
////    public static a = [|_/*1*/|]
////
////    static foo() {
////        [|_/*2*/|]
////    }
////}

verify.completions({
    marker: ["2"],
    includes: [
        {
            name: "_prop",
            insertText: "this._prop",
            kind: "property",
            sortText: completion.SortText.SuggestedClassMembers,
            source: completion.CompletionSource.ThisProperty,
            text: "(property) Foo._prop: number",
            kindModifiers: "private,static"
        },
    ],
    preferences: {
        includeInsertTextCompletions: true
    }
});
