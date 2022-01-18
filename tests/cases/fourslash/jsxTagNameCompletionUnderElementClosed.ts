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
////        <butto/*1*/ />
////    </>;
////}
////function fn2() {
////    return <>
////        preceding junk <butto/*2*/ />
////    </>;
////}
////function fn3() {
////    return <>
////        <butto/*3*/ style="" />
////    </>;
////}

var preferences: FourSlashInterface.UserPreferences = {
    jsxAttributeCompletionStyle: "braces",
    includeCompletionsWithSnippetText: true,
    includeCompletionsWithInsertText: true,
}; 

verify.completions(
    { marker: "1", preferences, includes: { name: "button", text: "(JSX attribute) JSX.IntrinsicElements.button: any" } },
    { marker: "2", preferences, includes: { name: "button", text: "(JSX attribute) JSX.IntrinsicElements.button: any" } },
    { marker: "3", preferences, includes: { name: "button", text: "(JSX attribute) JSX.IntrinsicElements.button: any" } },
)
