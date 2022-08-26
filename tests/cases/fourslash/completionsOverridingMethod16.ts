/// <reference path="fourslash.ts" />

// @newline: LF
////declare class B {
////    set foo(value: any);
////    get foo(): any;
////}
////class A extends B {
////    /**/
////}

goTo.marker("");
verify.baselineCompletions({
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: false,
    includeCompletionsWithClassMemberSnippets: true,
});
