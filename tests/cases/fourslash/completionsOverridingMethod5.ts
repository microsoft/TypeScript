/// <reference path="fourslash.ts" />

// @Filename: a.ts
// Case: abstract methods
////abstract class Ab {
////    abstract met(n: string): void;
////    met2(n: number): void {
////        
////    }
////}
////
////abstract class Abc extends Ab {
////    /*a*/
////    abstract /*b*/
////    abstract m/*c*/
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
            name: "met",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "met(n: string): void {\r\n}\r\n",
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "met2(n: number): void {\r\n}\r\n",
        }
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
            name: "met",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "met(n: string): void;\r\n",
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "met2(n: number): void;\r\n",
        }
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
            name: "met",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "met(n: string): void;\r\n",
        },
        {
            name: "met2",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "met2(n: number): void;\r\n",
        }
    ],
});


