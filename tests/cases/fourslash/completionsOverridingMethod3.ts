/// <reference path="fourslash.ts" />

// @Filename: boo.d.ts
// Case: Declaration files
////interface Ghost {
////    boo(): string;
////}
////
////declare class Poltergeist implements Ghost {
////    /*b*/
////}

// format.setFormatOptions({
//     newLineCharacter: "\n",
// });
// format.setOption("newline", "\n");

verify.completions({
    marker: "b",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "boo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText:
"boo(): string;\r\n",
        }
    ],
});