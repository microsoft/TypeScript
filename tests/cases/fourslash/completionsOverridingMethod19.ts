/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
//// class Base {
////     method() {}
////     protected prop = 1;
//// }
//// class E extends Base {
////     protected notamodifier override /**/
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
            insertText: "override method(): void {\n}",
            filterText: "method",
            replacementSpan: undefined,
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
        {
            name: "prop",
            sortText: completion.SortText.LocationPriority,
            insertText: "protected override prop: number;",
            filterText: "prop",
            replacementSpan: undefined,
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
    ]
},);

verify.applyCodeActionFromCompletion("", {
    preferences: {
      includeCompletionsWithInsertText: true,
      includeCompletionsWithSnippetText: false,
      includeCompletionsWithClassMemberSnippets: true,
    },
    name: "method",
    source: completion.CompletionSource.ClassMemberSnippet,
    description: "Update modifiers of 'method'",
    newFileContent:
`class Base {
    method() {}
    protected prop = 1;
}
class E extends Base {
    protected notamodifier 
}`
});
