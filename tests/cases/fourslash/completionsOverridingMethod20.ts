/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
//// abstract class AFoo {
////     abstract bar(): Promise<void>;
//// }
//// class Foo extends AFoo {
////     async b/*a*/
//// }

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
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            insertText: "async bar(): Promise<void> {\n}",
            filterText: "bar",
            replacementSpan: undefined,
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
    ]
});

verify.applyCodeActionFromCompletion("a", {
    preferences: {
      includeCompletionsWithInsertText: true,
      includeCompletionsWithSnippetText: false,
      includeCompletionsWithClassMemberSnippets: true,
    },
    name: "bar",
    source: completion.CompletionSource.ClassMemberSnippet,
    description: "Update modifiers of 'bar'",
    newFileContent:
`abstract class AFoo {
    abstract bar(): Promise<void>;
}
class Foo extends AFoo {
    b
}`
});