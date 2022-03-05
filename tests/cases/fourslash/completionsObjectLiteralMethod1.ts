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
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "bar(x: number): void {\n},",
        },
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
    ],
});
verify.completions({
    marker: "b",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "bar(x: number): void {\n},",
        },
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "foo(x: string): string {\n},",
        },
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        }
    ],
});
verify.completions({
    marker: "c",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
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
    },
    includes: [
        {
            name: "\"space bar\"",
            sortText: completion.SortText.LocationPriority,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            insertText: "\"space bar\"(): string {\n},",
        },
        {
            name: "\"space bar\"",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
    ],
});
verify.completions({
    marker: "a",
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            source: completion.CompletionSource.ObjectLiteralMethodSnippet,
            isSnippet: true,
            insertText: "bar(x: number): void {\n    $0\n},",
        },
    ],
});
