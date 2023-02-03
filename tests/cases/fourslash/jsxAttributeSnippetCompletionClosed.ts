/// <reference path="fourslash.ts" />
//@Filename: file.tsx
////interface NestedInterface {
////    Foo: NestedInterface;
////    (props: {className?: string, onClick?: () => void}): any;
////}
////
////declare const Foo: NestedInterface;
////
////function fn1() {
////    return <Foo>
////        <Foo /*1*/ />
////    </Foo>
////}
////function fn2() {
////    return <Foo>
////        <Foo.Foo /*2*/ />
////    </Foo>
////}
////function fn3() {
////    return <Foo>
////        <Foo.Foo cla/*3*/ />
////    </Foo>
////}
////function fn4() {
////    return <Foo>
////        <Foo.Foo cla/*4*/ something />
////    </Foo>
////}
////function fn5() {
////    return <Foo>
////        <Foo.Foo something /*5*/ />
////    </Foo>
////}
////function fn6() {
////    return <Foo>
////        <Foo.Foo something cla/*6*/ />
////    </Foo>
////}
////function fn7() {
////    return <Foo /*7*/ />
////}
////function fn8() {
////    return <Foo cla/*8*/ />
////}
////function fn9() {
////    return <Foo cla/*9*/ something />
////}
////function fn10() {
////    return <Foo something /*10*/ />
////}
////function fn11() {
////    return <Foo something cla/*11*/ />
////}
////function fn12() {
////    return <Foo something={false} cla/*12*/ />
////}
////function fn13() {
////    return <Foo something={false} /*13*/ foo />
////}
////function fn14() {
////    return <Foo something={false} cla/*14*/ foo />
////}
////function fn15() {
////    return <Foo onC/*15*/="" />
////}
////function fn16() {
////    return <Foo something={false} onC/*16*/="" foo />
////}

var preferences: FourSlashInterface.UserPreferences = {
    jsxAttributeCompletionStyle: "braces",
    includeCompletionsWithSnippetText: true,
    includeCompletionsWithInsertText: true,
};

verify.completions(
    { marker: "1", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "2", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "3", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "4", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "5", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "6", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "7", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "8", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "9", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "10", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "11", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "12", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "13", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "14", preferences, includes: { name: "className", insertText: "className={$1}", text: "(property) className?: string", isSnippet: true, sortText: completion.SortText.OptionalMember } },
    { marker: "15", preferences, includes: { name: "onClick", insertText: undefined, text: "(property) onClick?: () => void", isSnippet: undefined, sortText: completion.SortText.OptionalMember } },
    { marker: "16", preferences, includes: { name: "onClick", insertText: undefined, text: "(property) onClick?: () => void", isSnippet: undefined, sortText: completion.SortText.OptionalMember } },
)
