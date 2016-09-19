/// <reference path='fourslash.ts'/>

////interface Fo/*1*/o<T/*2*/T extends Date> {}

verify.quickInfos({
    1: "interface Foo<TT extends Date>",
    2: "(type parameter) TT in Foo<TT extends Date>"
});
