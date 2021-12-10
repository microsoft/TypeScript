/// <reference path="fourslash.ts" />
//@Filename: file.tsx
////interface NestedInterface {
////    Foo: NestedInterface;
////    (props: {}): any;
////}
////
////declare const Foo: NestedInterface;
////
////function fn1() {
////    return <Foo>
////        </*1*/
////    </Foo>
////}
////function fn2() {
////    return <Foo>
////        <Fo/*2*/
////    </Foo>
////}
////function fn3() {
////    return <Foo>
////        <Foo./*3*/
////    </Foo>
////}
////function fn4() {
////    return <Foo>
////        <Foo.F/*4*/
////    </Foo>
////}
////function fn5() {
////    return <Foo>
////        <Foo.Foo./*5*/
////    </Foo>
////}
////function fn6() {
////    return <Foo>
////        <Foo.Foo.F/*6*/
////    </Foo>
////}

verify.completions(
    {
        marker: test.markers(),
        includes: [
            { name: "Foo", insertText: undefined, isSnippet: undefined }
        ],
        preferences: {
            jsxAttributeCompletionStyle: "braces",
            includeCompletionsWithSnippetText: true,
            includeCompletionsWithInsertText: true,
        },
    }
)
