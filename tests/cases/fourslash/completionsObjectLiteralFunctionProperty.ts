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
////interface Accessor {
////    get prop(): number;
////    set prop(n: number);
////}
////const a: Accessor = {
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
            source: "ObjectLiteralMethodSnippet/",
            insertText: "bar: (x: number): void => { }",
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
            source: "ObjectLiteralMethodSnippet/",
            insertText: "bar: (x: number): void => { }",
        },
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            insertText: undefined,
        },
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            source: "ObjectLiteralMethodSnippet/",
            insertText: "foo: (x: string): string => { }",
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
            name: "prop",
            sortText: completion.SortText.LocationPriority,
            source: "ObjectLiteralMethodSnippet/",
            insertText: "get prop(): number { },set prop(n: number) { }",
        },
    ],
});

