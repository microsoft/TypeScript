/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
// Case: Snippet text needs escaping
////interface DollarSign {
////    "$usd"(a: number): number;
////    $cad(b: number): number;
////    cla$$y(c: number): number;
////    isDollarAmountString(s: string): s is `$${number}`
////}
////class USD implements DollarSign {
////    /*a*/
////}


verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "$usd",
            sortText: completion.SortText.LocationPriority,
            isSnippet: true,
            insertText: "\"\\$usd\"(a: number): number {\n    $0\n}",
            filterText: "$usd",
        },
        {
            name: "$cad",
            sortText: completion.SortText.LocationPriority,
            isSnippet: true,
            insertText: "\\$cad(b: number): number {\n    $0\n}",
            filterText: "$cad",
        },
        {
            name: "cla$$y",
            sortText: completion.SortText.LocationPriority,
            isSnippet: true,
            insertText: "cla\\$\\$y(c: number): number {\n    $0\n}",
            filterText: "cla$$y",
        },
        {
            name: "isDollarAmountString",
            sortText: completion.SortText.LocationPriority,
            isSnippet: true,
            insertText: "isDollarAmountString(s: string): s is `\\$\\${number}` {\n    $0\n}",
            filterText: "isDollarAmountString",
        },

    ],
});