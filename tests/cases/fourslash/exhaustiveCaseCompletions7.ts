/// <reference path="fourslash.ts" />

// @newline: LF
////export function foo(position: -1 | 0 | 1) {
////    switch (position) {
////        /**/
////    }
////}

verify.completions(
    {
        marker: "",
        isNewIdentifierLocation: false,
        includes: [
            {
                name: "case 0: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case 0:
case 1:
case -1:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
);
