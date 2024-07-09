/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface /*1*/Bar { }
////    export module /*2*/Bar { export interface Baz { } }
////    export function /*3*/Bar() { }
////}
////
////// module, value and type
////import a2 = Foo./*4*/Bar;

verify.baselineFindAllReferences('1', '2', '3', '4')
