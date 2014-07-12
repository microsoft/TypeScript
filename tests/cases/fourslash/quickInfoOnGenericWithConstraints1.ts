/// <reference path='fourslash.ts'/>

////interface Fo/*1*/o<T/*2*/T extends Date> {}

goTo.marker('1');
verify.quickInfoIs('Foo<TT extends Date>', null, 'Foo<TT extends Date>')

goTo.marker('2');
verify.quickInfoIs('TT extends Date', null, 'TT in Foo<TT extends Date>')
