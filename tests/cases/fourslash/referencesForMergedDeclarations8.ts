/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface Bar { }
////    export module Bar { export interface Baz { } }
////    export function Bar() { }
////}
////
////// module
////import a3 = Foo./*1*/Bar.Baz;

goTo.marker("1");
verify.referencesCountIs(2);