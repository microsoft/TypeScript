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
////    [|abstract|] /*b*/
////    [|abstract m|]/*c*/
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
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            insertText: "met2(n: number): void {\n}",
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
            replacementSpan: test.ranges()[0],
            insertText: "abstract met(n: string): void;",
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: test.ranges()[0],
            insertText: "abstract met2(n: number): void;",
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
            replacementSpan: test.ranges()[1],
            insertText: "abstract met(n: string): void;",
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: test.ranges()[1],
            insertText: "abstract met2(n: number): void;",
        }
    ],
});


