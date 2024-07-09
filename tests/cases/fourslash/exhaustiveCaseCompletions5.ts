/// <reference path="fourslash.ts" />

// Filter existing values.

// @newline: LF
//// enum P {
////     " Space",
////     Bar,
//// }
//// 
//// declare const p: P;
//// 
//// switch (p) {
////     /*1*/
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: `case P[" Space"]: ...`,
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case P[" Space"]:
case P.Bar:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
);