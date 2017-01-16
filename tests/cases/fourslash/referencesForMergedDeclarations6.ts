/// <reference path='fourslash.ts'/>

////interface Foo { }
////module [|Foo|] {
////    export interface Bar { }
////    export module Bar { export interface Baz { } }
////    export function Bar() { }
////}
////
////// module
////import a1 = [|Foo|];

verify.rangesReferenceEachOther();
