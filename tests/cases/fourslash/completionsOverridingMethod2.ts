/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
// Case: Snippet text needs escaping
////interface DollarSign {
////    "$usd"(a: number): number;
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
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"\"\\$usd\"(a: number): number {\n    $0\n}\n",
        }
    ],
});