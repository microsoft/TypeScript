/// <reference path='fourslash.ts'/>

////interface Foo { }
/////*1*/module /*2*/Foo {
////    export interface Bar { }
////    export module Bar { export interface Baz { } }
////    export function Bar() { }
////}
////
////// module
////import a1 = /*3*/Foo;

verify.baselineFindAllReferences('1', '2', '3');
