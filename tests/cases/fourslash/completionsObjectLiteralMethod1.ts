/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
////interface IFoo {
////    bar(x: number): void;
////}
////
////const obj: IFoo = {
////    /*a*/
////}
////type Foo = {
////    bar(x: number): void;
////    foo: (x: string) => string;
////}
////
////const f: Foo = {
////    /*b*/
////}
////
////interface Overload {
////    buzz(a: number): number;
////    buzz(a: string): string;
////}
////const o: Overload = {
////    /*c*/
////}
////interface Prop {
////    "space bar"(): string;
////}
////const p: Prop = {
////    /*d*/
////}

verify.completions({
    marker: "a",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
        {
            name: "bar",
            sortText: completion.SortText.OptionalMember,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "bar(x: number): void {\n},",
        },
    ],
});
verify.completions({
    marker: "b",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
        {
            name: "bar",
            sortText: completion.SortText.OptionalMember,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "bar(x: number): void {\n},",
        },
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
        {
            name: "foo",
            sortText: completion.SortText.OptionalMember,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "foo(x: string): string {\n},",
        },
    ],
});
verify.completions({
    marker: "c",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    },
    exact: [
        {
            name: "buzz",
            sortText: completion.SortText.LocationPriority,
            // no declaration insert text, because this property has overloads
            insertText: undefined,
        },
    ],
});
verify.completions({
    marker: "d",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    },
    includes: [
        {
            name: "\"space bar\"",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
        {
            name: "\"space bar\"",
            sortText: completion.SortText.OptionalMember,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "\"space bar\"(): string {\n},",
        },
    ],
});
verify.completions({
    marker: "a",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
        includeCompletionsWithObjectLiteralMethodSnippets: true,
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
        {
            name: "bar",
            sortText: completion.SortText.OptionalMember,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            isSnippet: true,
            insertText: "bar(x: number): void {\n    $0\n},",
        },
    ],
});
