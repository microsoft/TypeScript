/// <reference path="fourslash.ts" />

// Where the exhaustive case completion appears or not.

// @newline: LF
// @Filename: /main.ts
//// enum E {
////     A = 0,
////     B = "B",
////     C = "C",
//// }
//// declare const u: E;
//// switch (u) {
////     case/*1*/
//// }
//// switch (u) {
////     /*2*/
//// }
//// switch (u) {
////     case 1:
////     /*3*/
//// }
//// switch (u) {
////     c/*4*/   
//// }
//// switch (u) {
////     case /*5*/
//// }
//// /*6*/
//// switch (u) {
////     /*7*/
////
//// switch (u) {
////     case E./*8*/
//// }

const exhaustiveCaseCompletion = {
    name: "case E.A: ...",
    source: completion.CompletionSource.SwitchCases,
    sortText: completion.SortText.GlobalsOrKeywords,
    insertText:
`case E.A:
case E.B:
case E.C:`,
};

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: [
            exhaustiveCaseCompletion,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
    {
        marker: "2",
        includes: [
            exhaustiveCaseCompletion,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "3",
        includes: [
            exhaustiveCaseCompletion,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "4",
        includes: [
            exhaustiveCaseCompletion,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "5",
        includes: [
            exhaustiveCaseCompletion,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "6",
        exact: [
            "E",
            "u",
            ...completion.globals,
            exhaustiveCaseCompletion,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "7",
        includes: [
            exhaustiveCaseCompletion,
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "8",
        exact: [
            "A",
            "B",
            "C"
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        }
    },
);