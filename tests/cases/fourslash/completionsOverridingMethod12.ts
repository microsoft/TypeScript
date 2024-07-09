/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: modifier order
////abstract class A {
////    public get P(): string {
////        return "";
////    }
////}
////
////abstract class B extends A {
////    abstract /*a*/
////}
////
////abstract class B1 extends A {
////    abstract override /*b*/
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
            name: "P",
            sortText: completion.SortText.LocationPriority,
            insertText: "abstract get P(): string;",
            filterText: "P",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
    ],
});

verify.completions({
    marker: "b",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "P",
            sortText: completion.SortText.LocationPriority,
            insertText: "abstract override get P(): string;",
            filterText: "P",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
    ],
});

verify.applyCodeActionFromCompletion("b", {
    preferences: {
      includeCompletionsWithInsertText: true,
      includeCompletionsWithSnippetText: false,
      includeCompletionsWithClassMemberSnippets: true,
    },
    name: "P",
    source: completion.CompletionSource.ClassMemberSnippet,
    description: "Update modifiers of 'P'",
    newFileContent:
`abstract class A {
    public get P(): string {
        return "";
    }
}

abstract class B extends A {
    abstract 
}

abstract class B1 extends A {
    
}`
});