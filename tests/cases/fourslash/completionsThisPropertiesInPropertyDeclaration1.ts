/// <reference path="fourslash.ts" />

////class Foo {
////    private _prop = 1;
////    public a = [|_/*1*/|]
////
////    foo() {
////        [|_/*2*/|]
////    }
////}

verify.completions({
    marker: ["1", "2"],
    includes: [
        {
            name: "_prop",
            insertText: "this._prop",
            kind: "property",
            sortText: completion.SortText.SuggestedClassMembers,
            source: completion.CompletionSource.ThisProperty,
            text: "(property) Foo._prop: number",
            kindModifiers: "private"
        },
    ],
    preferences: {
        includeInsertTextCompletions: true
    }
});
