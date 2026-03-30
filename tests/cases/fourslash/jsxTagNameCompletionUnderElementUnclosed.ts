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
////        <button/*1*/
////    </>;
////}
////function fn2() {
////    return <>
////        preceding junk <button/*2*/
////    </>;
////}
////function fn3() {
////    return <>
////        <button/*3*/ style=""
////    </>;
////}

var preferences: FourSlashInterface.UserPreferences = {
    jsxAttributeCompletionStyle: "braces",
    includeCompletionsWithSnippetText: true,
    includeCompletionsWithInsertText: true,
}; 

verify.completions(
    { marker: "1", preferences, includes: { name: "button", text: "(property) JSX.IntrinsicElements.button: any" } },
    { marker: "2", preferences, includes: { name: "button", text: "(property) JSX.IntrinsicElements.button: any" } },
    { marker: "3", preferences, includes: { name: "button", text: "(property) JSX.IntrinsicElements.button: any" } },
)
