/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
// Case: Concrete class implements abstract method
////abstract class ABase {
////    abstract foo(param1: string, param2: boolean): Promise<void>;
////}
////
////class ASub extends ABase {
////    f/*a*/
////}

// @Filename: b.ts
// Case: Concrete class overrides concrete method
////class BBase {
////    foo(a: string, b: string): string {
////        return a + b;
////    }
////}
////
////class BSub extends BBase {
////    f/*b*/
////}

// @Filename: c.ts
// Case: Multiple overrides, concrete class overrides concrete method
////class CBase {
////    foo(a: string | number): string {
////        return a + "";
////    }
////}
////
////class CSub extends CBase {
////    foo(a: string): string {
////        return add;
////    }
////}
////
////class CSub2 extends CSub {
////    f/*c*/
////}

// @Filename: d.ts
// Case: Abstract class extends abstract class
////abstract class DBase {
////    abstract foo(a: string): string;
////}
////
////abstract class DSub extends DBase {
////    f/*d*/
////}

// @Filename: e.ts
// Case: Class implements interface
////interface EBase {
////    foo(a: string): string;
////}
////
////class ESub implements EBase {
////    f/*e*/
////}

// @Filename: f.ts
// Case: Abstract class implements interface
////interface FBase {
////    foo(a: string): string;
////}
////
////abstract class FSub implements FBase {
////    f/*f*/
////}

// @Filename: g.ts
// Case: Method has overloads
////interface GBase {
////    foo(a: string): string;
////    foo(a: undefined, b: number): string;
////}
////
////class GSub implements GBase {
////    f/*g*/
////}

// @Filename: h.ts
// Case: Static method
// Note: static methods are only suggested for completions after the `static` keyword
////class HBase {
////    static met(n: number): number {
////        return n;
////    }
////}
////
////class HSub extends HBase {
////    /*h1*/
////    static /*h2*/
////}

// @Filename: i.ts
// Case: Generic method
////class IBase {
////    met<T>(t: T): T {
////        return t;
////    }
////    metcons<T extends string | number>(t: T): T {
////        return t;
////    }
////}
////
////class ISub extends IBase {
////    /*i*/
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
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: "foo(param1: string, param2: boolean): Promise<void> {\n}",
            filterText: "foo",
        }
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
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            insertText: "foo(a: string, b: string): string {\n}",
            filterText: "foo",
        }
    ],
});

verify.completions({
    marker: "c",
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
            insertText: "foo(a: string): string {\n}",
            filterText: "foo",
        }
    ],
});

verify.completions({
    marker: "d",
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
            insertText: "foo(a: string): string {\n}",
            filterText: "foo",
        }
    ],
});

verify.completions({
    marker: "e",
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
            insertText: "foo(a: string): string {\n}",
            filterText: "foo",
        }
    ],
});

verify.completions({
    marker: "f",
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
            insertText: "foo(a: string): string {\n}",
            filterText: "foo",
        }
    ],
});

verify.completions({
    marker: "g",
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
`foo(a: string): string;
foo(a: undefined, b: number): string;
foo(a: unknown, b?: unknown): string {
}`,
            filterText: "foo",
        }
    ],
});

verify.completions({
    marker: "h1",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    excludes: "met",
});

verify.completions({
    marker: "h2",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "met",
            sortText: completion.SortText.LocationPriority,
            insertText: "static met(n: number): number {\n}",
            filterText: "met",
            hasAction: true,
            source: completion.CompletionSource.ClassMemberSnippet,
        }
    ],
});

verify.completions({
    marker: "i",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "met",
            sortText: completion.SortText.LocationPriority,
            insertText: "met<T>(t: T): T {\n}",
            filterText: "met"
        },
        {
            name: "metcons",
            sortText: completion.SortText.LocationPriority,
            insertText: "metcons<T extends string | number>(t: T): T {\n}",
            filterText: "metcons"
        }
    ],
});