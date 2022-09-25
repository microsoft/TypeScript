/// <reference path="fourslash.ts" />

// @newline: LF
// @strictNullChecks: true
// @Filename: a.ts
////interface I1 {
////    M(x: number): void;
////}
////interface I2 {
////    M(x: number): void;
////}
////const u: I1 | I2 = {
////    /*a*/
////}
////const i: I1 & I2 = {
////    /*b*/
////}
////interface U1 {
////    M(x: number): string;
////}
////interface U2 {
////    M(x: string): number;
////}
////const o: U1 | U2 = {
////    /*c*/
////}
////interface Op {
////    M?(x: number): void;
////    N: ((x: string) => void) | null | undefined;
////    O?: () => void;
////}
////const op: Op = {
////    /*d*/
////}

verify.completions({
    marker: "a",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
        useLabelDetailsInCompletionEntries: true,
    },
    includes: [
        {
            name: "M",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "M"),
            insertText: undefined,
        },
        {
            name: "M",
            sortText: completion.SortText.SortBelow(
                completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "M")),
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "M(x) {\n},",
            labelDetails: {
                detail: "(x)",
            },
        },
    ],
});
verify.completions({
    marker: "b",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    },
    includes: [
        {
            name: "M",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "M"),
            insertText: undefined,
        },
        // No signature completion because type of `M` is intersection type
    ],
});
verify.completions({
    marker: "c",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    },
    exact: [
        {
            name: "M",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "M"),
            insertText: undefined,
        },
        // No signature completion because type of `M` is intersection type
    ],
});
verify.completions({
    marker: "d",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
        useLabelDetailsInCompletionEntries: true,
    },
    includes: [
        {
            name: "M",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.OptionalMember, "M"),
            insertText: undefined,
        },
        {
            name: "M",
            sortText: completion.SortText.SortBelow(
                completion.SortText.ObjectLiteralProperty(completion.SortText.OptionalMember, "M")),
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "M(x) {\n},",
            labelDetails: {
                detail: "(x)",
            },
        },
        {
            name: "N",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "N"),
            insertText: undefined,
        },
        {
            name: "N",
            sortText: completion.SortText.SortBelow(
                completion.SortText.ObjectLiteralProperty(completion.SortText.LocationPriority, "N")),
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "N(x) {\n},",
            labelDetails: {
                detail: "(x)",
            },
        },
        {
            name: "O",
            sortText: completion.SortText.ObjectLiteralProperty(completion.SortText.OptionalMember, "O"),
            insertText: undefined,
        },
        {
            name: "O",
            sortText: completion.SortText.SortBelow(
                completion.SortText.ObjectLiteralProperty(completion.SortText.OptionalMember, "O")),
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "O() {\n},",
            labelDetails: {
                detail: "()",
            },
        },
    ],
});