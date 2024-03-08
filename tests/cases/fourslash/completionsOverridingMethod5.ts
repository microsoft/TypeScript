/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
// Case: abstract methods
////abstract class Ab {
////    abstract met(n: string): void;
////    met2(n: number): void {
////        return;
////    }
////}
////
////abstract class Abc extends Ab {
////    /*a*/
////    abstract /*b*/
////    abstract m/*c*/
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
            name: "met",
            sortText: completion.SortText.LocationPriority,
            insertText: "met(n: string): void {\n}",
            filterText: "met"
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            insertText: "met2(n: number): void {\n}",
            filterText: "met2"
        }
    ],
});

verify.completions({
    marker: "b",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "met",
            sortText: completion.SortText.LocationPriority,
            insertText: "abstract met(n: string): void;",
            filterText: "met",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            insertText: "abstract met2(n: number): void;",
            filterText: "met2",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        }
    ],
});

verify.completions({
    marker: "c",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "met",
            sortText: completion.SortText.LocationPriority,
            insertText: "abstract met(n: string): void;",
            filterText: "met",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            insertText: "abstract met2(n: number): void;",
            filterText: "met2",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        }
    ],
});


