/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
////interface I1{
////    M(x: number): void;
////}
////
////interface I2{
////    M(x: number): void;
////}
////
////const u: I1 | I2 = {
////    /*a*/
////}
////
////const i: I1 & I2 = {
////    /*b*/
////}

verify.completions({
    marker: "a",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "M",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
    ],
});
verify.completions({
    marker: "b",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "M",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
    ],
});

