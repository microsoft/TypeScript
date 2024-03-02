/// <reference path="fourslash.ts" />

// @filename: index.ts
//// abstract class AFoo {
////   abstract bar(): Promise<void>;
//// }
////
//// class Foo extends AFoo {
////   [|async b/*1*/|]
//// }

verify.completions({
    marker: "1",
    includes: {
        name: "bar",
        insertText: "async bar(): Promise<void> {\n}",
        filterText: "async bar",
        replacementSpan: test.ranges()[0]
    },
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
});