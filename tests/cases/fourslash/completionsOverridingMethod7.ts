/// <reference path="fourslash.ts" />

// @Filename: a.ts
// @newline: LF
// Case: generic methods
////abstract class A {
////    abstract M<T>(x: number): number;
////    abstract M<T>(x: string): string;
////    N<T>(x: string): void {
////        return;
////    }
////}
////
////class B extends A {
////    /*a*/
////}


verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
    },
    includes: [
        {
            name: "M",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText:
`M<T>(x: number): number;
M<T>(x: string): string;
M<T>(x: any): string | number {
}
`,
        },
        {
            name: "N",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText:
`N<T>(x: string): void {
}
`,
        },
    ],
});
