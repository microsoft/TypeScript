/// <reference path="fourslash.ts" />

// @Filename: a.ts
// Case: modifier inheritance/deduplication
////class A {
////    public method(): number {
////        return 0;
////    }
////}
////
////abstract class B extends A {
////    public abstract /*b*/
////}
////
////class C extends A {
////    public override m/*a*/
////}
////
////interface D {
////    fun(a: number): number;
////    fun(a: undefined, b: string): number;
////}
////
////class E implements D {
////    public f/*c*/
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
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "method",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "method(): number {\r\n}\r\n",
        },
    ],
});

verify.completions({
    marker: "b",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "method",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "method(): number;\r\n",
        },
    ],
});

verify.completions({
    marker: "c",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "fun",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText:
                "fun(a: number): number;\r\n\
public fun(a: undefined, b: string): number;\r\n\
public fun(a: any, b?: any): number {\r\n}\r\n",
        },
    ],
});