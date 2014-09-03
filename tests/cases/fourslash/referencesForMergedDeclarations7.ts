/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface Bar { }
////    export module Bar { export interface Baz { } }
////    export function Bar() { }
////}
////
////// module, value and type
////import a2 = Foo./*1*/Bar;

goTo.marker("1");
verify.referencesCountIs(4);