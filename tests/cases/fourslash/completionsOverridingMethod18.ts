/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF

//// declare function decorator(...args: any[]): any;

//// class DecoratorBase {
////     protected foo(a: string): string;
////     protected foo(a: number): number;
////     protected foo(a: any): any {
////         return a;
////     }
//// }

//// class DecoratorSub extends DecoratorBase {
////     @decorator protected /**/
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
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText:
`protected foo(a: string): string;
protected foo(a: number): number;
@decorator
protected foo(a: any) {
}`,
            filterText: "foo",
            replacementSpan: undefined,
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        },
    ]
});

verify.applyCodeActionFromCompletion("", {
    preferences: {
      includeCompletionsWithInsertText: true,
      includeCompletionsWithSnippetText: false,
      includeCompletionsWithClassMemberSnippets: true,
    },
    name: "foo",
    source: completion.CompletionSource.ClassMemberSnippet,
    description: "Update modifiers of 'foo'",
    newFileContent:
`declare function decorator(...args: any[]): any;
class DecoratorBase {
    protected foo(a: string): string;
    protected foo(a: number): number;
    protected foo(a: any): any {
        return a;
    }
}
class DecoratorSub extends DecoratorBase {
    
}`
});
