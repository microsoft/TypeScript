/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: formatting: semicolons
////interface Base {
////    a: string;
////    b(a: string): void;
////    c(a: string): string;
////    c(a: number): number;
////}
////class Sub implements Base {
////   /*a*/
////}


verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "a",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "a: string;",
        },
        {
            name: "b",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText:
`b(a: string): void {
}`,
        },
        {
            name: "c",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText:
`c(a: string): string;
c(a: number): number;
c(a: unknown): string | number {
}`,
        },
    ],
});