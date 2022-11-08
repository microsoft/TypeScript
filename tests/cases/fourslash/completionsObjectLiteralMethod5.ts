/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
////interface Foo {
////    method(x?: string): void;
////}
////const foo: Foo = {
////    /*m*/
////}

verify.completions({
    marker: "m",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
        useLabelDetailsInCompletionEntries: true,
    },
    includes: [
        {
            name: "method",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "method"),
            insertText: undefined,
        },
        {
            name: "method",
            sortText: completion.SortText.SortBelow(
                completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "method")),
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            isSnippet: true,
            insertText: "method(x) {\n    $0\n},",
            labelDetails: {
                detail: "(x)",
            },
        },
    ],
});
