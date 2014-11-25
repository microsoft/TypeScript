/// <reference path='fourslash.ts'/>

////interface Fo/*1*/o<T/*2*/T extends Date> {}

goTo.marker('1');
verify.quickInfoIs('interface Foo<TT extends Date>', null);

goTo.marker('2');
verify.quickInfoIs('(type parameter) TT in Foo<TT extends Date>', null);
