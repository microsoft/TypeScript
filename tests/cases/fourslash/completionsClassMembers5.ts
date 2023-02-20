/// <reference path="fourslash.ts" />

////export const SOME_CONSTANT = 'SOME_TEXT';
////export class Base {
////    [SOME_CONSTANT]: boolean;
////}
////export class Derived extends Base {
////    /**/
////}

verify.baselineCompletions({
    includeCompletionsWithInsertText: true,
    includeCompletionsWithSnippetText: true,
    includeCompletionsWithClassMemberSnippets: true,
});
