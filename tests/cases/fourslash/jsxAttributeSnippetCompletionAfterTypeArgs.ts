/// <reference path="fourslash.ts" />
//@Filename: file.tsx

////declare const React: any;
////
////namespace JSX {
////    export interface IntrinsicElements {
////        div: any;
////    }
////}
////
////function GenericElement<T>(props: {xyz?: T}) {
////    return <></>
////}
////
////function fn1() {
////    return <div>
////        <GenericElement<number> /*1*/ />
////    </div>
////}
////
////function fn2() {
////    return <>
////        <GenericElement<number> /*2*/ />
////    </>
////}
////function fn3() {
////    return <div>
////        <GenericElement<number> /*3*/ ></GenericElement>
////    </div>
////}
////
////function fn4() {
////    return <>
////        <GenericElement<number> /*4*/ ></GenericElement>
////    </>
////}

verify.completions(
    {
        marker: test.markers(),
        includes: {
            name: "xyz",
            insertText: "xyz={$1}",
            text: "(property) xyz?: number",
            isSnippet: true,
            sortText: completion.SortText.OptionalMember
        },
        preferences: {
            jsxAttributeCompletionStyle: "braces",
            includeCompletionsWithSnippetText: true,
            includeCompletionsWithInsertText: true,
        },
    },
)
