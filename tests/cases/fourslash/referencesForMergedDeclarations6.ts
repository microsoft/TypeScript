/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface Bar { }
////    export module Bar { export interface Baz { } }
////    export function Bar() { }
////}
////
////// module
////import a1 = /*1*/Foo;

goTo.marker("1");
verify.referencesCountIs(2);