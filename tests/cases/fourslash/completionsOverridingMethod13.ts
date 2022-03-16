/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF

////class A {
////    protected foo(): void {
////        return;
////    }
////}
////class B extends A {
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
    exact: [
        ...completion.classElementKeywords,
        {
            name: "foo",
            sortText: completion.SortText.ClassMemberSnippets,
            insertText: "protected foo(): void {\n}",
        },
    ],
});
