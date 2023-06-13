/// <reference path="fourslash.ts" />

////interface I {
////    prop: string;
////}
////class C implements I {
////    public pr/**/: string = 'foo';
////}

verify.completions({
    marker: "",
    includes: [
        { name: "prop", isSnippet: undefined, insertText: undefined }
    ],
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithClassMemberSnippets: true,
    }
});
