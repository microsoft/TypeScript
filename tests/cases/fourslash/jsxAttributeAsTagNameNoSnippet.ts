/// <reference path="fourslash.ts" />
//@Filename: file.tsx
////declare namespace JSX {
////    interface IntrinsicElements {
////        button: any;
////        div: any;
////    }
////}
////function fn() {
////    return <>
////        <butto/*1*/
////    </>;
////}
////function fn2() {
////    return <>
////        preceding junk <butto/*2*/
////    </>;
////}
////function fn3() {
////    return <>
////        <butto/*3*/ style=""
////    </>;
////}



verify.completions(
    {
        marker: "1",
        includes: [
            { name: "button", insertText: undefined, isSnippet: undefined }
        ],
        preferences: {
            jsxAttributeCompletionStyle: "braces",
            includeCompletionsWithSnippetText: true,
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "2",
        includes: [
            { name: "button", insertText: undefined, isSnippet: undefined }
        ],
        preferences: {
            jsxAttributeCompletionStyle: "braces",
            includeCompletionsWithSnippetText: true,
            includeCompletionsWithInsertText: true,
        }
    },
    {
        marker: "3",
        includes: [
            { name: "button", insertText: undefined, isSnippet: undefined }
        ],
        preferences: {
            jsxAttributeCompletionStyle: "braces",
            includeCompletionsWithSnippetText: true,
            includeCompletionsWithInsertText: true,
        }
    },
);
