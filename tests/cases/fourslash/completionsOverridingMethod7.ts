/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: abstract overloads
////abstract class Base {
////    abstract M<T>(t: T): void;
////    abstract M<T>(t: T, x: number): void;
////}
////
////abstract class Derived extends Base {
////    abstract /*a*/
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
            name: "M",
            sortText: completion.SortText.LocationPriority,
            insertText:
`abstract M<T>(t: T): void;
abstract M<T>(t: T, x: number): void;`,
            filterText: "M",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
    ],
});

verify.applyCodeActionFromCompletion("a", {
    preferences: {
      includeCompletionsWithInsertText: true,
      includeCompletionsWithSnippetText: false,
      includeCompletionsWithClassMemberSnippets: true,
    },
    name: "M",
    source: completion.CompletionSource.ClassMemberSnippet,
    description: "Update modifiers of 'M'",
    newFileContent:
`abstract class Base {
    abstract M<T>(t: T): void;
    abstract M<T>(t: T, x: number): void;
}

abstract class Derived extends Base {
    
}`
});
