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

var preferences: FourSlashInterface.UserPreferences = {
    jsxAttributeCompletionStyle: "braces",
    includeCompletionsWithSnippetText: true,
    includeCompletionsWithInsertText: true,
}; 

verify.completions(
    { marker: "1", preferences, includes: { name: "Foo", text: "const Foo: NestedInterface" } },
    { marker: "2", preferences, includes: { name: "Foo", text: "const Foo: NestedInterface" } },
    { marker: "3", preferences, includes: { name: "Foo", text: "(JSX attribute) NestedInterface.Foo: NestedInterface" } },
    { marker: "4", preferences, includes: { name: "Foo", text: "(property) NestedInterface.Foo: NestedInterface" } },
    { marker: "5", preferences, includes: { name: "Foo", text: "(JSX attribute) NestedInterface.Foo: NestedInterface" } },
    { marker: "6", preferences, includes: { name: "Foo", text: "(property) NestedInterface.Foo: NestedInterface" } },
)
