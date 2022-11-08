/// <reference path="fourslash.ts" />

// Filter existing values.

// @newline: LF
//// enum E {
////     A = 0,
////     B = "B",
////     C = "C",
//// }
//// declare const u: E.A | E.B | 1 | 1n | "1";
//// switch (u) {
////     case E.A:
////     case 1:
////     case 1n:
////     case 0x1n:
////     case "1":
////     case `1`:
////     case `1${u}`:
////     case/*1*/
//// }
//// declare const v: E.A | "1" | "2";
//// switch (v) {
////     case 0:
////     case `1`:
////     /*2*/
//// }
//// enum F {
////     A = "A",
////     B = "B",
////     C = A,
//// }
//// declare const x: F;
//// switch (x) {
////     /*3*/
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case E.B: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
            `case E.B:`,
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
                name: `case "2": ...`,
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
            `case "2":`,
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
                name: "case F.A: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case F.A:
case F.B:`, // no C because C's value is the same as A's
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
);