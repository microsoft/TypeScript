/// <reference path="fourslash.ts" />

// @Filename: a.ts
// Case: Snippet text needs escaping
////interface DollarSign {
////    "$usd"(a: number): number;
////}
////class USD implements DollarSign {
////    /*a*/
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
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "$usd",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"$usd(a: number): number {\r\n    $0\r\n}\r\n",
        }
    ],
});