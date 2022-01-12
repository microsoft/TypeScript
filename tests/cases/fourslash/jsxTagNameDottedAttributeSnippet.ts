/// <reference path="fourslash.ts" />
//@Filename: file.tsx
////interface NestedInterface {
////    Foo: NestedInterface;
////    (props: {className?: string}): any;
////}
////
////declare const Foo: NestedInterface;
////
////function fn1() {
////    return <Foo>
////        <Foo /*1*/
////    </Foo>
////}
////function fn2() {
////    return <Foo>
////        <Foo.Foo /*2*/
////    </Foo>
////}
////function fn3() {
////    return <Foo>
////        <Foo.Foo cla/*3*/
////    </Foo>
////}
////function fn4() {
////    return <Foo>
////        <Foo.Foo cla/*4*/ something
////    </Foo>
////}
////function fn5() {
////    return <Foo>
////        <Foo.Foo something /*5*/
////    </Foo>
////}
////function fn6() {
////    return <Foo>
////        <Foo.Foo something cla/*6*/
////    </Foo>
////}
////function fn7() {
////    return <Foo /*7*/
////}
////function fn8() {
////    return <Foo cla/*8*/
////}
////function fn9() {
////    return <Foo cla/*9*/ something
////}
////function fn10() {
////    return <Foo something /*10*/
////}
////function fn11() {
////    return <Foo something cla/*11*/
////}

verify.completions(
    {
        marker: test.markers(),
        includes: [
            {
                name: "className",
                insertText: "className={$1}",
                isSnippet: true,
                sortText: completion.SortText.OptionalMember,
                text: "(JSX attribute) className?: string"
            }
        ],
        preferences: {
            jsxAttributeCompletionStyle: "braces",
            includeCompletionsWithSnippetText: true,
            includeCompletionsWithInsertText: true,
        },
    }
)
