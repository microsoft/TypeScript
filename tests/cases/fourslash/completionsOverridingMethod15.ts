/// <reference path="fourslash.ts" />

// @newline: LF
////declare class B {
////    get foo(): any;
////    set foo(value: any);
////}
////class A extends B {
////    /**/
////}

verify.completions({
    marker: "",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.ClassMemberSnippets,
            insertText: "get foo(): any {\n}\nset foo(value: any) {\n}",
        }
    ],
    isNewIdentifierLocation: true
})
