/// <reference path="fourslash.ts" />

// Filter existing values.

// @newline: LF
//// enum E {
////     A = 0,
////     B = "B",
////     C = "C",
//// }
//// // Filtering existing literals
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
//// // Filtering repreated enum members
//// enum F {
////     A = "A",
////     B = "B",
////     C = A,
//// }
//// declare const x: F;
//// switch (x) {
////     /*3*/
//// }
//// // Enum with computed elements
//// enum G {
////     C = 0,
////     D = 1 << 1,
////     E = 1 << 2,
////     OtherD = D,
////     DorE = D | E,
//// }
//// declare const y: G;
//// switch (y) {
////     /*4*/
//// }
//// switch (y) {
////     case 0: // same as G.C
////     case 1: // same as G.D, but we don't know it
////     case 3: // same as G.DorE, but we don't know
////     /*5*/
//// }
////
//// // Already exhaustive switch
//// enum H {
////     A = "A",
////     B = "B",
////     C = "C",
//// }
//// declare const z: H;
//// switch (z) {
////     case H.A:
////     case H.B:
////     case H.C:
////     /*6*/
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
    {
        marker: "4",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case G.C: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case G.C:
case G.D:
case G.E:
case G.DorE:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
    {
        marker: "5",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case G.D: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case G.D:
case G.E:
case G.DorE:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
    {
        marker: "6",
        isNewIdentifierLocation: false,
        // No exhaustive case completion offered here because the switch is already exhaustive
        exact: [
            "E",
            "F",
            "G",
            "H",
            "u",
            "v",
            "x",
            "y",
            "z",
            ...completion.globals,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
);