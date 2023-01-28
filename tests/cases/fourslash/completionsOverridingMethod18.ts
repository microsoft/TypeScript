/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF

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

//// class E extends Base {
////     protected notamodifier override /*e*/
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
            insertText: "method(): void;",
            filterText: "method",
            replacementSpan: undefined,
        },
        {
            name: "prop",
            sortText: completion.SortText.LocationPriority,
            insertText: "prop: number;",
            filterText: "prop",
            replacementSpan: undefined,
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
            insertText: "method(): void {\n}",
            filterText: "method",
            replacementSpan: undefined,
        },
        {
            name: "prop",
            sortText: completion.SortText.LocationPriority,
            insertText: "prop: number;",
            filterText: "prop",
            replacementSpan: undefined,
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
    excludes: ["prop"],
    includes: [
        {
            name: "method",
            sortText: completion.SortText.LocationPriority,
            insertText: "method(): void {\n}",
            filterText: "method",
            replacementSpan: undefined,
        },
    ]
},
{
    marker: "e",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    excludes: ["prop"],
    includes: [
        {
            name: "method",
            sortText: completion.SortText.LocationPriority,
            insertText: "method(): void {\n}",
            filterText: "method",
            replacementSpan: undefined,
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
            insertText: "prop: number;",
            filterText: "prop",
            replacementSpan: undefined,
        },
    ]
},
);
