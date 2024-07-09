/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: modifiers
//// class Base {
////     method() {}
////     protected prop = 1;
//// }

//// class A extends Base {
////     public abstract /*a*/
//// }

//// abstract class Ab extends Base {
////     public abstract /*b*/
//// }

//// class B extends Base {
////     public override m/*c*/
//// }

//// class C extends Base {
////     override /*d*/
//// }

//// class f extends Base {
////     protected /*f*/
//// }

verify.completions(
    {
        marker: "a",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        excludes: ["method", "prop"],
    },
    {
        marker: "b",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        includes: [
            {
                name: "method",
                sortText: completion.SortText.LocationPriority,
                insertText: "public abstract method(): void;",
                filterText: "method",
                replacementSpan: undefined,
                hasAction: true,
                source: completion.CompletionSource.ClassMemberSnippet,
            },
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "public abstract prop: number;",
                filterText: "prop",
                replacementSpan: undefined,
                hasAction: true,
                source: completion.CompletionSource.ClassMemberSnippet,
            },
        ],
    },
    {
        marker: "c",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        includes: [
            {
                name: "method",
                sortText: completion.SortText.LocationPriority,
                insertText: "public override method(): void {\n}",
                filterText: "method",
                replacementSpan: undefined,
                hasAction: true,
                source: completion.CompletionSource.ClassMemberSnippet,
            },
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "public override prop: number;",
                filterText: "prop",
                replacementSpan: undefined,
                hasAction: true,
                source: completion.CompletionSource.ClassMemberSnippet,
            },
        ]
    },
    {
        marker: "d",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        includes: [
            {
                name: "method",
                sortText: completion.SortText.LocationPriority,
                insertText: "override method(): void {\n}",
                filterText: "method",
                replacementSpan: undefined,
                hasAction: true,
                source: completion.CompletionSource.ClassMemberSnippet,
            },
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "protected override prop: number;",
                filterText: "prop",
                replacementSpan: undefined,
                hasAction: true,
                source: completion.CompletionSource.ClassMemberSnippet,
            },
        ]
    },
    {
        marker: "f",
        isNewIdentifierLocation: true,
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: false,
            includeCompletionsWithClassMemberSnippets: true,
        },
        excludes: ["method"],
        includes: [
            {
                name: "prop",
                sortText: completion.SortText.LocationPriority,
                insertText: "protected prop: number;",
                filterText: "prop",
                replacementSpan: undefined,
                hasAction: true,
                source: completion.CompletionSource.ClassMemberSnippet,
            },
        ]
    },
);