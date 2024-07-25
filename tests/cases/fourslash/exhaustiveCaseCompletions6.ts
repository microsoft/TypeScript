/// <reference path="fourslash.ts" />

// Quote preferences.

// @newline: LF
//// declare const p: 'A' | 'B' | 'C';
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
                name: `case 'A': ...`,
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case 'A':
case 'B':
case 'C':`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
            quotePreference: "single",
        },
    },
);