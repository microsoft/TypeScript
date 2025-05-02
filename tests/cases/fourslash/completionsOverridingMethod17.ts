/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF

// Issue #52211

//// interface Interface {
////     method(): void;
//// }
////
//// export class Class implements Interface {
////     property = "yadda";
////
////     /**/
//// }

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
            name: "method",
            sortText: completion.SortText.LocationPriority,
            insertText: "method(): void {\n}",
            replacementSpan: undefined,
            filterText: "method",
        },
    ],
});
