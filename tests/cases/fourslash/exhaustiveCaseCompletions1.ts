/// <reference path="fourslash.ts" />

// Basic tests

// @newline: LF
//// enum E {
////     A = 0,
////     B = "B",
////     C = "C",
//// }
//// // Mixed union
//// declare const u: E.A | E.B | 1;
//// switch (u) {
////     case/*1*/
//// }
//// // Union enum
//// declare const e: E;
//// switch (e) {
////     case/*2*/
//// }
//// enum F {
////     D = 1 << 0,
////     E = 1 << 1,
////     F = 1 << 2,
//// }
////
//// declare const f: F;
//// switch (f) {
////     case/*3*/
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case E.A: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case E.A:
case E.B:
case 1:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
    {
        marker: "2",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case E.A: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case E.A:
case E.B:
case E.C:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
    {
        marker: "3",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case F.D: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case F.D:
case F.E:
case F.F:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
    {
        marker: "3",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case F.D: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                isSnippet: true,
                insertText:
`case F.D:$1
case F.E:$2
case F.F:$3`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
            includeCompletionsWithSnippetText: true,
        },
    },
);