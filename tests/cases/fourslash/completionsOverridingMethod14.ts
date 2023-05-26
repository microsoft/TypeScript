/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @strictNullChecks: true
// @newline: LF

////interface IFoo {
////    foo?(arg: string): number;
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
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: "foo(arg: string): number {\n}",
            filterText: "foo",
        },
    ],
});
