/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF

////class A {
////    protected foo(): void {
////        return;
////    }
////}
////class B extends A {
////    protected /**/
////}

verify.completions({
    marker: "",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    exact: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: "protected foo(): void {\n}",
            filterText: "foo(): void {\n}"
        },
        ...completion.classElementKeywords,
    ],
});
