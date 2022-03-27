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
            sortText: completion.SortText.ClassMemberSnippets,
            isSnippet: true,
            insertText: "\"\\$usd\"(a: number): number {\n    $0\n}",
        }
    ],
});