/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface Bar { }
////    /*1*/export module /*2*/Bar { export interface Baz { } }
////    export function Bar() { }
////}
////
////// module
////import a3 = Foo./*3*/Bar.Baz;

verify.baselineFindAllReferences('1', '2', '3');
