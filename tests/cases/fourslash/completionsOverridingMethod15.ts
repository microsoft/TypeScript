/// <reference path="fourslash.ts" />

// @newline: LF
////declare class B {
////    get foo(): any;
////    set foo(value: any);
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
