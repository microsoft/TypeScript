/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
// Case: Properties
////class Base {
////    protected foo: string = "bar";
////}
////
////class Sub extends Base {
////    /*a*/
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
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: "protected foo: string;",
            filterText: "foo"
        }
    ],
});