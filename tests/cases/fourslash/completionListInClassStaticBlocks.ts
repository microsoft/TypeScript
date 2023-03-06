/// <reference path="fourslash.ts" />

// @target: esnext
////class Foo {
////    static #a = 1;
////    static a() {
////        this./*1*/
////    }
////    static b() {
////        Foo./*2*/
////    }
////    static {
////        this./*3*/
////    }
////    static {
////        Foo./*4*/
////    }
////}

verify.completions({
    marker: ["1", "2", "3", "4"],
    exact: completion.functionMembersPlus([
        { name: "#a", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "a", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "b", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "prototype" }
    ])
});
