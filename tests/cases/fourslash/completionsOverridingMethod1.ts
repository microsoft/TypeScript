/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: h.ts
// @noImplicitOverride: true
// Case: Suggested method needs `override` modifier
////class HBase {
////    foo(a: string): void {}
////}
////
////class HSub extends HBase {
////    f/*h*/
////}


verify.completions({
    marker: "h",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: "override foo(a: string): void {\n}",
            filterText: "foo"
        }
    ],
});