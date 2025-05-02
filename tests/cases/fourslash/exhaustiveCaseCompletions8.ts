/// <reference path="fourslash.ts" />

// @newline: LF
////export function foo(position: -1n | 0n) {
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
                name: "case 0n: ...",
                source: completion.CompletionSource.SwitchCases,
                sortText: completion.SortText.GlobalsOrKeywords,
                insertText:
`case 0n:
case -1n:`,
            },
        ],
        preferences: {
            includeCompletionsWithInsertText: true,
        },
    },
);
