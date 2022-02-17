/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF

////interface IFoo {
////    a?: number;
////    b?(x: number): void;
////}
////class Foo implements IFoo {
////    /**/
////}

verify.completions({
    marker: "",
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
            insertText: "a?: number;"
        },
        {
            name: "b",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "b(x: number): void {\n}"
        },
    ],
});
