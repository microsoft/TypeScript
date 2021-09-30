/// <reference path="fourslash.ts" />

// @Filename: h.ts
// @noImplicitOverride: true
// Case: Suggested method needs `override` modifier
////class HBase {
////    foo(a: string): void {}
////}
////
////class HSub extends HBase {
////    f/*h*/
////}

// format.setFormatOptions({
//     newLineCharacter: "\n",
// });
// format.setOption("newline", "\n");

verify.completions({
    marker: "h",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: true,
    },
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            isSnippet: true,
            insertText:
"override foo(a: string): void {\r\n    $1;\r\n}\r\n",
        }
    ],
});