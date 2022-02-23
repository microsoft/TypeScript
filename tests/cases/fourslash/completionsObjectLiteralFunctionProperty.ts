/// <reference path="fourslash.ts" />

// @newline: LF
// @Filename: a.ts
// Case: Concrete class implements abstract method
////interface IFoo {
////    bar(x: number): void;
////}
////
////const obj: IFoo = {
////    /*a*/
////}
////type Foo = {
////    bar(x: number): void;
////    foo: (x: string) => string;
////}
////
////const f: Foo = {
////    /*b*/
////}
////const g: Foo = {
////    bar: (x: number) => { return; },
////    /*c*/
////}



verify.completions({
    marker: "c",
    isNewIdentifierLocation: true,
    preferences: {
        includeCompletionsWithInsertText: true,
        includeCompletionsWithSnippetText: false,
        // includeCompletionsWithClassMemberSnippets: true,
    },
    includes: [
        {
            name: "bar",
            sortText: completion.SortText.LocationPriority,
            replacementSpan: {
                fileName: "",
                pos: 0,
                end: 0,
            },
            insertText: "bar(x: number): void {\n}",
        }
    ],
});