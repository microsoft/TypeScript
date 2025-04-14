/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
////interface IFoo {
////    bar(this: IFoo): void;
////}
////const obj: IFoo = {
////    /*1*/
////}

verify.completions({
    marker: "1",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
        useLabelDetailsInCompletionEntries: true,
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "bar"),
            insertText: undefined,
        },
        {
            name: "bar",
            sortText: completion.SortText.SortBelow(
                completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "bar")),
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            isSnippet: true,
            insertText: "bar() {\n    $0\n},",
            labelDetails: {
                detail: "()",
            },
        },
    ],
});
