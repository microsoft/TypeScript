/// <reference path="fourslash.ts" />

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
// @noImplicitOverride: true // >> TODO: move this to a new test file, because this option is global
// Case: Suggested method needs `override` modifier
////class HBase {
////    foo(a: string): void {}
////}
////
////class HSub extends HBase {
////    f/*h*/
////}

// format.setFormatOptions({
//     newLineCharacter: "\n",
// });
// format.setOption("newline", "\n");

verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"foo(param1: string, param2: boolean): Promise<void> {\r\n    $1;\r\n}\r\n",
        }
    ],
});

verify.completions({
    marker: "b",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"foo(a: string, b: string): string {\r\n    $1;\r\n}\r\n",
        }
    ],
});

verify.completions({
    marker: "c",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"foo(a: string): string {\r\n    $1;\r\n}\r\n",
        }
    ],
});

verify.completions({
    marker: "d",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"foo(a: string): string {\r\n    $1;\r\n}\r\n",
        }
    ],
});

verify.completions({
    marker: "e",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"foo(a: string): string {\r\n    $1;\r\n}\r\n",
        }
    ],
});

verify.completions({
    marker: "f",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"foo(a: string): string {\r\n    $1;\r\n}\r\n",
        }
    ],
});

verify.completions({
    marker: "g",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"foo(a: string): string;\r\n\
foo(a: undefined, b: number): string;\r\n\
foo(a: any, b?: any): string {\r\n    $1;\r\n}\r\n",
        }
    ],
});

verify.completions({
    marker: "h",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"override foo(): void {\r\n    $1;\r\n}\r\n",
        }
    ],
});